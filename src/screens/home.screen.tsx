import { MaterialCommunityIcons } from '@expo/vector-icons';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useAppContext } from '../contexts/@';
import { Chats, Setings } from '../pages/@';


/*  Component Navigation
/*   *   *   *   *   *   *   *   *   *   */
const Tab = createMaterialBottomTabNavigator();


/*  Component logic
/*   *   *   *   *   *   *   *   *   *   */
export default function ( prop: NativeStackScreenProps<any, 'Home'> ) {

    //  use context
    const { lead } = useAppContext();


/*  Component layout
/*   *   *   *   *   *   *   *   *   *   */
return (
<Tab.Navigator activeColor={lead} barStyle={{
    backgroundColor: 'white',
}} >

    <Tab.Screen {...prop} name='Chats' component={ Chats } options={{ tabBarIcon: ({ color }) => <MaterialCommunityIcons name='forum' color={color} size={28} /> }} />
    <Tab.Screen {...prop} name='Setings' component={ Setings } options={{ tabBarIcon: ({ color }) => <MaterialCommunityIcons name='cog-outline' color={color} size={28} /> }} />
    
</Tab.Navigator>
)}