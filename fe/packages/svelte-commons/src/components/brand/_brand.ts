import {
  brandNameInputDomId,
  closeBrandComponentId,
  resetFormBtnId,
  brandDomId,
  brandCountryInputDomId,
  brandCurrencyInputDomId,
  brandPhoneInputDomId,
  submitBrandId,
  brandNameOptionSelector,
  brandCountryOptionSelector,
  brandCurrencyOptionSelector,
  brandNotificationTextCloseId,
} from "@ta/cm/src/selectors";
import {
  IS_ACTIVE_CLASS_NAME,
  NOTHING_TO_SAVE_WARNING_MESSAGE,
  FORM_CONTAINS_ERRORS_MESSAGE,
} from "@ta/cm/src/utils";
import { getCountriesCurrencies } from "@ta/cm/src/apollo/client";
import FormCtrlError from "../form-ctrl-error.svelte";
import {
  ListCountriesAndCurrencies,
  CurrencyFragment,
  CountryFragment,
} from "@ta/cm/src/gql/ops-types";
import Notification from "../notification.svelte";
import { CountryEdge } from "@ta/cm/src/gql/schema-types";
import { newUlid } from "@ta/cm/src/db/ulid-uuid";

let countriesAndCurrencies: ListCountriesAndCurrencies;

const countriesCurrenciesPromise = getCountriesCurrencies().then((d) => {
  countriesAndCurrencies = d;
  return d;
});

/* FORM ATTRIBUTES AND ERROR VARIABLES */
let name = "";
let nameError: string;

let country = "";
let countryError: string;

let currency = "";
let currencyError: string;

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
    notificationText = NOTHING_TO_SAVE_WARNING_MESSAGE;
    notificationTextClass = "is-warning";
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
    notificationText = FORM_CONTAINS_ERRORS_MESSAGE;
    notificationTextClass = "is-danger";
    return;
  }

  const countryData = countriesAndCurrencies.listCountries.edges.find((e) => {
    const edge = e as CountryEdge;
    const node = edge.node as CountryFragment;

    return node.id === country;
  })?.node as CountryFragment;

  const currencyData = countriesAndCurrencies.listCurrencies.find((d) => {
    const data = d as CurrencyFragment;

    return data.id === currency;
  }) as CurrencyFragment;

  if (onSubmit) {
    onSubmit({
      id: newUlid(),
      name,
      country: countryData,
      currency: currencyData,
      phone: phone || null,
    });
  }
}

function clearSimpletextErrorCb() {
  notificationText = "";
  notificationTextClass = "";
}

export type BrandValues = {
  id: string;
  name: string;
  country: CountryFragment;
  currency: CurrencyFragment;
  phone?: string | null;
};

export type Props = {
  isActive: boolean;
  onSubmit?: (values: BrandValues) => void;
};
