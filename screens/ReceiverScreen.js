// ReceiverScreen.js

import React, { useEffect } from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";

const ReceiverScreen = ({ navigation, route }) => {
  const { senderInfo, amount, recipientInfo } = route.params;

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate("TransferList", { userId: senderInfo.userId }); // 3 saniye sonra TransferList ekranına yönlendirme
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Ödeme Başarılı!</Text>
      <View style={styles.infoContainer}>
        <Text style={styles.infoLabel}>Gönderen:</Text>
        <Text style={styles.info}>
          {senderInfo.account.iban}
        </Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.infoLabel}>Alıcı:</Text>
        <Text style={styles.info}>{recipientInfo.iban}</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.infoLabel}>Gönderilen Tutar:</Text>
        <Text style={styles.info}>{amount} TL</Text>
      </View>
      <ActivityIndicator
        size="large"
        color="#1e90ff"
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
    backgroundColor: "#f0f8ff",
    padding: 16,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#2e8b57", // Yeşil renk
    marginBottom: 20,
  },
  infoContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    backgroundColor: "#e0f7fa", // Açık mavi arka plan
    borderColor: "#1e90ff",
    borderRadius: 10,
    borderWidth: 1,
    padding: 10,
    width: "100%",
  },
  infoLabel: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    width: "40%",
  },
  info: {
    fontSize: 18,
    color: "#333",
    width: "60%",
    textAlign: "right",
  },
});

export default ReceiverScreen;
