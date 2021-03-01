import { AxiosInstance } from "axios";
import { ApiDeletionResponse, ApiListResponse, ApiResponse } from "models/ApiResponse";
import { buildApiInstanceForURL } from "services/BaseService/api-helper";

interface IBaseService<TModel> {
  getAll: () => Promise<TModel[]>;
  get: (uuid: string) => Promise<TModel>;
  create: (model: TModel) => Promise<TModel>;
  update: (uuid: string, model: TModel) => Promise<TModel>;
  delete: (uuid: string) => Promise<ApiDeletionResponse>;
}

export abstract class BaseService<TModel, TDto> implements IBaseService<TModel> {
  _api: AxiosInstance;
  _endpoint: string;

  constructor(baseUrl: string, endpoint: string) {
    this._api = buildApiInstanceForURL(baseUrl);
    this._endpoint = endpoint;
  }

  getAll() {
    return this._api
      .get<ApiListResponse<TDto>>(this._endpoint)
      .then((response) => {
        const data =
          response.data?.data.map((item) => {
            return this.toModel(item);
          }) ?? [];

        return data as TModel[];
      })
      .catch((err) => {
        console.error(err);
        return [] as TModel[];
      });
  }

  get(uuid: string) {
    return this._api.get<ApiResponse<TDto>>(`${this._endpoint}/${uuid}`).then((response) => {
      if (response.data?.data) {
        return this.toModel(response.data.data);
      }

      throw new Error("Unable to get record.");
    });
  }

  create(model: TModel) {
    return this._api
      .post<ApiResponse<TDto>>(this._endpoint, { ...this.toDto(model) })
      .then((response) => {
        if (response.data?.data) {
          return this.toModel(response.data.data);
        }

        throw new Error("Unable to create record.");
      });
  }

  update(uuid: string, model: TModel) {
    return this._api
      .put<ApiResponse<TDto>>(`${this._endpoint}/${uuid}`, { ...this.toDto(model) })
      .then((response) => {
        if (response.data?.data) {
          return this.toModel(response.data.data);
        }

        throw new Error("Unable to update record.");
      });
  }

  delete(uuid: string) {
    return this._api
      .delete<ApiResponse<ApiDeletionResponse>>(`${this._endpoint}/${uuid}`)
      .then((response) => {
        if (response.data?.data) {
          return response.data.data;
        }

        throw new Error("Unable to delete record.");
      });
  }

  protected abstract toModel(item: TDto): TModel;

  protected abstract toDto(item: TModel): TDto;
}
