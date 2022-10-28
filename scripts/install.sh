#!/bin/bash

cd MFE

cd common
yarn install
cd ..

cd container
yarn install
cd ..

cd dashboard
yarn install
cd ..

cd devices
yarn install
cd ..

cd home
yarn install
cd ..

cd security
yarn install
cd ..

cd templates
yarn install
cd ..

cd reports
yarn install
cd ..