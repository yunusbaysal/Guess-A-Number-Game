import React from 'react';
import {TextInput, StyleSheet} from 'react-native';

const Input = props =>{

    return (
        // {...props} ==> all props you have in the parent class, add them to TextInput, basically (This is React and/or Javascript feature )
        <TextInput {...props} style={{...styles.input, ...props.style} }  />
    );
};

const styles = StyleSheet.create({
    input: {
        height: 30,
        borderBottomColor: 'grey',
        borderBottomWidth: 1,
        marginVertical: 10,
    }

});
export default Input;