import * as React from 'react';
import {  View } from 'react-native';
//import { NavirgationContaine } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Modal, Portal, Text, Button, Provider, NavirgationContaine } from 'react-native-paper';


export default function App() {
  const Tab = createBottomTabNavigator();
const [visible, setVisible] = React.useState(false);

const showModal = () => setVisible(true);
const hideModal = () => setVisible(false);
const containerStyle = {backgroundColor: 'white', padding: 20};
  return (
    <View>
    <Provider>
    <Portal>
      <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle}>
        <Text>Example Modal.  Click outside this area to dismiss.</Text>
      </Modal>
    </Portal>
    <Button style={{marginTop: 30}} onPress={showModal}>
      Show
    </Button>
  </Provider>
  </View>
  );
}