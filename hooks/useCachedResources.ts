import { FontAwesome } from '@expo/vector-icons';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';

export default function useCachedResources() {
  const [isLoadingComplete, setLoadingComplete] = useState(false);

  // Load any resources or data that we need prior to rendering the app
  useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        SplashScreen.preventAutoHideAsync();

        // Load fonts
        await Font.loadAsync({
          ...FontAwesome.font,
          'space-mono': require('../assets/fonts/SpaceMono-Regular.ttf'),
          "Baloo Tamma 2": require("../assets/fonts/BalooTamma2-Medium.ttf"),
          "K2D": require("../assets/fonts/K2D-ExtraBold.ttf"),
          'Montserrat_ExtraBold': require('../assets/fonts/Montserrat-ExtraBold.ttf'),
          'Montserrat_SemiBold': require('../assets/fonts/Montserrat-SemiBold.ttf'),
          'Montserrat_Medium': require('../assets/fonts/Montserrat-Medium.ttf'),
          'Poppins_Medium': require('../assets/fonts/Poppins-Medium.ttf'),
          'Poppins_Regular': require('../assets/fonts/Poppins-Regular.ttf'),
          'Poppins_ExtraBold': require('../assets/fonts/Poppins-ExtraBold.ttf'),
        });
      } catch (e) {
        // We might want to provide this error information to an error reporting service
        console.warn(e);
      } finally {
        setLoadingComplete(true);
        SplashScreen.hideAsync();
      }
    }

    loadResourcesAndDataAsync();
  }, []);

  return isLoadingComplete;
}
