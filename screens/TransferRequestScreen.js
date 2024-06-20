// TransferRequest.js

import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import QRCode from "react-native-qrcode-svg";
import RecipientList from "../components/RecipientList";

const TransferRequest = ({ navigation, route }) => {
  const { senderInfo, amount } = route.params;
  const [modalVisible, setModalVisible] = useState(false);

  const handleOpenRecipientList = () => {
    setModalVisible(true);
  };

  return (
    <View style={styles.container}>
      <Image source={require("../components/logo.png")} style={styles.logo} />
      <Text style={styles.heading}>Gönderen Özeti</Text>
      <View style={styles.infoContainer}>
        <Text style={styles.infoText}>Gönderen: {senderInfo.account.iban}</Text>
        <Text style={styles.infoText}>Gönderilen Tutar: {amount} TL</Text>
      </View>
      <View style={styles.qrCodeContainer}>
        <QRCode
          value={senderInfo.account.iban + senderInfo.username + amount}
          size={200}
        />
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={handleOpenRecipientList}
      >
        <Text style={styles.buttonText}>NFC İle Gönder</Text>
      </TouchableOpacity>
      <RecipientList
        navigation={navigation}
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        senderInfo={senderInfo}
        amount={amount}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0f8ff", // Açık mavi arka plan
    padding: 16,
  },
  logo: {
    width: 300,
    height: 100,
    alignSelf: "center",
    marginBottom: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#2e8b57", // Yeşil renk
    textAlign: "center",
    marginBottom: 20,
  },
  infoContainer: {
    backgroundColor: "#e0f7fa", // Açık mavi arka plan
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    width: "100%",
    alignItems: "center",
  },
  infoText: {
    fontSize: 16,
    color: "#333",
    marginBottom: 10,
  },
  qrCodeContainer: {
    marginVertical: 20,
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 10,
    elevation: 5, // Android'de gölge efekti için
    shadowColor: "#000", // iOS için gölge rengi
    shadowOffset: { width: 0, height: 2 }, // iOS için gölge konumu
    shadowOpacity: 0.25, // iOS için gölge opaklığı
    shadowRadius: 3.84, // iOS için gölge yarıçapı
  },
  button: {
    backgroundColor: "#1e90ff", // Mavi buton
    width: "80%",
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    marginTop: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default TransferRequest;
