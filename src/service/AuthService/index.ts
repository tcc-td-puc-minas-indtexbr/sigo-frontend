type LoginRequest = {
  email: string,
  password: string
};

type Response = { 
  user: any
};

interface IAuthService {
  Login: (request: LoginRequest) => Promise<Response>;
};

class AuthService implements IAuthService {
  Login(request: LoginRequest) {
    const email = 'michael@scott.com';

    if (request.email !== email) {
      return new Promise<Response>(resolve => {
        setTimeout(() => {
          resolve({
            user: undefined
          })
        }, 1000);
      });
    }

    return new Promise<Response>(resolve => {
      setTimeout(() => {
        resolve({
          user: {
            token: '0fa97dac-38d4-46d4-8fcc-e5423afdfeaf',
            user: {
              id: '11c69e1b-f536-436a-9ddc-77faf9c42f77',
              name: 'Michael Scott',
              email: email,
              avatarUrl: 'https://i1.wp.com/www.nonada.com.br/wp-content/uploads/2012/08/scarell1.jpg',
              locale: 'Scranton, PA'
            }
          }
        })
      }, 2000);
    });
  };
};

export default AuthService;
