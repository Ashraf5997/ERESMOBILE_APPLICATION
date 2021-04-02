import React, {useEffect} from "react";
import { Text, View,StyleSheet,Image,ScrollView,ActivityIndicator,Alert,ToastAndroid } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import{ Avatar, Card, Title,Icon,Button} from 'react-native-paper';
import axios from "react-native-axios";
import AsyncStorage from "@react-native-community/async-storage";

 // ICONS 
 
 import { MaterialIcons } from '@expo/vector-icons';
 import { Fontisto } from '@expo/vector-icons';
 import { Zocial } from '@expo/vector-icons';
 import { FontAwesome5 } from '@expo/vector-icons';
 import { Entypo } from '@expo/vector-icons';
 import { Ionicons } from '@expo/vector-icons';
 import { FontAwesome } from '@expo/vector-icons';
 import { AntDesign } from '@expo/vector-icons';
 import { MaterialCommunityIcons } from '@expo/vector-icons';
 import { Redirect } from 'react-router-native';

  function Attendance({route,navigation}) {
    
   // USE EFFECT
   useEffect(()=>{
   // updateEntry();
    getloginData();
    getAttendanceById(); 
    getDaysByMonth(cmonth) ;
  },[])

  //let[userid , setUserId] = React.useState()
  //let[username , setUserName] = React.useState()
  const[btnName , setBtnName] = React.useState('0');
  const[btnColor , setBtnColor] = React.useState('0');
  const[userData, setUserData] = React.useState(['']);
  const { id , name } = route.params;

  const getloginData= async()=>{
   setUserData(JSON.parse( await  AsyncStorage.getItem("userData")));
  //let data = JSON.parse( await  AsyncStorage.getItem("userData"))
  // setUserId( data[0].id); setUserName(data[0].fullname);
  }
  let userid,username;
  if(id) userid = id;
  if(name!=0) username = name;
  //let userid = id;//= userData[0].id;
  //let username = userData[0].fullname;

  const months =[" ","January" ,"February" , " March" ,"April" , "May" ,"June" ,"July","August","September",
  "October","November" ,"December"] 

  //const {EmpId} = useParams(); 

  const [noEntry , setNoEntry]= React.useState(0);
  let userdata;
  let janC=0, febC=0 ,marC=0, aprC=0,mayC=0,junC=0,julC=0,augC=0,sepC=0,octC=0,novC=0,decC=0;
  let cmonth = new Date().getMonth()+1; 
  let cday = new Date().getDay(); 
  const [ itsMe , setItsMe] = React.useState(false);
  const [ Days , setDays] = React.useState([]);
  const [ monthNo, setMonthNo] = React.useState(cmonth)
  const [ confirmdel , setConfirmdel] = React.useState(false);
  const [ invalidId,setInvalidId]     = React.useState();
  const [ isLoader,setLoader]         = React.useState(true);
  const [ isLoader2,setLoader2]         = React.useState(true);
  const [ datanotfound , setDNF]      = React.useState(false)
  const [ datanotfound2 , setDNF2]      = React.useState(false)
  const [ attendance , setAttendance] = React.useState([]);
  const [ duplicate , setDuplicate]   = React.useState([]);
  const [ month , setMonth] = React.useState(cmonth);
  const [ count , setcount] = React.useState();
  const [ Djan , setDjan]   = React.useState();
  const [ Dfeb , setDfeb]   = React.useState();
  const [ Dmar , setDmar]   = React.useState();
  const [ Dapr , setDapr]   = React.useState();
  const [ Dmay , setDmay]   = React.useState();
  const [ Djun , setDjun]   = React.useState();
  const [ Djul , setDjul]   = React.useState();
  const [ Daug , setDaug]   = React.useState();
  const [ Dsep , setDsep]   = React.useState();
  const [ Doct , setDoct]   = React.useState();
  const [ Dnov , setDnov]   = React.useState();
  const [ Ddec , setDdec]   = React.useState();
  const RedirectTo = ()=>{

  }


  // ENTRY ALERT
  const EntryAlert=()=>{
      Alert.alert(
        "Hi "+userData[0].fullname,
            "Are you in office ? ",   
          [
              {
                  text: "NO",
                  onPress: () => console.log(" d Cancel presed"),
                  style: "cancel"
              },
              {
                  text: "YES",
                  onPress: () => insertDate()
              },  
          ],
          {
               cancelable: false }
          );
}

// INSERT DATE FOR TODAY
const insertDate=()=>
{
  let AttendanceData =
  {
      userid    : userData[0].id,
      username  : userData[0].fullname,
      day       : cday,
      month     : cmonth,
      year      : '2021',
      edate     : new Date().toDateString(),
      etime     :new Date().toLocaleTimeString()
  }
   axios.post("http://192.168.0.100:9000/api/v1/e-res/createAttendance",AttendanceData).then(
     (response)=>{
         if(response.data == 400){
            ToastAndroid.show("something went wrong please try later !", ToastAndroid.SHORT)
         }
         else{
             let data = response.data;
             getAttendanceById(); 
             getDaysByMonth(cmonth) ;
           //  updateEntry();
             ToastAndroid.show("Entry done successfully !", ToastAndroid.SHORT)
             
         }
     }).
          catch((error)=>{ 
            alert(error);
          console.log(error)
     })          
}   


// FETCHING ALL EMPLOYEES  ATTENDANCE DATA
const getAttendanceById= ()=>{
  setDNF(false);
  axios.get('http://192.168.0.100:9000/api/v1/e-res/attendanceById/'+userid).then(
     (response)=>{
      // jan
        let  tdays = response.data;
      if(tdays.success == 404)
      {
          setDNF(true);
          setLoader(false)
      }
      else{
        setLoader(false)
        tdays.map((data1 , index)=>(
         (data1.month ==1)?janC++:"" ))
         setDjan(janC)
    // feb
         tdays.map((data2 , index)=>(
         (data2.month ==2)?febC++:"" ))
         setDfeb(febC)
    // mar
         tdays.map((data2 , index)=>(
         (data2.month ==3)?marC++:"" ))
         setDmar(marC)
    // apr
         tdays.map((data2 , index)=>(
         (data2.month ==4)?aprC++:"" ))
         setDapr(aprC)
    // may
         tdays.map((data2 , index)=>(
         (data2.month ==5)?mayC++:"" ))
         setDmay(mayC)
    // jun
         tdays.map((data2 , index)=>(
         (data2.month ==6)?junC++:"" ))
         setDjun(junC)
    // jul
         tdays.map((data2 , index)=>(
         (data2.month ==7)?julC++:"" ))
         setDjul(julC)
    // aug
         tdays.map((data2 , index)=>(
         (data2.month ==8)?augC++:"" ))
         setDaug(augC)
    // sep
         tdays.map((data2 , index)=>(
         (data2.month ==9)?sepC++:"" ))
         setDsep(sepC)
    // oct
         tdays.map((data2 , index)=>(
         (data2.month ==10)?octC++:"" ))
         setDoct(octC)
    // noc
         tdays.map((data2 , index)=>(
         (data2.month ==11)?novC++:"" ))
         setDnov(novC)
    // dec
         tdays.map((data2 , index)=>(
         (data2.month ==12)?decC++:"" ))
         setDdec(decC)       
         }
         }).
          catch((error)=>{ 
    //  alert(error)
          console.log(error)
         setLoader(false)
         }
     ) 
}
 // DAYS BY A MONTH
  const getDaysByMonth = (month)=>{
    setMonthNo(month)
    setLoader2(true)
    let dataobj=
    {
        userid    : userid,
        month     : month
    }
    axios.post("http://192.168.0.100:9000/api/v1/e-res/getDaysByMonth",dataobj).then(
    (response)=>{
     // alert(JSON.stringify(response))
      if(response.data.status == 404)
      {
         setDNF2(true); 
         setLoader2(false)
      }
      else{
        let  days = response.data;
        setAttendance(days); 
        setLoader2(false)
        setDNF2(false); 
      }
    }).
    catch((error)=>{ 
         alert(error);
         console.log(error)
         setLoader2(false)
    })   
  }  
         
 // update entry
  const updateEntry=()=>{
  let dataObj =
  {
      userid    : 76,//userData[0].id,
      edate     : new Date().toDateString()
  }
  axios.post("http://192.168.0.100:9000/api/v1/e-res/dateToday",dataObj).then(
    (response)=>{
        let data = response.data;
        if(data.status == 404){
          if(userid == userData[0].id)
          {
            EntryAlert();
          }
          else{
            Alert.alert("SORRY "+userData[0].fullname, `you are visiting attendance sheet of ${username}`)
          }
        }else{
          Alert.alert(    "Hi "+userData[0].fullname, ` we found you are in office already!`)
        } 
     })   
}

// DELETE ATTN
const deleteAttn = (id)=>{
  axios.delete("http://192.168.0.100:9000/api/v1/e-res/deleteAttendanceById/"+id).then(
      (response)=>{
          if(response.data == 400){
            ToastAndroid.show("Something went wrong try later !", ToastAndroid.SHORT)
          }
          else{
                ToastAndroid.show("Deleted Successfully !", ToastAndroid.SHORT)
             //   updateEntry();
                getAttendanceById(); 
                getDaysByMonth(cmonth) ;
            }
        }).
           catch((error)=>{ 
           alert(error);
           console.log(error)  
        }
       )  
}

// CONFIRM DELETE
const confirmDelAttn=(id , edate)=>
{

  if(userData[0].id == userid)
  {
        Alert.alert(
          "Hi "+userData[0].fullname,
          "Are you sure '"+ edate +"' will remove  from your working days ? ",   
        [
            {
                text: "NO",
                onPress: () => console.log(" d Cancel presed"),
                style: "cancel"
            },
            {
                text: "YES",
                onPress: () => deleteAttn(id)
            },  
        ],
        {
            cancelable: false }
        );
  }else{
    alert("SORRY YOU ARE NOT AUTHORISED")
  }
}


  return (
    <View style={styles.container}>
    {/*LOGO BAR */}
    <View style={{flexDirection:'row'}}>
      <Image style={styles.fadingText} source = {require('../assets/Images/officeLogo.png')}
          style={{ width:40, height:40 , marginLeft:9,marginTop:5}}
      /> 
      <Text style={{color:'white',fontWeight:'bold',marginLeft:150,marginTop:15}}>{username}</Text>
     </View>
     

     {/* MAIN BODY */}
     <ScrollView style={styles.scrollview}>
      {/* SPINNER LOADER */}
     {(isLoader)? 
         <View>
                 <ActivityIndicator  style={{marginTop:240}} size="large" color="lightseagreen" />
                <Text style={{marginLeft:145,marginTop:10}}>Please wait...</Text>
         </View>  
        :  
        <View>
         {(datanotfound)? 
           <View style={{alignItems:'center',marginTop:200}}>
           <Fontisto name="folder" size={35} color="grey" />
           <Text style={{fontSize:20,fontWeight:'bold',color:'grey'}}>ZERO WORKING DAYS</Text>
           </View>
           :
           <View>
                <View style={{flexDirection:'row',marginTop:4}}>
                      <Card style={styles.card} onPress={()=>{getDaysByMonth(1)}}>
                            <Text style={styles.text}>
                              JANUARY  [ {Djan} ]
                            </Text>    
                      </Card>

                      <Card style={styles.card}  onPress={()=>{getDaysByMonth(2)}}>
                          <Text style={styles.text}>
                              FEBRUARY  [ {Dfeb} ]
                            </Text>  
                      </Card>
                      <Card style={styles.card}  onPress={()=>{getDaysByMonth(3)}}>
                          <Text style={styles.text}>
                              MARCH  [ {Dmar} ]
                            </Text>    
                      </Card>
                </View>

                <View style={{flexDirection:'row',marginTop:4}}>
                      <Card style={styles.card} onPress={()=>{getDaysByMonth(4)}}>
                            <Text style={styles.text}>
                              APRIL  [ {Dapr} ]
                            </Text> 
                      </Card>

                      <Card style={styles.card}  onPress={()=>{getDaysByMonth(5)}}>
                          <Text style={styles.text}>
                              MAY  [ {Dmay} ]
                            </Text>  
                      </Card>
                      <Card style={styles.card}  onPress={()=>{getDaysByMonth(6)}}>
                          <Text style={styles.text}>
                              JUNE  [ {Djun} ]
                            </Text>    
                      </Card>
               </View>
                <View style={{flexDirection:'row',marginTop:4}}>
                        <Card style={styles.card} onPress={()=>{getDaysByMonth(7)}}>
                              <Text style={styles.text}>
                                JULY  [ {Djul} ]
                              </Text> 
                        </Card>

                        <Card style={styles.card}  onPress={()=>{getDaysByMonth(8)}}>
                            <Text style={styles.text}>
                                AUGUST  [ {Daug} ]
                              </Text>  
                        </Card>
                        <Card style={styles.card}  onPress={()=>{getDaysByMonth(9)}}>
                            <Text style={styles.text}>
                                SEPTEMBER  [ {Dsep} ]
                              </Text>    
                        </Card>
                </View>
                  <View style={{flexDirection:'row',marginTop:4}}>

                          <Card style={styles.card} onPress={()=>{getDaysByMonth(10)}}>
                                <Text style={styles.text}>
                                  OCTOBER  [ {Doct} ]
                                </Text> 
                          </Card>

                          <Card style={styles.card}  onPress={()=>{getDaysByMonth(11)}}>
                              <Text style={styles.text}>
                                  NOVENBER  [  {Dnov} ]
                                </Text>  
                          </Card>
                          <Card style={styles.card}  onPress={()=>{getDaysByMonth(12)}}>
                              <Text style={styles.text}>
                                  DECEMBER  [ {Ddec} ]
                                </Text>    
                          </Card>
                  </View>
                <Text style={{color:'white',fontSize:18,marginTop:8,fontWeight:'bold',paddingLeft:60,backgroundColor:'black'}}>
                    Total  working days on  : {months[monthNo]}
                 </Text>

      {/* SPINNER LOADER */}
      {(isLoader2)? 
         <View>
                 <ActivityIndicator  style={{marginTop:150}} size="large" color="lightseagreen" />
                <Text style={{marginLeft:145,marginTop:10}}>Please wait...</Text>
         </View>  
        : <View>
           {(datanotfound2)? 
           <View style={{alignItems:'center',marginTop:140}}>
           <Fontisto name="folder" size={35} color="grey" />
           <Text style={{fontSize:20,fontWeight:'bold',color:'grey'}}>ZERO</Text>
           </View>
           : <View>
                 {/* DAYS IN A WEEK */}
                 {
                   attendance.map((data)=>(
                   <View>
                      <Card style={{height:35,marginTop:10}} >
                        <View   style={{flexDirection:'row'}}>
                        {(userid == userData[0].id)?
                        <View>
                         <Card style={{marginLeft:8, height:35,width:35,backgroundColor:'white'}}>
                            <Button style={{marginLeft:-12}} onPress={()=>{confirmDelAttn( data.id , data.edate)}}>
                                <MaterialIcons  name="auto-delete" size={20} color="red" />
                            </Button> 
                          </Card>
                          </View>
                          :<View></View>
                        }
                        <Text   style={{marginLeft:12,paddingTop:7,color:'black',fontSize:14}}> {data.edate}</Text>
                        <Text   style={{paddingTop:7,marginLeft:30,color:'black',fontSize:14}}>Entry Time : {data.etime}</Text>
                        </View>
                      </Card>
                   </View>

                   ))
                 }
            </View>}
        </View> }
  

         </View>}
       </View>}
  </ScrollView>
  {(userid == userData[0].id)?
    <View style={{height:40,backgroundColor:'lightseagreen',alignItems:'center'}}>
      <MaterialIcons name="alarm-add" size={40} color="white" onPress={()=>{updateEntry()}} />
    </View>
    :<View></View>
  }
</View>
  );
}
   
const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor:"black",
        //paddingTop: StatusBar.currentHeight,
       },
        scrollview:{ 
        backgroundColor:'#EBEEEE',
        marginTop:15,
       },
       card:{
       // flex:1,
        backgroundColor:'white',
        height:30,
        fontSize:14,
        marginTop:3,
        width:115,
        marginLeft:3.6,
      },
      text:{
        fontSize:12,fontWeight:'bold',
        color:'black',
        marginLeft:10,marginTop:7
      },

    
    });
    

export default Attendance;