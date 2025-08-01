import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

export default function ResultScreen({ route }) {
  const { image } = route.params;

  return (
    <View style={styles.container}>
      <Image source={{ uri: `data:image/jpg;base64,${image}` }} style={styles.image} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  image: { width: 300, height: 300 }
});
