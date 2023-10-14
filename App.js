import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from './pages/HomeScreen';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ApolloProvider } from '@apollo/client';
import apoloClient from './api/apolo';
import CreateProductScreen from './pages/CreateProductScreen';
import ProductDetailScreen from './pages/ProductDetail';
// import ProductScreen from './screens/ProductScreen';

const Stack = createStackNavigator();

function App() {
  return (
    <ApolloProvider client={apoloClient}>
      <NavigationContainer>

        <Stack.Navigator>

          <Stack.Screen options={{ headerShown: false }} name="Home" component={HomeScreen} />
          <Stack.Screen options={{ headerShown: false }} name="CreateProduct" component={CreateProductScreen} />
          <Stack.Screen options={{ headerShown: false }} name="ProductDetail" component={ProductDetailScreen} />
          {/* <Stack.Screen name="Product" component={ProductScreen} /> */}
        </Stack.Navigator>
      </NavigationContainer>
    </ApolloProvider>
  );
}

export default App;