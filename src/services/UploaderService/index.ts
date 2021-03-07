import { AxiosInstance } from "axios";
import { UploadResponse } from "models/ApiResponse";
import { buildApiInstanceForURL } from "services/BaseService/api-helper";

interface IUploaderService {
  uploadStandard: (fileName: string, formData: FormData) => Promise<UploadResponse>;
}

export class UploaderService implements IUploaderService {
  protected _api: AxiosInstance;

  constructor() {
    this._api = buildApiInstanceForURL(process.env.REACT_APP_API_UPLOADER_SERVICE || "");
  }

  uploadStandard(fileName: string, formData: FormData) {
    return this._api
      .post<UploadResponse>(`/v1/upload/standard/${fileName}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        if (response.data?.message && response.status === 200) {
          return {
            message: response.data.message,
          };
        }

        throw new Error("Unable to upload standard file.");
      });
  }
}
