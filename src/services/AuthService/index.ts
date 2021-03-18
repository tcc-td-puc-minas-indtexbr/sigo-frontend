import Auth from "@aws-amplify/auth";
import Amplify from "aws-amplify";
import aws_exports from "aws-exports";
import { LoginRequest } from "models/Request";
import { CognitoUser, UserModel, userModelInitialState } from "models/User";

Amplify.configure(aws_exports);

const LOGIN_NEW_PASSWORD_REQUIRED = "NEW_PASSWORD_REQUIRED";

type Response = {
  token: string;
  isSuccess: boolean;
  user: UserModel;
};

interface IAuthService {
  Login: (request: LoginRequest) => Promise<Response>;
}

class AuthService implements IAuthService {
  Login(request: LoginRequest) {
    return new Promise<Response>((resolve) => {
      Auth.signIn(request.email, request.password)
        .then((cognitoUser) => this.ConfirmNewPassword(request, cognitoUser))
        .then((cognitoUser) => this.ExtractUserData(cognitoUser, request))
        .then((userData) => resolve(userData))
        .catch((err) => this.FailedAuthentication(resolve));
    });
  }

  // User was signed up by an admin and must provide new
  // password and required attributes, if any, to complete
  // authentication.
  private ConfirmNewPassword(request: LoginRequest, cognitoUser: CognitoUser) {
    if (cognitoUser.challengeName === LOGIN_NEW_PASSWORD_REQUIRED) {
      return Auth.completeNewPassword(cognitoUser, request.password, {
        name: request.email,
      });
    }

    return cognitoUser;
  }

  private ExtractUserData(cognitoUser: CognitoUser, request: LoginRequest) {
    const token = cognitoUser.signInUserSession.accessToken.jwtToken ?? "";
    const username = cognitoUser.username;
    const roles = cognitoUser.signInUserSession.accessToken.payload["cognito:groups"] || ["user"];

    return {
      token: token,
      isSuccess: true,
      user: {
        id: username,
        name: username,
        roles: roles,
        email: request.email,
        avatarUrl: "",
      },
    };
  }

  private FailedAuthentication(resolve: (value: Response | PromiseLike<Response>) => void) {
    resolve({
      token: "",
      isSuccess: false,
      user: userModelInitialState,
    });
  }
}

export default AuthService;
