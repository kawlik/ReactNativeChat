import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { onAuthStateChanged, User } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Home, SignIn, SignUp } from './src/screens/@';
import { FirebaseService } from './src/services/@';


/*  Initialize navigation stack
/*   *   *   *   *   *   *   *   *   *   */
const Stack = createNativeStackNavigator();


/*  Component logic
/*   *   *   *   *   *   *   *   *   *   */
export default function App() {


    //  use user state
    const [ user, setUser ] = useState<User|null>( null );


    //  use effects
    useEffect(() => {

        const unsubscribeAuthStateChanged = onAuthStateChanged( FirebaseService.Auth, ( user ) => setUser( user ));

    return () => {

        unsubscribeAuthStateChanged();

    }}, []);


/*  Component layout
/*   *   *   *   *   *   *   *   *   *   */
return (
<SafeAreaProvider>
<NavigationContainer>
<Stack.Navigator screenOptions={{
    headerShown: false,
}}>
{
    !!user
    ?   <>
        <Stack.Screen name='Home' component={ Home } />
    </>
    :   <>
        <Stack.Screen name='SignIn' component={ SignIn } />
        <Stack.Screen name='SignUp' component={ SignUp } />
    </>
}
</Stack.Navigator>
</NavigationContainer>
</SafeAreaProvider>
)}