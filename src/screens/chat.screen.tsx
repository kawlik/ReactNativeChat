import { MaterialCommunityIcons } from '@expo/vector-icons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { DocumentReference, onSnapshot } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { Image, ScrollView, Text, TextInput, Touchable, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Message } from '../components/@';
import { useAppContext } from '../contexts/@';
import { ChatService, FirebaseService } from '../services/@';



/*  Component logic
/*   *   *   *   *   *   *   *   *   *   */
export default function ( prop: NativeStackScreenProps<any, 'Chat'> ) {

    //  use context
    const { user, lead } = useAppContext();

    //  use state
    const [ post, setPost ] = useState<string>( '' );
    const [ chat, setChat ] = useState<{
        last: {
            user: string,
            post: string,
        },
        posts: Array<{
            user: string,
            post: string,
        }>,
        users: Array<string>,
        ref: DocumentReference,
    }|null>( null );

    //  use stae
    const [ displayName, setDisplayName ] = useState( '' );
    const [ photoURL, setPhotoURL ] = useState( '' );

    //  use effect
    useEffect(() => {

        FirebaseService.getDoc('user', prop.route.params?.email )
        .then( res => {
            !!res?.displayName  && setDisplayName( res.displayName );
            !!res?.photoURL     && setPhotoURL( res.photoURL );
        })
        .catch( err => console.error( err ));

    return () => {

    }});


    //  post message
    const postMessage = () => {

        //  create post
        const newPost = {
            user: user?.email!,
            post: post,
        };

        //  clear data
        setPost( '' );

        //  send post
        ChatService.postMess( chat?.ref!, newPost );
    }


    //  use effects
    useEffect(() => {

        ChatService.getChat0( prop.route.params?.email );

        const unsubscribeChatSnapshot1 = onSnapshot( ChatService.getChat1( prop.route.params?.email ), ( snapshot ) => {

            //  get chats
            const chat = snapshot.docs.filter(( doc ) => doc.data()?.last ).map(( doc ) => ({ ...doc.data(), ref: doc.ref }));

            //  set chats
            if( !!chat.length ) {

                setChat( chat[0] as any );
            }
        });

        const unsubscribeChatSnapshot2 = onSnapshot( ChatService.getChat2( prop.route.params?.email ), ( snapshot ) => {

            //  get chats
            const chat = snapshot.docs.filter(( doc ) => doc.data()?.last ).map(( doc ) => ({ ...doc.data(), ref: doc.ref }));

            //  set chats
            if( !!chat.length ) {

                setChat( chat[0] as any );
            }
        });

    return () => {

        unsubscribeChatSnapshot1();
        unsubscribeChatSnapshot2();

    }}, []);


/*  Component layout
/*   *   *   *   *   *   *   *   *   *   */
return (
<SafeAreaView style={{ flex: 1 }} >

    <View style={{
        borderBottomColor: lead,
        borderBottomWidth: 1,
        flexDirection: 'row',
        padding: 10,
    }} >

    {
        !!photoURL
        ?   <Image source={{ uri: photoURL }} style={{ width: 44, height: 44, borderRadius: 100 }} />
        :   <MaterialCommunityIcons name='account-outline' size={44} color='grey' />
    }

        <View style={{ marginLeft: 15 }} >

            <Text style={{ fontWeight: '600', fontSize: 15 }} >{ prop.route.params?.email }</Text>

            <Text style={{ fontWeight: '400', fontSize: 13, fontStyle: 'italic' }} >{ displayName }</Text>

        </View>

    </View>

    <ScrollView style={{ padding: 10, flexDirection: 'column-reverse' }} >
    {
        chat?.posts.map(( post ) => <Message {...post} key={post.user + post.post} /> )
    }
    </ScrollView>

    <View style={{
        borderTopColor: lead,
        borderTopWidth: 1,
        flexDirection: 'row',
        padding: 10,
    }} >

        <TextInput
        value={ post }
        onChangeText={ setPost }
            placeholder='Post new message'
            style={{
                borderBottomWidth: 0,
                borderColor: lead,
                padding: 5,
                flex: 1,
            }}
        />

        <TouchableOpacity style={{ marginStart: 10, margin: 'auto' }} disabled={ !post.trim().length } onPress={() => postMessage()} >
            <MaterialCommunityIcons name='send' size={28} color={ !post.trim().length ? 'grey' : lead } style={{transform: [{ rotate: '-45deg' }] }} />
        </TouchableOpacity>

    </View>

</SafeAreaView>
)}