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
} from "@ta/cm/src/utils";
import { makeApolloClient } from "@ta/cm/src/apollo/client";
import { listCountriesAndCurrenciesQuery } from "@ta/cm/src/gql/queries";
import { ListCountriesAndCurrencies } from "@ta/cm/src/gql/ops-types";
import FormCtrlError from "../FormCtrlError/FormCtrlError.svelte";

const apolloClient = makeApolloClient();

const countriesCurrenciesPromise = apolloClient
  .query<ListCountriesAndCurrencies>({
    query: listCountriesAndCurrenciesQuery,
  })
  .then((result) => {
    if (result && result.data) {
      return result.data;
    }

    return {} as ListCountriesAndCurrencies;
  });

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
  country = "";
  currency = "";
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

  if (name.length < 3) {
    nameError = "shop brand name is compulsory field";
  }
}

function clearSimpletextErrorCb() {
  simpleTextError = "";
  simpleTextErrorClass = "";
}
