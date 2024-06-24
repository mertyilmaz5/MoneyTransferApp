import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import * as Crypto from "expo-crypto"; // Expo crypto kullanarak hashing işlemi simülasyonu

const HashingComponent = () => {
    const [input, setInput] = useState("");
    const [hashedOutput, setHashedOutput] = useState("");

    const handleHash = async () => {
        // SHA-256 ile hash oluşturma
        const digest = await Crypto.digestStringAsync(
            Crypto.CryptoDigestAlgorithm.SHA256,
            input
        );
        setHashedOutput(digest);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Hashing Component</Text>
            <TextInput
                style={styles.input}
                placeholder="Veri girin"
                value={input}
                onChangeText={(text) => setInput(text)}
            />
            <TouchableOpacity style={styles.button} onPress={handleHash}>
                <Text style={styles.buttonText}>Hashle</Text>
            </TouchableOpacity>
            {hashedOutput !== "" && (
                <View style={styles.outputContainer}>
                    <Text style={styles.outputLabel}>Hashed Çıktı:</Text>
                    <Text style={styles.output}>{hashedOutput}</Text>
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

export default HashingComponent;
