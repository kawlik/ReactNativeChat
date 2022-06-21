import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { useAppContext } from '../contexts/app.context';
import { FirebaseService } from '../services/@';


/*  Component logic
/*   *   *   *   *   *   *   *   *   *   */
export default function ( prop: {
    navigate(): void,
    email: string,
    last?: string,
    name?: string,
}) {

    //  use context
    const { lead } = useAppContext();

    //  use stae
    const [ displayName, setDisplayName ] = useState( '' );
    const [ photoURL, setPhotoURL ] = useState( '' );

    //  use effect
    useEffect(() => {

        FirebaseService.getDoc('user', prop.email)
        .then( res => {
            !!res?.displayName  && setDisplayName( res.displayName );
            !!res?.photoURL     && setPhotoURL( res.photoURL );
        })
        .catch( err => console.error( err ));

    return () => {

    }});


/*  Component layout
/*   *   *   *   *   *   *   *   *   *   */
return (
<TouchableOpacity onPress={ prop.navigate } style={{ borderBottomWidth: 1, borderBottomColor: 'lightgrey', paddingVertical: 10, flexDirection: 'row' }} >

    {
        !!prop.last
        ? <MaterialCommunityIcons name='chat-processing-outline' size={28} color={ lead } style={{ marginEnd: 10 }} />
        : <MaterialCommunityIcons name='chat-plus-outline' size={28} color={ lead } style={{ marginEnd: 10 }} />

    }

    {
        !!photoURL
        ?   <Image source={{ uri: photoURL }} style={{ width: 36, height: 36, borderRadius: 100 }} />
        :   <MaterialCommunityIcons name='account-outline' size={36} color='grey' />
    }

    <View style={{ marginLeft: 10 }} >

        <Text style={{ fontWeight: '800', fontSize: 14 }} >{ !!displayName ? displayName + '\ ' + `(${ prop.email })` : prop.email }</Text>

        { !!prop.name && <Text style={{ fontWeight: '400', fontSize: 12, fontStyle: 'italic' }} >{ prop.name.length > 40 ? prop.name.slice( 0, 40 ) + ' ...' : prop.name }</Text> }

        { !!prop.last && <Text style={{ fontWeight: '400', fontSize: 12, fontStyle: 'italic' }} >{ prop.last.length > 40 ? prop.last.slice( 0, 40 ) + ' ...' : prop.last }</Text> }

    </View>

</TouchableOpacity>
)}