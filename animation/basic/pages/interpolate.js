import React, {useState, useEffect} from 'react';
import {StyleSheet, Animated, SafeAreaView} from 'react-native';
function App() {
  const [ballAY] = useState(new Animated.Value(0));
  useEffect(() => {
    function slideTopToBottom(element, toValue, duration) {
      Animated.timing(element, {
        toValue: toValue,
        duration: duration,
        useNativeDriver: false,
      }).start();
    }

    slideTopToBottom(ballAY, 500, 1000);
  }, [ballAY]);

  return (
    <SafeAreaView style={styles.container}>
      <Animated.View
        style={[
          styles.ballA,
          {
            top: ballAY,
            opacity: ballAY.interpolate({
              inputRange: [0, 300],
              outputRange: [1, 0],
              extrapolate: 'clamp',
            }),
          },
        ]}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 30,
  },

  ballA: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#F00',
  },
});

export default App;
