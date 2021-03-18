export type UserModel = {
  id: string;
  name: string;
  email: string;
  roles: string[];
  avatarUrl: string;
};

export const userModelInitialState = {
  id: "",
  name: "",
  email: "",
  roles: [],
  avatarUrl: "",
};

export type CognitoUser = {
  username: string;
  signInUserSession: {
    accessToken: {
      jwtToken: string;
      payload: {
        "cognito:groups": string[];
      };
    };
  };
  challengeName: string;
};
