import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, ActivityIndicator, TextInput, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/FontAwesome';
import IoIcon from 'react-native-vector-icons/Ionicons';
import { useQuery, gql } from '@apollo/client';
import apoloClient from '../api/apolo';
import FloatingActionButton from '../components/FAB';
import { useNavigation } from '@react-navigation/core';


function HomeScreen() {
    const [errorMessage, setErrorMessage] = useState('');
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const navigate = useNavigation()

    function queryProducts(page) {
        setLoading(true);
        apoloClient
            .query({
                query: gql`
          query {
            products(page: ${page}) {
              name
              imageUrl
              amount
              currency
            }
          }
        `,
            })
            .then((response) => {
                const data = response.data;
                if (data && data.products && data.products.length > 0) {
                    setProducts((prevProducts) => [...prevProducts, ...data.products]);
                }
            })
            .catch((error) => {
                setErrorMessage(error.message);
            })
            .finally(() => {
                setLoading(false);
            });
    }

    useEffect(() => {
        queryProducts(page);
    }, [page]);

    function handleScroll(event) {
        const { layoutMeasurement, contentOffset, contentSize } = event.nativeEvent;
        const isCloseToBottom =
            layoutMeasurement.height + contentOffset.y >= contentSize.height - 50;
        if (isCloseToBottom && !loading) {
            setPage((prevPage) => prevPage + 1);
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity >
                    <IoIcon name="cart" size={30} color="#FF9900" />
                </TouchableOpacity>
                <Text style={styles.headerText}>Arrah Shop</Text>
            </View>
            <View style={styles.body}>
                <Text style={styles.title}>Shop Random Photos</Text>
                <View style={styles.searchBar}>
                    <TextInput
                        style={styles.searchInput}
                        placeholder="Search for products"
                        placeholderTextColor="#888"
                    />
                    <Icon name="search" size={20} color="#888" style={styles.searchIcon} />
                </View>
                <ScrollView
                    style={styles.scrollView}
                    onScroll={handleScroll}
                    scrollEventThrottle={16}
                >
                    {errorMessage && <Text>{errorMessage}</Text>}
                    {products.map((p, index) => {
                        const cacheBusterUrl = `${p.imageUrl}?${new Date().getTime()}`;
                        return (
                            <TouchableOpacity key={index} onPress={() => navigate.navigate('ProductDetail', { product: { ...p, imageUrl: cacheBusterUrl } })}>
                                <View style={styles.card}>
                                    <Image source={{ uri: cacheBusterUrl }} style={styles.cardImage} />
                                    <Text style={styles.cardTitle}>{p.name}</Text>
                                    <Text style={styles.cardPrice}>{(p.amount.toFixed(0)).toLocaleString()} {p.currency}</Text>
                                </View>
                            </TouchableOpacity>
                        );
                    })}
                    {loading && <ActivityIndicator size="large" color="#888" />}
                </ScrollView>
                <FloatingActionButton />
            </View>
        </SafeAreaView>
    );
}
const styles = StyleSheet.create({
    container: {
        backgroundColor: '#f0f2f5',
        minHeight: 850

    },
    scrollView: {
        height: 1000,
        position: "relative"
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
        fontSize: 18,
        marginLeft: 5,
        fontWeight: '600'
    },
    body: {
        flex: 1,
        padding: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    searchBar: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 8,
        paddingHorizontal: 12,
        marginBottom: 16,
    },
    searchInput: {
        flex: 1,
        height: 40,
        color: '#000',
        fontSize: 16,
    },
    searchIcon: {
        marginLeft: 8,
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 16,
        marginBottom: 16,
    },
    cardImage: {
        width: '100%',
        height: 200,
        marginBottom: 8,
        resizeMode: 'cover',
        borderRadius: 8,
    },
    cardTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    cardPrice: {
        fontSize: 14,
        color: '#888',
        fontWeight: "600"
    },
});

export default HomeScreen;