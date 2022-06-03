import { Image, Text, TextInput, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons, AntDesign } from '@expo/vector-icons';
import { useAppContext } from '../contexts/@';


/*  Component logic
/*   *   *   *   *   *   *   *   *   *   */
export default function () {

    //  use context
    const { user } = useAppContext();


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

    <TouchableOpacity style={{
        margin: 25,
        padding: 25,
        borderRadius: 100,
        backgroundColor: 'lightgrey',
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
        aspectRatio: 1
    }} >
    {
        !!user?.photoURL
        ?   <Image source={{ uri: user.photoURL }} style={{ aspectRatio: 1, }} />
        :   <MaterialIcons name='add-a-photo' size={36} color='grey' />
    }
    </TouchableOpacity>

</SafeAreaView>
)}