---
layout: post
title:  "NativeScript integration with Travis CI"
disqus: true
---

For the past few weeks we began to investigate the possibility to run our NativeScript unit tests and end-to-end tests on TravisCI.

```yml
install:
  - nvm install node
  - npm install -g npm@4
  - npm install -g nativescript --ignore-scripts
  - tns usage-reporting disable
  - tns error-reporting disable
  - npm install -g appium@1.7.2

matrix:
  include:
    - language: objective-c

      osx_image: xcode9.2

      script:
        - tns test ios --justlaunch


    - language: android

      env:
        - EMULATOR_API=22

      jdk: oraclejdk8

      android:
        components:
          - tools
          - android-$EMULATOR_API
          - platform-tools
          - tools #intended duplicate
          - build-tools-27.0.2
          - sys-img-armeabi-v7a-android-$EMULATOR_API

      before_cache:
        - rm -f $HOME/.gradle/caches/modules-2/modules-2.lock

      cache:
        directories:
          - .nvm
          - $HOME/.gradle/caches/
          - $HOME/.gradle/wrapper/

      before_script:
        - android list targets
        - echo no | android create avd --force -n test -t "android-"$EMULATOR_API -b armeabi-v7a
        - emulator -avd test -no-window &
        - android-wait-for-emulator
        - adb shell input keyevent 82 &

      script:
        - tns test android --justlaunch
```
