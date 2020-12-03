/* eslint-disable @typescript-eslint/no-unused-vars */

import {
  shopBrandNameInputDomId,
  shopBrandNameErrorDomId,
  closeShopBrandComponentId,
  resetFormBtnId,
  shopBrandDomId,
  shopBrandCountryInputDomId,
  shopBrandCountryErrorDomId,
  shopBrandCurrencyInputDomId,
  shopBrandCurrencyErrorDomId,
  shopBrandPhoneInputDomId,
  simpleTextErrorCloseId,
  submitId,
  shopBrandNameOptionSelector,
  shopBrandCountryOptionSelector,
  shopBrandCurrencyOptionSelector,
} from "@ta/cm/src/shop-brand-dom";
import {
  IS_ACTIVE_CLASS_NAME,
  NOTHING_TO_SAVE_WARNING_MESSAGE,
  FORM_CONTAINS_ERRORS_MESSAGE,
} from "@ta/cm/src/utils";
import { getCountriesCurrencies } from "@ta/cm/src/apollo/client";
import FormCtrlError from "../FormCtrlError/FormCtrlError.svelte";

const countriesCurrenciesPromise = getCountriesCurrencies();

/* FORM ATTRIBUTES AND ERROR VARIABLES */
let name = "";
let nameError: string;

let country = "";
let countryError: string;

let currency = "";
let currencyError: string;

let phone = "";

let simpleTextError = "";
let simpleTextErrorClass = "";

export let isActive = false;

/* CALLBACKS */

function closeComponentCb() {
  isActive = false;
}

function resetFormCb() {
  name = "";
  nameError = "";

  country = "";
  countryError = "";

  currency = "";
  currencyError = "";

  phone = "";
  clearSimpletextErrorCb();
}

function submitFormCb() {
  const formEmpty = !name && !country && !currency && !phone;

  if (formEmpty) {
    simpleTextError = NOTHING_TO_SAVE_WARNING_MESSAGE;
    simpleTextErrorClass = "is-warning";
    return;
  }

  let hasError = false;

  if (name.length < 3) {
    nameError = "shop brand name is compulsory field";
    hasError = true;
  }

  if (country.length === 0) {
    countryError = "Pick a country from the dropdown";
    hasError = true;
  }

  if (currency.length === 0) {
    currencyError = "Pick a currency from the dropdown";
    hasError = true;
  }

  if (hasError) {
    simpleTextError = FORM_CONTAINS_ERRORS_MESSAGE;
    simpleTextErrorClass = "is-danger";
  }
}

function clearSimpletextErrorCb() {
  simpleTextError = "";
  simpleTextErrorClass = "";
}
