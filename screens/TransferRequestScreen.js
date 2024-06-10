import React, { useState } from "react";
import {
  View,
  Text,
  Button,
  Modal,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import QRCode from "react-native-qrcode-svg";
import RecipientList from "../components/RecipientList";

const TransferRequestScreen = ({ navigation, route }) => {
  const { sender, amount } = route.params;
  const [modalVisible, setModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleNfcPayment = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setModalVisible(true);
    }, 3000);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Gönderen Bilgisi</Text>
      <Text>IBAN: {sender.IBAN}</Text>
      <Text>Hesap Adı: {sender.accountName}</Text>
      <Text>Gönderilecek Tutar: {amount} TL</Text>
      <View style={styles.qrCodeContainer}>
        <QRCode value={sender.IBAN} size={200} />
      </View>
      <Button title="NFC ile Ödeme" onPress={handleNfcPayment} />
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          {isLoading ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color="#0000ff" />
              <Text style={{ textAlign: "center", marginTop: 10 }}>
                Tarama yapılıyor...
              </Text>
            </View>
          ) : (
            <RecipientList
              navigation={navigation}
              onClose={() => setModalVisible(false)}
              sender={sender}
              amount={amount}
            />
          )}
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
  },
  heading: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  qrCodeContainer: {
    marginVertical: 20,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  loadingContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
});

export default TransferRequestScreen;
