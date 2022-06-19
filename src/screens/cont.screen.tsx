import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useEffect, useState } from 'react';
import { ScrollView, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Contact } from '../components/@';
import { SystemService } from '../services/@';


/*  Component logic
/*   *   *   *   *   *   *   *   *   *   */
export default function ( prop: NativeStackScreenProps<any, 'Cont'> ) {

    //  common navigate func
    const navigate = async () => {

    }

    //  use state
    const [ contacts, setContacts ] = useState<Array<any>>( [] );

    //  use effects
    useEffect(() => {

        SystemService.contacts().then(( res ) => setContacts( res ));

    return () => {

    }}, []);


/*  Component layout
/*   *   *   *   *   *   *   *   *   *   */
return (
<SafeAreaView style={{ flex: 1 }} >
<ScrollView style={{ padding: 10 }} >
{

    contacts.map(( contact ) => <Contact navigate={ () => navigate() } email={ contact.emails[0].email || '' } name={ contact.name } key={ contact.id } /> )
}
</ScrollView>
</SafeAreaView>
)}