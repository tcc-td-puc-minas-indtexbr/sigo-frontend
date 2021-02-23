import ConsultingDto from "models/ConsultingDto";

type Response = {
  isSuccess: boolean;
  data: ConsultingDto[];
};

interface IConsultingService {
  GetAll: () => Promise<Response>;
  GetByUuid: (uuid: string) => Promise<ConsultingDto | undefined>;
}

class ConsultingService implements IConsultingService {
  _data: ConsultingDto[];

  constructor(data: ConsultingDto[]) {
    this._data = data;
  }

  GetAll() {
    return new Promise<Response>((resolve) => {
      setTimeout(() => {
        resolve({
          isSuccess: true,
          data: this._data,
        });
      }, 500);
    });
  }

  GetByUuid(uuid: string) {
    return new Promise<ConsultingDto | undefined>((resolve) => {
      const standard = this._data.find((x) => x.uuid === uuid);

      setTimeout(() => {
        resolve(standard);
      }, 300);
    });
  }
}

export default ConsultingService;
