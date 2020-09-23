#!/bin/sh
if [[ "$CONFIGURATION" == "Release" ]]; then
  echo '[Release] remove DoraemonKit.bundle'
  rm -rf "${TARGET_BUILD_DIR}/${UNLOCALIZED_RESOURCES_FOLDER_PATH}/DoraemonKit.bundle"
fi
