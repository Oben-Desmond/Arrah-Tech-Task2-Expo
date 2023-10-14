import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Button, ActivityIndicator } from 'react-native';
import { useMutation, gql } from '@apollo/client';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TouchableOpacity } from 'react-native-gesture-handler';
import IoIcon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/core';


const CREATE_PRODUCT_MUTATION = gql`
  mutation CreateProduct($name: String!, $imageUrl: String!, $amount: Float!, $currency: String!) {
    addProduct(name: $name, imageUrl: $imageUrl, amount: $amount, currency: $currency) {
      name
      imageUrl
      amount
      currency
    }
  }
`;

function CreateProductScreen() {
    const [name, setName] = useState('');
    const [imageUrl, setImageUrl] = useState('https://picsum.photos/1000/800');
    const [amount, setAmount] = useState('');
    const [currency, setCurrency] = useState('');
    const navigation = useNavigation();

    const [createProduct, { loading, error }] = useMutation(CREATE_PRODUCT_MUTATION);

    const handleCreateProduct = () => {
        createProduct({
            variables: {
                name,
                imageUrl,
                amount: parseFloat(amount),
                currency,
            },
            onCompleted: () => {
                // Handle success, navigate to another screen, etc.
            },
            onError: (error) => {
                console.log(error);
            },
        });
    };

    function navBack() {
        navigation.goBack()
    }

    return (
        <SafeAreaView>
            <View style={styles.header}>
                <TouchableOpacity onPress={navBack}>
                    <IoIcon name="arrow-back" size={30} color="#FF9900" />
                </TouchableOpacity>
                <Text style={styles.headerText}>Create Products</Text>
            </View>
            <View style={styles.container}>
                <Text style={styles.title}>Create Product</Text>

                <TextInput
                    style={styles.input}
                    placeholder="Name"
                    value={name}
                    onChangeText={setName}
                />

                <TextInput
                    style={styles.input}
                    placeholder="Amount"
                    value={amount}
                    onChangeText={setAmount}
                    keyboardType="numeric"
                />

                <TextInput
                    style={styles.input}
                    placeholder="Currency"
                    value={currency}
                    onChangeText={setCurrency}
                />

                <TouchableOpacity style={styles.button} onPress={handleCreateProduct} disabled={loading}>
                    <Text style={styles.buttonText}>Create</Text>
                </TouchableOpacity>

                {error && <Text style={styles.error}>{error.message}</Text>}
                {loading && <ActivityIndicator style={styles.spinner} size="large" color="#FF9900" />}
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    header: {
        height: 60,
        paddingHorizontal: 16,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: '',
        backgroundColor: '#232f3e',
    },
    headerText: {
        color: "white",
        fontSize: 18
    },
    input: {
        height: 40,
        borderColor: '#888',
        borderWidth: 1,
        borderRadius: 8,
        marginBottom: 16,
        paddingHorizontal: 8,
    },
    error: {
        color: 'red',
        marginTop: 8,
    },
    button: {
        backgroundColor: "#232f3e",
        color: "white",
        textAlign: "center",
        padding: 12,
        borderRadius: 5,
        marginTop: 6,
    },
    buttonText: {
        color: "white",
        margin: "auto",
        textAlign: "center",
    }
});

export default CreateProductScreen;