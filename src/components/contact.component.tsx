import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Text, TouchableOpacity, View } from 'react-native';
import { useAppContext } from '../contexts/app.context';


/*  Component logic
/*   *   *   *   *   *   *   *   *   *   */
export default function ( prop: {
    navigate(): void,
    last?: string,
    email: string,
    name: string,
}) {

    //  use context
    const { lead } = useAppContext();


/*  Component layout
/*   *   *   *   *   *   *   *   *   *   */
return (
<TouchableOpacity onPress={ prop.navigate } style={{ borderBottomWidth: 1, borderBottomColor: 'lightgrey', paddingBottom: 10, flexDirection: 'row' }} >

    {
        !!prop.last
        ? <MaterialCommunityIcons name='chat-processing-outline' size={ 32 } color={ lead } style={{ marginEnd: 10 }} />
        : <MaterialCommunityIcons name='chat-plus-outline' size={ 32 } color={ lead } style={{ marginEnd: 10 }} />

    }

    <View>

        <Text style={{ fontWeight: '800', fontSize: 16 }} >{ prop.name }</Text>
        <Text style={{ fontWeight: '300', fontSize: 12 }} >{ prop.email }</Text>

        { !!prop.last && <Text style={{ fontWeight: '400', fontSize: 14, fontStyle: 'italic', paddingTop: 10 }} >{ prop.last.slice( 0, 40 ) + ' [...]' }</Text> }

    </View>

</TouchableOpacity>
)}