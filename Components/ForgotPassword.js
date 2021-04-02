import * as  React from "react";
import axios from "react-native-axios";
import {
       View, StyleSheet,StatusBar, Alert ,ToastAndroid,Text,Image,ScrollView,TextInput
} from "react-native";

import{ 
      Avatar, Card,

 } from 'react-native-paper';

 import AnimateLoadingButton from 'react-native-animate-loading-button';
 // MAIN FUNCTION START
  const  ForgotPassword = ({navigation}) => {
  
  //const LeftContent = props => <Avatar.Icon {...props} icon="folder" />
  const [email, setEmail] = React.useState();
  let loadingButton;

// LOGIN FUNCTION
  const hitSave=()=>{
    if(email){
      loadingButton.showLoading(true);
      let obj={
        email:email
      }
      axios.post("http://192.168.0.100:9000/api/v1/e-res/getEmployeeByEmail/",obj).then(
        (response)=>{
                 //let data = JSON.stringify(response.data)
                if(response.data == 400){InvalidEmail()}
                else{
                 validEmail(response.data[0].password)
                }
          }).
             catch((error)=>{ 
             alert(error);
             console.log(error)  
          }
         )  
    
        loadingButton.showLoading(false);
    }
    else{
      ToastAndroid.show("Please provide your email !", ToastAndroid.SHORT)
    }
  }
  
  // InValidEmail
  const InvalidEmail = ()=>{
    Alert.alert(
      "Hi ",
      "Email not exist , please try with valid email",   
    [
        {
            text: "OK",
            onPress: () => console.log(" d Cancel presed"),
            style: "cancel"
        },
       
    ],
    {
        cancelable: false }
    );
  }
  // ValidEmail
  const validEmail = (data)=>{
    Alert.alert(
      "Hi ",
      `Your password is ${data}`,   
    [
        {
            text: "OK",
            onPress: () => console.log(" d Cancel presed"),
            style: "cancel"
        },
       
    ],
    {
        cancelable: false }
    );
  }


  return (

  <View style={styles.container}>  

      <Image style={styles.fadingText} source = {require('../assets/Images/officeLogo.png')}
         style={{ width:60, height:60 , marginLeft:9,marginTop:5}}
     /> 
     <Text style={styles.ERES}>Employees Register Of</Text>
     <Text style={styles.ERES}> Ecommplify Solution</Text>
     <Card style={styles.picBody}>
     <Card.Cover style={styles.picBody} source = {require('../assets/Images/pic10.png')}  />
    </Card>
     <ScrollView>
     <View style={styles.loginBody} >
     <Text style={{color:'black',marginTop:-25, fontSize:20,fontWeight:'bold'}}>Forgot Password ?</Text>
     <Text> Password will sent to your registered email. provide email below !</Text>      
{/*  EMAIL INPUT*/ }
     <TextInput
          placeholder="Enter Email"
          style={styles.inputText}
          onChangeText={email => setEmail(email)}
          value={email}
    />

{/* hitLogin Buton*/}
    <AnimateLoadingButton  
            ref={c => (loadingButton = c)}
            height={40}
            width={200}
            title="Save"
            titleFontSize={20}
            titleColor="rgb(255,255,255)"
            backgroundColor="black"
            borderRadius={5}
            onPress={()=>{hitSave()}}
    />
   </View>
        </ScrollView> 
    </View>
    );
    }
const styles = StyleSheet.create({
container: {
    flex:2,
    backgroundColor:"black",
    paddingTop: StatusBar.currentHeight,
  },

ERES:{
    fontSize:20,
    color:'#61BFB2',
    fontWeight:'bold',
    marginLeft:15,
    textAlign:'center', 
  },
picBody:{

    flex:4,
    marginTop:5,
    backgroundColor:'black',
    borderBottomRightRadius:0,
    borderTopLeftRadius:150,
  },
loginBody:{
    flex:5,
    backgroundColor:'#61BFB2',
    //alignItems:'center',
    paddingHorizontal:50,
    paddingVertical:30,
    borderBottomRightRadius:150,
    overflow:'scroll',
  },
inputText:{
    height: 40, borderColor: '#61BFB2',backgroundColor:'white',
    color:'black', borderWidth:1,width:250,textAlign:'center',
    borderBottomRightRadius:200,
    borderBottomLeftRadius:200,
    borderRadius:80,marginTop:6

  },

});


export default ForgotPassword;