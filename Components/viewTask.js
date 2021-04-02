import React, {useEffect} from "react";
import { Text,Share, View,StyleSheet,Image,ScrollView,ActivityIndicator,Alert,ToastAndroid} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import{ Avatar, Card, Title,Icon,Button,Paragraph,Modal,Provider,Portal} from 'react-native-paper';
import axios from "react-native-axios";
import AsyncStorage from "@react-native-community/async-storage";
import { TextInput } from "react-native-gesture-handler";
//import {Picker} from '@react-native-picker/picker';

 // ICONS 
 import { SimpleLineIcons } from '@expo/vector-icons';
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
 import { Feather } from '@expo/vector-icons';

  function viewTask({route,navigation}) {
  let cmonth = new Date().getMonth()+1; 
    
   // USE EFFECT
   useEffect(()=>{
     getloginData();
     getAllTaskByDay(edate);
   },[])
  // const [selectedValue, setSelectedValue] = React.useState("java");
  const[userData, setUserData] = React.useState(['']);
  const [ isLoader,setLoader]         = React.useState(true);
  const { edate , userid , username, Data} = route.params;


  const [task , setTask] = React.useState(['']);
  const [inputText, onChangeText] = React.useState(0);
  const [updateId,setUpdateId] = React.useState(0);
  const [status,setStatus] = React.useState();


  const getloginData= async()=>{
     setUserData(JSON.parse( await  AsyncStorage.getItem("userData")));
     
  }
  const getAllTaskByDay=(edate)=>{

    if(Data)
    {
      setTask(Data);
      setLoader(false)
    }
    else{
    let Dataobj =
    {
        userid    : userid,//userData[0].id,
        edate     : edate
    }

    axios.post("http://192.168.0.100:9000/api/v1/e-res/getTaskByDay",Dataobj).then(
        (response)=>{
            if(response.data == 400){
                toast.error(" Invalid data try later ! ",{position:'bottom-center'}) 
            }
            else{
                let data = response.data;
                setTask(data);
                setLoader(false)
            //  alert(JSON.stringify(task))
            }
            }).
                    catch((error)=>{ 
                    alert(error);
                    console.log(error)
            })     
  }
}

  // UPDATE TASK STATUS 
  const updateStatus = (edate ,id , status,task)=>{
       if( status == 1){status = 0} else {status =1;}
           let TodoData = {
              status  :  status,
              task    :  task
         }
         axios.put(`http://192.168.0.100:9000/api/v1/e-res/updateTask/${id}`,TodoData).then(
            (response)=>{
                if(response.data == 400){
                   // toast.error(" Invalid data from update task try later ! ",{position:'bottom-center'}) 
                }
                else{
                 let data = response.data;
                     ToastAndroid.show(`Task Id: ${id} status updated successfully!`, ToastAndroid.SHORT)
                 setUpdateId(0);
                 getAllTaskByDay(edate);

                }
            }).
                catch((error)=>{ 
                alert(error);
                console.log(error)
           })          
    }

    // DELETE CONFIRMATION 
    const confDel = (id)=>{
      
      Alert.alert(
        "Hi "+userData[0].fullname,
        "Are you sure task Id '"+ id +"' will remove  from your task list ? ",   
      [
          {
              text: "NO",
              onPress: () => console.log(" d Cancel presed"),
              style: "cancel"
          },
          {
              text: "YES",
              onPress: () => deltTaskById(id)
          },  
      ],
      {
          cancelable: false }
      );
    }
    // DELTE TASK BY TASK  ID
    const deltTaskById =(id)=>{
        axios.delete(`http://192.168.0.100:9000/api/v1/e-res/deleteTask/${id}`).then(
             (response)=>{
                 if(response.data == 400){
                  ToastAndroid.show(`Something went wrong please try later`, ToastAndroid.SHORT)
                 }
                 else{
                        let data = response.data;
                        ToastAndroid.show(`Task Id: ${id} deleted successfully!`, ToastAndroid.SHORT)
                        getAllTaskByDay(edate)
                 }
             }).
                  catch((error)=>{ 
                      alert(error)
                     console.log(error)      
             }
          )  
     }
    const EditTASK = ()=>{
    
    let TodoData = {
        status  :  status,
        task    :  inputText,
    }
    axios.put(`http://192.168.0.100:9000/api/v1/e-res/updateTask/${updateId}`,TodoData).then(
        (response)=>{
            if(response.data == 400){
              ToastAndroid.show(`Something went wrong please try later`, ToastAndroid.SHORT)
            }
            else{
               // let data = response.data;
                ToastAndroid.show(`Task Id: ${updateId} updated successfully!`, ToastAndroid.SHORT)
                getAllTaskByDay(edate);
                setUpdateId("")
            }
        }).
            catch((error)=>{ 
            alert(error);
            console.log(error)
        })              
     }
     // SHARE  TASK
      const ShareWith =  async(id,task,status) => {
      try {
        
          const result = await Share.share(
          {
            message:`TASK ID   : ${id} , STATUS   : ${status} , TASK DESCRIPTION : ${task} `
          },
          
        
       );
        if (result.action === Share.sharedAction) {
          if (result.activityType) {
            alert("1")
            // shared with activity type of result.activityType
          } else {
            // shared
          }
        } else if (result.action === Share.dismissedAction) {
          // dismissed
          alert("2")

        }
      } catch (error) {
        alert(error.message);
      }
  }
 
return(
    
    <View style={styles.container}>
    {(isLoader)? 
        <View>
               <ActivityIndicator  style={{marginTop:250}} size="large" color="lightseagreen" />
               <Text style={{marginLeft:145,marginTop:10,color:'black'}}>Please wait...</Text>
        </View>  
       : 
    <View >

     {/*LOGO BAR */}
            <View style={{flexDirection:'row',backgroundColor:'black'}}>
            <Image style={styles.fadingText} source = {require('../assets/Images/officeLogo.png')}
                style={{ width:40, height:40 , marginLeft:9,marginTop:5}}
            /> 
            <Text style={{color:'white',fontWeight:'bold',marginLeft:150,marginTop:15}}>{username}</Text>
            </View>
         {/* EDIT TASK */}
         {(updateId != 0)?
          <View style={{flexDirection:'row',height:50,backgroundColor:'white',alignItems:'center'}}>
          <TextInput style={{paddingLeft:15,width:315, height:50}}placeholder="add your task here..." value={inputText}  onChangeText={text => onChangeText(text)}></TextInput>
            <Button style={{marginLeft:-15}}  onPress={()=>{EditTASK()}}>
              <MaterialIcons  name="add-circle" size={40} color="lightseagreen"  />
            </Button>
          </View>
          :<View></View>
          }

     {/* MAIN BODY */}
     <ScrollView style={styles.scrollview}>
     <View style={{height:30,backgroundColor:'black'}}>
            <Text style={{fontWeight:'bold',fontSize:15,paddingLeft:30,marginTop:4,color:'white'}}>
                List of total tasks added on {edate}
            </Text>
     </View>
     {
        task.map((data)=>(
         <Card style={styles.card}>
               <View style={{flexDirection:'row'}}> 
                    <Card style={styles.TabBar}>
                        <View style={{flexDirection:'row'}}>
                        <MaterialCommunityIcons style={styles.tabIcons} name="widgets" size={20} color="lightseagreen" />
                        <Text style={styles.TabText}>ID:{data.id}</Text>
                        </View>
                    </Card>
                    <Card style={{marginTop:15, marginLeft:15,height:22,width:120,borderRadius:80}} >
                      <View style={{flexDirection:'row'}}>
                        <Fontisto style={styles.tabIcons} name="date" size={20} color={(data.status == 1)?"lightseagreen":"red"} />
                           <Text style={styles.TabText}>
                           { data.edate }
                        </Text>
                      </View>
                    </Card>
                    <Card style={{marginTop:10, marginLeft:15,height:21,width:80,borderRadius:80}}>
                        <View style={{flexDirection:'row'}}>
                        <Entypo style={styles.tabIcons} name="stopwatch" size={20} color="lightseagreen" />
                        <Text style={styles.TabText}> {data.etime}</Text>
                        </View>
                    </Card>
               </View>
               <View style={{alignItems:'center',marginTop:10}}>
                    <Paragraph style={{fontSize:14,textAlign:'center',padding:10}}>{data.task}</Paragraph>    
               </View>
               <View style={{flexDirection:'row'}}> 
                  {(userid == userData[0].id)? 
                  <View style={{flexDirection:'row'}}>
                   <Card style={{marginTop:15, marginLeft:15,height:25,width:82,borderRadius:80}} onPress={()=>{updateStatus( data.edate, data.id, data.status, data.task)}}>
                      <View style={{flexDirection:'row'}}>
                        <MaterialIcons style={styles.tabIcons} name={(data.status==1)?"done-all":"remove-done"} size={20} color={(data.status == 1)?"lightseagreen":"red"} />
                           <Text style={styles.TabText}>
                            {(data.status == 1)?"Done":<Text style={{color:'red'}}> Pending</Text>}
                        </Text>
                      </View>
                    </Card>
                    <Card style={{ marginTop:15, marginLeft:30,height:22,width:33,borderRadius:80,}} onPress={()=>{ setUpdateId(data.id),setStatus(data.status),onChangeText(data.task)}} >
                        <Feather style={styles.tabIcons} name="edit-3" size={20} color="lightseagreen"  />
                    </Card>
                    
                    <Card style={{ marginTop:15, marginLeft:38,height:22,width:33,borderRadius:80, }} onPress={()=>{confDel(data.id)}}>
                        <MaterialIcons style={styles.tabIcons} name="auto-delete" size={20} color="lightseagreen" />
                    </Card> 
                  </View>:
                  <View style={{flexDirection:'row'}}>
                     <Card style={{marginTop:15, marginLeft:15,height:25,width:82,borderRadius:80}} >
                      <View style={{flexDirection:'row'}}>
                        <MaterialIcons style={styles.tabIcons} name={(data.status==1)?"done-all":"remove-done"} size={20} color={(data.status == 1)?"lightseagreen":"red"} />
                           <Text style={styles.TabText}>
                            {(data.status == 1)?"Done":<Text style={{color:'red'}}> Pending</Text>}
                        </Text>
                      </View>
                    </Card>
                    <Card style={{marginTop:15, marginLeft:30,height:25,width:90,borderRadius:80}} >
                      <View style={{flexDirection:'row'}}>
                        <SimpleLineIcons style={styles.tabIcons} name="user" size={20} color={(data.status == 1)?"lightseagreen":"red"} />
                           <Text style={styles.TabText}>
                            User ID : {data.userid}
                        </Text>
                      </View>
                    </Card>
                   
                  </View>
                 }
                <Card style={{  marginTop:15, marginLeft:60 ,height:22,width:33,borderRadius:80,}}  onPress={()=>{ShareWith(data.id,data.task,data.status)}} >
                  <View >
                    <MaterialCommunityIcons style={styles.tabIcons} name="share-all-outline" size={20} color="lightseagreen"   />
                  </View>
               </Card> 

               </View>
        </Card>

      ))
     }
    </ScrollView>
   
  </View>
}
<View>

  </View>
</View>

); }
const styles = StyleSheet.create({
    container: {
         flex:1,
        backgroundColor:"white",
       // height:255,
        //paddingTop: StatusBar.currentHeight,
       },
        scrollview:{ 
        
        backgroundColor:'#EBEEEE',
        height:565,

       },
       card:{
        flex:1,marginTop:15,
        backgroundColor:'white',
      //  height:150,
        fontSize:14,
        width:345,
        marginLeft:7,
      },
      text:{
        fontSize:13,fontWeight:'bold',
        color:'black',
        marginLeft:10,marginTop:7
      },
      TabBar:{
        marginLeft:10,marginTop:10,height:20,width:85,borderRadius:80,
      },
      TabBar2:{
        marginLeft:130,marginTop:10,height:20,width:80,borderRadius:80
      },
      TabText:{
        fontSize:10,fontWeight:'bold',marginTop:3 
      },
      tabIcons:
      {
        marginLeft:8,marginTop:0,
      }

    
    });
    

export default viewTask;