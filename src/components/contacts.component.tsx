import { MaterialCommunityIcons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';
import { useAppContext } from '../contexts/app.context';


/*  Component logic
/*   *   *   *   *   *   *   *   *   *   */
export default function ( prop: {
    navigate(): void,
}) {

    //  use context
    const { lead } = useAppContext();


/*  Component layout
/*   *   *   *   *   *   *   *   *   *   */
return (
<TouchableOpacity onPress={ prop.navigate } style={{
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    backgroundColor: lead,
    borderRadius: 60,
    height: 60,
    width: 60,
    position: 'absolute',
    zIndex: 20,
    bottom: 20,
    right: 20,
}} >

    <MaterialCommunityIcons name='android-messages' size={ 30 } color='white' />

</TouchableOpacity>
)}