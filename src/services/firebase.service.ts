import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { getStorage } from 'firebase/storage';
import { initializeFirestore } from 'firebase/firestore';
import { FirebaseApp } from "../configs/@";


/*  Define service
/*   *   *   *   *   *   *   *   *   *   */
class Service {

    constructor(
        private readonly auth = getAuth( FirebaseApp ),
        private readonly storage = getStorage( FirebaseApp ),
        private readonly firestore = initializeFirestore( FirebaseApp, { experimentalAutoDetectLongPolling: true }),
    ) { }


    get Auth() {
        return this.auth;
    }


    logout() {
        return this.auth.signOut()
    }

    signIn( email: string, password: string ) {
        return signInWithEmailAndPassword( this.auth, email, password );
    }

    signUp( email: string, password: string ) {
        return createUserWithEmailAndPassword( this.auth, email, password );
    }
}


/*  Export service
/*   *   *   *   *   *   *   *   *   *   */
export default new Service();