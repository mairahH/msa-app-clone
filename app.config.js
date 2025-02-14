export default {
    name: "UW MSA",
    slug: "uwmsa-mobile-app",
    version: "1.0.4",
    owner: "uwmsa",
    orientation: "portrait",
    icon: "./assets/images/icon.png",
    scheme: "myapp",
    userInterfaceStyle: "automatic",
    splash: {
        image: "./assets/images/splash.png",
        resizeMode: "contain",
        backgroundColor: "#000000"
    },
    updates: {
        fallbackToCacheTimeout: 0,
        url: "https://u.expo.dev/46aba587-e484-49bd-a16d-86f4e56ec817"
    },
    assetBundlePatterns: [
        "**/*",
        "assets/fonts/*"
    ],
    ios: {
        supportsTablet: true,
        infoPlist: {
            CFBundleAllowMixedLocalizations: true,
            ITSAppUsesNonExemptEncryption: false,
            NSAppTransportSecurity: {
                NSExceptionDomains: {
                    'uwmsa.com': {
                        NSIncludesSubdomains: true,
                        NSExceptionAllowsInsecureHTTPLoads: true,
                    },
                },
            },
        },
        bundleIdentifier: "com.uwmsa.app",
        runtimeVersion: {
            policy: "appVersion"
        }
    },
    android: {
        icon: "./assets/images/adaptive-icon.png",
        adaptiveIcon: {
            foregroundImage: "./assets/images/adaptive-icon.png",
            backgroundColor: "#ffffff"
        },
        permissions: [
            "ACCESS_FINE_LOCATION",
            "ACCESS_COARSE_LOCATION"
        ],
        package: "com.uwmsa.app",
        runtimeVersion: "1.0.4",
        googleServicesFile: process.env.GOOGLE_SERVICES_JSON,
        config: {
            googleMaps: {
                apiKey: process.env.GOOGLE_MAPS_API_KEY
            }
        }
    },
    web: {
        favicon: "./assets/images/favicon.png"
    },
    extra: {
        eas: {
            projectId: "46aba587-e484-49bd-a16d-86f4e56ec817"
        }
    },
    plugins: [
        "expo-font",
        "expo-asset",
        ["expo-build-properties", {
            "android": {
                "usesCleartextTraffic": true
            },
        }],
        ["expo-notifications",
        {
            "icon": "./assets/images/notification-icon.png",
            "color": "#FFD569",
        }]
    ]
};