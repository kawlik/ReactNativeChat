import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useState } from 'react';
import { Button, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';


/*  Component logic
/*   *   *   *   *   *   *   *   *   *   */
export default function ( prop: NativeStackScreenProps<any, 'SignUp'> ) {

    //  use state
    const [ email, setEmail ] = useState( '' );
    const [ passw, setPassw ] = useState( '' );

    //  use guard
    const isValid = ( !!email && !!passw );


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
        color: 'green',
    }} >{ 'Nice to meet You! 🤝' }</Text>

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
            title='Sign Up'
            color='green'
        />
        </View>

        <TouchableOpacity onPress={ () => prop.navigation.navigate( 'SignIn' ) } style={{ marginTop: 20 }} >
            <Text style={{ color: '#999999', textAlign: 'center' }}>{ 'Already with us?' }</Text>
        </TouchableOpacity>

    </View>
    
</SafeAreaView> 
)}