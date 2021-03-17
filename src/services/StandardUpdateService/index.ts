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
      ...item,
      publicationDate: new Date(item.publication_date || Date.now()),
    };
  }

  protected toDto(item: StandardUpdateModel): StandardUpdateDto {
    return {
      ...item,
      publication_date: dateToString(item.publicationDate),
    };
  }
}

export default StandardUpdateService;
