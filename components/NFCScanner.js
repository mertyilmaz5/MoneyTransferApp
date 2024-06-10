import React, { useEffect, useState } from "react";
import { View, Text, ActivityIndicator, StyleSheet } from "react-native";

const NFCScanner = ({ onScanned }) => {
  const [isScanning, setIsScanning] = useState(true);

  useEffect(() => {
    // Simulate NFC scanning
    const timer = setTimeout(() => {
      setIsScanning(false);
      onScanned({ id: "12345", data: "Sample NFC Data" }); // Dummy NFC data
    }, 3000);

    return () => clearTimeout(timer);
  }, [onScanned]);

  return (
    <View style={styles.container}>
      {isScanning ? (
        <>
          <ActivityIndicator size="large" color="#0000ff" />
          <Text style={styles.text}>NFC Cihazları taranıyor...</Text>
        </>
      ) : (
        <Text style={styles.text}>NFC taraması tamamlandı.</Text>
      )}
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
    marginTop: 20,
    fontSize: 18,
  },
});

export default NFCScanner;
