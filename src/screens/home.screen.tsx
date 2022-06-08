import { MaterialCommunityIcons } from '@expo/vector-icons';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { Chats, Photo } from '../pages/@';


/*  Component Navigation
/*   *   *   *   *   *   *   *   *   *   */
const Tab = createMaterialBottomTabNavigator();


/*  Component logic
/*   *   *   *   *   *   *   *   *   *   */
export default function () {


/*  Component layout
/*   *   *   *   *   *   *   *   *   *   */
return (
<Tab.Navigator activeColor='green' inactiveColor='lightgrey' barStyle={{
    backgroundColor: 'white',
}} >

    <Tab.Screen name='Chats' component={ Chats } options={{ tabBarIcon: ({ color }) => <MaterialCommunityIcons name='forum' color={color} size={26} /> }} />
    <Tab.Screen name='Photo' component={ Photo } options={{ tabBarIcon: ({ color }) => <MaterialCommunityIcons name='camera' color={color} size={26} /> }} />
    
</Tab.Navigator>
)}