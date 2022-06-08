import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AppProvider, useAppContext } from './src/contexts/@';
import { Conf, Home, SignIn, SignUp } from './src/screens/@';


/*  Initialize navigation stack
/*   *   *   *   *   *   *   *   *   *   */
const Stack = createNativeStackNavigator();


/*  Component logic
/*   *   *   *   *   *   *   *   *   *   */
export function App() {

    //  use context
    const { user } = useAppContext();
    

/*  Component layout
/*   *   *   *   *   *   *   *   *   *   */
return (
<Stack.Navigator screenOptions={{
    headerShown: false,
}}>
{
    !!user
    ?   <>
        { !user.displayName && <Stack.Screen name='Conf' component={ Conf } /> }

        <Stack.Screen name='Home' component={ Home } />
        <Stack.Screen name='Conf' component={ Conf } />
    </>
    :   <>
        <Stack.Screen name='SignIn' component={ SignIn } />
        <Stack.Screen name='SignUp' component={ SignUp } />
    </>
}
</Stack.Navigator>
)}


/*  App buildier
/*   *   *   *   *   *   *   *   *   *   */
export default function () {
return(
<AppProvider>
<SafeAreaProvider>
<NavigationContainer>

    <StatusBar style='auto' />

    <App />

</NavigationContainer>
</SafeAreaProvider>
</AppProvider>
)}