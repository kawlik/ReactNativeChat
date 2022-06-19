import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { ScrollView, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Contacts } from "../components/@";
import { ChatService } from "../services/@";


/*  Component logic
/*   *   *   *   *   *   *   *   *   *   */
export default function ( prop: NativeStackScreenProps<any, 'Home'> ) {

    //  use state
    const [ chats, setChats ] = useState<Array<any>>( [] );

    //  use effects
    useEffect(() => {

        const unsubscribeChatsSnapshot = onSnapshot( ChatService.Chats, ( snapshot ) => {

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

        <Text>Hello! - Chats</Text>


    </ScrollView>

</SafeAreaView>
)}