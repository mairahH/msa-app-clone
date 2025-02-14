# UWMSA Mobile App

![Node.js CI](https://github.com/uwaterloomsa/uwmsa-mobile-app/actions/workflows/preview.yml/badge.svg)

Here you will find the source code for the UWMSA's mobile app, which can be run on both Android and iOS devices.

## Environment Setup

First, you will need to clone this repo:

```
git clone git@github.com:uwaterloomsa/uwmsa-mobile-app.git
```

Then, you will need to go into this repo's directory:

```
cd uwmsa-mobile-app
```

Install all packages:

```
npm install
```

## Running the Development Server

We are using [Expo](https://expo.dev/) for testing.

Before you can test the app on your device, you will need to create an Expo account.

Then, download the [Expo Go app](https://expo.dev/client) on your phone.

Log in to your Expo account on your terminal (on your computer):

```
npx expo login -u <username> -p <password>
```

Then, log in to your Expo account on the Expo Go app on your phone. Logging into both terminal and phone ensures that your phone will find the development server once you run it.

Using the same terminal you used to log in, start the development server:

```
npx expo start
```

After a moment, on the Expo Go app on your phone, you should see the UWMSA app show up as an option. Use [this image](./readme_assets/images/expo_go_screenshot.jpg) as a reference.

## Testing Locally

### On Phone

To test on your phone, on the Expo Go app, you should be able to select `uwmsa-mobile-app` and it will download all resources needed and then run. Once you are in the app, to exit, shake your phone and a menu should come up. There should be an option to go Home, which you can click to exit the app.

#### Android Notifications

To get Android notifications working:

Install the EAS CLI: `npm install -g eas-cli`

Then login to EAS with an account with access to the expo organization: `eas login`

Run `eas build:configure` and choose Android in the menu

Then place `google-services.json` (available on the tech team drive) in the root directory.:

Then run `npx expo prebuild`

This will generate the android folder. Use the default package name.

Then you can start the development server as normal.

### On Web

There is also an option to run the app in your browser. In your terminal, run:

```
npx expo start --web
```
Or
```
npm run web
```

## Installing Dependencies
When installing dependencies, use `expo install` instead of `npm install`. This is because `expo install` will install the correct version of the package for the Expo SDK version you are using.

If you ever forget to do this, you can run `npx expo-doctor` to analyse the project for any issues. It will recommend fixes to compatibility issues.

## Contributing

JazakAllah Khair for contributing to the UWMSA app.

Made with 💛 by the [UWMSA Team](https://uwmsa.com/pages/meet-the-team).

## Common Problems & Fixes

### Errors running `npx expo start`
#### Error: EMFILE: too many open files, watch at FSEvent.FSWatcher._handle.onchange (node:internal/fs/watchers:204:21)
Occurs on M-Chip MacBooks. Try the solutions on this page, specifically `brew install watchman`, https://github.com/expo/expo/issues/29083.