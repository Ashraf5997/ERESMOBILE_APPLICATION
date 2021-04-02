

import React, {useEffect} from "react";
import axios from "react-native-axios";

import {
       View, StyleSheet,Text,Image,ScrollView,ActivityIndicator,
} from "react-native";

import{ 
    Card,Button, 
 } from 'react-native-paper';

 // ICONS 
 
 import { MaterialCommunityIcons } from '@expo/vector-icons';

 // MAIN FUNCTION START
 const  NoticeList = ({route ,navigation}) => {
 
    const [ notice , setNotice]= React.useState();
    const [loader , setLoader]= React.useState(true);
    const CurrentDate =   new Date().toDateString();
  // USE EFFECT
  useEffect(()=>{
     getAllNotice();
  },[])

 // FETCHING ALL NOTICE  DATA
 const getAllNotice= async()=>{
    axios.get("http://192.168.0.100:9000/api/v1/e-res/notices").then(
        (response)=>{
                    let data = response.data ;
                    setNotice(data); 
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

            <View style={{flexDirection:'row'}}>
                <Image style={styles.fadingText} source = {require('../assets/Images/officeLogo.png')}
                    style={{ width:40, height:40 , marginLeft:9,marginTop:5}}
                /> 
            </View>

     <ScrollView style={{backgroundColor:'#EBEEEE',marginTop:0}}>
        {(loader)?
         <View>
                <ActivityIndicator  style={{marginTop:240}} size="large" color="lightseagreen" />
                <Text style={{marginLeft:145,marginTop:10}}>Please wait...</Text>
         </View>       
        :  
        <View>
        {
               notice.map((data, index)=>(
                <Card style={{
                  backgroundColor:(CurrentDate == data.edate)?"#C5EEDC":"white",
                  height:40,
                  padding:15,
                  marginTop:10,
                  width:320,
                  marginLeft:20
                }}
                >
                  <View style={{flexDirection:'row'}}>

                        <Card style={{marginLeft:-15,marginTop:-15, height:40,width:45,backgroundColor:'white'}}>
                            <Button style={{marginLeft:-12,marginTop:-3}} onPress={()=>{navigation.navigate('ViewNotice',{noticeid:data.id})}}>
                               <MaterialCommunityIcons name="file-eye" size={24} color="lightseagreen" />
                            </Button> 
                         </Card>
                    <Text style={styles.text}  >
                         DATE :  {data.noticeon}
                    </Text> 
                    <Text style={styles.text}  >
                         Time :  {data.noticetime}
                    </Text> 
                      
                  </View>
               </Card>
               ))
        }
        </View>
           
        }
     </ScrollView>
    
    </View>

    ); }


const styles = StyleSheet.create({
container: {
    flex:2,
    backgroundColor:"black",
},
  text:{
      fontSize:13,
      fontWeight:'bold',
      color:'black',
      marginLeft:25,
      marginTop:-3
  },
});


export default NoticeList;