export const enum BooleanOptionEnum {
  SIM = "Sim",
  NAO = "Não",
  PrefiroNaoInformar = "Prefiro não informar",
}

export interface StackTrace {
  classLoaderName?: string;
  moduleName?: string;
  moduleVersion?: string;
  methodName?: string;
  fileName?: string;
  lineNumber?: number;
  nativeMethod?: boolean;
  className?: string;
}

export interface ApiError {
  message: string;
  localizedMessage: string;
  cause: string;
  supressed: string;
  stackTrace: StackTrace[];
}
