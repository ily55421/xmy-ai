import React from 'react';
import { StyleSheet, View } from 'react-native';
import { XmyProvider } from './src/context/XmyContext';
import { AiLayer } from './src/component/AiLayer';
import { XmyApp } from './src/component/XmyApp';
import { StatusBar } from './src/component/StatusBar';
import { QuesBtn } from './src/component/QuesBtn';

function App(): React.JSX.Element {
  return (
    <XmyProvider>
      <View style={styles.container}>
        <StatusBar />
        <AiLayer />
        <XmyApp />
        <QuesBtn />
      </View>
    </XmyProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }, 
});

export default App;
