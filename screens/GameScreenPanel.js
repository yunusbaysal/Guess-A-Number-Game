import React, { useState,useRef } from "react";
import { View, Text, StyleSheet, Button,Alert } from "react-native";
import NumberContainer from "../components/SelectedNumberContainer";
import Card from "../components/Card";

const generateRandomNumberRange = (min, max, exclude) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  const randNumber = Math.floor(Math.random() * (max - min)) + min;
  //low possible-Base Case but it is worth to think! Basic Recursion func. --
  if (randNumber === exclude) {
    return generateRandomNumberRange(min, max, exclude);
  } else {
    return randNumber;
  }
};

const GameScreenPanel = (props) => {
  const [currentGuess, setCurrentGuess] = useState(
    generateRandomNumberRange(1, 100, props.userChoice)
  );
  const currentLow = useRef(1);
  const currentHigh = useRef(100);
  
  const followingGuessHandler = direction =>{
    if((direction === 'greater' && currentGuess> props.userChoice) ||(direction === 'lower' && currentGuess < props.userChoice)){
      Alert.alert('Don\'t fool yourself!','Hey, let\'s find the number!',[{text: 'Ooops!',style: 'cancel'}])
      return;
    }
    if(direction === 'lower'){
      currentHigh.current = currentGuess;
    } else{
      currentLow.current = currentGuess;
    }
    const nextNumber = generateRandomNumberRange(currentLow.current,currentHigh.current,currentGuess);
    setCurrentGuess(nextNumber);
  };

  return (
    <View style={styles.screen}>
      <Text>Opponent's Guess Value</Text>
      <NumberContainer>{currentGuess}</NumberContainer>
      <Card style={styles.ButtonContainer}>
        {/* some hints */}
        <Button title="LOWER" onPress={followingGuessHandler.bind(this,'lower')} />
        <Button title="GREATER" onPress={followingGuessHandler.bind(this,'greater')} />
      </Card>
    </View>
  );
};
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: "center",
  },
  ButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
    width: 300,
    maxWidth: "80%",
  },
});
export default GameScreenPanel;
