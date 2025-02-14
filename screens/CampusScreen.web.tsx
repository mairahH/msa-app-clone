import {View, Text, useColorScheme} from "react-native";
import Colors from "../constants/Colors";

export default function CampusScreen() {
  const colorScheme = useColorScheme();
  const colorPalette = colorScheme === 'light' ? Colors.light : Colors.dark;

  return (
    <View>
      <Text style={{color: colorPalette.text}}>Map doesn't work on web</Text>
    </View>
  );
}