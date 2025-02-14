import React, { useState } from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import { FontAwesome5, Octicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import HomeScreen from '../screens/HomeScreen';
import EventsScreen from '../screens/EventsScreen';
import PrayerScreen from '../screens/PrayerScreen';
import CampusScreen from '../screens/CampusScreen';
import NotFoundScreen from '../screens/NotFoundScreen';
import ModalScreen from '../screens/ModalScreen';
import FeedbackScreen from '../screens/FeedbackScreen';
import RateUsScreen from '../screens/RateUsScreen';
import SettingsScreen from '../screens/SettingsScreen';
import AboutUsScreen from '../screens/AboutUsScreen';
import TheTeamScreen from '../screens/TheTeamScreen';
import ContactUsScreen from '../screens/ContactUsScreen';
import LogOutScreen from '../screens/LogOutScreen';
import { RootStackParamList, RootTabParamList, RootTabScreenProps } from '../types';
import LinkingConfiguration from './LinkingConfiguration';
import JummahScreen from '../screens/JummahScreen';
import SideMenu from '../components/SideMenu';
import { Platform } from 'react-native';
import QiblahScreen from '../screens/QiblahScreen';

export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}
    >
      <RootNavigator />
    </NavigationContainer>
  );
}

const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Root" component={BottomTabNavigator} options={{ headerShown: false }} />
      <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} />
      <Stack.Group screenOptions={{ presentation: 'modal' }}>
        <Stack.Screen name="Modal" component={ModalScreen} />
      </Stack.Group>
      <Stack.Screen name="Feedback" component={FeedbackScreen} />
      <Stack.Screen name="Rate Us" component={RateUsScreen} />
      <Stack.Screen name="Settings" component={SettingsScreen} />
      <Stack.Screen name="About Us" component={AboutUsScreen} />
      <Stack.Screen name="The Team" component={TheTeamScreen} />
      <Stack.Screen name="Contact Us" component={ContactUsScreen} />
      <Stack.Screen name="Log Out" component={LogOutScreen} />
      <PrayerStack.Screen name="Jummah" component={JummahScreen} options={{ headerBackTitle: "Back" }} />
    </Stack.Navigator>
  );
}

const PrayerStack = createNativeStackNavigator();

function PrayerStackScreen() {
  return (
    <PrayerStack.Navigator>
      <PrayerStack.Screen
        name="PrayerMain"
        component={PrayerScreen}
        options={{ headerShown: false }}
      />
      <PrayerStack.Screen
        name="Jummah"
        component={JummahScreen}
        options={{ headerBackTitle: "Back" }}
      />
      <PrayerStack.Screen
        name="Qiblah"
        component={QiblahScreen}
        options={{ 
          headerBackTitle: "Back",
          headerTitle: "Qibla",
        }}
      />
    </PrayerStack.Navigator>
  );
}

/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */
const BottomTab = createBottomTabNavigator<RootTabParamList>();

function BottomTabNavigator() {
  const colorScheme = useColorScheme();
  const colorPalette = colorScheme === 'light' ? Colors.light : Colors.dark;
  const [renderSideMenu, setRenderSideMenu] = useState(false);

  const styles = StyleSheet.create({
    header: {
      backgroundColor: colorPalette.background,
      borderBottomColor: colorPalette.background,
    },
    headerTitle: {
      fontWeight: '500',
      fontSize: 25,
      fontFamily: 'Poppins_Medium',
    },
  });

  return (
    <>
      <BottomTab.Navigator
        initialRouteName="Home"
        screenOptions={{
          tabBarActiveTintColor: Colors[colorScheme].tint,
          tabBarInactiveTintColor: Colors[colorScheme].tabIconDefault,
          tabBarStyle: {
            backgroundColor: colorPalette.background,
            borderTopColor: colorPalette.tint,
          },
        }}>
        <BottomTab.Screen
          name="Home"
          component={HomeScreen}
          options={({ navigation }: RootTabScreenProps<'Home'>) => ({
            title: ' ',
            headerStyle: styles.header,
            headerTitleStyle: styles.headerTitle,
            tabBarIcon: ({ color }) => <TabBarOcticons name="home" color={color} />,

            // ========================================================
            // Change this to the popup menu later instead of the modal

            headerLeft: () => (
              <Pressable
                  onPress={() => setRenderSideMenu(!renderSideMenu)}
                  style={({ pressed }) => ({
                    opacity: pressed ? 0.5 : 1,
                  })}
                >
                <FontAwesome5
                  name="bars"
                  size={25}
                  color={Colors[colorScheme].text}
                  style={{ marginLeft: 15 }}
                />
              </Pressable>
            )
            // ========================================================

          })}
        />
        <BottomTab.Screen
          name="Events"
          component={EventsScreen}
          options={{
            title: '',
            headerStyle: styles.header,
            headerTitleStyle: styles.headerTitle,
            tabBarIcon: ({ color }) => <TabBarIcon name="calendar-alt" color={color} />,
          }}
        />
        <BottomTab.Screen
          name="Prayer"
          component={PrayerStackScreen}
          options={{
            title: '',
            headerStyle: styles.header,
            headerTitleStyle: styles.headerTitle,
            tabBarIcon: ({ color }) => <TabBarIcon name="mosque" color={color} />,
            headerShown: false,
          }}
        />
        <BottomTab.Screen
          name="Campus"
          component={CampusScreen}
          options={{
            title: '',
            headerStyle: styles.header,
            headerTitleStyle: styles.headerTitle,
            tabBarIcon: ({ color }) => <TabBarIcon name="map-marked-alt" color={color} />,
          }}
        />
      </BottomTab.Navigator>
      {renderSideMenu && <SideMenu setRenderSideMenu={setRenderSideMenu} />}
    </>
  );
}

function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome5>['name'];
  color: string;
}) {
  return <FontAwesome5 size={30} style={Platform.OS === 'web' ? {} : { marginBottom: -20 }} {...props} />;
}

function TabBarOcticons(props: {
  name: React.ComponentProps<typeof Octicons>['name'];
  color: string;
}) {
  return <Octicons size={30} style={Platform.OS === 'web' ? {} : { marginBottom: -20 }} {...props} />;
}
