#!/bin/sh
echo "window._env_ = {" > ./env.js
awk -F '=' '{ print $1 ": \"" (ENVIRON[$1] ? ENVIRON[$1] : $2) "\"," }' ./.env >> ./env.js
echo "}" >> ./env.js