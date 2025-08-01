import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated, Dimensions } from 'react-native';
import { CameraView } from 'expo-camera';
import { Ionicons } from '@expo/vector-icons';

const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;

export default function HomeScreen() {
  const [showCamera, setShowCamera] = useState(false);
  const translateY = useRef(new Animated.Value(SCREEN_HEIGHT)).current;
  const cameraRef = useRef<CameraView>(null);

  const openCamera = () => {
    setShowCamera(true);
    Animated.timing(translateY, {
      toValue: 0,
      duration: 350,
      useNativeDriver: true,
    }).start();
  };

  const closeCamera = () => {
    Animated.timing(translateY, {
      toValue: SCREEN_HEIGHT,
      duration: 350,
      useNativeDriver: true,
    }).start(() => setShowCamera(false));
  };

  const takePicture = async () => {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync({ base64: true });
      alert('Image captured!'); // Placeholder
      closeCamera();
    }
  };

  return (
    <View style={styles.root}>
      <View style={styles.container}>
        <Text style={styles.title}>OCR iPhone App</Text>
        <Text style={styles.subtitle}>Capture and recognize text instantly with your camera</Text>
        <TouchableOpacity style={styles.button} onPress={openCamera}>
          <Ionicons name="camera-outline" size={22} color="#fff" style={{ marginRight: 8 }} />
          <Text style={styles.buttonText}>Open Camera</Text>
        </TouchableOpacity>
      </View>

      {/* Camera modal animado ocupando 100% da tela */}
      {showCamera && (
        <Animated.View style={[
          styles.cameraModal,
          { transform: [{ translateY }] }
        ]}>
          <CameraView 
            ref={cameraRef} 
            style={styles.camera}
            facing="back"
          />
          <View style={styles.controls}>
            <TouchableOpacity style={styles.captureButton} onPress={takePicture}>
              <Ionicons name="camera" size={28} color="#fff" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.closeButton} onPress={closeCamera}>
              <Ionicons name="close" size={28} color="#fff" />
            </TouchableOpacity>
          </View>
        </Animated.View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#F9F9F9',
  },
  container: { 
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center', 
    paddingHorizontal: 20 
  },
  title: { 
    fontSize: 32, 
    fontWeight: '700', 
    marginBottom: 10, 
    color: '#000', 
    fontFamily: 'System', 
    letterSpacing: 0.5 
  },
  subtitle: { 
    fontSize: 16, 
    fontWeight: '400', 
    color: '#555', 
    marginBottom: 40, 
    textAlign: 'center', 
    paddingHorizontal: 30 
  },
  button: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    backgroundColor: '#007AFF', 
    paddingVertical: 14, 
    paddingHorizontal: 40, 
    borderRadius: 16, 
    shadowColor: '#000', 
    shadowOpacity: 0.15, 
    shadowOffset: { width: 0, height: 3 }, 
    shadowRadius: 4 
  },
  buttonText: { 
    color: '#fff', 
    fontSize: 18, 
    fontWeight: '600', 
    fontFamily: 'System' 
  },
  cameraModal: { 
    position: 'absolute', 
    left: 0, 
    top: 0, 
    width: SCREEN_WIDTH, 
    height: SCREEN_HEIGHT, 
    backgroundColor: '#000', 
    zIndex: 99
  },
  camera: { 
    flex: 1, 
    width: '100%', 
    height: '100%' 
  },
  controls: { 
    position: 'absolute', 
    bottom: 50, 
    width: '100%', 
    flexDirection: 'row', 
    justifyContent: 'center', 
    alignItems: 'center' 
  },
  captureButton: { 
    backgroundColor: '#007AFF', 
    borderRadius: 35, 
    width: 70, 
    height: 70, 
    justifyContent: 'center', 
    alignItems: 'center',
    marginHorizontal: 20
  },
  closeButton: { 
    position: 'absolute',
    right: 35,
    bottom: 10,
    padding: 10
  }
});
