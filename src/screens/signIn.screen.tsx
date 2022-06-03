import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useState } from 'react';
import { Button, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FirebaseService } from '../services/@';

/*  Component logic
/*   *   *   *   *   *   *   *   *   *   */
export default function ( prop: NativeStackScreenProps<any, 'SignIn'> ) {

    //  use state
    const [ email, setEmail ] = useState( '' );
    const [ passw, setPassw ] = useState( '' );

    //  use guard
    const isValid = ( !!email && !!passw );

    //  use firebase service
    const tryAuth = async () => {
        FirebaseService.signIn( email, passw );
    }


/*  Component layout
/*   *   *   *   *   *   *   *   *   *   */
return (
<SafeAreaView style={{
    flex: 1,
    backgroundColor: 'whitesmoke',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
}} >

    <Text style={{
        fontSize: 28,
        color: 'grey',
    }} >
        Welcome back! <MaterialCommunityIcons name='hand-wave-outline' size={28} color='green' />
    </Text>

    <View style={{
        marginVertical: 20,
        justifyContent: 'center',
        alignContent: 'stretch',
        alignItems: 'stretch',
    }} >

        <TextInput
            value={ email }
            onChangeText={ setEmail }
            placeholder='Email'
            style={{
                borderBottomWidth: 1,
                borderColor: 'green',
                padding: 5,
                width: 260,
            }}
        />

        <TextInput
            value={ passw }
            secureTextEntry={ true }
            onChangeText={ setPassw }
            placeholder='Password'
            style={{
                borderBottomWidth: 1,
                borderColor: 'green',
                padding: 5,
                width: 260,
            }}
        />

        <View style={{ marginTop: 20 }} >
        <Button
            disabled={ !isValid }
            onPress={ tryAuth }
            title='Sign In'
            color='green'
        />
        </View>

        <TouchableOpacity onPress={ () => prop.navigation.navigate( 'SignUp' ) } style={{ marginTop: 20 }} >
            <Text style={{ color: '#999999', textAlign: 'center' }}>{ 'Dont have an account?' }</Text>
        </TouchableOpacity>

    </View>
    
</SafeAreaView> 
)}