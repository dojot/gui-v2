#!/bin/bash

echo 
echo "WARNING: This script deletes all MFE docker images."
echo 

read -p "Are you sure? (y/n): " REPLY
if [ "$REPLY" = "y" ]; then
  sudo docker image rm common-nx
  sudo docker image rm dashboard-nx
  sudo docker image rm devices-nx
  sudo docker image rm home-nx
  sudo docker image rm security-nx
  sudo docker image rm templates-nx
  sudo docker image rm reports-nx
else
  echo 
  echo "Operation cancelled";
  echo 
fi

