import { MaterialCommunityIcons } from '@expo/vector-icons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Text, View, Button, SectionList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAppContext } from '../contexts/@';
import { FirebaseService } from '../services/@';

const DATA = [
    {
      title: "Main dishes",
      data: ["Pizza", "Burger", "Risotto"]
    },
    {
      title: "Sides",
      data: ["French Fries", "Onion Rings", "Fried Shrimps"]
    },
    {
      title: "Drinks",
      data: ["Water", "Coke", "Beer"]
    },
    {
      title: "Desserts",
      data: ["Cheese Cake", "Ice Cream"]
    },
  ];

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

        sections={DATA}

        keyExtractor={(item, index ) => item + index }
        style={{ padding: 20 }}

        renderItem={({ item }) => <View style={{ marginVertical: 2 }}><Button title={ item } /></View> }
        renderSectionHeader={({ section: { title } }) => (
            <Text style={{ fontSize: 20, fontWeight: '400' }}>{ title }</Text>
        )}
    />

</SafeAreaView>
)}