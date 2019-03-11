#!/usr/bin/env bash

set -x
unzip -d dist target/universal/memo-service*.zip
mv dist/*/* dist/
rm dist/bin/*.bat
mv dist/bin/* dist/bin/start