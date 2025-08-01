import React, { useRef, useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, StatusBar, ActivityIndicator, Alert } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';
import { Ionicons } from '@expo/vector-icons';
import { CameraView, Camera } from 'expo-camera';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

export default function HomeScreen({ navigation }: Props) {
  const [loadingCamera, setLoadingCamera] = useState(false);
  const [permissionGranted, setPermissionGranted] = useState(false);
  const cameraRef = useRef<CameraView>(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      if (status === 'granted') setPermissionGranted(true);
    })();
  }, []);

  const openCamera = () => {
    if (!permissionGranted) {
      Alert.alert('Permission denied', 'You need to allow camera access.');
      return;
    }
    setLoadingCamera(true);
    setTimeout(() => {
      navigation.navigate('Camera');
      setLoadingCamera(false);
    }, 100); // pequeno delay para garantir preload
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F9F9F9" />
      
      <Text style={styles.title}>OCR iPhone App</Text>
      <Text style={styles.subtitle}>Capture and recognize text instantly with your camera</Text>

      <TouchableOpacity 
        style={[styles.button, loadingCamera && styles.buttonDisabled]} 
        activeOpacity={0.8} 
        onPress={openCamera} 
        disabled={loadingCamera}
      >
        {loadingCamera ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <>
            <Ionicons name="camera-outline" size={22} color="#fff" style={{ marginRight: 8 }} />
            <Text style={styles.buttonText}>Open Camera</Text>
          </>
        )}
      </TouchableOpacity>

      {/* 🔥 Camera invisível para pré-inicializar */}
      {permissionGranted && (
        <CameraView 
          ref={cameraRef} 
          style={styles.hiddenCamera} 
          facing="back"
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F9F9F9', alignItems: 'center', justifyContent: 'center', paddingHorizontal: 20 },
  title: { fontSize: 32, fontWeight: '700', marginBottom: 10, color: '#000', fontFamily: 'System', letterSpacing: 0.5 },
  subtitle: { fontSize: 16, fontWeight: '400', color: '#555', marginBottom: 40, textAlign: 'center', paddingHorizontal: 30 },
  button: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#007AFF', paddingVertical: 14, paddingHorizontal: 40, borderRadius: 16, shadowColor: '#000', shadowOpacity: 0.15, shadowOffset: { width: 0, height: 3 }, shadowRadius: 4 },
  buttonDisabled: { backgroundColor: '#A0A0A0' },
  buttonText: { color: '#fff', fontSize: 18, fontWeight: '600', fontFamily: 'System' },
  hiddenCamera: { position: 'absolute', width: 1, height: 1, opacity: 0 }
});
