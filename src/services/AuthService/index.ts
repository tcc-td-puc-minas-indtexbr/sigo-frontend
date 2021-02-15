import Amplify from 'aws-amplify';
import Auth, { CognitoUser } from '@aws-amplify/auth';
import aws_exports from 'aws-exports';

Amplify.configure(aws_exports);

const LOGIN_NEW_PASSWORD_REQUIRED = 'NEW_PASSWORD_REQUIRED';

type LoginRequest = {
  email: string;
  password: string;
};

type Response = {
  token: string;
  isSuccess: boolean;
  user: any;
};

interface IAuthService {
  Login: (request: LoginRequest) => Promise<Response>;
}

class AuthService implements IAuthService {
  Login(request: LoginRequest) {
    const username = request.email;
    const password = request.password;

    return new Promise<Response>((resolve, reject) => {
      Auth.signIn(username, password)
        .then((cognitoUser) => {
          console.log('successful sign in');
          console.log(cognitoUser);

          const token = cognitoUser.Session;
          const username = cognitoUser.username;
          const userData = cognitoUser.challengeParam;

          const data: Response = {
            token: token,
            isSuccess: true,
            user: {
              id: username,
              name: 'Michael Scott',
              role: 'admin',
              email: request.email,
              avatarUrl:
                'https://i1.wp.com/www.nonada.com.br/wp-content/uploads/2012/08/scarell1.jpg',
            },
          };

          if (cognitoUser.challengeName == LOGIN_NEW_PASSWORD_REQUIRED) {
            // User was signed up by an admin and must provide new
            // password and required attributes, if any, to complete
            // authentication.
            Auth.completeNewPassword(cognitoUser, request.password)
              .then((changed_data) => {
                resolve(data);
              })
              .catch((err) => {
                console.log(err);
                resolve({
                  token: '',
                  isSuccess: false,
                  user: undefined,
                });
              });

            // Auth.currentAuthenticatedUser()
            //   .then((user) => {
            //     return Auth.changePassword(
            //       user,
            //       request.password,
            //       request.password,
            //     );
            //   })
            //   .then((changed_data) => {
            //     console.log(changed_data);
            //     resolve(data);
            //   })
            //   .catch((err) => {
            //     console.log(err);
            //     resolve({
            //       token: '',
            //       isSuccess: false,
            //       user: undefined,
            //     });
            //   });
          } else {
            resolve(data);
          }
        })
        .catch((err) => {
          console.log(err);
          resolve({
            token: '',
            isSuccess: false,
            user: undefined,
          });
        });
    });
  }

  OldLogin(request: LoginRequest) {
    const email = 'michael@scott.com';

    if (request.email !== email) {
      return new Promise<Response>((resolve) => {
        setTimeout(() => {
          resolve({
            token: '',
            isSuccess: false,
            user: undefined,
          });
        }, 1000);
      });
    }

    return new Promise<Response>((resolve) => {
      setTimeout(() => {
        resolve({
          token: '0fa97dac-38d4-46d4-8fcc-e5423afdfeaf',
          isSuccess: true,
          user: {
            name: 'Michael Scott',
            role: 'admin',
            email: email,
            avatarUrl:
              'https://i1.wp.com/www.nonada.com.br/wp-content/uploads/2012/08/scarell1.jpg',
          },
        });
      }, 2000);
    });
  }
}

export default AuthService;
