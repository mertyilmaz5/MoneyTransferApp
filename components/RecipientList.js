// RecipientList.js

import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Button,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  Modal,
} from "react-native";
import { getAllAccounts } from "../services/api";

const RecipientList = ({
  navigation,
  modalVisible,
  setModalVisible,
  senderInfo,
  amount,
}) => {
  const [accounts, setAccounts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState(null);

  useEffect(() => {
    if (modalVisible) {
      setIsLoading(true);
      setTimeout(() => {
        fetchAccounts();
      }, 3000); // 3 saniye gecikme ekleniyor
    }
  }, [modalVisible]);

  const fetchAccounts = async () => {
    try {
      const allAccounts = await getAllAccounts();
      setAccounts(allAccounts);
    } catch (error) {
      console.error("Hesaplar alınamadı:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectRecipient = (account) => {
    setSelectedAccount(account);
  };

  const handleConfirm = () => {
    if (!selectedAccount) {
      console.log("Lütfen bir alıcı seçin.");
      return;
    }
    // Alıcı bilgilerini gönder
    navigation.navigate("Confirmation", {
      senderInfo: senderInfo,
      amount: amount,
      recipientInfo: selectedAccount,
    });

    setModalVisible(false);
  };

  const renderItem = ({ item }) => {
    const isSelected =
      selectedAccount && selectedAccount.accountID === item.accountID;
    return (
      <TouchableOpacity onPress={() => handleSelectRecipient(item)}>
        <View style={[styles.item, isSelected && styles.selectedItem]}>
          <Text style={styles.itemText}>IBAN: {item.iban}</Text>
          <Text style={styles.itemText}>Alıcı: {item.userID}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => setModalVisible(false)}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.heading}>Alıcıları Bul</Text>
          {isLoading ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color="#0000ff" />
              <Text style={styles.loadingText}>NFC taraması Yapılıyor...</Text>
            </View>
          ) : (
            <FlatList
              data={accounts}
              keyExtractor={(item) => item.accountID.toString()}
              renderItem={renderItem}
              style={styles.list}
            />
          )}
          <Button
            title="Seçimi Onayla"
            onPress={handleConfirm}
            disabled={!selectedAccount}
          />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#fff",
    width: "80%",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
  },
  loadingContainer: {
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
  },
  heading: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  list: {
    width: "100%",
    marginBottom: 20,
  },
  item: {
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    backgroundColor: "#f0f0f0",
    width: "100%",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
  },
  selectedItem: {
    backgroundColor: "lightblue",
  },
  itemText: {
    fontSize: 16,
  },
});

export default RecipientList;
