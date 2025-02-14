import React, { useEffect, useState } from "react";
import { Button, StyleSheet, TouchableOpacity, Image, Dimensions, useColorScheme } from 'react-native';
import Colors from '../constants/Colors';


import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';
import { getNextPrayerNameAndTime } from "../util/PrayerUtils";
import CustomScrollbar from '../components/CustomScrollBar';
import databaseService from "../database/databaseService";
import { Announcement, IqamahInformation } from "../database/types";
import { duasAndDhikr } from '../assets/duasAndDhikr'; // Import Duas & Dhikr data
import Icon from 'react-native-vector-icons/Ionicons';

const screenWidth = Dimensions.get('window').width;

interface IqamahTime {
  time: string;
  location: string;
}

export default function HomeScreen({ navigation }: RootTabScreenProps<'HomeScreen'>) {
  const dayjs = require('dayjs');
  const relativeTime = require('dayjs/plugin/relativeTime');
  const utc = require('dayjs/plugin/utc');
  dayjs.extend(relativeTime);
  dayjs.extend(utc);

  const colorScheme = useColorScheme();
  const colorPalette = colorScheme === 'light' ? Colors.light : Colors.dark;

  const salam = colorScheme === 'light' ? require('../assets/images/newSalam.png') : require('../assets/images/newSalam.png');

  const [isLoading, setIsLoading] = useState(true);
  const [renderSideMenu, setRenderSideMenu] = useState(false);
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  
  const [prayerName, setPrayerName] = useState<string>('Fajr');
  const [prayerTime, setPrayerTime] = useState<string>('5:30');
  const [iqamahTimes, setIqamahTimes] = useState<Record<string, IqamahTime>>({
    'Fajr': { time: "", location: "SLC 3252" },
    'Dhuhr': { time: "", location: "SLC 3252" },
    'Asr': { time: "", location: "SLC 3252" },
    'Maghrib': { time: "", location: "SLC 3252" },
    'Isha': { time: "", location: "SLC 3252" },
  });

  const [isUpcomingPrayer, setIsUpcomingPrayer] = useState(false);
  
  const [activeTab, setActiveTab] = useState('Announcements');
  const [duasDhikr, setDuasDhikr] = useState(() => shuffleDuas(duasAndDhikr));
  const [expandedDuaIndex, setExpandedDuaIndex] = useState(null);

  useEffect(() => {
    // Function to update prayer name at intervals
    const updatePrayerName = () => {
      const { name, time, isUpcomingPrayer } = getNextPrayerNameAndTime();
      setPrayerName(name);
      setPrayerTime(time);
      setIsUpcomingPrayer(isUpcomingPrayer);
    };

    // Call the function immediately to set initial prayer name
    updatePrayerName();

    // Schedule the function to run every 60 seconds
    const intervalId = setInterval(updatePrayerName, 60 * 1000);

    // Clean up function to clear the interval when component unmounts
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    databaseService.getInstance().getAllAnnouncements()
      .then(response => {
        setAnnouncements(response);
        setIsLoading(false);
      })
      .catch(error => {
        console.error('An error occurred while fetching the announcements:', error);
        setIsLoading(false);
      });
    
    databaseService.getInstance().getIqamahTimesToday()
      .then(response => {
        const data = response[0];
          setIqamahTimes({
            Fajr: { time: data.fajrTime.toLowerCase(), location: data.fajrLocation },
            Dhuhr: { time: data.dhuhrTime.toLowerCase(), location: data.dhuhrLocation },
            Asr: { time: data.asrTime.toLowerCase(), location: data.asrLocation },
            Maghrib: { time: data.maghribTime.toLowerCase(), location: data.maghribLocation },
            Isha: { time: data.ishaTime.toLowerCase(), location: data.ishaLocation },
          });
      })
      .catch(error => {
        console.log('An error has occurred while fetching the iqamah times:', error);
        setIsLoading(false);
      });
  }, []);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      width: "100%",
    },
    salamImageContainer: {
      paddingTop: 45,
    },
    salamImage: {
      width: 216,
      height: 83,
      marginTop: 0,
    },
    salamtext: {
      fontSize: 24,
      fontFamily: 'Poppins_Medium',
      color: colorPalette.tint,
      paddingTop: 2,
      paddingBottom: 20
    },
    title: {
      fontSize: 20,
      fontFamily: 'Poppins_Regular',
      alignSelf: 'center',
      paddingTop: 60,
      paddingRight: 240,
    },
    titleBold: {
      fontSize: 20,
      fontFamily: 'Poppins_ExtraBold',
      alignSelf: 'flex-start',
      paddingLeft: 10,
      paddingTop: 10,
      flex: 1,
      flexWrap: 'wrap',
    },
    announcementText: {
      fontFamily: 'Montserrat_Medium',
      padding: 10
    },
    announcementDate: {
      color: colorPalette.accentText,
      fontSize: 10,
      fontFamily: 'Montserrat_Medium',
      paddingHorizontal: 12,
      paddingVertical: 8,
    },
    content: {
      justifyContent: 'flex-end',
      width: '100%',
      flexDirection: 'row',
    },
    wholetab: {
      flexDirection: "row",
    },
    circleview: {
      width: '20%',
      alignSelf: 'flex-start',
      flexDirection: 'column',
    },

    tabs: {
      backgroundColor: colorPalette.accent,
      width: screenWidth * 0.80,
      borderRadius: 10,
      marginTop: 10,
      marginBottom: 15,
      marginRight: 35
    },
    DuaDhikrTab: {
      backgroundColor: colorPalette.accent,
      width: screenWidth * 0.80,
      borderRadius: 10,
      marginTop: 10,
      marginBottom: 30,
      marginRight: 35,
      alignItems: 'center',
    },
    separator: {
      marginVertical: 5,
      height: 1,
      width: 180,
      marginRight: 'auto',
      backgroundColor: colorPalette.tint,
    },
    tabsContainer: {
      paddingLeft: 0,
    },
    tabHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      backgroundColor: 'transparent',
      width: "100%"
    },
    line: {
      borderLeftWidth: 1,
      borderLeftColor: colorPalette.tint,
      marginTop: 30,
      height: '95%',
    },
    circle: {
      width: 11,
      height: 11,
      borderRadius: 5,
      backgroundColor: colorPalette.tint,
      marginTop: 30,
      marginRight: 5,
      left: -6,
    },
    prayerswindow: {
      width: 346,
      height: 155
    },
    prayerbg: {
      width: 346,
      height: isUpcomingPrayer ? 170 : 150,
      backgroundColor: colorScheme === 'light' ? colorPalette.accent : colorPalette.tint,
      borderRadius: 15,
    },
    upcomingPrayer: {
      fontSize: 14,
      fontFamily: 'Montserrat_SemiBold',
      alignSelf: 'flex-start',
      justifyContent: 'flex-start',
      paddingTop: 4,
      paddingBottom: 0,
      color: 'black',
    },
    prayername: {
      fontSize: 40,
      fontFamily: 'Montserrat_ExtraBold',
      flexDirection: 'row',
      alignItems: 'baseline',
      justifyContent: 'flex-start',
      color: 'black',
    },
    prayertimewhole: {
      alignSelf: 'flex-start',
      paddingLeft: 12,
    },
    prayerTimeBlock: {
      flexDirection: 'row',
      alignItems: 'baseline',
      justifyContent: 'flex-start',
      backgroundColor: 'transparent'
    },
    prayertime: {
      fontSize: prayerName === "Maghrib" ? 30 : 33,
      fontFamily: 'Montserrat_ExtraBold',
      color: 'black'
    },
    prayertimeindication: {
      fontSize: 20,
      fontFamily: 'Montserrat_ExtraBold',
      color: 'black'
    },
    prayerlocation: {
      fontSize: 16,
      fontFamily: 'Montserrat_SemiBold',
      textAlign: 'right',
      color: '#000000'
    },
    prayerDetails: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      paddingHorizontal: 24,
      paddingVertical: 12,
      backgroundColor: 'transparent',
    },
    Jummahtime: {
      fontSize: 20,
      color: 'black',
      fontFamily: 'Montserrat_ExtraBold',
      backgroundColor: 'transparent'
    },
    commonColor: {
      backgroundColor: colorScheme === 'light' ? colorPalette.accent : colorPalette.tint,
    },
    iqamahTime: {
      fontSize: 17,
      fontFamily: 'Montserrat_SemiBold',
      alignSelf: 'flex-start',
      justifyContent: 'flex-start',
      paddingTop: 8,
      paddingBottom: 6,
      color: 'black',
    },

    tabsHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginVertical: 14,
    },
    tabButton: {
      paddingTop: 35,
      paddingBottom: 5,
      paddingHorizontal: 30,
      borderBottomWidth: 1,
      borderColor: 'transparent',
    },
    tabText: {
      fontSize: 18,
      fontFamily: 'Poppins_Regular',
      color: 'grey',
    },
    activeTab: {
      borderColor: colorPalette.tint,
    },
    activeTabText: {
      fontSize: 18,
      fontFamily: 'Poppins_Regular',
      color: colorPalette.tint,
    },

    expandedContent: {
      padding: 10,
      backgroundColor: colorPalette.accent,
      borderBottomWidth: 1,
      alignItems: 'center',
    },


    duaTitle: {
      fontSize: 18,
      fontFamily: 'Montserrat_SemiBold',
      alignSelf: 'flex-start',
      paddingLeft: 10,
      paddingTop: 10
    },
    duaReference: {
      color: colorPalette.accentText,
      fontSize: 14,
      fontFamily: 'Montserrat_Medium',
      alignSelf: 'flex-start',
      paddingLeft: 10,
      paddingTop: 10
    },
    duaarabic: {
      fontSize: 16,
      fontFamily: 'Montserrat_Medium',
      alignSelf: 'flex-end',
      paddingTop: 15,
      paddingRight: 10,
      paddingLeft: 5,
    },
    duatranslation: {
      fontFamily: 'Montserrat_Medium',
      padding: 10,
      alignSelf: 'flex-start',
    },

    duaTransliteration: {
      color: colorPalette.accentText,
      fontSize: 14,
      fontFamily: 'Montserrat_Medium',
      alignSelf: 'flex-start',
      paddingLeft: 10,
      paddingVertical: 10
    },

    duaContext: {
      color: colorPalette.accentText,
      fontSize: 14,
      fontFamily: 'Montserrat_Medium',
      alignSelf: 'flex-start',
      paddingLeft: 0,
      paddingTop: 0,
      paddingBottom: 20
    },
    duaContextHeading: {
      color: colorPalette.accentText,
      fontSize: 15,
      fontFamily: 'Montserrat_SemiBold',
      alignSelf: 'flex-start',
      paddingLeft: 0,
      paddingTop: 10,
      paddingBottom: 10
    },
  

  });

  if (isLoading) {
    //Todo: Make a loading screen - This currently just keeps the screen black until the data is loaded
    return null;
  }

  const upcomingPrayerTime = (prayerName === "Jumu'ah") ?
  (
    <>
      <Text style={styles.prayername}>{prayerName}</Text>
      <View style={[styles.commonColor, styles.prayerTimeBlock]}>
        <Text style={styles.Jummahtime}>{prayerTime}</Text>
      </View>
    </>
  ) : (
    <>
      <View style={[styles.commonColor, styles.prayerTimeBlock]}>
        <Text style={styles.prayertime}>{prayerName}: {prayerTime.split(' ')[0]}</Text>
        <Text style={styles.prayertimeindication}> {prayerTime.split(' ')[1].toUpperCase()}</Text>
      </View>
      <Text style={styles.iqamahTime}>
        Iqamah: {iqamahTimes[prayerName].time} ({iqamahTimes[prayerName].location})
      </Text>
    </>
  );

  // Function to render the content based on active tab
  const renderTabContent = () => {
    if (activeTab === 'Announcements') {
      return announcements.map((announcement, index) => (
        <View key={index} style={styles.wholetab}>
          <View style={styles.circle} />
          <View style={styles.tabs}>
            <View style={styles.tabHeader}>
              <Text style={styles.titleBold}>{announcement.title}</Text>
              <Text style={styles.announcementDate}>
                {announcement.sentAt ? dayjs.utc(announcement.sentAt).local().fromNow() : 'New'}
              </Text>
            </View>
            <Text style={styles.announcementText}>{announcement.text}</Text>
          </View>
        </View>
      ));
    } else if (activeTab === 'Duas & Dhikr') {
      return duasDhikr.map((dua: any, index: number) => (
      <View key={index} style={styles.wholetab}>
        <View style={styles.circle} />
        <TouchableOpacity onPress={() => toggleExpandDua(index)}>
          <View style={styles.DuaDhikrTab}>
            <Text style={styles.duaTitle}>{dua.title}</Text>
            <Text style={styles.duaReference}>{dua.reference}</Text>
            <Text style={styles.duaarabic}>{dua.arabic}</Text>
            <Text style={styles.duaTransliteration}>{dua.transliteration}</Text>
            <Text style={styles.duatranslation}>{dua.translation}</Text>
            {/* Dropdown Arrow */}
            {expandedDuaIndex != index && (
              <Text style={styles.announcementDate}>
                Tap for more
              </Text>
            )}

            {expandedDuaIndex === index && (
              <View style={styles.expandedContent}>
                <Text style={styles.duaContextHeading}>Spiritual Insights: </Text>
                <Text style={styles.duaContext}>{dua.context}</Text>
                <Icon
                  name={expandedDuaIndex === index ? 'chevron-up-outline' : 'chevron-down-outline'}
                  size={20}
                  color={colorPalette.tint}
                />
              </View>
            )}

          </View>
        </TouchableOpacity>     
      </View>
      ));
    }
  };

  const toggleExpandDua = (index: any) => {
    if (expandedDuaIndex === index) {
      setExpandedDuaIndex(null); // Collapse if already expanded
    } else {
      setExpandedDuaIndex(index); // Expand selected dua
    }
  };

  return (
      <View style={styles.container}>
        <CustomScrollbar>

          <View style={styles.salamImageContainer}>
            <Image source={salam} style={styles.salamImage}/>
          </View>
          <Text style={styles.salamtext}>Assalamu Alaikum</Text>

          <View style={styles.prayerswindow}>
            <TouchableOpacity
              style={styles.prayerbg}
              activeOpacity={0.5}
              onPress={() => {
                if (prayerName == "Jumu'ah") {
                  navigation.navigate('Jummah');
                } else {
                  navigation.navigate('Prayer');
                }
              }}>
              <View style={styles.prayerDetails}>
                <View style={{backgroundColor: 'transparent'}}>
                  {isUpcomingPrayer && (
                    <Text style={styles.upcomingPrayer}>Upcoming Prayer:</Text>
                  )}
                  {upcomingPrayerTime}
                </View>
                <Text style={styles.prayerlocation}>Waterloo</Text>
              </View>
            </TouchableOpacity>
          </View>



          {/* Tabs Navigation */}
          <View style={styles.tabsHeader}>
            <TouchableOpacity
              style={[styles.tabButton, activeTab === 'Announcements' && styles.activeTab]}
              onPress={() => setActiveTab('Announcements')}
            >
              <Text style={activeTab === 'Announcements' ? styles.activeTabText : styles.tabText}>
                Announcements
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.tabButton, activeTab === 'Duas & Dhikr' && styles.activeTab]}
              onPress={() => setActiveTab('Duas & Dhikr')}
            >
              <Text style={activeTab === 'Duas & Dhikr' ? styles.activeTabText : styles.tabText}>
                Duas & Dhikr
              </Text>
            </TouchableOpacity>

          </View>

          {/* Separator */}
          <View style={styles.content}>
            <View style={styles.line} />
            <View style={styles.tabsContainer}>
              {renderTabContent()}
            </View>
          </View>

          <View style={{height: 50}}/>
        </CustomScrollbar>
      </View>
  );
}


// function that shuffles the order of the duas
function shuffleDuas(array: any) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}