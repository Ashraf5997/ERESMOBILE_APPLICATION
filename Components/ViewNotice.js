
import React, {useEffect} from "react";
import axios from "react-native-axios";

import {
       View, StyleSheet,Text,Image,ScrollView,TextInput,ActivityIndicator,
} from "react-native";

import{ Card} from 'react-native-paper';
 
 // MAIN FUNCTION START
 const  ViewNotice = ({route ,navigation}) => {
    
    const{noticeid}=route.params;
    const [ notice , setNotice]= React.useState();
    const [loader , setLoader]= React.useState(true);
    const CurrentDate =   new Date().toDateString();
  // USE EFFECT
  useEffect(()=>{
     getNotice();
  },[])

 // FETCHING ALL NOTICE  DATA
 const getNotice= async()=>{

    axios.get(`http://192.168.0.100:9000/api/v1/e-res/notice/${noticeid}`).then(
        (response)=>{
                    let data = response.data ;//alert(JSON.stringify(data))
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
       
        {  notice.map((data, index)=>(
                <Card style={{
                  backgroundColor:(CurrentDate == data.edate)?"#C5EEDC":"white",
                 //minHeight:500,
                  padding:10,
                  marginTop:20,
                  width:320,
                  marginLeft:20,
                  alignItems:'center'
                }}
               >
                <Text style={styles.header}>Ecommplify Solution</Text>
                <Text style={styles.notice}> NOTICE</Text>
                <Text style={styles.date}>DATE:{data.noticeon}</Text>
                <Text style={styles.title}>{data.noticetitle}</Text>
                <Text style={styles.msg}>{data.noticemsg}</Text>
                <Text style={styles.noticeby}>{data.noticeby}</Text>
                  <View style={{flexDirection:'row'}}>
                     <Card style={styles.maincard}>
                     </Card>  
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
  header:{
      fontSize:30,
      fontWeight:"bold",
      color:"lightseagreen",
      textAlign:'center',
      marginTop:10,

  },
  notice:{
    fontSize:22,
    fontWeight:"bold",
    color:"red",
    textAlign:'center',
    marginTop:15,

},
date:{
    fontSize:13,
    //fontWeight:"bold",
    color:"orange",
    textAlign:'right',
    marginTop:5,

},
title:{
    fontSize:17,
    fontWeight:"bold",
    color:"orange",
    textAlign:'center',
    marginTop:5,

},
msg:{
    fontSize:17,
   // fontWeight:"bold",
    color:"black",
    //textAlign:'center',
    marginTop:0,padding:40,

},
noticeby:{
    fontSize:15,
    fontWeight:"bold",
    color:"orange",
    textAlign:'left',
    marginTop:25,

},

});


export default ViewNotice;