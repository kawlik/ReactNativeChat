import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Text, TouchableOpacity, View } from 'react-native';
import { useAppContext } from '../contexts/app.context';


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


/*  Component layout
/*   *   *   *   *   *   *   *   *   *   */
return (
<TouchableOpacity onPress={ prop.navigate } style={{ borderBottomWidth: 1, borderBottomColor: 'lightgrey', paddingVertical: 10, flexDirection: 'row' }} >

    {
        !!prop.last
        ? <MaterialCommunityIcons name='chat-processing-outline' size={28} color={ lead } style={{ marginEnd: 10 }} />
        : <MaterialCommunityIcons name='chat-plus-outline' size={28} color={ lead } style={{ marginEnd: 10 }} />

    }

    <View>

        <Text style={{ fontWeight: '800', fontSize: 14 }} >{ prop.email }</Text>

        { !!prop.name && <Text style={{ fontWeight: '400', fontSize: 12, fontStyle: 'italic' }} >{ prop.name.length > 40 ? prop.name.slice( 0, 40 ) + ' ...' : prop.name }</Text> }

        { !!prop.last && <Text style={{ fontWeight: '400', fontSize: 12, fontStyle: 'italic' }} >{ prop.last.length > 40 ? prop.last.slice( 0, 40 ) + ' ...' : prop.last }</Text> }

    </View>

</TouchableOpacity>
)}