#!/bin/bash

set -e # Exit immediately if a command exits with a non-zero status.
. ./.env
echo -e "==> running: generating database types\n"
npx supabase gen types typescript --project-id "$PROJECT_ID" --schema public > types/database.types.ts
echo -e "Generated database types successfully\n"

# source cd ../.env
# SCRIPT_DIR=$(dirname $(realpath $0))
# for filename in $(find ./sql -name '*.sql')
# do
#   echo "a ${filename}"
# #   yarn ts-node "${filename}"
# done
# cd ../

# while IFS== read -r key value; do
# printf -v "$key" %s "$value" && export "$key"
# done <.env
# echo "Projectid $PROJECT_ID"