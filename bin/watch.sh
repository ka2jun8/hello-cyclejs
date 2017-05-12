#!/usr/bin/env bash

# Compile
nohup watchfy -d syc/main.ts -p [ tsify ] -o public/main.js &
browserify_pid=$!
trap "kill -15 $browserify_pid $>/dev/null" 2 15

# Run
nohup browser-sync start --config bs-config.js &
browserSync_pid=$!
trap "kill -15 $browserSync_pid $>/dev/null" 2 15

tail -f nohup.out



