import { MaterialCommunityIcons } from '@expo/vector-icons';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useAppContext } from '../contexts/@';
import { Chats, Photo } from '../pages/@';


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

    <Tab.Screen {...prop} name='Chats' component={ Chats } options={{ tabBarIcon: ({ color }) => <MaterialCommunityIcons name='forum' color={color} size={26} /> }} />
    <Tab.Screen {...prop} name='Photo' component={ Photo } options={{ tabBarIcon: ({ color }) => <MaterialCommunityIcons name='camera' color={color} size={26} /> }} />
    
</Tab.Navigator>
)}