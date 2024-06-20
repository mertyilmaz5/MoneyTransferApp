// LoginScreen.js

import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Image,
} from "react-native";
import { loginUser } from "../services/api";

const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    if (!username || !password) {
      Alert.alert("Giriş Hatası", "Lütfen kullanıcı adı ve şifre girin.");
      return;
    }

    try {
      const userData = await loginUser(username, password);
      console.log("Kullanıcı bilgileri:", userData);
      navigation.navigate("TransferList", { userId: userData.userID, username: userData.userName });
    } catch (error) {
      console.error("Giriş hatası:", error);
      Alert.alert("Giriş Hatası", "Kullanıcı adı veya şifre hatalı.");
    }
  };

  return (
    <View style={styles.container}>
      <Image source={require("../components/logo.png")} style={styles.logo} />
      <Text style={styles.heading}>Hoşgeldiniz!</Text>
      <TextInput
        style={styles.input}
        placeholder="Kullanıcı Adı"
        placeholderTextColor="#ccc"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Şifre"
        placeholderTextColor="#ccc"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Giriş Yap</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#f0f8ff", // Açık mavi arka plan
  },
  logo: {
    width: 300,
    height: 100,
    marginBottom: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#2e8b57", // Yeşil renk
    marginBottom: 20,
  },
  input: {
    width: "80%",
    height: 40,
    borderWidth: 1,
    borderColor: "#1e90ff", // Mavi kenarlık
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
    backgroundColor: "#fff", // Beyaz arka plan
  },
  button: {
    backgroundColor: "#1e90ff", // Mavi buton
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

export default LoginScreen;
