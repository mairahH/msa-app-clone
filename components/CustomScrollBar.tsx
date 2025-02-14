import React, {useState, useRef, useEffect} from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';

const CustomScrollbar = ({ children }) => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [contentHeight, setContentHeight] = useState(0);
  const [scrollViewHeight, setScrollViewHeight] = useState(0);

  useEffect(() => {
    calculateScrollBar();
  }, [contentHeight, scrollViewHeight]);

  const handleScroll = (event) => {
    const positionY = event.nativeEvent.contentOffset.y;
    setScrollPosition(positionY);
  };

  const calculateScrollBar = () => {
    if (contentHeight <= scrollViewHeight) {
      return { height: 0 }; // Hide scrollbar if all content fits
    }
    const scrollBarHeight = 250 //Math.max((scrollViewHeight / contentHeight) * scrollViewHeight, 20);
    const scrollIndicatorPosition = (contentHeight - scrollViewHeight) !== 0
        ? (scrollPosition / (contentHeight - scrollViewHeight)) * (scrollViewHeight - scrollBarHeight)
        : 0;
    return {
      height: scrollBarHeight,
      top: scrollIndicatorPosition,
      backgroundColor: '#FFD569',
      right: 10
    };
  };

  return (
      <View style={styles.container}>
        <ScrollView
            onScroll={handleScroll}
            scrollEventThrottle={16}
            onContentSizeChange={(contentWidth, contentHeight) => setContentHeight(contentHeight)}
            onLayout={(event) => setScrollViewHeight(event.nativeEvent.layout.height)}
            contentContainerStyle={{ paddingTop: 0, alignItems: 'center', justifyContent: 'center' }}
            showsVerticalScrollIndicator={false}
            style={styles.scrollView}
        >
          {children}
        </ScrollView>
        <View style={[styles.scrollIndicator, calculateScrollBar()]} />
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    width: '100%',
  },
  scrollView: {
    width: '100%',
  },
  scrollIndicator: {
    position: 'absolute',
    width: 4,
    right: 0,
  },
});

export default CustomScrollbar;