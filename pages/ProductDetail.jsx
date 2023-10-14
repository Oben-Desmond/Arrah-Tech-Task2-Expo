import { useNavigation, useRoute } from '@react-navigation/core'
import React, { useEffect } from 'react'
import { ImageBackground, View, StyleSheet, Text } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context'
import Icon from 'react-native-vector-icons/Ionicons'

const ProductDetailScreen = () => {
    const route = useRoute();
    const navigate = useNavigation()
    const { product } = route.params;


    useEffect(() => {

    }, [product])

    return (
        <View>
            <View style={styles.headerBg}>
                <ImageBackground source={{ uri: product.imageUrl }} style={styles.imageBg} />
                <View style={styles.iconsContainer}>
                    <TouchableOpacity onPress={() => navigate.goBack()}>
                        <Icon name="chevron-back" color="white" size={32} />
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.card}>
                <Text style={styles.cardTitle}>{product.name}</Text>
                <Text style={styles.cardPrice}> {(product.amount.toFixed(0)).toLocaleString()} {product.currency}</Text>
                <Text style={styles.cardDescTitle}>{"Description"}</Text>
                <Text style={{ ...styles.cardPrice, fontWeight: "400" }}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt fuga laboriosam facilis, at error repudiandae fugiat doloremque! Blanditiis natus optio eius, aspernatur facere laudantium incidunt, quae maiores unde tempora libero tempore accusantium quas facilis dicta. Quis vel nisi sed possimus quia maiores necessitatibus, quo deleniti dicta doloremque, ratione commodi quisquam.</Text>

                <TouchableOpacity style={{ width: "100%", padding: "10" }}>
                    <Text style={{ color: "#FF9900", fontSize: 18, fontWeight: "bold", marginTop: 20 }}>Buy Product</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default ProductDetailScreen

//Stylesheet

const styles = StyleSheet.create({
    headerBg: {
        position: "relative"
    },
    imageBg: {
        width: '100%',
        height: 400
    },
    iconsContainer: {
        position: "absolute",
        top: 20,
        padding: 10,
        width: "100%",
        display: "grid",
    },
    card: {
        width: "100%",
        backgroundColor: "white",
        borderStartStartRadius: "20",
        borderTopRightRadius: "20",
        padding: 5,
        paddingTop: 40,
        paddingLeft: 20,
        paddingRight: 20,
        marginTop: -100,
        height: 1000
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
    cardDescTitle: {
        fontSize: 14,
        fontWeight: 'bold',
        marginBottom: 8,
        marginTop: 20
    },
})