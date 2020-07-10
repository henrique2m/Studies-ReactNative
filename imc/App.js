import React, { useState } from 'react';

import {
  StyleSheet,
  Text,
  TouchableOpacity,
  TextInput,
  View
} from 'react-native';

const App =  () => {
  const [pulp, setPulp] = useState(0);
  const [height, setHeight] = useState(0);
  const [imc, setImc] = useState(0);
  const [info, setInfo] = useState('');
  
  const  imcCalculate = () => { 
        const imcNew = pulp / (height ** 2);

        setImc(imcNew.toFixed(2));

        if(imcNew < 16){
          setInfo('Magreza Grave');
          return true;
        }

        if(imcNew < 17){
          setInfo('Magreza Moderada');
          return true;
        }

        if(imcNew < 18.5){
          setInfo('Magreza Leve');
          return true;
        }

        if(imcNew < 25){
          setInfo('Saudável');
          return true;
        }

        if(imcNew < 30){
          setInfo('Sobrepeso');
          return true;
        }

        if(imcNew < 35){
          setInfo('Obesidade Grau I');
          return true;
        }

        if(imcNew < 40){
          setInfo('Obesidade Grau II (Severa)');
          return true;
        }

        if(imcNew > 40){
          setInfo('Obesidade Grau III (Mórbida)');
          return true;
        }


  }

   return (
      <View style={styles.container}>
        <View style={styles.datasIn}>
          <TextInput 
            placeholder="Massa"
            keyboardType="numeric" 
            style={styles.input}
            onChangeText = {pulp => setPulp(pulp)}
            defaultValue={pulp}
          />
          <TextInput
            placeholder="Altura"
            keyboardType="numeric"
            style={styles.input}
            onChangeText = {height => setHeight(height)}
            defaultValue={height}
          />
        </View>
        <TouchableOpacity 
          onPress={imcCalculate}
          style={styles.button}
        >
          <Text style={styles.calculate}>
            Calcular
          </Text>
        </TouchableOpacity>
        <Text style={styles.result}>{imc}</Text>
        <Text style={[styles.result, {fontSize:40}]}>{info}</Text>
      </View>
    )
}

export default App;

const styles =  StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#EEEEEE',
  },
  datasIn : {
    flexDirection: "row",
  },
  input: {
    height: 80,
    textAlign: "center",
    width: "50%",
    fontSize: 50,
    marginTop: 24,
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#89ffa5",
    width: "100%",
    height: 60,
  },
  calculate: {
    fontWeight: "bold",
    fontSize: 30,
  },
  result: {
    alignSelf: "center",
    color: "lightgray",
    fontSize: 60,
    padding: 15,
  }
});