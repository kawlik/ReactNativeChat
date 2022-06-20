import { Text, View } from 'react-native';
import { useAppContext } from '../contexts/app.context';


/*  Component logic
/*   *   *   *   *   *   *   *   *   *   */
export default function ( prop: {
    user: string,
    post: string,
}) {

    //  use context
    const { user, lead } = useAppContext();


/*  Component layout
/*   *   *   *   *   *   *   *   *   *   */
return (
<View style={{
    backgroundColor: user?.email === prop.user ? lead : 'lightgrey',
    marginRight: user?.email === prop.user ? 0 : 'auto',
    marginLeft: user?.email === prop.user ? 'auto' : 0,
    margin: 'auto',
    borderRadius: 15,
    marginVertical: 2,
    paddingVertical: 5,
    paddingHorizontal: 15,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
}} >

    <Text style={{
        fontSize: 14,
        fontWeight: '600',
        color: user?.email === prop.user ? 'white' : 'darkslategrey',
    }} >{ prop.post }</Text>

</View>
)}