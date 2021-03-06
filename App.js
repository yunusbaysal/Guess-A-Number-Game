import React, {useState} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Header from './components/Header';
import StartGameScreen from './screens/StartGameScreen';
import GameScreenPanel from './screens/GameScreenPanel';

export default function App() {
  const [userNumber,setUserNumber] = useState();

  const startGameHandler = (selectedNumber)=>{
    setUserNumber(selectedNumber);
  };

  let contentJSX= <StartGameScreen onStartGame={startGameHandler}/>;

  if (userNumber){
    contentJSX = <GameScreenPanel userChoice={userNumber} />;
  }
  return (
    <View style={styles.screen}>
      <Header title={'Guess A Number'}/>
      {contentJSX}
      
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1  // occupy full screen
  }
});
