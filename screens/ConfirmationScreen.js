import React from "react";
import { View, Text, Button, StyleSheet, Alert } from "react-native";

const ConfirmationScreen = ({ navigation, route }) => {
  const { senderInfo, amount, recipientInfo } = route.params;

  const handleConfirm = () => {
    Alert.alert(
      "Başarılı",
      "Ödeme başarılı bir şekilde gerçekleştirildi.",
      [
        {
          text: "Tamam",
          onPress: () => {
            setTimeout(() => {
              navigation.navigate("ReceiverScreen", {
                senderInfo,
                amount,
                recipientInfo,
              });
            }, 3000);
          },
        },
      ],
      { cancelable: false }
    );
  };

  const handleReject = () => {
    Alert.alert("Reddedildi", "Ödeme işlemi reddedildi.");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Onaylama Ekranı</Text>
      <Text>Gönderen: {senderInfo.name}</Text>
      <Text>IBAN: {senderInfo.IBAN}</Text>
      <Text>Gönderilecek Tutar: {amount} TL</Text>
      <Text>Alıcı: {recipientInfo.name}</Text>
      <Text>Alıcı IBAN: {recipientInfo.IBAN}</Text>
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
