#!/usr/bin/env bash
npm i yarn
if [ DONEVAL == 0 ]
then
    yarn && export DONEVAL=1
fi
git submodule update --init --recursive