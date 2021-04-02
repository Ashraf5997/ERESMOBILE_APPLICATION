
import React, { useEffect ,useRef } from "react";
import axios from "react-native-axios";
//import AsyncStorage from 'react-native';
import {
       View, StyleSheet,StatusBar, Alert ,Pressable,ToastAndroid,
       Paragraph,Headline,Appbar, Portal, Provider,Modal,Text,Image,ScrollView,TextInput,LogBox,
} from "react-native";
//import {AsyncStorage} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import{ 
      Avatar, Button, Card, Title,

 } from 'react-native-paper';

 import AnimateLoadingButton from 'react-native-animate-loading-button';
import { color } from "react-native-reanimated";

 // MAIN FUNCTION START
  const  Login = ({navigation}) => {
    useEffect(() => {
      LogBox.ignoreLogs(['Animated: `useNativeDriver`']);
  }, [])
  const LeftContent = props => <Avatar.Icon {...props} icon="folder" />
  const [email, setEmail] = React.useState();
  const [password, setPassword] = React.useState();
  let loadingButton;

// MODAL VARIABLES
const [modalVisible, setModalVisible] = React.useState(false);
const GoToForgotPassword = () =>{ 
  navigation.navigate('ForgotPassword');
 }
  const containerStyle = {backgroundColor: 'white', padding: 20};

// LOGIN FUNCTION
 const hitLogin=async()=>{
 /* axios.get("http://192.168.0.100:9000/api/v1/e-res/employees").then(
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
         }) */
   // navigation.navigate('Index');
  // navigation.replace('Index');
    if(email  && password ){
      alert("ddas")
      loadingButton.showLoading(true);
        
      let  Values={
        email:email,
        password:password
       }
    
     /* fetc("http://192.168.0.103:9000/api/v1/e-res/userAuthentication", {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username: email,
            password: password,
        })
    })

        .then((response) => response.json())
        .then((responseData) => {
            console.log(
                "POST Response",
                "Response Body -> " + JSON.stringify(responseData)
            )
        })
        .done();*/

    axios.get("http://192.168.0.100:9000/api/v1/e-res/employees").then(
      (response)=>{
      if(response.data == 400){
         loadingButton.showLoading(false);
             alert("INVALID CREDENTIALS")
      }
      else{
                alert("ddssdsdsdsd")
                let data = response.data;
                 let userid = data[0].id;
                loadingButton.showLoading(false);
               setAsyncStorage(data,userid);
       }
        }).
           catch((error)=>{ 
             alert(error);
             console.log(error)
             loadingButton.showLoading(false)
        })        
    }
    else{
      loadingButton.showLoading(false);
      ToastAndroid.show("Please provide your credentials !", ToastAndroid.SHORT)
    }
 }

 const setAsyncStorage=async(data,userid)=>{
  await AsyncStorage.setItem('userData',JSON.stringify(data));
  //let userData= JSON.parse(await AsyncStorage.getItem('data'));
 // alert(userData[0].fullname)
  navigation.replace('Index');


 }

const login1= async()=>{
    if(email && password){
    //try{
      /* let response = await fetch("http://192.168.0.103:9000/api/v1/e-res/userAuthentication",{
         method :'POST',
         headers:{
           'Accept':'application/json',
           'Content-Type':'application/json'
         },
         body:JSON.stringify({
            session:{
              email:email,
              password:password
            }
         })
         });*/


         let obj={
           name:"ashrafvghfghfh",
           age:'24'
         }
         await AsyncStorage.setItem("statusCode",JSON.stringify(obj));
         let values =  await AsyncStorage.getItem("statusCode");
         alert(JSON.stringify(values))
         // let datas = response.data;
         // let res = await response.json();//alert(JSON.stringify(response));
   /*   }catch(error){
        alert("err"+error)
      }*/

    }else{
      ToastAndroid.show("Please provide your credentials !", ToastAndroid.SHORT)
    }
  }
  return (

  <View style={styles.container}>  

    <Image style={styles.fadingText} source = {require('../assets/Images/officeLogo.png')}
         style={{ width:60, height:60 , marginLeft:9,marginTop:5}}
    /> 

    <Text style={styles.ERES}>Employees Register Of</Text>
    <Text style={styles.ERES}> Ecommplify Solution</Text>

    <Card style={styles.picBody}>
        <Card.Cover style={styles.picBody} source = {require('../assets/Images/pic11.png')}  />
    </Card>

    <ScrollView>
      <View style={styles.loginBody} >
        <View style={{flexDirection:'row',}}>
        <Text style={{color:'black',marginTop:-20, fontSize:20,fontWeight:'bold'}}>Login</Text>
        <Text style={{color:'black',marginTop:-20,marginLeft:80, fontSize:10,fontWeight:'bold'}}>
        <Button onPress={()=>{GoToForgotPassword()}} >
          Forgot Password ?
       </Button>
        </Text>

        </View>
  
{/*  EMAIL INPUT*/ }
     <TextInput
          placeholder="Enter Email"
          style={styles.inputText}
          autoCapitalize="none"
          onChangeText={email => setEmail(email)}
          //onChangeText={handleChanges()}
          value={email}
    />
 {/*  PASSWORD INPUT*/ }
    <TextInput 
      placeholder="Enter Password"
      secureTextEntry={true}
      style={styles.inputText}
     // onChangeText={handleChanges()}
     onChangeText={password => setPassword(password)}
      value={password}
    />
 {/* hitLogin Buton*/}
<AnimateLoadingButton  
          ref={c => (loadingButton = c)}
          height={40}
          width={200}
          title="login"
          titleFontSize={20}
          titleColor="rgb(255,255,255)"
          backgroundColor="black"
          borderRadius={5}
          onPress={()=>{hitLogin()}}
  />
     </View>
     </ScrollView> 
  </View>
  );
  }
const styles = StyleSheet.create({
  container: {
    flex:1,
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
    flex:1,
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


export default Login;