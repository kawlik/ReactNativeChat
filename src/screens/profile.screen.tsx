import { useState } from 'react';
import { Button, Image, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons, AntDesign } from '@expo/vector-icons';
import { useAppContext } from '../contexts/@';
import { FirebaseService, SystemService } from '../services/@';
import { updateProfile } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { NativeStackScreenProps } from '@react-navigation/native-stack';


/*  Component logic
/*   *   *   *   *   *   *   *   *   *   */
export default function ( prop: NativeStackScreenProps<any, 'Profile'> ) {

    //  use context
    const { user } = useAppContext();

    //  use state
    const [ name, setName ] = useState( '' );
    const [ pict, setPict ] = useState( '' );



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
        margin: 5,
        fontSize: 28,
        color: 'grey',
    }} >
        Profile info <AntDesign name='user' size={28} color='green' />
    </Text>
    
    <Text style={{
        margin: 5,
        fontSize: 16,
        color: 'grey',
    }} >{ 'Please provide your name, and verify your email.' }</Text>

    <TouchableOpacity
        onPress={ () => SystemService.pickInage().then( res => !res.cancelled && setPict( res.uri )) }
        style={{
            width: 192,
            height: 192,
            aspectRatio: 1,
            borderRadius: 100,
            marginVertical: 25,
            backgroundColor: 'lightgrey',
            justifyContent: 'center',
            alignContent: 'center',
            alignItems: 'center',
    }} >
    {
        !!pict
        ?   <Image source={{ uri: pict }} style={{ width: 192, height: 192, borderRadius: 100 }} />
        :   <MaterialIcons name='add-a-photo' size={72} color='grey' />
    }
    </TouchableOpacity>

    <View style={{
        marginVertical: 10,
        justifyContent: 'center',
        alignContent: 'stretch',
        alignItems: 'stretch',
    }} >

        <TextInput
            value={ name }
            onChangeText={ setName }
            placeholder='Your name'
            style={{
                borderBottomWidth: 1,
                borderColor: 'green',
                padding: 5,
                width: 260,
            }}
        />

        <TextInput
            value={ user?.email || '' }
            editable={ false }
            placeholder='Your email'
            style={{
                borderBottomWidth: 1,
                borderColor: 'green',
                padding: 5,
                width: 260,
            }}
        />

        <View style={{ marginTop: 20 }} >
        <Button
            disabled={ !name || !pict }
            onPress={ async () => {

                //  get image data
                let imageData = !!pict && await SystemService.upload( pict, 'profilePicture', `images/${ user?.uid }` );

                //  update user data
                if( !!imageData ) await Promise.all([
                    FirebaseService.update( name, imageData.imageURL ),
                    FirebaseService.setDoc( 'user', {
                        email: user?.email,
                        displayName: name,
                        photoURL: imageData.imageURL
                    }),
                ]).then(() => prop.navigation.navigate( 'Home' ));

            }}
            title='Next'
            color='green'
        />
        </View>

    </View>

</SafeAreaView>
)}