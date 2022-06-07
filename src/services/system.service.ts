import { launchCameraAsync } from 'expo-image-picker';
import { FirebaseService } from './@';


/*  Define service
/*   *   *   *   *   *   *   *   *   *   */
class Service {

    constructor(

    ) { }

    async pickInage() {
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
}


/*  Export service
/*   *   *   *   *   *   *   *   *   *   */
export default new Service();