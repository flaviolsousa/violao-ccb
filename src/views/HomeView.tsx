import React from 'react';
import { View } from 'react-native';
import { useTheme } from 'react-native-paper';
import { Text, Button } from 'react-native-paper';

function HomeView() {
  const theme = useTheme();
  return (
    <View
      style={{
        ...theme,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Text>Home View 001</Text>
      <Text></Text>
      <Button
        icon="camera"
        mode="contained"
        onPress={() => console.log('Pressed')}
      >
        Press me
      </Button>
    </View>
  );
}

export default HomeView;
