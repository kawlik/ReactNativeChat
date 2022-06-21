import { MaterialCommunityIcons } from '@expo/vector-icons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Text, View, Button, SectionList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAppContext } from '../contexts/@';
import { FirebaseService } from '../services/@';


/*  Component logic
/*   *   *   *   *   *   *   *   *   *   */
export default function ( prop: NativeStackScreenProps<any, 'Home'> ) {

    //  use context
    const { lead, setLead } = useAppContext();


/*  Component layout
/*   *   *   *   *   *   *   *   *   *   */
return (
<SafeAreaView style={{
    flex: 1,
    backgroundColor: 'whitesmoke',
    justifyContent: 'flex-start',
    alignContent: 'stretch',
    alignItems: 'stretch',
}}>

    <View style={{
        padding: 20,
        flexDirection: 'row-reverse',
        justifyContent: 'space-between',
    }} >

        <View>
        <Button
            onPress={ () => FirebaseService.Auth.signOut() }
            color='lightgrey'
            title='Logout'
        />
        </View>

        <Text style={{
            fontSize: 28,
            color: 'grey',
        }} >
            Setings <MaterialCommunityIcons name='cog-outline' size={28} color={lead} />
        </Text>

    </View>

    <SectionList

        sections={[
            {
                title: 'Color',
                data: [
                    { color: '#dc3545', name: 'Red' },
                    { color: '#ffc107', name: 'Yellow' },
                    { color: '#32cd32', name: 'Lime' },
                    { color: '#008000', name: 'Green' },
                    { color: '#0dcaf0', name: 'Azure' },
                    { color: '#0d6efd', name: 'Blue' },
                    { color: '#6f42c1', name: 'Purple' },
                ]
            }
        ]}

        
        renderItem={({ item }) => (
            <View style={{ marginVertical: 5 }}><Button title={ item.name } color={ item.color } onPress={ () => !!setLead && setLead( item.color ) } /></View>
        )}

        renderSectionHeader={({ section: { title } }) => (
            <Text style={{ fontSize: 20, fontWeight: '400' }}>{ title }</Text>
        )}

        style={{ padding: 20 }}
    />

</SafeAreaView>
)}