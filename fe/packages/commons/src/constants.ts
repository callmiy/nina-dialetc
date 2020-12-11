import { LoadingState } from "./types";

export const API_HOST_PATH = "/api";
export const GRAPHQL_PATH = `${API_HOST_PATH}/gql`;
export const RESET_PATH = `${API_HOST_PATH}/reset_db`;

export const IS_ACTIVE_CLASS_NAME = "is-active";

export const NOTHING_TO_SAVE_WARNING_MESSAGE =
  "Please make changes before saving.";

export const FORM_CONTAINS_ERRORS_MESSAGE =
  "Form contains errors. Please correct them and save again.";

const checkNetworkConn =
  " - please check your network connection and try again.";

export const COUNTRIES_FETCHING_FAILED = `Attempt to fetch countries data failed${checkNetworkConn}`;

export const COUNTRIES_LOADING_MSG = "Loading countries data...";

export const CURRENCIES_LOADING_MSG = "Loading currencies data...";

export const CURRENCIES_FETCHING_FAILED = `Attempt to fetch currencies data failed${checkNetworkConn}`;

export const DATA_FETCHING_FAILED = `Data fetching failed${checkNetworkConn}`;

export type NoEffectVal = "noEffect";
export type HasEffectsVal = "hasEffects";
export type ActiveVal = "active";
export type InActiveVal = "inactive";
export type SubmissionVal = "submitting";
export type CommonErrorsVal = "commonErrors";
export type WarningVal = "warning";
export type ValidVal = "valid";
export type InvalidVal = "invalid";
export type InitialVal = "initial";
export type UnChangedVal = "unchanged";
export type ChangedVal = "changed";
export type ErrorsVal = "errors";
export type LoadingVal = "loading";
export type DataVal = "data";
export type CancelledVal = "cancelled";
export type DeletedVal = "deleted";
export type RequestedVal = "requested";
export type SuccessVal = "success";
export type FailVal = "fail";
export type UpdateVal = "update";
export type InsertVal = "insert";
export type ReFetchOnly = "re-fetch-only";
export type OnlineVal = "online";
export type OfflineVal = "offline";
export type PartOfflineVal = "part-offline";
export type OnlineStatus = OnlineVal | OfflineVal | PartOfflineVal;
export type DeleteSuccess = "deleteSuccess";

export const StateValue = {
  noEffect: "noEffect" as NoEffectVal,
  hasEffects: "hasEffects" as HasEffectsVal,
  inactive: "inactive" as InActiveVal,
  unchanged: "unchanged" as UnChangedVal,
  commonErrors: "commonErrors" as CommonErrorsVal,
  warning: "warning" as WarningVal,
  active: "active" as ActiveVal,
  submitting: "submission" as SubmissionVal,
  changed: "changed" as ChangedVal,
  valid: "valid" as ValidVal,
  invalid: "invalid" as InvalidVal,
  initial: "initial" as InitialVal,
  errors: "errors" as ErrorsVal,
  loading: "loading" as LoadingVal,
  data: "data" as DataVal,
  cancelled: "cancelled" as CancelledVal,
  deleted: "deleted" as DeletedVal,
  requested: "requested" as RequestedVal,
  success: "success" as SuccessVal,
  fail: "fail" as FailVal,
  update: "update" as UpdateVal,
  insert: "insert" as InsertVal,
  reFetchOnly: "re-fecht-only" as ReFetchOnly,
  selfBcMessageKey: "self-bc-message" as any,
  bcMessageKey: "message" as any,
  online: "online" as OnlineVal,
  offline: "offline" as OfflineVal,
  partOffline: "part-offline" as PartOfflineVal,
  deleteSuccess: "deleteSuccess" as DeleteSuccess,
} as const;

export const LOADING_STATE: LoadingState = {
  value: StateValue.loading,
  msg: "",
};
