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
