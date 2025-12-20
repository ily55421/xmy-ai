import { useCallback, useState } from "react";
import { StyleSheet, View, Image, Text, Modal, TouchableHighlight, TextInput } from "react-native";
import { LightTheme } from "../config/config";
import { messageBus } from "../context/EventBus";
import { useXmy } from "../context/XmyContext";

export function QuesBtn() {
  const {quesBtn} = useXmy();
  const [modalVisible, setModalVisible] = useState(false);
  const [ques, setQues] = useState("")

  const closeModal = useCallback(() => {
    setModalVisible(false);
  }, [])
  const onBtnPress = useCallback(() => {
    setModalVisible(true);
  }, [])

  const submit = useCallback(() => {
    messageBus.emit(ques);
    setModalVisible(false);
    setQues("")
  }, [ques])

  return (
    <View style={styles.container}>
      {quesBtn ? (
        <TouchableHighlight style={styles.btn} underlayColor="#0006" onPress={onBtnPress}>
          <Image source={require("../icons/search.png")}/>
        </TouchableHighlight>
      ) : null}


      <Modal
        animationType="slide"
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <View style={styles.title}>
          <TouchableHighlight
            style={{ ...styles.closeButton}}
            underlayColor="#0004"
            onPress={closeModal}
          >
            <Text style={styles.closeBtnText}>关闭</Text>
          </TouchableHighlight>
          <TouchableHighlight
            style={{ ...styles.closeButton}}
            underlayColor="#0004"
            onPress={submit}
          >
            <Text style={styles.closeBtnText}>提交</Text>
          </TouchableHighlight>
        </View>
        <TextInput
          placeholder="有问题，请输入"
          style={styles.input}
          value={ques}
          multiline={true}
          onChangeText={setQues}
        />
      </Modal>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    right: 28,
    bottom: 28,
  }, 
  btn: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: LightTheme + "55",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  closeButton: {
    width: 50,
    backgroundColor: "#FFF",
    borderRadius: 6,
    padding: 6,
    margin: 3,
    alignItems: "center",
  },
  closeBtnText: {
    color: "#333"
  },
  input: {
    margin: 5,
    marginTop: 15,
    borderWidth: 1,
    borderRadius: 2
  }
});
