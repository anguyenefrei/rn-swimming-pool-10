import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, Button} from 'react-native';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';

export default function App() {
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [errorMsg, setErrorMsg] = useState(null);
  const setBack = () => {
    setLatitude('0')
    setLongitude('0')
  }
  const getPosition = useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLatitude(location.coords.latitude);
      setLongitude(location.coords.longitude);
    })();
  }, []);

  let text = 'Waiting..';
  if (errorMsg) {
    text = errorMsg;
  } 
  return (
    <View style={styles.container}>
      <Text> Longitude : {longitude} </Text>
      <Text> Latitude : {latitude} </Text>
      <Button onPress={getPosition}style={styles.button} title={'Get Location'}></Button>
      <Button onPress={() => setBack()} style={styles.button} title={'Reset Location'}></Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignContent: 'center',
    marginBottom: 20
  },
  text: {
    paddingBottom: 10
  }
});
