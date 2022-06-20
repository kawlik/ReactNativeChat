import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { ScrollView, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Contact, Contacts } from "../components/@";
import { ChatService, FirebaseService } from "../services/@";


/*  Component logic
/*   *   *   *   *   *   *   *   *   *   */
export default function ( prop: NativeStackScreenProps<any, 'Home'> ) {

    //  common navigate func
    const navigate = ( email: string ) => prop.navigation.navigate( 'Chat', { email });

    //  use state
    const [ chats, setChats ] = useState<Array<any>>( [] );

    //  use effects
    useEffect(() => {

        const unsubscribeChatsSnapshot = onSnapshot( ChatService.getChats(), ( snapshot ) => {

            //  get chats
            const chats = snapshot.docs.filter(( doc ) => doc.data()?.last ).map(( doc ) => ({ ...doc.data() }));

            //  set chats
            setChats( chats );
        });

    return () => {

        unsubscribeChatsSnapshot();

    }}, []);
    

/*  Component layout
/*   *   *   *   *   *   *   *   *   *   */
return (
<SafeAreaView style={{ flex: 1 }} >

    <Contacts navigate={ () => prop.navigation.navigate( 'Cont' ) } />

    <ScrollView style={{ padding: 10 }} >
    {
        chats.map(( chat ) => <Contact
            navigate={ () => navigate( chat.users.filter(( email:string ) => email !== FirebaseService.Auth.currentUser?.email )) }
            email={ chat.users.filter(( email:string ) => email !== FirebaseService.Auth.currentUser?.email ) }
            last={ chat.last.post }
            key={ chat.users }
        /> )
    }
    </ScrollView>

</SafeAreaView>
)}