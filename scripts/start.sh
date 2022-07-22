#!/bin/bash

cd MFE

gnome-terminal --tab -e "bash -c 'cd common && yarn start'" --tab -e "bash -c 'cd container && yarn start'" --tab -e "bash -c 'cd dashboard && yarn start'" --tab -e "bash -c 'cd devices && yarn start'" --tab -e "bash -c 'cd home && yarn start'" --tab -e "bash -c 'cd security && yarn start'" --tab -e "bash -c 'cd templates && yarn start'"
