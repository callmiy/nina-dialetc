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
  branchCityOptionSelector,
} from "@ta/cm/src/selectors";
import {
  IS_ACTIVE_CLASS_NAME,
  NOTHING_TO_SAVE_WARNING_MESSAGE,
  FORM_CONTAINS_ERRORS_MESSAGE,
} from "@ta/cm/src/utils";
import { getCountriesCurrencies } from "@ta/cm/src/apollo/client";
import FormCtrlError from "./form-ctrl-error.svelte";
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
let postCode = "";
let postCodeError: string;

let city = "";
let cityError: string;

let street = "";
let streetError: string;

let branchAlias = "";

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
  clearSimpletextErrorCb();
}

function submitFormCb() {
  const formEmpty = !street && !city && !postCode;

  if (formEmpty) {
    notificationText = NOTHING_TO_SAVE_WARNING_MESSAGE;
    notificationTextClass = "is-warning";
    return;
  }

  let hasError = false;

  if (street.length < 3) {
    streetError = "Street is compulsory field";
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
    notificationText = FORM_CONTAINS_ERRORS_MESSAGE;
    notificationTextClass = "is-danger";
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
  notificationText = "";
  notificationTextClass = "";
}

export type BrandValues = {
  street: string;
  city: ListCountriesAndCurrencies_listCountries;
  postCode: ListCountriesAndCurrencies_listCurrencies;
  branchAlias?: string | null;
};

export type Props = {
  isActive: boolean;
  onSubmit?: (values: BrandValues) => void;
};
