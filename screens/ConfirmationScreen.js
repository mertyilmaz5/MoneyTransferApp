// ConfirmationScreen.js

import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
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
      <View style={styles.detailContainer}>
        <Text style={styles.label}>Gönderen:</Text>
        <Text style={styles.detailText}>{senderInfo.account.iban}</Text>
      </View>
      <View style={styles.detailContainer}>
        <Text style={styles.label}>Alıcı:</Text>
        <Text style={styles.detailText}>{recipientInfo.iban}</Text>
      </View>
      <View style={styles.detailContainer}>
        <Text style={styles.label}>Gönderilecek Tutar:</Text>
        <Text style={styles.detailText}>{amount} TL</Text>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.confirmButton} onPress={handleConfirm}>
          <Text style={styles.buttonText}>Onayla</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.rejectButton} onPress={handleReject}>
          <Text style={styles.buttonText}>Reddet</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0f8ff",
    padding: 16,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#2e8b57", // Yeşil renk
    marginBottom: 20,
  },
  detailContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    padding: 10,
    backgroundColor: "#e0f7fa", // Açık mavi arka plan
    borderColor: "#1e90ff",
    borderRadius: 10,
    borderWidth: 1,
    width: "100%",
  },
  label: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    width: "40%",
  },
  detailText: {
    fontSize: 18,
    color: "#333",
    width: "60%",
    textAlign: "right",
  },
  buttonContainer: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
  },
  confirmButton: {
    backgroundColor: "#1e90ff", // Mavi buton
    width: "40%",
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
  },
  rejectButton: {
    backgroundColor: "#ff4500", // Kırmızı buton
    width: "40%",
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default ConfirmationScreen;
