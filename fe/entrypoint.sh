#!/usr/bin/env bash

set -e

if [ -n "$BACKEND_APP" ]; then
  # if ping -q -c 1 -W 1 google.com >/dev/null; then
  #   echo -e "\nFetching and building node packages."
  #   echo -e "Running: 'yarn install --no-lockfile'\n"
  #   yarn install --no-lockfile
  # fi

  if [ "$CREATE_DATABASE" == "true" ]; then
    echo -e "\n\nCreating database. \n"
    wait-until "yarn start dm.c"
  fi

  echo -e "\n\nMigrating database"
  wait-until "yarn start dm.mu"

  echo -e "\n\n :::::::: Starting Backend :::::\n\n"

  yarn start "$BACKEND_APP".d

elif [ -n "$FRONTEND_APP" ]; then
  echo -e "\n\n :::::::: Starting Frontend :::::\n\n"
  yarn start "$FRONTEND_APP".d
else
  if ping -q -c 1 -W 1 google.com >/dev/null; then
    echo -e "\nFetching and building node packages."
    echo -e "Running: 'yarn install --frozen-lockfile'\n"
    yarn install --frozen-lockfile
  fi

  echo -e "\n\n :::::::: Starting Apps :::::\n\n"
  yarn start d
fi
