import React, {useEffect,useState} from "react";
import AsyncStorage from "@react-native-community/async-storage";
import axios from "react-native-axios";

import {
       View, StyleSheet,Text,Image,ScrollView,ActivityIndicator,
} from "react-native";

import{  Card,Button} from 'react-native-paper';
 import { Entypo } from '@expo/vector-icons';

 // MAIN FUNCTION START
 const  EmployeeList = ({navigation}) => {
   
      const [empData  , setEmpData]    = React.useState();
      const [empname  , setEmpName]    = React.useState(0);
      const [empid    , setEmpId]      = React.useState(0)
    // const [userId   , setUserId]     = React.useState();
      const [isLoader , setLoader]     = React.useState(true);
      const [btnName  , setBtnName]    = React.useState('0');
      const [userid , setUserId] = React.useState();
      const [username , setUserName] = React.useState();
      const getloginData= async()=>{
     // setUserData(JSON.parse( await  AsyncStorage.getItem("userData")));
     let data = JSON.parse( await  AsyncStorage.getItem("userData"))
     setUserId( data[0].id); setUserName(data[0].fullname);
    }

  // USE EFFECT
  useEffect(()=>{
       getloginData() 
       getAllEmpData(); 
  },[])

 // FETCHING ALL EMPLOYEES DATA
 const getAllEmpData= async()=>{
    axios.get("http://192.168.0.100:9000/api/v1/e-res/employees").then(
        (response)=>{
                    let data = response.data ;
                    setEmpData(data); 
                    console.log(data)
                    setLoader(false)
            }).
             catch((error)=>{ 
             alert(error)
             console.log(error)
             setLoader(false)
            }
        ) 
 }

     const RedirectTo =(btnname)=>{
         setBtnName(btnname)
        if(empid && empname){
          navigation.navigate(btnname, {id: empid ,name:empname});
         }else{
           navigation.navigate(btnname, {id:userid, name:username});
        }
     } 
   
  return (

<View style={styles.container}>
{(empname =='0')?
  /*  LOGO BAR */
    <View>
            <View style={{flexDirection:'row'}}>
                <Image style={styles.fadingText} source = {require('../assets/Images/officeLogo.png')}
                    style={{ width:40, height:40 , marginLeft:9,marginTop:5}}
                /> 
            </View>
    </View>  :
  /* ACTION BAR */
    <View style={styles.actionBar}>
        <Text style={{marginLeft:50 ,marginTop:15, fontSize:14,color:'white'}}> {empname} is selected !</Text>
         <Card style={{backgroundColor:'black',marginLeft:320,marginTop:-20,width:22}} onPress={()=>{ setEmpName('0');setEmpId('')}}>
             <Entypo name="cross" size={25} color="white" /> 
         </Card>
    </View>
}
     <ScrollView style={{backgroundColor:'#EBEEEE',marginTop:0}}>
        {(isLoader)? <View>
                 <ActivityIndicator  style={{marginTop:240}} size="large" color="lightseagreen" />
                <Text style={{marginLeft:145,marginTop:10}}>Please wait...</Text>
         </View>       
        :  
        <View>
        {
               empData.map((data)=>(
                <Card style={{
                  backgroundColor:(empid == data.id)?"#C5EEDC":"white",
                  height:60,
                  padding:15,
                  marginTop:10,
                  width:320,
                  marginLeft:20
                }}
                onPress={()=>{setEmpId(data.id), setEmpName(data.fullname)}}>
                  <View style={{flexDirection:'row'}}>
                   <Image  source = {require('../assets/Images/profilePic.png')}
                        style={{ width:50, height:50,borderRadius:45,marginTop:-10,marginLeft:20}}
                    /> 
                       <Text style={styles.text}  >
                          {data.fullname}
                       </Text> 
                      
                  </View>
               </Card>
               ))
        }
        </View>
           
        }
     </ScrollView>
     {/* BOTTOM  NAVIGATION} */}
     <View style={styles.bottomBar}>

  <View style={{flexDirection:'row',marginTop:0}}>
         <Button style={styles.viewBtn} onPress={()=>{ RedirectTo('Profile')}}>
                 <Text style={{ fontSize:12,fontWeight:'bold',color:(btnName == 'Profile')?'lightseagreen':'white'}}> Profile</Text>
         </Button>
         <Button style={styles.viewBtn} onPress={()=>{ RedirectTo('Attendance')}}>
                 <Text style={{fontSize:12,color:(btnName == 'Attendance')?'lightseagreen':'white',fontWeight:'bold'}}>Attendance</Text>
         </Button>
         <Button style={styles.viewBtn} onPress={()=>{ RedirectTo('Task')}}>
                 <Text style={{ fontSize:12,color:(btnName == 'Task')?'lightseagreen':'white',fontWeight:'bold'}}> Task</Text>
         </Button>
    </View>
</View>
     {/* END BOTTOM NAVIGATION */}
  
  </View>
    ); }


const styles = StyleSheet.create({
container: {
    flex:2,
    backgroundColor:"black",
  },
  card:{
    flex:1,
    backgroundColor:'white',
    height:60,
    padding:15,
    marginTop:10,
    width:320,
    marginLeft:20
  },

  text:{
      fontSize:13,
      fontWeight:'bold',
      color:'black',
      marginLeft:25,
      marginTop:10
  },
  viewBtn:{
    backgroundColor:'black',
    height:50,//color:white,
    paddingTop:5,paddingLeft:2,
    width:130,
    marginLeft:-5,
    alignItems:'center' ,
  },
 


});


export default EmployeeList;