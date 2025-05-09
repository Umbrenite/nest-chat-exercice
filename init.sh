#!/bin/bash
ROOT_DIR=$(pwd)

cd "./backend" || { echo "Répertoire backend introuvable"; exit 1; }
echo "################################################"
echo "########### INSTALL NPM BACKEND ################"
echo "################################################"
npm install

cd "../frontend" || { echo "Répertoire frontend introuvable"; exit 1; }
echo "################################################"
echo "########## INSTALL NPM FRONTEND ################"
echo "################################################"
npm install

cd "$ROOT_DIR"
