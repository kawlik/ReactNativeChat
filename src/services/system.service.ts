import { ImageInfo, launchCameraAsync } from 'expo-image-picker';

/*  Define service
/*   *   *   *   *   *   *   *   *   *   */
class Service {

    constructor(

    ) { }

    async pickInage() {
        return await launchCameraAsync();
    }
}


/*  Export service
/*   *   *   *   *   *   *   *   *   *   */
export default new Service();