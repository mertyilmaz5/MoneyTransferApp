// ReceiverScreen.js

import React, { useEffect } from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";

const ReceiverScreen = ({ navigation, route }) => {
  const { senderInfo, amount, recipientInfo } = route.params;

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate("TransferList", { userId: senderInfo.userId }); // 3 saniye sonra TransferList ekranına yönlendirme
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Ödeme Başarılı!</Text>
      <Text style={styles.info}>
        Gönderen: {senderInfo.account.iban} - {senderInfo.userID}
      </Text>
      <Text style={styles.info}>Alıcı: {recipientInfo.iban}</Text>
      <Text style={styles.info}>Gönderilen Tutar: {amount} TL</Text>
      <ActivityIndicator
        size="large"
        color="#0000ff"
        style={{ marginTop: 20 }}
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
    padding: 16,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  info: {
    fontSize: 18,
    marginBottom: 10,
  },
});

export default ReceiverScreen;
