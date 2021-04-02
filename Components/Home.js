import React, { useEffect ,useRef } from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AnimateLoadingButton from 'react-native-animate-loading-button';
import AsyncStorage from "@react-native-community/async-storage";
//import createHistory  from 'history/createMemoryHistory';
//import {navigator} from 'react-router-native';
import{ 
  Avatar, Button, Card, Title,
} from 'react-native-paper';

import { Animated, Text, View, StyleSheet , Image,LogBox } from "react-native";

const App = ({navigation}) => {
  // USE EFFECT
  useEffect(() => {
    LogBox.ignoreLogs(['Animated: `useNativeDriver`']);
    fadeIn()
   // setInterval(GoToLogin ,5000)
  }, [0])

  const GoToLogin = async()=>{
   //navigation.navigate('Login')
   //alert("hh")
   let userData= await AsyncStorage.getItem('userData');
   if(userData == null){
       navigation.replace('Login');
   }else{
    navigation.replace('Index');
   }
  }
  // fadeAnim will be used as the value for opacity. Initial Value: 0
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const fadeIn = () => {
    // Will change fadeAnim value to 1 in 5 seconds
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 5000
    }).start();
  };

  return (
    <View style={styles.container}> 

     <Animated.View
        style={[
          styles.fadingContainer,
          {
            opacity: fadeAnim // Bind opacity to animated value
          }
        ]}
     >
       <Image style={styles.fadingText} source = {require('../assets/Images/officeLogo.png')}
         style={{ width:80, height:80 , marginLeft:9}}
        /> 
       <Text style={styles.fadingText}>E R E S</Text>
       <Card>
       
         <Button onPress={()=>{GoToLogin()}}>Lets get Started !</Button>
       </Card>
      
      
      
     
      </Animated.View>
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //width:360,
   // alignItems: 'center',
    justifyContent: 'center',
   // height:260,
    backgroundColor:'black'
  },
  fadingContainer: {
    paddingVertical: 8,
    paddingHorizontal: 16,
   
  },
  fadingText: {
  
    fontSize: 28,
    fontWeight:'bold',
    textAlign: "center",
    justifyContent:"center",
    margin: 10,
    color:'#61BFB2'
  },
  welcomeCon:{
    flex:1,
   //alignItems:'center',
   // justifyContent:'center',
   // marginTop:5,
    backgroundColor:'white',
    borderBottomRightRadius:0,
   // borderTopLeftRadius:150,
  }
 
});

export default App; 

