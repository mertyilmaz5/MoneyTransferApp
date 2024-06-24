import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Alert,
  Image,
  ActivityIndicator,
} from "react-native";
import { getUserAccounts, getUserTransactions } from "../services/api";

const TransferList = ({ navigation, route }) => {
  const { userId, username } = route.params;
  const [accounts, setAccounts] = useState([]);
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [amount, setAmount] = useState("");
  const [userTransactions, setUserTransactions] = useState([]);
  const [loadingAccounts, setLoadingAccounts] = useState(true);
  const [loadingTransactions, setLoadingTransactions] = useState(true);

  useEffect(() => {
    const fetchInitialData = async () => {
      await fetchUserAccounts();
      await fetchUserTransactions();
      setAmount("");
    };

    fetchInitialData();
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      fetchUserAccounts();
      fetchUserTransactions();
      setAmount("");
    });

    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    // İlk hesabı seç
    if (accounts.length > 0) {
      handleAccountSelect(accounts[0]);
    }
  }, [accounts]);

  const fetchUserAccounts = async () => {
    try {
      const userAccounts = await getUserAccounts(userId);
      setAccounts(userAccounts);
    } catch (error) {
      console.error("Hesaplar alınamadı:", error);
      Alert.alert("Hata", "Hesaplar alınamadı.");
    } finally {
      setLoadingAccounts(false);
    }
  };

  const fetchUserTransactions = async () => {
    try {
      const transactions = await getUserTransactions(userId);
      setUserTransactions(transactions.reverse()); // Son işlemleri ters sıraya çevir
    } catch (error) {
      console.error("İşlemler alınamadı:", error);
      Alert.alert("Hata", "İşlemler alınamadı.");
    } finally {
      setLoadingTransactions(false);
    }
  };

  const handleAccountSelect = (account) => {
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

    console.log(userId, selectedAccount, amount, username)
    navigation.navigate("TransferRequest", {
      senderInfo: { userId: userId, account: selectedAccount, username: username },
      amount: parseFloat(amount),
    });
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => handleAccountSelect(item)}
      style={[
        styles.item,
        selectedAccount?.AccountId === item.AccountId && styles.selectedItem,
      ]}
    >
      <Text style={styles.itemText}>IBAN: {item.iban}</Text>
      <Text style={styles.itemText}>Bakiye: {(item.balance).toLocaleString("tr-TR")} TL</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Image source={require("../components/logo.png")} style={styles.logo} />
      <View style={[styles.sectionContainer, styles.accountsSection]}>
        <Text style={styles.heading}>Hesaplarınız</Text>
        {loadingAccounts ? (
          <ActivityIndicator size="large" color="#1e90ff" />
        ) : (
          <FlatList
            data={accounts}
            keyExtractor={(item) => item?.AccountId?.toString() || Math.random().toString()} // Güvenli bir keyExtractor kullanımı
            renderItem={renderItem}
            style={styles.list}
          />
        )}
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
      </View>
      <View style={[styles.sectionContainer, styles.transactionsSection]}>
        <Text style={styles.heading}>Son İşlemler</Text>
        {loadingTransactions ? (
          <ActivityIndicator size="large" color="#1e90ff" />
        ) : (
          <FlatList
            data={userTransactions}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <View style={styles.transactionItem}>
                <Text style={styles.transactionText}>
                  {`${item.senderIban} -> ${item.receiverIban}: ${item.amount} TL`}
                </Text>
              </View>
            )}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f0f8ff", // Açık mavi arka plan
  },
  logo: {
    width: 300,
    height: 100,
    alignSelf: "center",
    marginBottom: 20,
  },
  sectionContainer: {
    flex: 1,
    marginBottom: 20,
    padding: 10,
    borderRadius: 10,
  },
  accountsSection: {
    flex: 6, // Sayfanın %70'i
    backgroundColor: "#e0f7fa", // Açık mavi arka plan
    borderWidth: 1,
    borderColor: "#1e90ff", // Mavi kenarlık
  },
  transactionsSection: {
    flex: 4, // Sayfanın %30'u
    backgroundColor: "#e8f5e9", // Açık yeşil arka plan
    borderWidth: 1,
    borderColor: "#2e8b57", // Yeşil kenarlık
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#2e8b57", // Yeşil renk
    textAlign: "center",
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
    borderColor: "#1e90ff", // Mavi kenarlık
    borderRadius: 5,
    backgroundColor: "#fff",
  },
  selectedItem: {
    borderColor: "#2e8b57", // Yeşil kenarlık
    backgroundColor: "#e6f7f5", // Açık yeşil arka plan
  },
  itemText: {
    fontSize: 16,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    paddingHorizontal: 15,
  },
  label: {
    fontSize: 16,
    marginRight: 10,
    color: "#2e8b57", // Yeşil renk
  },
  input: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: "#1e90ff", // Mavi kenarlık
    borderRadius: 5,
    paddingHorizontal: 10,
    backgroundColor: "#fff",
  },
  button: {
    backgroundColor: "#1e90ff", // Mavi buton
    width: "80%",
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    borderRadius: 5,
    marginTop: 10,
    marginBottom: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  transactionItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  transactionText: {
    fontSize: 16,
  },
});

export default TransferList;
