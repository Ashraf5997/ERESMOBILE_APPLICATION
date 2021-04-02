
import React,{useEffect,useState}  from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { Appbar } from 'react-native-paper';

//  CPMPONENTS 
import Home from './Home';
import NoticeList from './NoticeList';
import ViewNotice from './ViewNotice';
import Login from './Login';
import ForgotPassword from './ForgotPassword';
import LandingPage from './LandingPage';
import EmployeeList from './EmployeeList';
import BottomNav from './BottomNav';
import Profile from './Profile';
import Attendance from './Attendance';
import Task from './Task';
import Notice from './Notice';
import ViewTask from './viewTask';
import AsyncStorage from '@react-native-community/async-storage';
import { set } from 'react-native-reanimated';

const Stack = createStackNavigator();

function StackComponents ( ) {
/*useEffect(()=>{
    isLoggedIn();
},[])
/*const[userData, setUserData]= React.useState(['']);
const[bol,setBol]=React.useState(false)

  const isLoggedIn=async()=>{
    let temData ;
    temData = JSON.parse( await AsyncStorage.getItem("userData"));
    if(temData == null){setBol(true);}else{setBol(false)}
}*/
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

  
  return (
   <NavigationContainer> 
       <Stack.Navigator screenOptions={screenOptionStyle}>
            <Stack.Screen name="Home"            component={Home} />
            <Stack.Screen name="Login"           component={Login}  />
            <Stack.Screen name="Index"           component={LandingPage} />
            <Stack.Screen name="ForgotPassword"  component={ForgotPassword} />
            <Stack.Screen name="BottomNav"       component={BottomNav}/>
            <Stack.Screen name="Profile"         component={Profile} />
            <Stack.Screen name="Employees"       component={EmployeeList} />
            <Stack.Screen name="Attendance"      component={Attendance} />
            <Stack.Screen name="Task"            component={Task} />
            <Stack.Screen name="ViewTask"        component={ViewTask} />
            <Stack.Screen name="NoticeList"      component={NoticeList} />  
            <Stack.Screen name="ViewNotice"      component={ViewNotice} />  
       </Stack.Navigator>
  </NavigationContainer>
   );
}

export default StackComponents;
