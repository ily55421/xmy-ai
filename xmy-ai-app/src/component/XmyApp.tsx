import { StyleSheet, View, Pressable } from 'react-native';
import WebView, { WebViewMessageEvent } from 'react-native-webview';
import { useHeaderHeight, XmyAppSite } from '../config/config';
import { useXmy } from '../context/XmyContext';
import { useCallback, useEffect, useRef, useState } from 'react';
import { variables } from '../context/variables';
import { actionBus } from '../context/EventBus';

export function XmyApp() {
  const appRef = useRef<WebView>(null);
  const [settingDialog, setSettingDialog] = useState(false);
  const [selectAiDialog, setSelectAiDialog] = useState(false);
  const { setState } = useXmy();
  const headerHeight = useHeaderHeight();

  const onMessage = useCallback((event: WebViewMessageEvent) => {
    const messageStr = event.nativeEvent.data
    console.log("receive a message: " + messageStr);
    const message = JSON.parse(messageStr) as any;
    if (message.type === "MERGE_STATE") {
      setState(state => {
        return {
          ...state, 
          ...message.state
        };
      });
    } else if (message.type === "SETTING_DIALOG_CLOSE") {
      setSettingDialog(false);
    } else if (message.type === "SELECT_AI_DIALOG_CLOSE") {
      setSelectAiDialog(false);
      setState(state => ({
        ...state,
        quesBtn: true,
      }));
    } else if (message.type === "DEFINE_VARIABLE") {
      (variables as Record<string, unknown>)[message.varname] = message.varobj;
    }
  }, [setState]);

  const onSettingPress = useCallback(() => {
    setSettingDialog(true)
    appRef.current?.injectJavaScript("onSettingClick()")
  }, [])

  useEffect(() => {
    actionBus.on(([actionName, args]) => {
      setSelectAiDialog(true)
      appRef.current?.injectJavaScript(`${actionName}(...${JSON.stringify(args)})`)
    })
  })

  return (
    <View style={styles.appContainer}>
      {(settingDialog || selectAiDialog) ? null : (
        <Pressable style={[styles.settingButton, { height: headerHeight }]} onPress={onSettingPress} />
      )}
      <View style={styles.appWrapper} pointerEvents={(settingDialog || selectAiDialog) ? 'auto' : 'none'}>
        <WebView
          ref={appRef}
          cacheEnabled={false}
          injectedJavaScriptBeforeContentLoaded="window.mobileMode = true;"
          style={styles.app}
          source={{ uri: XmyAppSite }}
          onMessage={onMessage}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  appContainer: {
    position: "relative",
    flex: 1,
  },
  settingButton: {
    position: "absolute",
    zIndex: 10,
    top: 0,
    right: 0,
    width: 100,
  },
  appWrapper: {
    flex: 1,
  },
  app: {
    flex: 1,
    backgroundColor: "transparent",
  },
});
