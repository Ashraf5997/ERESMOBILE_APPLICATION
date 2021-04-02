
import  React,{useEffect} from "react";
import axios from "react-native-axios";

import {
       View, StyleSheet,ToastAndroid,ActivityIndicator
       ,Text,Image,ScrollView,TextInput
} from "react-native";

 import{ 
        Card,Button,RadioButton
 } from 'react-native-paper';

 import { Zocial } from '@expo/vector-icons';
 import { MaterialIcons } from '@expo/vector-icons';
 import { Ionicons } from '@expo/vector-icons';
 import { FontAwesome } from '@expo/vector-icons';
 import { AntDesign } from '@expo/vector-icons';
 import { MaterialCommunityIcons } from '@expo/vector-icons';
 import AsyncStorage from "@react-native-community/async-storage";
 
 // MAIN FUNCTION START
    const  LandingPage = ({route,navigation}) => {

    const [inputText, onChangeText] = React.useState('');
    const [checked, setChecked] = React.useState('Employees');
    const [userData, setUserData] = React.useState(['']);
    const [totalEmp, setTotalEmp] = React.useState();
    const [totalTask, setTotalTask] = React.useState();
    const [totalAttn, setTotalAttn] = React.useState();
    const [totalNotice, setTotalNotice] = React.useState();
    const [ showmore, setShowMore] = React.useState(false);
    //const { userid } = route.params;
    
    const getloginData= async()=>{
        setUserData(JSON.parse( await  AsyncStorage.getItem("userData" )));
        getAllEmpData(); 
        getAllAttendance(); 
        getAllTaskData(); 
        getAllNoticeData();
    }
    const Logout = async()=>{
       let logout = await AsyncStorage.clear();
       if(logout == null){
           navigation.replace('Login')
       }else{
           alert("error")
       }
    }
   

 // USE EFFECT
 useEffect(()=>{
        getloginData(); 
   
} ,[2])

// FETCHING ALL EMPLOYEES DATA
const getAllEmpData= async ()=>{
    axios.get("http://192.168.0.100:9000/api/v1/e-res/employees").then(
        (response)=>{
                    let countemp = Object.keys(response.data).length;
                    setTotalEmp(countemp)
                    getAllAttendance()
        }).
        catch((error)=>{ 
        alert(error)
    })
}

// FETCHING ALL TASK DATA
const getAllTaskData= async ()=>{
    axios.get('http://192.168.0.100:9000/api/v1/e-res/task').then(
        (response)=>{
            //alert(JSON.stringify(response.data))
                    let counttask = Object.keys(response.data).length;
                    setTotalTask(counttask)
        }).
        catch((error)=>{ 
        alert(error)
    })
}

// FETCHING ALL ATTENDANCE DATA
const getAllAttendance= async ()=>{
    axios.get("http://192.168.0.100:9000/api/v1/e-res/attendances").then(
        (response)=>{
                   let countattn = Object.keys(response.data).length;
                   setTotalAttn(countattn);
            }).
             catch((error)=>{ 
             alert(error)
            }
        ) 
}

// FETCHING ALL NOTICE DATA
const getAllNoticeData= async ()=>{
    axios.get(`http://192.168.0.100:9000/api/v1/e-res/notices`).then(
        (response)=>{
                   let countnotice = Object.keys(response.data).length;
                   setTotalNotice(countnotice);
            }).
             catch((error)=>{ 
             alert(error)
            }
        ) 
}

// quick search 
const QuickSearach = ()=>{
    if(!inputText)
    {
        ToastAndroid.show(`Please search by id`, ToastAndroid.SHORT)
    }else{
        onChangeText("")
        if(checked == "Employees")
        {
            axios.get(`http://192.168.0.100:9000/api/v1/e-res/employee/${inputText}`).then(
                (response)=>{
                         let countnotice = Object.keys(response.data).length;
                          //  alert(JSON.stringify(response.data))
                          // setTotalNotice(countnotice);
                          if(response.data.success == 404)
                          {
                              alert( `EMPLOYEES NOT EXIST WITH THIS ID :  ${inputText}`)
                          }
                          else
                          {
                              navigation.navigate('Profile',{id : inputText})
                          }
                    }).
                     catch((error)=>{ 
                     alert(error)
                    }
                ) 
        }
        if(checked == "Notice"){
            axios.get(`http://192.168.0.100:9000/api/v1/e-res/notice/${inputText}`).then(
                (response)=>{
                           let countnotice = Object.keys(response.data).length;
                          // setTotalNotice(countnotice);
                        //  alert(JSON.stringify(response.data))
                          if(response.data.success == 404)
                          {
                              alert( `NOTICE NOT EXIST WITH THIS ID :  ${inputText}`)
                          }
                          else
                          {
                              navigation.navigate('ViewNotice',{noticeid : inputText})
                          }

                    }).
                     catch((error)=>{ 
                     alert(error)
                    }
                ) 
        }
        if(checked == "Task"){
            axios.get(`http://192.168.0.100:9000/api/v1/e-res/task/${inputText}`).then(
            (response)=>{
                    let countnotice = Object.keys(response.data).length;
                   // setTotalNotice(countnotice);
                   if(response.data.success == 404)
                   {
                       alert( `TASK NOT EXIST WITH THIS ID : ${inputText}`)
                   }
                   else
                   {
                       navigation.navigate('ViewTask',{Data : response.data})
                   }

                }).
                catch((error)=>{ 
                alert(error)
                }
            ) 
        }
    }
}
  return (
  
  <View style={styles.container}>

    <View style={{flexDirection:'row'}}>
      <Image style={styles.fadingText} source = {require('../assets/Images/officeLogo.png')}
          style={{ width:50, height:50 , marginLeft:10,marginTop:10}}
      /> 
    </View>
    <Button style={{width:50,backgroundColor:'black',marginTop:-40,marginLeft:290}} onPress={()=>{Logout()}}>
        <Ionicons name="log-out-outline" size={24} color="white" />
    </Button>
        <Card style={{height:160,marginTop:10,width:300,alignItems:'center',textAlign:'center',marginLeft:30,backgroundColor:'white'}}>
            {(!showmore)?
            <View>
        <AntDesign name="down" style={{paddingLeft:250,paddingTop:10}} size={20} color="black"  onPress={()=>{setShowMore(true)}}/>
            </View>:
            <View>
        <AntDesign name="up" style={{paddingLeft:250,paddingTop:10}} size={20} color="black"  onPress={()=>{setShowMore(false)}}/>
            </View>
        }
             
                    <Image style={styles.fadingText} source = {require('../assets/Images/profilePic.png')}
                     style={{ width:70, height:70,borderRadius:45,marginTop:-20,marginLeft:25,alignItems:'center'}}
                     onPress={()=>{Ala()}} /> 
                    <Text style={{fontSize:18,fontWeight:'bold',textAlign:'center'}}>{userData[0].fullname}</Text>
                    <Text style={{fontSize:14,textAlign:'center',fontWeight:'bold'}}>{userData[0].qualification}</Text>
                    <Text style={{fontSize:12,textAlign:'center',fontWeight:'bold'}}>{userData[0].designation}</Text>
                    <Text style={{fontSize:12,textAlign:'center'}}>{userData[0].email}</Text>
                   

                    {(showmore)?
                    <View style={{height:130,backgroundColor:'white',width:300}}>
                            <Text style={{fontSize:14,textAlign:'center'}}>Office ID :  {userData[0].Id_no}</Text>
                            <Text style={{fontSize:14,textAlign:'center'}}>User Id   :  {userData[0].id}</Text>
                            <Text style={{fontSize:14,textAlign:'center'}}>Contact   :  {userData[0].contact}</Text>
                            <Text style={{fontSize:14,textAlign:'center'}}> Address  :  {userData[0].address}</Text>
                            <Text style={{fontSize:14,textAlign:'center'}}>User Type :  {userData[0].accessibility}</Text>
                            <Text style={{fontSize:14,textAlign:'center'}}>Password  :  {userData[0].password}</Text> 
                    </View>:<View>
                    </View>
                   }
        </Card>
        
    <ScrollView style={{backgroundColor:'#EBEEEE',marginTop:-50}}>
         <View style={{flexDirection:'row',marginTop:45}}>
             <Card style={styles.card} onPress={()=>{ navigation.navigate('Employees');}}>
             <Card style={styles.numCard}>
                 <Text style={styles.text}> [ {( !totalEmp)?<ActivityIndicator size="small" color="lightseagreen" />  :totalEmp} ]</Text>
             </Card>
                 <FontAwesome style={{marginTop:12}} name="users" size={23} color="lightseagreen" />
                <Text style={styles.text}>
                 EMPLOYEES
                 </Text>  
             </Card>

         <Card style={styles.card}  onPress={()=>{ navigation.navigate('Attendance', {id: userData[0].id,name:userData[0].fullname});}}>
            <Card style={styles.numCard}>
                 <Text style={styles.text}> [ {( !totalAttn)?<ActivityIndicator size="small" color="lightseagreen" />  :totalAttn} ]</Text>
             </Card>
         <MaterialCommunityIcons style={{marginTop:12}} name="calendar-clock" size={25} color="lightseagreen" />
             <Text style={styles.text}>
                 ATTENDANCE  
              </Text>   
         </Card>
         </View>

         <View style={{flexDirection:'row'}}>
         <Card style={styles.card}   onPress={()=>{ navigation.navigate('Task', {id: userData[0].id,name:userData[0].fullname})}}>
         <Card style={styles.numCard}>
                 <Text style={styles.text}> [ {( !totalTask)?<ActivityIndicator size="small" color="lightseagreen" />  :totalTask} ]</Text>
             </Card>
         <MaterialIcons style={{marginTop:12}} name="add-task" size={27} color="lightseagreen" />    
            <Text style={styles.text} icon="camera">
                TASK
            </Text> 
         </Card>
         <Card style={styles.card} onPress={()=>{navigation.navigate('NoticeList')}}>
             <Card style={styles.numCard}>
                 <Text style={styles.text}> [ {( !totalNotice)?<ActivityIndicator size="small" color="lightseagreen" />  :totalNotice} ]</Text>
             </Card>
         <Zocial style={{marginTop:12}} name="pinboard" size={27} color="lightseagreen" /> 
         <Text style={styles.text} icon="camera">
             NOTICE
         </Text>
         </Card>
         </View>
         
         <Card style={{height:65,marginTop:15}}>
             <Text style={{paddingLeft:15}}>Quick Search</Text>
            <View style={{flexDirection:'row',marginTop:5}}>
                <Card style={styles.radioCard}>
                <View style={{flexDirection:'row'}}>
                  <Text style={styles.radioText}>Employees </Text>
                    <RadioButton
                        value="first"
                        status={ checked === 'Employees' ? 'checked' : 'unchecked' }
                        onPress={() => setChecked('Employees')}
                    />
                </View>
                </Card>
                <Card style={{ height:35,width:85,backgroundColor:'#EBEEEE',marginLeft:15 }}>
                <View style={{flexDirection:'row'}}>
                  <Text style={styles.radioText}>Task </Text>
                    <RadioButton
                        value="first"
                        status={ checked === 'Task' ? 'checked' : 'unchecked' }
                        onPress={() => setChecked('Task')}
                    />
                </View>
                </Card>
                <Card style={{  height:35,width:95,backgroundColor:'#EBEEEE',marginLeft:15 }}>
                <View style={{flexDirection:'row'}}>
                  <Text style={styles.radioText}>Notice </Text>
                    <RadioButton
                        value="first"
                        status={ checked === 'Notice' ? 'checked' : 'unchecked' }
                        onPress={() => setChecked('Notice')}
                    />
                </View>
                </Card>
            </View>
         </Card>
         <View style={{flexDirection:'row',height:50,backgroundColor:'white',alignItems:'center'}}>
            <TextInput style={{paddingLeft:35,width:315, height:50}}placeholder="search by id " value={inputText}  onChangeText={text => onChangeText(text)}></TextInput>
            <Button style={{marginLeft:-15}}  onPress={()=>{QuickSearach()}}>
                <AntDesign  name="search1" size={40} color="lightseagreen"  />
            </Button>
        </View>
         
    </ScrollView>

  </View>
    ); }
const styles = StyleSheet.create({
container: {
    flex:1,
 //  backgroundColor:"#61BFB2",
 backgroundColor:'black'
    //paddingTop: StatusBar.currentHeight,
  },
  card:{
    flex:1,
    backgroundColor:'white',
    height:100,
    padding:28,
    marginLeft:5,
    marginRight:5,
    marginTop:20,
    
  },
  text:{
      fontSize:18,
      fontWeight:'bold',
      color:'grey',
      textAlign:'center'
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
  numCard:{
    marginLeft:15,marginTop:-20,height:22,width:80,borderRadius:80,backgroundColor:'#EBEEEE'
  },
  radioCard:{
    height:35,width:120,backgroundColor:'#EBEEEE',marginLeft:15 
  },
  radioText:{
      fontSize:15,paddingTop:8,paddingLeft:8
  }



});


export default LandingPage;