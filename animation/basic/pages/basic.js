import React, {useState, useEffect} from 'react';

import {StyleSheet, Animated, SafeAreaView} from 'react-native';

function App() {
  const [ballAY] = useState(new Animated.Value(0));
  const [ballBY] = useState(new Animated.Value(0));
  const [ballCY] = useState(new Animated.Value(0));
  const [squareAY] = useState(new Animated.Value(0));
  const [squareAX, setSquareAX] = useState(new Animated.Value(0));

  const [squareBX] = useState(new Animated.Value(0));
  const [squareBY] = useState(new Animated.Value(0));

  useEffect(() => {
    function slideTopToBottom(element, toValue, duration) {
      Animated.timing(element, {
        toValue: toValue,
        duration: duration,
        useNativeDriver: false,
      }).start();
    }

    function overlapping(element, toValue, bounciness) {
      Animated.spring(element, {
        toValue: toValue,
        bounciness: bounciness,
        useNativeDriver: false,
      }).start();
    }

    function acceleration(element, velocity) {
      Animated.decay(element, {
        velocity: velocity,
        useNativeDriver: false,
      }).start();

      setSquareAX(Animated.divide());
    }

    function accelerationXY(element, velocity) {
      Animated.decay(element, {
        velocity: velocity,
        useNativeDriver: false,
      }).start();
      // divide, add, subtract, multiply
      setSquareAX(Animated.subtract(squareAY, 2));
    }

    function animatedSequence() {
      const accelerationSequence = (element, toValue, duration) => {
        return Animated.timing(element, {
          toValue: toValue,
          duration: duration,
          useNativeDriver: false,
        });
      };
      //parallel, sequence, stagger
      Animated.loop(
        Animated.stagger(300, [
          accelerationSequence(squareBY, 200, 400),
          accelerationSequence(squareBX, 200, 400),
          accelerationSequence(squareBY, 0, 400),
          accelerationSequence(squareBX, 0, 400),
        ]),
        {
          //iterations: 2,
        },
      ).start();
    }

    slideTopToBottom(ballAY, 500, 1000);
    overlapping(ballBY, 300, 30);
    acceleration(ballCY, 0.5);
    accelerationXY(squareAY, 0.5);

    animatedSequence();
  }, [ballAY, ballBY, ballCY, squareAY, squareBY, squareBX]);

  return (
    <SafeAreaView style={styles.container}>
      <Animated.View style={[styles.ballA, {top: ballAY}]} />
      <Animated.View style={[styles.ballB, {top: ballBY}]} />
      <Animated.View style={[styles.ballC, {top: ballCY}]} />
      <Animated.View
        style={[styles.squareA, {top: squareAY, right: squareAX}]}
      />
      <Animated.View
        style={[styles.squareB, {top: squareBY, right: squareBX}]}
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

  ballB: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#0F0',
  },

  ballC: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#00F',
  },

  squareA: {
    width: 70,
    height: 70,
    backgroundColor: '#FF3399',
  },

  squareB: {
    width: 70,
    height: 70,
    backgroundColor: '#7F1399',
  },
});

export default App;
