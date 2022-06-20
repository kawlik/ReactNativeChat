import { requestPermissionsAsync, getContactsAsync, Fields } from 'expo-contacts';
import { launchCameraAsync } from 'expo-image-picker';
import { FirebaseService } from './@';


/*  Define service
/*   *   *   *   *   *   *   *   *   *   */
class Service {

    constructor(

    ) { }

    async pickImage() {
        return await launchCameraAsync();
    }

    async upload(uri: string, name: string, path: string) {

        //  create blob
        const blob = await new Promise(( resolve, reject ) => {

            //  init xhr
            const xhr = new XMLHttpRequest();
            
            //  events handlers
            xhr.onload = () => resolve( xhr.response );
            xhr.onerror = () => reject( new Error( 'Upload has failed!' ));

            //  setup xhr
            xhr.responseType = 'blob';
            xhr.open( 'GET', uri, true );
            xhr.send( null );
        });

        //  prepare user data
        const fileName = `${ name || 'unnamed-' + Date.now().toString() }`;
        const pathName = `${ path }/${ fileName }.jpeg`;
        const imageRef = FirebaseService.getRef( pathName );
        
        //  make snapshot
        const snapshot = await FirebaseService.upload( imageRef, blob as Blob );
        const imageURL = await FirebaseService.getURL( snapshot );
        
        //  return result
        return { fileName, imageURL };
    }

    async contacts() {

        //  await for permisions
        const { status } = await requestPermissionsAsync();

        //  test permisions
        if( status !== 'granted' ) return [];

        //  await for data
        const { data } = await getContactsAsync({
            fields: [Fields.Name, Fields.Emails]
        });

        //  return contacts
        return data;
    }
}


/*  Export service
/*   *   *   *   *   *   *   *   *   *   */
export default new Service();