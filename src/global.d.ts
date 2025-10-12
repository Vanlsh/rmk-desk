import type {
  ArticleSaveResponse,
  Product,
  SuccessResponse,
  ErrorResponse,
  GroupSaveResponse,
} from "./lib/types";

export {};

declare global {
  interface Window {
    api: {
      ping: () => void;
      setArticles: (
        ip: string,
        data: Product[]
      ) => Promise<SuccessResponse<ArticleSaveResponse> | ErrorResponse>;
      setGroups: (
        ip: string,
        data: T[]
      ) => Promise<SuccessResponse<GroupSaveResponse> | ErrorResponse>;
      deleteArticles: (
        ip: string
      ) => Promise<
        SuccessResponse<{ success: boolean; message: string }> | ErrorResponse
      >;
      saveValidationErrors: (
        errors: unknown
      ) => Promise<SuccessResponse<string> | ErrorResponse>;
      selectExcelFile: () => Promise<string | null>;
      parseExcel: (
        path: string
      ) => Promise<
        SuccessResponse<Record<ProductFieldLabel, unknown>[]> | ErrorResponse
      >;
    };
  }
}
