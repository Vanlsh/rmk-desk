import type {
  ArticleSaveResponse,
  Product,
  SuccessResponse,
  ErrorResponse,
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
