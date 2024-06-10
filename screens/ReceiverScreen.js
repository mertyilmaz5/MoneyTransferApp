import React from "react";
import { View, Text, StyleSheet, Button, ToastAndroid } from "react-native";

const ReceiverScreen = ({ navigation, route }) => {
  const { senderInfo, amount, recipientInfo } = route.params;

  const showToast = () => {
    ToastAndroid.show("Ödeme alındı.", ToastAndroid.SHORT);
  };

  React.useEffect(() => {
    showToast();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Ödeme Başarılı!</Text>
      <Text>Gönderen: {senderInfo.name}</Text>
      <Text>IBAN: {senderInfo.IBAN}</Text>
      <Text>Gönderilen Tutar: {amount} TL</Text>
      <Text>Alıcı: {recipientInfo.name}</Text>
      <Text>Alıcı IBAN: {recipientInfo.IBAN}</Text>
      <Button
        title="Ana Sayfaya Dön"
        onPress={() => navigation.navigate("TransferList")}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
});

export default ReceiverScreen;
