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
          <Text style={styles.heading}>NFC İle Gönder</Text>
          {isLoading ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color="#1e90ff" />
              <Text style={styles.loadingText}>NFC ile alıcılar taranıyor...</Text>
            </View>
          ) : (
            <FlatList
              data={accounts}
              keyExtractor={(item) => item.accountID.toString()}
              renderItem={renderItem}
              style={styles.list}
            />
          )}
          <TouchableOpacity
            style={[
              styles.confirmButton,
              !selectedAccount && styles.confirmButtonDisabled,
            ]}
            onPress={handleConfirm}
            disabled={!selectedAccount}
          >
            <Text style={styles.confirmButtonText}>Alıcıyı Seç</Text>
          </TouchableOpacity>
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
    color: "#333",
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#2e8b57", // Yeşil renk
    marginBottom: 20,
  },
  list: {
    width: "100%",
    marginBottom: 20,
  },
  item: {
    marginBottom: 10,
    padding: 15,
    borderWidth: 1,
    borderColor: "#ccc",
    backgroundColor: "#e0f7fa", // Açık mavi arka plan
    borderRadius: 10,
  },
  selectedItem: {
    backgroundColor: "#b3e5fc", // Daha açık mavi
    borderColor: "#0288d1", // Seçili item için kenarlık rengi
  },
  itemText: {
    fontSize: 16,
    color: "#333",
  },
  confirmButton: {
    backgroundColor: "#1e90ff", // Mavi buton
    width: "80%",
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
  },
  confirmButtonDisabled: {
    backgroundColor: "#87cefa", // Açık mavi buton (devre dışı)
  },
  confirmButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default RecipientList;
