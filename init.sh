#!/bin/bash
ROOT_DIR=$(pwd)

cd "./backend" || { echo "Répertoire backend introuvable"; exit 1; }
echo "################################################"
echo "########### INSTALL NPM BACKEND ################"
echo "################################################"
sudo npm install

cd "../frontend" || { echo "Répertoire frontend introuvable"; exit 1; }
echo "################################################"
echo "########## INSTALL NPM FRONTEND ################"
echo "################################################"
sudo npm install

cd "$ROOT_DIR"

echo "################################################"
echo "############ LAUNCH CONTAINERS #################"
echo "################################################"
docker compose up -d

echo "################################################"
echo "############# ADD GROUPS TO DB #################"
echo "################################################"

docker cp ./script.sql postgres-db:/tmp/script.sql
docker exec postgres-db psql -U postgres -d mydb -f /tmp/script.sql