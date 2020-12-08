import {
  branchCityInputId,
  branchStreetInputId,
  brandNameErrorDomId,
  closeBrandComponentId,
  branchResetId,
  brandDomId,
  branchPostCodeInputId,
  branchAliasInputId,
  branchSubmitId,
  branchPostCodeOptionSelector,
  branchNotificationTextCloseId,
  branchPostCodeErrorId,
  branchCityErrorId,
  branchStreetErrorId,
  branchPhoneInputId,
} from "@ta/cm/src/selectors";
import {
  IS_ACTIVE_CLASS_NAME,
  NOTHING_TO_SAVE_WARNING_MESSAGE,
  FORM_CONTAINS_ERRORS_MESSAGE,
} from "@ta/cm/src/utils";
import { newUlid } from "@ta/cm/src/db/ulid-uuid";

import FormCtrlError from "../form-ctrl-error.svelte";
import Notification from "../notification.svelte";

import { BranchValues } from "./branch-utils";

/* FORM ATTRIBUTES AND ERROR VARIABLES */
let postCode = "";
let postCodeError: string;

let city = "";
let cityError: string;

let street = "";
let streetError: string;

let branchAlias = "";
let phone = "";

let notificationText = "";
let notificationTextClass = "";

/* PROPS */
export let isActive: Props["isActive"] = false;
export let onSubmit: Props["onSubmit"];

/* CALLBACKS */

function closeComponentCb() {
  isActive = false;
}

function resetFormCb() {
  street = "";
  streetError = "";

  city = "";
  cityError = "";

  postCode = "";
  postCodeError = "";

  branchAlias = "";
  phone = "";
  clearSimpletextErrorCb();
}

function submitFormCb() {
  postCode = postCode.trim();
  street = street.trim();
  city = city.trim();
  branchAlias = branchAlias.trim();
  phone = phone.trim();

  const formEmpty = !street && !city && !postCode && !branchAlias && !phone;

  if (formEmpty) {
    notificationText = NOTHING_TO_SAVE_WARNING_MESSAGE;
    notificationTextClass = "is-warning";
    return;
  }

  let hasError = false;
  postCodeError = "";
  streetError = "";
  cityError = "";

  if (postCode.length < 3) {
    postCodeError = "Post code is a compulsory field";
    hasError = true;
  }

  if (street.length < 4) {
    streetError = "Street is compulsory field";
    hasError = true;
  }

  if (city.length < 2) {
    cityError = "City is a compulsory field";
    hasError = true;
  }

  if (hasError) {
    notificationText = FORM_CONTAINS_ERRORS_MESSAGE;
    notificationTextClass = "is-danger";
    return;
  }

  if (onSubmit) {
    onSubmit({
      id: newUlid(),
      street,
      city,
      postCode,
      branchAlias: branchAlias || null,
      phone: phone || null,
    });
  }
}

function clearSimpletextErrorCb() {
  notificationText = "";
  notificationTextClass = "";
}

export type Props = {
  isActive: boolean;
  onSubmit?: (values: BranchValues) => void;
};
