import React, { useState, useEffect } from 'react';
import { View, Button, StyleSheet } from 'react-native';
import { Camera } from 'expo-camera';

export default function CameraScreen({ navigation }) {
  const [hasPermission, setHasPermission] = useState(null);
  const [cameraRef, setCameraRef] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const takePicture = async () => {
    if (cameraRef) {
      const photo = await cameraRef.takePictureAsync({ base64: true });
      navigation.navigate('Result', { image: photo.base64 });
    }
  };

  if (hasPermission === null) return <View />;
  if (hasPermission === false) return <View><Text>No access to camera</Text></View>;

  return (
    <Camera style={styles.camera} ref={setCameraRef}>
      <Button title="Capturar" onPress={takePicture} />
    </Camera>
  );
}

const styles = StyleSheet.create({
  camera: {
    flex: 1
  }
});
