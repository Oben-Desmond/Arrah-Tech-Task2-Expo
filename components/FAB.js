import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';

function FloatingActionButton() {
    const navigation = useNavigation();

    const handlePress = () => {
        navigation.navigate('CreateProduct');
    };

    return (
        <TouchableOpacity style={styles.fabContainer} onPress={handlePress}>
            <Icon name="add" size={24} color="white" />
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    fabContainer: {
        position: 'absolute',
        bottom: 50,
        right: 16,
        width: 56,
        height: 56,
        borderRadius: 28,
        backgroundColor: '#FF9900',
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 6,
    },
});

export default FloatingActionButton;