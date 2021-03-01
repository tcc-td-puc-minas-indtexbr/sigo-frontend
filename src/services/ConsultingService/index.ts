import { ConsultingDto } from "models/ApiResponse";
import { ConsultingModel } from "models/Consulting";
import { BaseService } from "services/BaseService";
import { dateToString } from "shared/dates";

class ConsultingService extends BaseService<ConsultingModel, ConsultingDto> {
  constructor() {
    super(process.env.REACT_APP_API_CONSULTING_MANAGER ?? "", "/v1/consulting");
  }

  protected toModel(item: ConsultingDto): ConsultingModel {
    return {
      ...item,
      startDate: new Date(item.startDate),
      endDate: new Date(item.endDate),
      agreementDate: new Date(item.agreementDate),
    };
  }

  protected toDto(item: ConsultingModel): ConsultingDto {
    return {
      ...item,
      startDate: dateToString(item.startDate),
      endDate: dateToString(item.endDate),
      agreementDate: dateToString(item.agreementDate),
    };
  }
}

export default ConsultingService;
