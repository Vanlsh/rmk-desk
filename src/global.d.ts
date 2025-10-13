import type {
  ArticleSaveResponse,
  Product,
  SuccessResponse,
  ErrorResponse,
  GroupSaveResponse,
  TaxSaveResponse,
  CheckParams,
  CheckResponse,
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
      setTaxes: (
        ip: string,
        data: T[]
      ) => Promise<SuccessResponse<TaxSaveResponse> | ErrorResponse>;
      deleteArticles: (
        ip: string
      ) => Promise<
        SuccessResponse<{ success: boolean; message: string }> | ErrorResponse
      >;
      deleteGroups: (
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
      getChecks: (
        ip: string,
        params: CheckParams
      ) => Promise<SuccessResponse<CheckResponse> | ErrorResponse>;
      deleteSales: (ip: string) => Promise<unknown>;
      generateExampleProducts: () => Promise<{
        success: boolean;
        message: string;
      }>;
      generateExampleTaxes: () => Promise<{
        success: boolean;
        message: string;
      }>;
      generateExampleGroups: () => Promise<{
        success: boolean;
        message: string;
      }>;
    };
  }
}
