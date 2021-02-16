import StandardDto from "models/StandardDto";

type Response = {
  isSuccess: boolean;
  data: StandardDto[];
};

interface IStandardService {
  GetAll: () => Promise<Response>;
  GetByUuid: (uuid: string) => Promise<StandardDto | undefined>;
}

class StandardService implements IStandardService {
  _data: StandardDto[];

  constructor(data: StandardDto[]) {
    this._data = data;
  }

  GetAll() {
    return new Promise<Response>((resolve) => {
      setTimeout(() => {
        resolve({
          isSuccess: true,
          data: this._data,
        });
      }, 1000);
    });
  }

  GetByUuid(uuid: string) {
    return new Promise<StandardDto | undefined>((resolve) => {
      const standard = this._data.find((x) => x.uuid === uuid);

      setTimeout(() => {
        resolve(standard);
      }, 300);
    });
  }
}

export default StandardService;
