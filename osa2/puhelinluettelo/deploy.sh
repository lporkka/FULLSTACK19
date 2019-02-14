#!/bin/sh
npm run build
path=../../../puhelinluettelo
rm -rf ${path}/build
cp -r build ${path}
