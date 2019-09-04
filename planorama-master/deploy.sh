#!/usr/bin/env bash
npm run build
cp server/server.js build/
cp server/queries.js build/
cp package.json build/
echo "web: node server" > build/Procfile 
cd build/
git init && git add . && git commit -m "Automated Heroku Commit."
heroku git:remote -a ancient-retreat-22471
git push --force heroku master
