import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from "react-native";
import Card from "../components/Card";
import Colors from "../constants/colors";
import InputText from "../components/Input";
import NumberContainer from '../components/SelectedNumberContainer';

const StartGameScreen = (props) => {
  // It comes as string (need to convert to number)
  const [enteredValue, setEnteredValue] = useState("");
  const [confirmed, setConfirmed] = useState(false);
  const [selectedNumber, setSelectedNumber] = useState();

  const inputNumberHandler = (inputText) => {
    //console.log(inputText);
    // I used regular expression to ignore ',' or '.'
    setEnteredValue(inputText.replace(/[^0-9]/g, ""));
  };

  const resetButtonHandler = () => {
    setEnteredValue("");
    setConfirmed(false);
  };
  const confirmButtonHandler = () => {
    const chosenNumber = parseInt(enteredValue);
    if (isNaN(chosenNumber) || chosenNumber > 99 || chosenNumber <= 0) {
      Alert.alert(
        "Invalid Number!",
        "The number has to be a number between 1 and 99.",
        [{ text: "OKAY!", onPress: resetButtonHandler, style: "destructive" }]
      );
      return;
    }

    setConfirmed(true);
    setSelectedNumber(chosenNumber);
    //this statement is updated after new render. Because current render enteredValue doesn't change. It is consistent to use.
    setEnteredValue("");
    // When press confirm button, close the keyboard!
    Keyboard.dismiss();
  };

  let confirmedOutput;

  if (confirmed) {
    confirmedOutput = (
      <Card style={styles.summaryStyle}>
        <Text>You selected</Text>
        <NumberContainer>{selectedNumber}</NumberContainer>
        <Button title='START THE GAME'/>
      </Card>
    );
  }

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}
    >
      <View style={styles.screen}>
        <Text style={styles.title}> The Start New Game...</Text>

        <Card style={styles.inputContainer}>
          <Text>Select a Number</Text>
          {/* If we press the button above, it will focus thank to blurOnSubmit property */}
          <InputText
            style={styles.input}
            blurOnSubmit
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType="number-pad"
            maxLength={2}
            onChangeText={inputNumberHandler}
            value={enteredValue}
          />
          <View style={styles.buttonContainer}>
            <View style={styles.button}>
              <Button
                title="Reset"
                onPress={resetButtonHandler}
                color={Colors.resetColor}
              />
            </View>
            <View style={styles.button}>
              <Button
                title="Confirm"
                onPress={confirmButtonHandler}
                color={Colors.primary}
              />
            </View>
          </View>
        </Card>
        {confirmedOutput}
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    marginVertical: 10,
  },
  inputContainer: {
    width: 300,
    maxWidth: "80%",
    alignItems: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    paddingHorizontal: 15,
  },
  button: {
    // or width: 100
    width: "42%",
  },
  input: {
    width: 48,
    textAlign: "center",
  },
  summaryStyle: {
    marginTop: 20,
    alignItems: 'center',
    
  },
});

export default StartGameScreen;
