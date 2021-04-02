/*import { StatusBar } from 'expo-status-bar';
import React, {history} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Switch , NativeRouter, Route} from 'react-router-native';

import Home from './Components/Home';
import Login from './Components/Login';
import 'react-native-gesture-handler';

import { NavigationContainer } from '@react-navigation/native';

const Stack = createStackNavigator()
export default function App() {
  return (
    <NavigationContainer>
    <NativeRouter>
      <View style={styles.container}>
       <Switch>
         <Route exact path ="/" component ={Home} />
         <Route exact path ="/Login" component ={Login} />
       </Switch>
    </View>
    </NativeRouter>

    </NavigationContainer>
    
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
   
  }
 
});*/

import React,{useEffect,useState}  from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { Appbar } from 'react-native-paper';

// IMPORTING COMPONENTS
//import StackComponents from './Components/StackComponents';
import Home from './Components/Home';
import Login from './Components/Login';
import ForgotPassword from './Components/ForgotPassword';
import LandingPage from './Components/LandingPage';
import EmployeeList from './Components/EmployeeList';
import BottomNav from './Components/BottomNav';
import Profile from './Components/Profile';
import Attendance from './Components/Attendance';
import Task from './Components/Task';
import Notice from './Components/Notice';
import AsyncStorage from '@react-native-community/async-storage';
import { set } from 'react-native-reanimated';
import StackComponents from './Components/StackComponents';
import Alert from './Components/Alert';

const Tab = createMaterialBottomTabNavigator();
const Stack = createStackNavigator();

function App ( ) {
useEffect(()=>{
    isLoggedIn();
},[])
const[userData, setUserData]= React.useState(['']);
const[bol,setBol]=React.useState(false)

  const isLoggedIn=async()=>{
    setUserData(JSON.parse( await AsyncStorage.getItem("userData")));
    if(userData){setBol(true);}else{setBol(false)}
   //userData =4 // ;
 
}

//isLoggedIn();
//alert(userData[0].id)

  const screenOptionStyle = {
    headerStyle: 
    {
      backgroundColor: "#61BFB2",
      },
      headerTintColor: "white",
      headerBackTitle: "Back",
      headerTitleStyle: {
      fontWeight: 'bold',
      },
  };

  /*
  const Home_SN = () => {
    return (
      <Stack.Navigator screenOptions={screenOptionStyle}>
        <Stack.Screen name="/" component={Home} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="EmployeeList" component={EmployeeList} />
        <Stack.Screen name="LandingPage" component={LandingPage} />

      </Stack.Navigator>
    );
  }
  const Login_SN = () => {
    return (
      <Stack.Navigator screenOptions={screenOptionStyle}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Home" component={Home} />
         
        <Stack.Screen name="EmployeeList" component={EmployeeList} />
      </Stack.Navigator>
    );
  }
  const ForgotPassword_SN = () => {
    return (
      <Stack.Navigator screenOptions={screenOptionStyle}>
        <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
      </Stack.Navigator>
    );
  }
  const LandingPage_SN = () => {
    return (
      <Stack.Navigator screenOptions={screenOptionStyle}>
        <Stack.Screen name="LandingPage" component={LandingPage} />
      </Stack.Navigator>
    );
  }
  const EmployeeList_SN = () => {
    return (
      <Stack.Navigator screenOptions={screenOptionStyle}>
        <Stack.Screen name="EmployeeList" component={EmployeeList} />
      </Stack.Navigator>
    );
  }*/
  
  
  return (
    
 
 <StackComponents></StackComponents>
    
  
   /* <NavigationContainer> 
    <Tab.Navigator screenOptions={screenOptionStyle}>
    <Tab.Screen name="Home" component={Home_SN} />
       <Tab.Screen name="Login" component={Login_SN} />
       <Tab.Screen name="ForgotPassword" component={ForgotPassword_SN} />
       <Tab.Screen name="LandingPage" component={LandingPage_SN} />
  <Tab.Screen name="EmployeeList" component={EmployeeList_SN} />
     
  </Tab.Navigator>
  </NavigationContainer> */
 /* <NavigationContainer> 
       <Stack.Navigator screenOptions={screenOptionStyle}>
       <Stack.Screen name="StackComponents"  component={StackComponents}/>
          {/*}  <Stack.Screen name="Index"           component={LandingPage} />
            <Stack.Screen name="BottomNav"       component={BottomNav}/>
            <Stack.Screen name="Profile"         component={Profile} />
            <Stack.Screen name="Employees"       component={EmployeeList} />
            <Stack.Screen name="Attendance"      component={Attendance} />
            <Stack.Screen name="Task"            component={Task} />
     
            <Stack.Screen name="Home"            component={Home} />
            <Stack.Screen name="Login"           component={Login}  />
         <Stack.Screen name="ForgotPassword"  component={ForgotPassword} />
         
       </Stack.Navigator>
    </NavigationContainer>*/

   );
}

export default App;
