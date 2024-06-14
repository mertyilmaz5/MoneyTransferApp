import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "./screens/LoginScreen";
import TransferListScreen from "./screens/TransferListScreen";
import TransferRequestScreen from "./screens/TransferRequestScreen";
import ConfirmationScreen from "./screens/ConfirmationScreen";
import ReceiverScreen from "./screens/ReceiverScreen";

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="LoginScreen">
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="TransferList" component={TransferListScreen} />
        <Stack.Screen
          name="TransferRequest"
          component={TransferRequestScreen}
        />
        <Stack.Screen name="Confirmation" component={ConfirmationScreen} />
        <Stack.Screen name="Receiver" component={ReceiverScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
