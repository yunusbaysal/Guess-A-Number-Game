import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Colors from "../constants/colors";
const selectedNumberContainer = (props) => {
  return (
    <View style={styles.containerStyle}>
      <Text style={styles.numberStyle} >{props.children}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    borderColor: Colors.purple,
    padding: 10,
    borderWidth: 3,
    marginVertical: 10,
    alignItems: "center",
    justifyContent: 'center',

  },
  numberStyle: {
      color: Colors.purple,
      fontSize: 24
  }
});

export default selectedNumberContainer;
