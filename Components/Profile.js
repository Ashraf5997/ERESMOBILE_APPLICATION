import React, {useEffect} from "react";
import { Text, View,StyleSheet,Image,ActivityIndicator} from 'react-native';
import{ Card} from 'react-native-paper';
import axios from "react-native-axios";
import AsyncStorage from "@react-native-community/async-storage";

 // ICONS 
 import { ScrollView } from "react-native-gesture-handler";

  function Profile({route,navigation}) {
  const[empData , setEmpData]   = React.useState();
  const [isLoader , setLoader]    = React.useState(true);
  const getloginData= async()=>{
  //setUserData(JSON.parse( await  AsyncStorage.getItem("userData")));
}

  const { id, name } = route.params;
  // USE EFFECT
  useEffect(()=>{
    getEmployeeById();  
    getloginData();
  },[])

 // FETCHING ALL EMPLOYEES DATA
 const getEmployeeById= async()=>{
  axios.get(`http://192.168.0.100:9000/api/v1/e-res/employee/${id}`).then(
      (response)=>{
                 let data = response.data ;//alert(JSON.stringify(data))
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


     
  return (
    <View style={styles.container}>
    
      {/* TOP BAR IMAGE */}
           <View style={{flexDirection:'row'}}>
                <Image style={styles.fadingText} source = {require('../assets/Images/officeLogo.png')}
                    style={{ width:40, height:40 , marginLeft:9,marginTop:5}}
                /> 
           </View>
      {/* END */ }     

      {/* PROFILE DATA CONTAINER */ }
      <ScrollView style={styles.scrollview}>
      {(isLoader)? <View>
                 <ActivityIndicator  style={{marginTop:240}} size="large" color="lightseagreen" />
                <Text style={{marginLeft:145,marginTop:10}}>Please wait...</Text>
         </View>       
       :  
        <Card style={styles.card}>
          <Card style={{height:250,marginTop:5,width:290,alignItems:'center',textAlign:'center',backgroundColor:'white'}}>
                    <Image style={styles.fadingText} source = {require('../assets/Images/profilePic.png')}
                        style={{ width:140, height:140,borderRadius:80,marginTop:10}}
                    /> 
                    <Text style={{fontSize:18,fontWeight:'bold',textAlign:'center'}}>{empData[0].fullname}</Text>
                    <Text style={{fontSize:15,textAlign:'center',fontWeight:'bold'}}>{empData[0].qualification}</Text>
                    <Text style={{fontSize:12,textAlign:'center',fontWeight:'bold'}}>{empData[0].designation}</Text>

          </Card>           
          <Card style={styles.emailcard}>
            <Text style={styles.title} >{empData[0].email}</Text>
          </Card>
          <Card style={styles.namecard}>
            <Text style={styles.title} >Office Id : {empData[0].Id_no}</Text>
          </Card>
          <Card style={styles.namecard}>
            <Text style={styles.title} >User Id : {empData[0].id}</Text>
          </Card>
          <Card style={styles.namecard}>
            <Text style={styles.title} >Contact : {empData[0].contact}</Text>
          </Card>
          <Card style={styles.namecard}>
            <Text style={styles.title} >Address : {empData[0].address}</Text>
          </Card>
          <Card style={styles.namecard}>
            <Text style={styles.title} >Access Type : {empData[0].accessibility}</Text>
          </Card>
          <Card style={styles.namecard}>
            <Text style={styles.title} >Createdby : {empData[0].createdby}</Text>
          </Card>
          <Card style={styles.namecard}>
            <Text style={styles.title} >Createdon : {empData[0].createdon}</Text>
          </Card>
        
        </Card>
        }
      </ScrollView>
        
         
      {/* END*/}
</View>
  );
}
   
const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor:"black",
      },
      card:{
        flex:1,
        backgroundColor:'white',
       // height:520,
        padding:15,
        marginTop:10,
        width:320,
        marginLeft:20
      },
      emailcard:{
        height:35,
        backgroundColor:'white',
        marginTop:-20,
        alignItems:'center'
     },
      namecard:{
         height:35,
         backgroundColor:'white',
         marginTop:8,
         paddingLeft:15
      },
      title:{
         fontSize:14,
         paddingTop:8,
      },
      scrollview:{ 
        backgroundColor:'#EBEEEE',
      },
      text:{
          fontSize:5,
          color:'black',
          marginLeft:25
      },
    });
    

export default Profile;