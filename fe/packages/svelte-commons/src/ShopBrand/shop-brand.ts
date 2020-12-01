/* eslint-disable @typescript-eslint/no-unused-vars */

import {
  shopBrandNameInputDomId,
  closeShopBrandComponentId,
  resetFormBtnId,
  shopBrandDomId,
  shopBrandCountryInputDomId,
  shopBrandCurrencyInputDomId,
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
import { Query } from "@ta/cm/src/gql-schema-types";

const apolloClient = makeApolloClient();
let countriesList: Query["listCountries"];
let currenciesList: Query["listCurrencies"];

const countriesPromise = apolloClient
  .query({
    query: listCountriesAndCurrenciesQuery,
  })
  .then((result) => {
    if (result && result.data) {
      //
    }
  });

/* FORM ATTRIBUTES */
let name: string;
let country = "";
let currency = "";
let phone = "";

let simpleTextError = "";
let simpleTextErrorClass = "";

export let isActive = false;

/* CALLBACKS */

const closeComponentCb = () => {
  isActive = false;
};

const resetFormCb = () => {
  name = "";
  country = "";
  currency = "";
  phone = "";
};

const submitFormCb = () => {
  const formEmpty = !name && !country && !currency && !phone;

  if (formEmpty) {
    simpleTextError = NOTHING_TO_SAVE_WARNING_MESSAGE;
    simpleTextErrorClass = "is-warning";
  }
};

function clearSimpletextErrorCb() {
  simpleTextError = "";
  simpleTextErrorClass = "";
}
