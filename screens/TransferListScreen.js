// TransferList.js

import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Alert,
} from "react-native";
import { getUserAccounts, getUserTransactions } from "../services/api";

const TransferList = ({ navigation, route }) => {
  const { userId } = route.params;
  console.log("userId", userId);
  const [accounts, setAccounts] = useState([]);
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [amount, setAmount] = useState("");
  const [userTransactions, setUserTransactions] = useState([]);

  useEffect(() => {
    fetchUserAccounts();
    fetchUserTransactions();
  }, []);

  const fetchUserAccounts = async () => {
    try {
      const userAccounts = await getUserAccounts(userId);
      setAccounts(userAccounts);
    } catch (error) {
      console.error("Hesaplar alınamadı:", error);
      Alert.alert("Hata", "Hesaplar alınamadı.");
    }
  };

  const fetchUserTransactions = async () => {
    try {
      const transactions = await getUserTransactions(userId);
      setUserTransactions(transactions);
    } catch (error) {
      console.error("İşlemler alınamadı:", error);
      Alert.alert("Hata", "İşlemler alınamadı.");
    }
  };

  const handleAccountSelect = (account) => {
    console.log("Seçilen hesap:", account);
    setSelectedAccount(account);
  };

  const handleTransfer = () => {
    if (!selectedAccount || !amount) {
      Alert.alert(
        "Geçersiz İşlem",
        "Lütfen hesap seçin ve geçerli bir tutar girin."
      );
      return;
    }

    // Diğer sayfaya geçiş işlemi
    navigation.navigate("TransferRequest", {
      senderInfo: { userId: userId, account: selectedAccount },
      amount: parseFloat(amount),
    });
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => handleAccountSelect(item)}
      style={styles.item}
    >
      <Text>IBAN: {item.iban}</Text>
      <Text>Bakiye: {item.balance}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Hesaplarınız</Text>
      <FlatList
        data={accounts}
        keyExtractor={(item) => item.AccountId}
        renderItem={renderItem}
        style={styles.list}
      />
      {selectedAccount && (
        <>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Tutar:</Text>
            <TextInput
              style={styles.input}
              placeholder="Tutar girin"
              keyboardType="numeric"
              value={amount}
              onChangeText={(text) => setAmount(text)}
            />
          </View>

          <TouchableOpacity style={styles.button} onPress={handleTransfer}>
            <Text style={styles.buttonText}>Onayla</Text>
          </TouchableOpacity>
        </>
      )}

      <Text style={styles.heading}>Son İşlemler</Text>
      <FlatList
        data={userTransactions}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <Text>{`${item.senderIban} -> ${item.receiverIban}: ${item.amount}`}</Text>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#fff",
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
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
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginRight: 10,
  },
  input: {
    width: "60%",
    height: 40,
    borderWidth: 1,
    borderColor: "#ccc",
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: "blue",
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

export default TransferList;
