#!/bin/bash

# run production build
ng build --configuration production

# go to the dist/shop-manager folder
cd ./dist/shop-manager

# make a new directory named 'css'
mkdir css

# run PurgeCSS & make a new '.css' file inside the 'css' directory
purgecss --css ./*.css --content ./index.html ./*.js --output ./css


# replace the 'dist/yourProjectName/styles.css' file with the 'dist/yourProjectName/css/styles.css' file
mv ./css/*.css ./

# delete the previously created 'css' directory
rm -r -f ./css/