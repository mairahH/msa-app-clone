import React, { useEffect, useState, useRef } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Modal, Image, ImageSourcePropType, useColorScheme } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { Event } from '../database/types';
import databaseService from "../database/databaseService";
import { scheduleNotificationAsync } from "expo-notifications";
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import Colors from "../constants/Colors";
import { Appearance } from 'react-native';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';

export default function EventsScreen() {
  const [selectedDate, setSelectedDate] = useState<string | null>(new Date().toISOString().split('T')[0]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<any>(null);
  const [events, setEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const scrollViewRef = useRef<ScrollView>(null);
  const [scrollX, setScrollX] = useState(0);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [posterWidth, setPosterWidth] = useState(0);
  const [activeTab, setActiveTab] = useState('Today');
  const [filteredUpcomingEvents, setFilteredUpcomingEvents] = useState<Event[]>([]);

  dayjs.extend(utc);
  dayjs.extend(timezone);
  dayjs.extend(advancedFormat);
  dayjs.extend(isSameOrAfter);
  dayjs.extend(isSameOrBefore);

  const colorScheme = Appearance.getColorScheme();
  const colorPalette = colorScheme === 'light' ? Colors.light : Colors.dark;

  useEffect(() => {
    databaseService.getInstance().getAllEvents()
      .then(response => {
        const eventsWithDateObjects = response.map(event => {
          let prettyTime = event.time;
          if (/^([01]\d|2[0-3]):([0-5]\d)$/.test(event.time)) {
            prettyTime = dayjs(`${dayjs().format('YYYY-MM-DD')} ${prettyTime}`, 'YYYY-MM-DD HH:mm').format('h:mm A');
          }
          return {
            ...event,
            eventDate: new Date(event.eventDate),
            prettyTime: prettyTime,
          };
        });
  
        setEvents(eventsWithDateObjects);
        setIsLoading(false);
      })
      .catch(error => {
        console.error('An error occurred while fetching the events:', error);
        setIsLoading(false);
      });
  }, []);
  
  useEffect(() => {
    if (!selectedDate || events.length === 0) return;
  
    const startDate = dayjs().startOf('day'); // if we want to show upcoming events from selected date -> const startDate = dayjs(selectedDate, 'YYYY-MM-DD').startOf('day'); 
    const endDate = startDate.add(14, 'days').endOf('day'); 
  
    const filtered = events
      .filter((event) => {
        const eventDate = dayjs(event.eventDate);
        return eventDate.isSameOrAfter(startDate) && eventDate.isSameOrBefore(endDate);
      })
      .sort((a, b) => dayjs(a.eventDate).diff(dayjs(b.eventDate))); // Sort by date in ascending order
  
    // Update state only if the filtered list has changed
    setFilteredUpcomingEvents(filtered);
  }, [selectedDate, events]);

  
  const renderUpcomingEvents = () => {
    if (filteredUpcomingEvents.length === 0) {
      return <Text style={styles.noEvents2}>No upcoming events. Stay tuned!</Text>;
    }
  
    return filteredUpcomingEvents.map((event, index) => (
      <TouchableOpacity
        key={event.eventId || `${event.eventDate.toISOString()}-${index}`}
        style={styles.posterCard}
        onPress={() => openModal(event)}
      >
        {event.imageUrls && (
          <Image source={{ uri: event.imageUrls[0] }} style={styles.posterImage} />
        )}
        <Text style={styles.posterTitle}>{event.name}</Text>
        <Text style={styles.posterDate}>{dayjs(event.eventDate).utc().format('MMM D')}</Text>
      </TouchableOpacity>
    ));
  };
  
  
  
  
  const eventsByDate = events.reduce((acc, event) => {
    const eventDateString = event.eventDate.toISOString().split('T')[0];
    acc[eventDateString] = acc[eventDateString] || [];
    acc[eventDateString].push(event);
    return acc;
  }, {});

  const openModal = (event) => {
    setSelectedEvent(event);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedEvent(null);
  };

  const setReminder = (event) => {
    const [hours, minutes] = event.time.split(':').map(Number);

    const trigger = dayjs.tz(event.eventDate.toISOString().slice(0,10), "America/Toronto").hour(hours).minute(minutes).subtract(1, 'hour').toDate();

    scheduleNotificationAsync({
      content: {
        title: `Event: ${event.name}`,
        body: `Don't forget the event ${event.name} is happening today ${/^([01]\d|2[0-3]):([0-5]\d)$/.test(event.time) ? 'at ' : ''} ${event.prettyTime} at ${event.location}. We can't wait to see you there!`,
      },
      trigger,
    });
  };

  const scrollToImage = (index) => {
    if (scrollViewRef.current) {
      const x = index * (posterWidth-20);
      scrollViewRef.current.scrollTo({ x, animated: true });
      setCurrentImageIndex(index);
    }
  };

  const scrollLeft = () => {
    if (currentImageIndex > 0) {
      scrollToImage(currentImageIndex - 1);
    }
  };

  const scrollRight = () => {
    if (selectedEvent && currentImageIndex < selectedEvent.imageUrls.length - 1) {
      scrollToImage(currentImageIndex + 1);
    }
  };
  

  const renderTabContent = () => {
    if (activeTab === 'Today') {
      return (
        <ScrollView style={styles.scrollView} contentContainerStyle={styles.eventList}>
          {eventsByDate[selectedDate] ? (
            eventsByDate[selectedDate].map((event, index) => (
              <TouchableOpacity
                key={event.id || `${event.eventDate.toISOString()}-${index}`}
                style={styles.eventItem}
                onPress={() => openModal(event)}
              >
                {event.imageUrls?.length > 0 && (
                  <Image source={{ uri: event.imageUrls[0] }} style={styles.eventImage} />
                )}
                <View style={styles.eventTextContainer}>
                  <Text style={styles.eventName}>{event.name}</Text>
                  <Text style={styles.eventLocation}>{event.location}</Text>
                  <Text style={styles.eventTime}>{event.time}</Text>
                </View>
              </TouchableOpacity>
            ))
          ) : (
            <Text style={styles.noEvents}>No events for today.</Text>
          )}
        </ScrollView>
      );
    } else if (activeTab === 'Upcoming') {
      return (
        <View style={styles.upcomingContainer}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {renderUpcomingEvents()}
          </ScrollView>
        </View>
      );
    }
  };
  

  if (isLoading) {
    return null;
  }

  

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colorPalette.background,
    },
    calendarContainer: {
      paddingTop: 5,
      paddingBottom: 25,
      paddingHorizontal: 10,
      backgroundColor: colorPalette.accent,
    },
    scrollView: {
      backgroundColor: colorPalette.background,
    },
    eventList: {
      alignItems: 'center',
      paddingBottom: 20,
    },
    eventItem: {
      backgroundColor: colorPalette.accent,
      padding: 10,
      marginVertical: 5,
      borderRadius: 5,
      flexDirection: 'row',
      alignItems: 'center',
      width: '80%',
    },
    eventImage: {
      width: 100,
      height: 100,
      marginRight: 10,
    },
    eventTextContainer: {
      flex: 1,
    },
    eventName: {
      fontSize: 16,
      fontWeight: 'bold',
      color: colorPalette.text,
      marginBottom: 5,
    },
    eventLocation: {
      fontSize: 14,
      color: colorPalette.text,
    },
    eventTime: {
      fontSize: 14,
      color: colorPalette.text,
    },
    noEvents: {
      textAlign: 'center',
      color: colorPalette.text,
      marginTop: 20,
    },
    modalContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: colorPalette.background,
    },
    modalContent: {
      width: '90%',
      backgroundColor: colorPalette.accent,
      padding: 20,
      borderRadius: 10,
      alignItems: 'flex-start',
    },
    closeButton: {
      position: 'absolute',
      top: 10,
      right: 10,
      padding: 5,
      borderRadius: 5,
    },
    closeButtonText: {
      color: colorPalette.text,
      fontSize: 20,
      fontWeight: 'bold',
    },
    modalEventName: {
      fontSize: 22,
      fontWeight: 'bold',
      color: colorScheme === 'light' ? colorPalette.text : colorPalette.tint,
      marginBottom: 10,
    },
    modalLabel: {
      color: colorScheme === 'light' ? colorPalette.text : colorPalette.tint,
      fontWeight: colorScheme === 'light' ? 'bold' : 'normal',
      fontSize: 16,
      marginBottom: 5,
    },
    modalImage: {
      flex: 1,
      aspectRatio: 1,
      width: posterWidth-20,
      height: posterWidth-20,
    },
    arrowContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    arrowButtonRight: {
      paddingLeft: 4,
    },
    arrowButtonLeft: {
      paddingRight: 4,
    },
    arrowText: {
      color: 'white',
      fontSize: 15,
    },
    imageSlider: {
      width: posterWidth,
      height: posterWidth,
    },
    modalInfo: {
      color: colorPalette.text,
      fontWeight: 'normal',
      fontSize: 16,
    },
    setReminderButton: {
      backgroundColor: colorPalette.tint,
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 25,
      alignSelf: 'center',
      marginTop: 20,
    },
    setReminderButtonText: {
      color: 'black',
      fontSize: 16,
    },
    indicatorContainer: {
      flexDirection: 'row',
      marginBottom: 10,
      alignSelf: 'center',
    },
    indicator: {
      width: 6,
      height: 6,
      borderRadius: 3,
      marginHorizontal: 3,
    },
    indicatorActive: {
      backgroundColor: '#FFD569',
    },
    indicatorInactive: {
      backgroundColor: '#888',
    },
    tabsHeader: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      paddingTop: 15,
      backgroundColor: 'transparent',
    },
    tabButton: {
      paddingVertical: 5,
      borderBottomWidth: 2,
      borderColor: 'transparent',
    },
    activeTab: {
      borderColor: colorPalette.tint,
    },
    tabText: {
      fontSize: 16,
      color: colorPalette.text,
    },
    activeTabText: {
      fontSize: 16,
      color: colorPalette.tint,
      fontWeight: 'bold',
    },
    tabContent: {
      flex: 1,
      backgroundColor: colorPalette.background,
      paddingTop: 25,
    },
    upcomingContainer: {
      flex: 1,
      paddingHorizontal: 10,
      paddingVertical: 0,
    },
    posterCard: {
      marginHorizontal: 10,
      backgroundColor: colorPalette.accent,
      padding: 10,
      borderRadius: 4,
      width: 220,
      height: 220,
      aspectRatio: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    posterImage: {
      width: '80%',
      height: '80%',
    },
    posterTitle: {
      fontSize: 14,
      color: colorPalette.text,
      fontWeight: 'bold',
      marginTop: 7,
    },
    posterDate: {
      fontSize: 12,
      color: colorPalette.text,
      marginTop: 2,
    },
    scrollDraggerContainer: {
      height: 4,
      backgroundColor: '#888',
      borderRadius: 2,
      marginHorizontal: 10,
      overflow: 'hidden',
      marginBottom: 35,
    },
    scrollDragger: {
      position: 'absolute',
      height: '100%',
      width: '20%', 
      backgroundColor: '#FFD569',
      borderRadius: 2,
    },
    noEvents2: {
      textAlign: 'center',
      color: colorPalette.text,
      paddingLeft:70,
      marginTop: 20,
      fontSize: 16,
    },
  });
  return (
    <View style={styles.container}>
      {/* Calendar */}
      <View style={styles.calendarContainer}>
        <Calendar
          onDayPress={(day) => {
            setSelectedDate(day.dateString);
            setActiveTab('Today');
          }}
          markingType={'multi-dot'}
          markedDates={{
            ...Object.keys(eventsByDate).reduce((acc, date) => {
              const events = eventsByDate[date];
              if (events.length > 0) {
                acc[date] = {
                  marked: true,
                  dots: events.map((event, index) => ({
                    key: `${event.id || `${event.eventDate.toISOString()}-${index}`}`,
                    color: colorPalette.tint,
                  })),
                };
              }
              return acc;
            }, {}),
            [selectedDate ?? '']: {
              selected: true,
              marked: !!eventsByDate[selectedDate],
              selectedColor: colorPalette.tint3,
              dots: eventsByDate[selectedDate]
                ? eventsByDate[selectedDate].map((event, index) => ({
                    key: `${event.id || `${event.eventDate.toISOString()}-${index}`}`,
                    color: colorPalette.tint,
                  }))
                : undefined,
            },
          }}          
          theme={{
            calendarBackground: colorPalette.accent,
            textSectionTitleColor: colorPalette.text,
            dayTextColor: colorPalette.text,
            todayTextColor: colorPalette.tint,
            selectedDayBackgroundColor: colorPalette.tint,
            selectedDayTextColor: colorPalette.accent,
            monthTextColor: colorPalette.text,
            arrowColor: colorPalette.text,
          }}
        />
      </View>
  
      {/* Tabs for Events */}
      <View style={styles.tabsHeader}>
        <TouchableOpacity
          style={[styles.tabButton, activeTab === 'Today' && styles.activeTab]}
          onPress={() => setActiveTab('Today')}
        >
          <Text style={[styles.tabText, activeTab === 'Today' && styles.activeTabText]}>Day’s Events</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tabButton, activeTab === 'Upcoming' && styles.activeTab]}
          onPress={() => setActiveTab('Upcoming')}
        >
          <Text style={[styles.tabText, activeTab === 'Upcoming' && styles.activeTabText]}>Upcoming Events</Text>
        </TouchableOpacity>
      </View>
  
      {/* Content Based on Selected Tab */}
      <View style={styles.tabContent}>
        {activeTab === 'Today' ? (
          <ScrollView style={styles.scrollView} contentContainerStyle={styles.eventList}>
            {selectedDate && eventsByDate[selectedDate] ? (
              eventsByDate[selectedDate].map((event, index) => (
                <TouchableOpacity
                  key={event.id || `${event.eventDate.toISOString()}-${index}`}
                  style={styles.eventItem}
                  onPress={() => openModal(event)}
                >
                  {event.imageUrls && event.imageUrls.length > 0 && (
                    <Image source={{ uri: event.imageUrls[0] }} style={styles.eventImage} />
                  )}
                  <View style={styles.eventTextContainer}>
                    <Text style={styles.eventName}>{event.name}</Text>
                    <Text style={styles.eventLocation}>{event.location}</Text>
                    <Text style={styles.eventTime}>{event.prettyTime}</Text>
                  </View>
                </TouchableOpacity>
              ))
            ) : (
              <Text style={styles.noEvents}>No events for today.</Text>
            )}
          </ScrollView>
        ) : (
          <View style={styles.upcomingContainer}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            onScroll={(e) => {
              const offsetX = e.nativeEvent.contentOffset.x;
              const contentWidth = e.nativeEvent.contentSize.width;
              const viewportWidth = e.nativeEvent.layoutMeasurement.width;
              setScrollX(offsetX / (contentWidth - viewportWidth));
            }}
            style={styles.horizontalScroll}
          >
            {renderUpcomingEvents()}
          </ScrollView>
          {/* Yellow Scroll Dragger */}
          <View style={styles.scrollDraggerContainer}>
            <View style={[styles.scrollDragger, { left: `${scrollX * 100}%` }]} />
          </View>
        </View>
        )}
      </View>


      {/* Modal */}
      {selectedEvent && (
        <Modal visible={modalVisible} transparent={true} animationType="slide">
          <View style={styles.modalContainer}>
            <View
                style={styles.modalContent}
                onLayout={(event) => {
                  const { width } = event.nativeEvent.layout;
                  setPosterWidth(width-40);
                }}
            >
              <TouchableOpacity onPress={closeModal} style={styles.closeButton}>
                <Text style={styles.closeButtonText}>X</Text>
              </TouchableOpacity>
              <Text style={styles.modalEventName}>{selectedEvent.name}</Text>
              {selectedEvent.imageUrls && selectedEvent.imageUrls.length > 1 && (
                <View style={styles.arrowContainer}>
                  <TouchableOpacity onPress={scrollLeft} style={styles.arrowButtonLeft}>
                    <Text style={styles.arrowText}>{'<'}</Text>
                  </TouchableOpacity>
                  <ScrollView
                    horizontal
                    ref={scrollViewRef}
                    style={styles.imageSlider}
                    showsHorizontalScrollIndicator={true}
                    onScroll={(event) => setScrollX(event.nativeEvent.contentOffset.x)}
                    scrollEventThrottle={16}
                  >
                    {selectedEvent.imageUrls.map((url: ImageSourcePropType, i: number) => (
                      <Image
                        key={url + `${i}`}
                        source={{ uri: url as string }}
                        style={styles.modalImage}
                      />
                    ))}
                  </ScrollView>
                  <TouchableOpacity onPress={scrollRight} style={styles.arrowButtonRight}>
                    <Text style={styles.arrowText}>{'>'}</Text>
                  </TouchableOpacity>
                </View>
              )}
              {selectedEvent.imageUrls && selectedEvent.imageUrls.length > 1 && (
                <View style={styles.indicatorContainer}>
                  {selectedEvent.imageUrls.map((url, i) => (
                    <View
                      key={i}
                      style={[
                        styles.indicator,
                        currentImageIndex === i ? styles.indicatorActive : styles.indicatorInactive,
                      ]}
                    />
                  ))}
                </View>
              )}
              {selectedEvent.imageUrls && selectedEvent.imageUrls.length === 1 && (
                  <>
                  <Image
                    key={0}
                    source={{ uri: selectedEvent.imageUrls[0] }}
                    style={{ height: posterWidth, width: posterWidth, marginBottom: 10}}
                  />
                  </>
              )}
              <Text style={styles.modalLabel}>
                Date: <Text style={styles.modalInfo}>{dayjs(selectedDate, 'YYYY-MM-DD').format('dddd, MMMM Do')}</Text>
              </Text>
              <Text style={styles.modalLabel}>
                Time: <Text style={styles.modalInfo}>{selectedEvent.prettyTime}</Text>
              </Text>
              <Text style={styles.modalLabel}>
                Location: <Text style={styles.modalInfo}>{selectedEvent.location}</Text>
              </Text>
              {selectedEvent?.instructor && (
                <Text style={styles.modalLabel}>
                  Instructor: <Text style={styles.modalInfo}>{selectedEvent.instructor}</Text>
                </Text>
              )}
              {selectedEvent?.guestSpeaker && (
                <Text style={styles.modalLabel}>
                  Guest Speaker: <Text style={styles.modalInfo}>{selectedEvent.guestSpeaker}</Text>
                </Text>
              )}
              <View style={{ marginBottom: 10 }} />
              <Text style={styles.modalInfo}>{selectedEvent.description}</Text>
              {/*{selectedEvent && /^([01]\d|2[0-3]):([0-5]\d)$/.test(selectedEvent.time) && (*/}
              {/*    <TouchableOpacity onPress={() => setReminder(selectedEvent)} style={styles.setReminderButton}>*/}
              {/*      <Text style={styles.setReminderButtonText}>Set Reminder</Text>*/}
              {/*    </TouchableOpacity>*/}
              {/*)}*/}
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
  
}