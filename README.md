# Accevate React Native App

This is a React Native mobile application for Accevate with Login, OTP verification, and Dashboard functionality. The dashboard background changes dynamically based on API response.

---

## Prerequisites

- Node.js v18+  
- npm or yarn  
- React Native CLI  
- Android Studio (with SDK & Emulator)  
- Java JDK 11+  

---

## Installation & Setup

Clone the repository and install dependencies:

```bash
# Clone repository
git clone https://github.com/krishnax3501-coder/accevate.git
cd accevate

# Install JS dependencies
yarn install

# Install iOS pods (if building for iOS)
cd ios
pod install
cd ..

# Start Metro Bundler
npx react-native start

Running the App

Android:

npx react-native run-android


iOS:

npx react-native run-ios

Build APK

Clean project:

cd android
./gradlew clean
cd ..


Build release APK:

cd android
./gradlew assembleRelease


The generated APK will be located at:

android/app/build/outputs/apk/release/app-release.apk

### APK Link 



