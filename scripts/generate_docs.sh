#!/usr/bin/env bash

STREAM_API_TITLE="StreamAPI Reference"
STREAM_API_NAME="stream-api-reference.md"

# generate docs for stream-api
jrgen -o ./docs/ docs/md ./src/api/stream/schema.json

# rename output file
mv ./docs/StreamAPI\ Reference.md ./docs/stream-api-reference.md

# generate other docs
typedoc --theme markdown --out ./docs/tsdoc --name ParadigmCore

cp ./docs/tsdoc/README.md ./docs/README.md

# done
exit 0