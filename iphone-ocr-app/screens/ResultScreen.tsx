import React from 'react';
import { View, StyleSheet, Image, Text } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';

type Props = NativeStackScreenProps<RootStackParamList, 'Result'>;

export default function ResultScreen({ route }: Props) {
  const { image } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Resultado OCR</Text>
      <Image
        source={{ uri: `data:image/jpg;base64,${image}` }}
        style={styles.image}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 20 },
  image: { width: 300, height: 300, resizeMode: 'contain' }
});
