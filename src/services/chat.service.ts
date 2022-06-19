import { collection, query, where } from 'firebase/firestore';
import { FirebaseService } from './@';


/*  Define service
/*   *   *   *   *   *   *   *   *   *   */
class Service {

    constructor(
        private readonly chats = () => collection( FirebaseService.Firestore, 'chats' ),
    ) { }

    /*  Chat Queries
    /*   *   *   *   *   *   *   *   */

    get Chats() {
        return query( this.chats(), where( 'users', 'array-contains', FirebaseService.Auth.currentUser?.uid ));
    }
}


/*  Export service
/*   *   *   *   *   *   *   *   *   *   */
export default new Service();