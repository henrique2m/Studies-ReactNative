import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, TextInput, Animated} from 'react-native';

import Constants from 'expo-constants';


export default function App() {
  const [temperature, setTemperature] = useState('');
  const [person, setPerson] = useState('');
  const [cardStartX] = useState(new Animated.Value(0));
  const [infoX] = useState(new Animated.Value(0));

  function convertTemperature(fahrenheit){
    const temperature = {};

    temperature.fahrenheit = fahrenheit;
   
    function  convertCelsius(){
        const celsius = (fahrenheit - 32) * (5/9);
        return celsius.toFixed(2);
    }

    function  convertKelvin(){
        const kelvin = (((fahrenheit - 32) * (5/9)) + 273.15);

        return kelvin.toFixed(2);

    }

    temperature.convertCelsius = convertCelsius();
    temperature.convertKelvin = convertKelvin();

    return temperature;
  }

  function personVerify(celsius){
    const person = {};
     
    if(celsius <= 35.00){
        person.state = 'hipotérmico';
        return person;
    }

    if(celsius > 35.00 && celsius < 37 ) {
       person.state = 'estável';
       return person;
    }

    person.state = 'febril'

    return person;

  }

  function overlapping(element, toValue, bounciness) {
      Animated.spring(element, {
        toValue: toValue,
        bounciness: bounciness,
        useNativeDriver: false,
      }).start();
   }

  useEffect(() => {
     function handleTemperature(){
       if (temperature === '') return;
       if (isNaN(temperature+2)) return;

       const temperatures = convertTemperature(temperature);

       const person = personVerify(temperatures.convertCelsius);

       setPerson({ 
         state: person.state,
         temperatureCelsius: temperatures.convertCelsius,
         temperatureKelvin: temperatures.convertKelvin,
        });

        overlapping(infoX, 10, 30);
     }

     handleTemperature();
  },[temperature, infoX])

  useEffect(() => {

    overlapping(cardStartX, -10, 30);

  },[cardStartX]);

  return (
    <View style={styles.container}>
      <Animated.View style={
        [
          styles.cardStart, {
              top: cardStartX
          }
        ]}>
        <Text style={styles.textStart}>
          Olá! O que você acha de medirmos a sua temperatura?
        </Text>
      </Animated.View>
      
      <TextInput
        style={styles.textInput}
        onChangeText = { temperature => {setTemperature(temperature)}}
        placeholder="Sua temperatura em Fahrenheit"
      />

      { person !== "" && (
        <Animated.View style={
        [
          styles.info, {
              top: infoX
          }
        ]}>
          <Text style={styles.infoText}>
            Sua temperatura em graus Celsius é: {person.temperatureCelsius}.
          </Text >
          <Text style={styles.infoText}>
            Sua temperatura em Kelvin é: { person.temperatureKelvin}.
          </Text >
          <Text style={styles.infoText}>
            Seu estado é: { person.state}.
          </Text>
        </Animated.View>
      )}

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: "center",
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
    padding: 8,
  },

  cardStart: {
    height: 200,
    width: 300,
    backgroundColor: "#63FC21",
    display: "flex",
    justifyContent: "center", 
    borderRadius: 5,
  },

  textStart: {
    margin: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 32,
    color: "#fff"
  },

  textInput: {
    marginTop: 10,
    height: 38,
    width: 250,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#63fc21",
    borderRadius: 19,
    padding: 5,
  },

  info: {
    width: 300,
    height: 100,
    backgroundColor: "#3A44FC",
    display: "flex",
    justifyContent: "center", 
    marginTop: 10,
    padding: 5,
    borderRadius: 5,
  },

  infoText: {
    fontSize: 12,
    color: "#fff",
    fontWeight: "bold",
    textAlign: 'center',
  }
 
});
