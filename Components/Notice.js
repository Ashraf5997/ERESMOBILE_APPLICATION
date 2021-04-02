import React, {useEffect} from "react";
import { Text, View,StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import{ Avatar, Card, Title,Icon,Button} from 'react-native-paper';
 // ICONS 
 import { Zocial } from '@expo/vector-icons';
 import { MaterialIcons } from '@expo/vector-icons';
 import { FontAwesome5 } from '@expo/vector-icons';
 import { Entypo } from '@expo/vector-icons';
 import { Ionicons } from '@expo/vector-icons';
 import { FontAwesome } from '@expo/vector-icons';
 import { AntDesign } from '@expo/vector-icons';
 import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Redirect } from 'react-router-native';

 function Notice(props) {
  const[btnName , setBtnName] = React.useState('0');
  const[btnColor , setBtnColor] = React.useState('0');
   let userid = 22;

     const RedirectTo = (btnname)=>{
     if(props.id) userid =props.id;
        setBtnColor(true)
        setBtnName(btnname)
         alert(`${userid} ${btnname} `)
     } 
  return (
      <View style={styles.actionBar}>

       <View style={{flexDirection:'row',marginTop:-12}}> 

                <Card style={styles.viewBtn} onPress={()=>{RedirectTo("Profile")}}>
                        <FontAwesome5 name="address-card" size={20} color="white" />
                        <Text style={{ fontSize:12,fontWeight:'bold',color:(btnName == 'Profile')?'lightseagreen':'white'}}> Profile</Text>
                </Card> 

                <Card style={styles.viewBtn}  onPress={()=>{RedirectTo("Attendance")}}>
                        <MaterialCommunityIcons name="calendar-clock" size={20} color="white" />
                        <Text style={{fontSize:12,color:(btnName == 'Attendance')?'lightseagreen':'white',fontWeight:'bold'}}>Attendance</Text>
                </Card> 

                <Card style={styles.viewBtn}  onPress={()=>{RedirectTo("Task")}}>
                        <MaterialIcons name="add-task" size={20} color="white" />  
                        <Text style={{ fontSize:12,color:(btnName == 'Task')?'lightseagreen':'white',fontWeight:'bold'}}> Task</Text>
                </Card> 

                <Card style={styles.viewBtn}  onPress={()=>{RedirectTo("Notice")}}>
                        <Zocial name="pinboard" size={20} color="white" /> 
                        <Text style={{ fontSize:12,color:(btnName == 'Notice')?'lightseagreen':'white',fontWeight:'bold'}}> Notice</Text>
                </Card> 

                <Card style={styles.viewBtn}  onPress={()=>{RedirectTo("Employees")}}>
                        <FontAwesome name="users" size={20} color="white" />
                        <Text style={{fontSize:12,color:(btnName == 'Employees')?'lightseagreen':'white',fontWeight:'bold'}}>Employees</Text>
                </Card> 
      </View>
      </View>

  );
}
   
const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor:"black",
        //paddingTop: StatusBar.currentHeight,
      },
      card:{
        flex:1,
        backgroundColor:'red',
        height:60,
        padding:15,
        marginTop:10,
        width:320,
        marginLeft:20
      },
      actionBar:{
            backgroundColor:'lightseagreen',
            height:50,    
      },
      viewBtn:{
    
        backgroundColor:'black',
        height:50,//color:white,
        paddingTop:5,paddingLeft:2,
        width:71,
       marginLeft:.7,
        alignItems:'center' ,
        marginTop:15, fontSize:10

      },

      text:{
          fontSize:5,
          color:'black',
          marginLeft:25
      },

      clickButton:{
        backgroundColor:'grey',marginTop:10,borderRadius:50,color:'white'
      },
    
    });
    

export default Notice;