#!/bin/bash

rm -Rf gh-pages.dir/
git clone git@github.com:mortenpi/documenter-html.git gh-pages.dir/

cd gh-pages.dir/
git checkout gh-pages

cp -R ../build/* .

git add --all
git commit -m "Update"

git push
