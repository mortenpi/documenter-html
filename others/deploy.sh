#!/bin/bash

rm -Rf gh-pages.dir/
git clone git@github.com:mortenpi/Documenter.jl.git gh-pages.dir/

cd gh-pages.dir/
git checkout gh-pages

rm -R html/
mkdir html/
cp -R ../build/* html/

git add --all
git commit -m "HTML update."

git push
