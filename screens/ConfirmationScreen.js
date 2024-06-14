// ConfirmationScreen.js

import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { transferAmount } from "../services/api";

const ConfirmationScreen = ({ navigation, route }) => {
  const { senderInfo, amount, recipientInfo } = route.params;
  console.log(senderInfo.account.accountID, amount, recipientInfo.accountID);
  const handleConfirm = async () => {
    try {
      await transferAmount(senderInfo.account.iban, recipientInfo.iban, amount);
      navigation.navigate("Receiver", {
        senderInfo: senderInfo,
        amount: amount,
        recipientInfo: recipientInfo,
      });
    } catch (error) {
      console.error("Transfer işlemi gerçekleştirilemedi:", error);
      // Hata durumunda kullanıcıya bilgilendirme gösterebilirsiniz
    }
  };

  const handleReject = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Onaylama Ekranı</Text>
      <Text>Gönderen: {senderInfo.account.iban}</Text>
      <Text>Alıcı: {recipientInfo.iban}</Text>
      <Text>Gönderilecek Tutar: {amount} TL</Text>
      <View style={styles.buttonContainer}>
        <Button title="Onayla" onPress={handleConfirm} />
        <Button title="Reddet" onPress={handleReject} color="red" />
      </View>
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
  buttonContainer: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
  },
});

export default ConfirmationScreen;
