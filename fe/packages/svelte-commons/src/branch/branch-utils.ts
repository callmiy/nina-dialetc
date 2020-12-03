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
import {
  ListCountriesAndCurrencies_listCountries,
  ListCountriesAndCurrencies_listCurrencies,
  ListCountriesAndCurrencies,
} from "@ta/cm/src/gql/ops-types";

let countriesAndCurrencies: ListCountriesAndCurrencies;

const countriesCurrenciesPromise = getCountriesCurrencies().then((d) => {
  countriesAndCurrencies = d;
  return d;
});

/* FORM ATTRIBUTES AND ERROR VARIABLES */
let city = "";
let cityError: string;

let postCode = "";
let postCodeError: string;

let street = "";
let streetError: string;

let branchAlias = "";

let simpleTextError = "";
let simpleTextErrorClass = "";

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
  clearSimpletextErrorCb();
}

function submitFormCb() {
  const formEmpty = !street && !city && !postCode && !branchAlias;

  if (formEmpty) {
    simpleTextError = NOTHING_TO_SAVE_WARNING_MESSAGE;
    simpleTextErrorClass = "is-warning";
    return;
  }

  let hasError = false;

  if (street.length < 3) {
    streetError = "shop brand name is compulsory field";
    hasError = true;
  }

  if (city.length === 0) {
    cityError = "Pick a city from the dropdown";
    hasError = true;
  }

  if (postCode.length === 0) {
    postCodeError = "Pick a postCode from the dropdown";
    hasError = true;
  }

  if (hasError) {
    simpleTextError = FORM_CONTAINS_ERRORS_MESSAGE;
    simpleTextErrorClass = "is-danger";
    return;
  }

  const countryData = countriesAndCurrencies.listCountries.find(
    (d) => d.id === city
  ) as ListCountriesAndCurrencies_listCountries;

  const currencyData = countriesAndCurrencies.listCurrencies.find(
    (d) => d.id === postCode
  ) as ListCountriesAndCurrencies_listCurrencies;

  if (onSubmit) {
    onSubmit({
      street,
      city: countryData,
      postCode: currencyData,
      branchAlias: branchAlias || null,
    });
  }
}

function clearSimpletextErrorCb() {
  simpleTextError = "";
  simpleTextErrorClass = "";
}

export type ShopBrandValues = {
  street: string;
  city: ListCountriesAndCurrencies_listCountries;
  postCode: ListCountriesAndCurrencies_listCurrencies;
  branchAlias?: string | null;
};

export type Props = {
  isActive: boolean;
  onSubmit?: (values: ShopBrandValues) => void;
};
