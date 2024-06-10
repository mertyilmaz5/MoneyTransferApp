import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";

const accounts = [
  {
    id: "1",
    IBAN: "TR987654321098765432109876",
    accountName: "Vadesiz TL Hesabı 💵",
    amount: 5000,
  },
  {
    id: "2",
    IBAN: "TR876543210987654321098765",
    accountName: "Kiraz Hesap 🍒",
    amount: 3000,
  },
  {
    id: "3",
    IBAN: "TR765432109876543210987654",
    accountName: "Varlık Hesabı 📈",
    amount: 1000,
  },
];

const TransferList = ({ navigation }) => {
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [amount, setAmount] = useState("");

  const handleSelectAccount = (account) => {
    setSelectedAccount(account);
  };

  const handleConfirm = () => {
    if (!selectedAccount) {
      Alert.alert("Hata", "Lütfen bir hesap seçin.");
      return;
    }
    if (
      !amount ||
      isNaN(amount) ||
      parseFloat(amount) > selectedAccount.amount
    ) {
      Alert.alert("Hata", "Lütfen geçerli bir tutar girin.");
      return;
    }
    navigation.navigate("TransferRequest", {
      sender: selectedAccount,
      amount: parseFloat(amount),
    });
  };

  const renderItem = ({ item }) => {
    const isSelected = selectedAccount && selectedAccount.id === item.id;
    return (
      <TouchableOpacity onPress={() => handleSelectAccount(item)}>
        <View style={[styles.item, isSelected && styles.selectedItem]}>
          <Text>IBAN: {item.IBAN}</Text>
          <Text>Hesap Adı: {item.accountName}</Text>
          <Text>Bakiye: {item.amount} TL</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Gönderen Hesaplar</Text>
      <FlatList
        data={accounts}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
      />
      <TextInput
        style={styles.input}
        placeholder="Gönderilecek Tutar"
        keyboardType="numeric"
        value={amount}
        onChangeText={setAmount}
      />
      <Button title="Onay" onPress={handleConfirm} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  heading: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  input: {
    width: "100%",
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    marginBottom: 20,
    borderRadius: 5,
  },
  item: {
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    marginBottom: 10,
    borderRadius: 5,
  },
  selectedItem: {
    backgroundColor: "lightblue",
  },
});

export default TransferList;
