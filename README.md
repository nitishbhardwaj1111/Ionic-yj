# MobileApp

Android Build

    Debug : 
        ionic cordova platform add android
        ionic cordova build android

    Production : 
        1. ionic cordova platform add android
        2. make sure upgrade the app version in config.xml and config.ts
        3. ionic cordova build android --prod --release
        4. usr/bin/jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore <my-release-key.keystore path> <unsigned.apk path> alias_name
        5. <zipalign path>  -v 4 <unsigned.apk path> YummJoy.apk


IOS Build

    Debug : 
        1. ionic cordova platform add ios
        2. ionic cordova build ios
        3. open xcworkspace in xcode 
        4. Clean, Archieve and distribute app to adhock

    Production : 
        1. ionic cordova platform add ios
        2. ionic cordova build ios
        3. open xcworkspace in xcode 
        4. Add razorpay sdk to frameworks also add it to Embeded Frameworks.
        5. make the icon1024.png in platform/ios/appIcon/xcimageassets alfa free
        6. Clean, Archieve and upload app to app store .