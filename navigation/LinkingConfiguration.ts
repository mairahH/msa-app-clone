/**
 * Learn more about deep linking with React Navigation
 * https://reactnavigation.org/docs/deep-linking
 * https://reactnavigation.org/docs/configuring-links
 */

import { LinkingOptions } from '@react-navigation/native';
import * as Linking from 'expo-linking';

import { RootStackParamList } from '../types';

const linking: LinkingOptions<RootStackParamList> = {
  prefixes: [Linking.createURL('/')],
  config: {
    screens: {
      Root: {
        screens: {
          Home: {
            screens: {
              HomeScreen: 'home'
            }
          },
          Events: {
            screens: {
              EventsScreen: 'events'
            }
          },
          Prayer: {
            screens: {
              PrayerScreen: 'prayer'
            }
          },
          Campus: {
            screens: {
              CampusScreen: 'campus'
            }
          }
        },
      },
      Modal: 'modal',
      Feedback: "feedback",
      "Rate Us": "rate us",
      Settings: "settings",
      "About Us": "about us",
      "The Team": "the team",
      "Contact Us": "contact us",
      "Log Out": "log out",
      NotFound: '*',
    },
  },
};

export default linking;
