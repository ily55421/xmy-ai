import { View } from "react-native";
import { useXmy } from "../context/XmyContext";
import { DarkTheme, LightTheme } from "../config/config";
import { getStatusBarHeight } from "react-native-status-bar-height";

export function StatusBar() {
  const { theme } = useXmy();

  const statusBarHeight = getStatusBarHeight();
  
  const statusBarStyle = {
    backgroundColor: theme === "light" ? LightTheme : DarkTheme, 
    height: statusBarHeight 
  }
  return <View style={statusBarStyle}/>
}
