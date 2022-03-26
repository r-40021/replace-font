#!/bin/bash
dpkg -s zip >/dev/null 2>&1
if [ ! $? -eq 0 ]; then
  echo "zip をインストールしてください"
  echo;
  echo "sudo apt install zip"
else
  zip ../replace-font-firefox.zip -r * -x .git README.md LICENSE *.sh *.swp
fi
