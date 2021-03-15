import { ApiListResponse, StandardUpdateDto } from "models/ApiResponse";
import { StandardUpdateModel } from "models/StandardUpdate";
import { BaseService } from "services/BaseService";
import { dateToString } from "shared/dates";

class StandardUpdateService extends BaseService<StandardUpdateModel, StandardUpdateDto> {
  private _updatesCheckEndpoint: string;
  constructor() {
    super(process.env.REACT_APP_API_STANDARD_UPDATE_SERVICE ?? "", "/v1/updates");
    this._updatesCheckEndpoint = this._endpoint + "/check";
  }

  checkUpdates() {
    return this._api
      .get<ApiListResponse<StandardUpdateDto>>(this._updatesCheckEndpoint)
      .then((response) => {
        const data =
          response.data?.data.map((item) => {
            return this.toModel(item);
          }) ?? [];

        return data as StandardUpdateModel[];
      })
      .catch((err) => {
        console.error(err);
        return [] as StandardUpdateModel[];
      });
  }

  protected toModel(item: StandardUpdateDto): StandardUpdateModel {
    return {
      identification: item.identification,
      uuid: item.uuid,
      link: item.link,
      description: item.description,
      synchronized: item.synchronized == "true",
      title: item.title,
      publicationDate: new Date(item.publication_date),
    } as StandardUpdateModel;
  }

  protected toDto(item: StandardUpdateModel): StandardUpdateDto {
    return {
      identification: item.identification,
      uuid: item.uuid,
      link: item.link,
      description: item.description,
      synchronized: item.synchronized ? "true" : "false",
      title: item.title,
      publication_date: dateToString(item.publicationDate),
    } as StandardUpdateDto;
  }
}

export default StandardUpdateService;
