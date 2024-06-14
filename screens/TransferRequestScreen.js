// TransferRequest.js

import React, { useState } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
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
      <Text style={styles.heading}>Gönderen Özeti</Text>
      <Text>Gönderen: {senderInfo.account.iban}</Text>
      <Text>Gönderilen Tutar: {amount}</Text>
      <View style={styles.qrCodeContainer}>
        <QRCode
          value={senderInfo.account.iban + senderInfo.account.userID + amount}
          size={200}
        />
      </View>
      <Button
        title="NFC İle Gönder"
        onPress={handleOpenRecipientList}
        style={styles.button}
      />
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
    backgroundColor: "#fff",
    padding: 16,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  qrCodeContainer: {
    marginVertical: 20,
  },
  button: {
    marginTop: 20,
  },
});

export default TransferRequest;
