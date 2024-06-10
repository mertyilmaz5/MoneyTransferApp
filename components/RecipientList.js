import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Button,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

const recipients = [
  { id: "1", IBAN: "TR123456789012345678901234", name: "MERT YILMAZ" },
  { id: "2", IBAN: "TR234567890123456789012345", name: "FATİH VAROL" },
];

const RecipientList = ({ navigation, onClose, sender, amount }) => {
  const [selectedRecipient, setSelectedRecipient] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const handleSelectRecipient = (recipientId) => {
    setSelectedRecipient(recipientId);
  };

  const handleConfirm = () => {
    if (!selectedRecipient) {
      console.log("Lütfen bir alıcı seçin.");
      return;
    }
    const selected = recipients.find(
      (recipient) => recipient.id === selectedRecipient
    );
    console.log("Seçilen Alıcı:", selected);
    onClose();
    navigation.navigate("Confirmation", {
      senderInfo: sender,
      amount,
      recipientInfo: selected,
    });
  };

  const renderItem = ({ item }) => {
    const isSelected = selectedRecipient === item.id;
    return (
      <TouchableOpacity onPress={() => handleSelectRecipient(item.id)}>
        <View style={[styles.item, isSelected && styles.selectedItem]}>
          <Text>IBAN: {item.IBAN}</Text>
          <Text>Adı: {item.name}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      {isLoading ? (
        <>
          <ActivityIndicator size="large" color="#0000ff" />
          <Text style={{ textAlign: "center", margin: 10 }}>
            NFC Cihazları taranıyor...
          </Text>
        </>
      ) : (
        <>
          <Text style={styles.heading}>Alıcılar</Text>
          <FlatList
            data={recipients}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
          />
          <Button title="Onayla" onPress={handleConfirm} />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "80%",
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 10,
  },
  heading: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  item: {
    marginBottom: 20,
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  selectedItem: {
    backgroundColor: "lightblue",
  },
});

export default RecipientList;
