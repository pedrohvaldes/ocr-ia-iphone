import React, { useRef } from 'react';
import { View, Button, StyleSheet, Text } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';

type Props = NativeStackScreenProps<RootStackParamList, 'Camera'>;

export default function CameraScreen({ navigation }: Props) {
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef<CameraView>(null);

  if (!permission) return <View />;
  if (!permission.granted) {
    return (
      <View>
        <Text>Sem acesso à câmera</Text>
        <Button title="Permitir acesso" onPress={requestPermission} />
      </View>
    );
  }

  const takePicture = async () => {
    if (cameraRef.current) {
  const photo = await cameraRef.current.takePictureAsync({ base64: true });
  if (photo.base64) {
    navigation.navigate('Result', { image: photo.base64 });
  } else {
    console.error("Erro: base64 não gerado");
  }
}

  };

  return (
    <View style={styles.container}>
      <CameraView style={styles.camera} facing="back" ref={cameraRef} />
      <Button title="Capturar" onPress={takePicture} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  camera: { flex: 1 }
});
