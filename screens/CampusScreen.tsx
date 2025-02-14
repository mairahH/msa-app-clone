import React, { useState } from 'react';
import { Alert, StyleSheet, Text, View, Linking, TouchableOpacity, useColorScheme } from 'react-native';
import MapView, { Callout, Marker, PROVIDER_GOOGLE, PROVIDER_DEFAULT } from 'react-native-maps';
import { PRAYER_SPACES } from '../assets/prayer_spaces'; // Import prayer spaces data
import { HALAL_SPOTS } from '../assets/halal_spots'; // Import halal food spots data
import prayerMarker from '../assets/images/prayer-space-marker.png'; // Import custom marker image
import foodMarker from '../assets/images/halal-spot-marker.png'; // Import custom marker image
import Colors from '../constants/Colors';

// Define the initial region for the map, centered around the University of Waterloo area
const UWATERLOO_AREA = {
  latitude: 43.4723,
  longitude: -80.5449,
  latitudeDelta: 0.0150,
  longitudeDelta: 0.0015,
};

export default function CampusScreen() {
  const [selectedMarker, setSelectedMarker] = useState(null); // State to track the currently selected marker
  const [showPrayerMap, setShowPrayerMap] = useState(true); // State to track which map to show

  const colorScheme = useColorScheme();
  const colorPalette = colorScheme === 'light' ? Colors.light : Colors.dark;

  // Function to open a location in Google Maps
  const openInGoogleMaps = (latitude, longitude) => {
    const url = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
    Linking.openURL(url).catch(err => console.error("Failed to open Google Maps", err));
  };

  // Function to handle marker press events
  const handleMarkerPress = (marker) => {
    setSelectedMarker(marker); // Update the state with the selected marker
  };

  // Function to handle button press for "Get Directions"
  const handleButtonPress = () => {
    if (selectedMarker) {
      openInGoogleMaps(selectedMarker.latitude, selectedMarker.longitude); // Open the selected marker location in Google Maps
    } else {
      Alert.alert('No location selected', 'Please select a location to open in Google Maps.'); // Show alert if no marker is selected
    }
  };

  // Define the styles for the components
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colorPalette.background,
      alignItems: 'center',
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      width: '100%',
      paddingVertical: 10,
    },
    headerText: {
      fontSize: 23,
      color: colorPalette.text,
      fontFamily: 'K2D',
      textDecorationLine: 'none',
      fontWeight: 'bold',
    },
    selectedText: {
      color: colorPalette.tint,
    },
    mapContainer: {
      width: '95%',
      height: '80%',
      marginTop:10,
    },
    map: {
      flex: 1,
    },
    callouts: {
      padding: 10,
      width: 250,
      backgroundColor: colorPalette.accent,
    },
    markerInfo: {
      fontFamily: 'K2D',
      color: colorPalette.text,
      fontSize: 15,
    },
    markerTitle: {
      fontFamily: 'K2D',
      fontSize: 18,
      color: colorPalette.text,
    },
    markerInfoyellow: {
      fontFamily: 'K2D',
      color: colorScheme === 'light' ? colorPalette.text : colorPalette.tint,
      fontSize: 15,
    },
    button: {
      backgroundColor: colorPalette.tint,
      padding: 10,
      borderRadius: 10,
      alignItems: 'center',
      marginTop: 20,
      marginBottom: 20,
      paddingHorizontal: 40,
    },
    buttonText: {
      color: 'black',
      fontSize: 15,
      fontFamily: 'K2D',
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => setShowPrayerMap(true)}>
          <Text style={[styles.headerText, showPrayerMap && styles.selectedText]}>Prayer Spots</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setShowPrayerMap(false)}>
          <Text style={[styles.headerText, !showPrayerMap && styles.selectedText]}>Halal Food Spots</Text>
        </TouchableOpacity>
      </View>

      {showPrayerMap ? (
        <View style={styles.mapContainer}>
          {/* Prayer MapView component to display the map */}
          <MapView
            style={styles.map}
            provider={PROVIDER_DEFAULT}
            initialRegion={UWATERLOO_AREA}
            showsUserLocation={true} // Show user's current location
            showsMyLocationButton={true} // Show button to center map on user's current location
          >
            {/* Loop through the prayer spaces and create a marker for each one */}
            {PRAYER_SPACES.map((marker, index) => (
              <Marker
                key={index} // Unique key for each marker
                coordinate={{ latitude: marker.latitude, longitude: marker.longitude }} // Position of the marker
                onPress={() => handleMarkerPress(marker)} // Event handler for when marker is pressed
                image={prayerMarker} // Custom marker image
              >
                {/* Callout component to display marker information */}
                <Callout style={styles.callouts}>
                  <View>
                    <Text style={styles.markerTitle}>{marker.name}</Text>
                    <Text></Text>
                    {/* Show room if the field exists */}
                    {marker.room && (
                      <Text>
                        <Text style={styles.markerInfoyellow}>Prayer Room(s): </Text>
                        <Text style={styles.markerInfo}>{marker.room}</Text>
                      </Text>
                    )}
                    {/* Show access code if the field exists */}
                    {marker.accessCode && (
                      <Text>
                        <Text style={styles.markerInfoyellow}>Access Code: </Text>
                        <Text style={styles.markerInfo}>{marker.accessCode}</Text>
                      </Text>
                    )}
                  </View>
                </Callout>
              </Marker>
            ))}
          </MapView>
        </View>
      ) : (
        <View style={styles.mapContainer}>
          {/* Halal Food MapView component to display the map */}
          <MapView
            style={styles.map}
            provider={PROVIDER_DEFAULT}
            initialRegion={UWATERLOO_AREA}
            showsUserLocation={true} // Show user's current location
            showsMyLocationButton={true} // Show button to center map on user's current location
          >
            {/* Loop through the halal food spots and create a marker for each one */}
            {HALAL_SPOTS.map((marker, index) => (
              <Marker
                key={index} // Unique key for each marker
                coordinate={{ latitude: marker.latitude, longitude: marker.longitude }} // Position of the marker
                onPress={() => handleMarkerPress(marker)} // Event handler for when marker is pressed
                image={foodMarker}
              >
                {/* Callout component to display marker information */}
                <Callout style={styles.callouts}>
                  <View>
                    <Text style={styles.markerTitle}>{marker.name}</Text>
                    <Text></Text>
                    {marker.halalLevel && (<Text>
                      <Text style={styles.markerInfoyellow}>Halal Level: </Text>
                      <Text style={styles.markerInfo}>{marker.halalLevel}</Text>
                    </Text>)}
                    {marker.slaughterType && (<Text>
                      <Text style={styles.markerInfoyellow}>Slaughter Method: </Text>
                      <Text style={styles.markerInfo}>{marker.slaughterType}</Text>
                    </Text>)}
                    <Text>
                      <Text style={styles.markerInfoyellow}>Location: </Text>
                      <Text style={styles.markerInfo}>{marker.location}</Text>
                    </Text>
                  </View>
                </Callout>
              </Marker>
            ))}
          </MapView>
        </View>
      )}
      <TouchableOpacity style={styles.button} onPress={handleButtonPress}>
        <Text style={styles.buttonText}>Get Directions</Text>
      </TouchableOpacity>
    </View>
  );
}

