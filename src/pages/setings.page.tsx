import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { ScrollView, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";


/*  Component logic
/*   *   *   *   *   *   *   *   *   *   */
export default function ( prop: NativeStackScreenProps<any, 'Home'> ) {


/*  Component layout
/*   *   *   *   *   *   *   *   *   *   */
return (
<SafeAreaView  style={{ flex: 1 }} >
<ScrollView style={{ padding: 10 }} >

    <Text>Hello! - Setings</Text>

</ScrollView>
</SafeAreaView>
)}