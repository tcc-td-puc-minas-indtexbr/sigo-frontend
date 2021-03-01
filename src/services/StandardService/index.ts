import { StandardDto } from "models/ApiResponse";
import { StandardModel } from "models/Standard";
import { BaseService } from "services/BaseService";
import { dateToString } from "shared/dates";

class StandardService extends BaseService<StandardModel, StandardDto> {
  constructor() {
    super(process.env.REACT_APP_API_STANDARD_MANAGER ?? "", "/v1/standard");
  }

  protected toModel(item: StandardDto): StandardModel {
    return {
      ...item,
      publicationDate: new Date(item.publication_date),
      validityStart: new Date(item.validity_start),
      titleGlobalLanguage: item.title_global_language,
    };
  }

  protected toDto(item: StandardModel): StandardDto {
    return {
      ...item,
      publication_date: dateToString(item.publicationDate),
      validity_start: dateToString(item.validityStart),
      title_global_language: item.titleGlobalLanguage,
    };
  }
}

export default StandardService;
