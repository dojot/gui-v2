#!/bin/bash

cd MFE

cd container
sudo docker build -t container-nx:latest -f Dockerfile .
cd ..

cd common
sudo docker build -t common-nx:latest -f Dockerfile .
cd ..

cd dashboard
sudo docker build -t dashboard-nx:latest -f Dockerfile .
cd ..

cd devices
sudo docker build -t devices-nx:latest -f Dockerfile .
cd ..

cd home
sudo docker build -t home-nx:latest -f Dockerfile .
cd ..

cd security
sudo docker build -t security-nx:latest -f Dockerfile .
cd ..

cd templates
sudo docker build -t templates-nx:latest -f Dockerfile .
cd ..