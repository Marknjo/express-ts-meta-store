import { RouterMergeParamsWithOptions } from './RouterMergeParamsWithOptions';

export interface RouterConfigsOptions {
  baseUrl: string;
  mergeParams?: boolean;
  caseSensitive?: boolean;
  strict?: boolean;
  mergeParamsWith?: RouterMergeParamsWithOptions[];
}
