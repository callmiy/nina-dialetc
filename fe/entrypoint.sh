#!/usr/bin/env bash

set -e

if ping -q -c 1 -W 1 google.com >/dev/null; then
  echo -e "\nFetching and building node packages."
  echo -e "Running:  'yarn --pure-lockfile'\n"
  yarn --pure-lockfile
fi

if [ "$CREATE_DATABASE" == "true" ]; then
  echo -e "\n\nCreating database. \n"
  wait-until "yarn start dm.d dm.c"
fi

echo -e "\n\nMigrating database"
wait-until "yarn start dm.mu"

echo -e "\n\n Starting App:::::"
yarn start d
# /bin/bash
