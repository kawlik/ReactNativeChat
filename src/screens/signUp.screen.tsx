import { MaterialCommunityIcons } from '@expo/vector-icons';
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { useState } from 'react';
import { Button, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAppContext } from '../contexts/@';
import { FirebaseService } from '../services/@';


/*  Component logic
/*   *   *   *   *   *   *   *   *   *   */
export default function ( prop: NativeStackScreenProps<any, 'SignUp'> ) {

    //  use context
    const { lead } = useAppContext();

    //  use state
    const [ email, setEmail ] = useState( '' );
    const [ passw, setPassw ] = useState( '' );

    //  use guard
    const isValid = ( !!email && !!passw );

    //  use firebase service
    const tryAuth = async () => {
        FirebaseService.signUp( email, passw );
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
        Nice to meet You! <MaterialCommunityIcons name='handshake-outline' size={28} color={lead} />
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
                borderColor: lead,
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
                borderColor: lead,
                padding: 5,
                width: 260,
            }}
        />

        <View style={{ marginTop: 20 }} >
        <Button
            disabled={ !isValid }
            onPress={ tryAuth }
            title='Sign Up'
            color={lead}
        />
        </View>

        <TouchableOpacity onPress={ () => prop.navigation.navigate( 'SignIn' ) } style={{ marginTop: 20 }} >
            <Text style={{ color: '#999999', textAlign: 'center' }}>{ 'Already with us?' }</Text>
        </TouchableOpacity>

    </View>
    
</SafeAreaView> 
)}