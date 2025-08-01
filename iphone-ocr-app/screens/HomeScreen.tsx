import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, StatusBar, ScrollView } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';
import { Ionicons } from '@expo/vector-icons';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

export default function HomeScreen({ navigation }: Props) {
  return (
    <View style={styles.wrapper}>
      <StatusBar barStyle="dark-content" backgroundColor="#F9F9F9" />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        bounces={true}
        alwaysBounceVertical={true}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>OCR iPhone App</Text>
        <Text style={styles.subtitle}>
          Capture and recognize text instantly with your camera
        </Text>

        <TouchableOpacity
          style={styles.button}
          activeOpacity={0.8}
          onPress={() => navigation.navigate('Camera')}
        >
          <Ionicons name="camera-outline" size={22} color="#fff" style={{ marginRight: 8 }} />
          <Text style={styles.buttonText}>Open Camera</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#F9F9F9' // Fundo fixo
  },
  scrollContent: {
    flexGrow: 1,
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
  }
});
