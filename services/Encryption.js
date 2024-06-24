import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import CryptoJS from "crypto-js";

const EncryptionComponent = () => {
    const [input, setInput] = useState("");
    const [encryptedOutput, setEncryptedOutput] = useState("");

    const handleEncrypt = () => {
        const key = CryptoJS.enc.Utf8.parse('1234567890123456'); // AES için anahtar (16 byte)
        const iv = CryptoJS.enc.Utf8.parse('1234567890123456'); // IV (16 byte)

        const encrypted = CryptoJS.AES.encrypt(input, key, {
            iv: iv,
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7
        }).toString();

        setEncryptedOutput(encrypted);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.heading}>AES Encryption Component (Gösterim Amaçlı)</Text>
            <TextInput
                style={styles.input}
                placeholder="Veri girin"
                value={input}
                onChangeText={(text) => setInput(text)}
            />
            <TouchableOpacity style={styles.button} onPress={handleEncrypt}>
                <Text style={styles.buttonText}>Şifrele</Text>
            </TouchableOpacity>
            {encryptedOutput !== "" && (
                <View style={styles.outputContainer}>
                    <Text style={styles.outputLabel}>Şifrelenmiş Çıktı:</Text>
                    <Text style={styles.output}>{encryptedOutput}</Text>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: "#f0f8ff",
    },
    heading: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#2e8b57",
        textAlign: "center",
        marginBottom: 20,
    },
    input: {
        height: 40,
        borderColor: "#1e90ff",
        borderWidth: 1,
        paddingHorizontal: 10,
        borderRadius: 5,
        marginBottom: 20,
    },
    button: {
        backgroundColor: "#1e90ff",
        height: 40,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 5,
        marginBottom: 20,
    },
    buttonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },
    outputContainer: {
        marginTop: 20,
        padding: 10,
        borderRadius: 5,
        backgroundColor: "#e8f5e9",
    },
    outputLabel: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#2e8b57",
        marginBottom: 10,
    },
    output: {
        fontSize: 16,
        wordWrap: "break-word",
    },
});

export default EncryptionComponent;
