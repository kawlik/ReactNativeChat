import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { getDownloadURL, getStorage, ref, StorageReference, uploadBytes, UploadResult } from 'firebase/storage';
import { doc, collection, initializeFirestore, query, setDoc, where, getDocs } from 'firebase/firestore';
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

    get Storage() {
        return this.storage;
    }

    get Firestore() {
        return this.firestore;
    }


    /*  Auth
    /*   *   *   *   *   *   *   *   */

    logout() {
        return this.auth.signOut()
    }

    signIn( email: string, password: string ) {
        return signInWithEmailAndPassword( this.auth, email, password );
    }

    signUp( email: string, password: string ) {
        return createUserWithEmailAndPassword( this.auth, email, password );
    }

    update(displayName: string, photoURL: string) {
        return updateProfile( this.auth.currentUser!, { displayName, photoURL });
    }


    /*  Storage
    /*   *   *   *   *   *   *   *   */

    getRef(pathname: string) {
        return ref( this.storage, pathname );
    }

    getURL(snapshot: UploadResult) {
        return getDownloadURL( snapshot.ref );
    }

    upload(dataRef: StorageReference, blob: Blob ) {
        return uploadBytes( dataRef, blob, {
            contentType: 'image/jpeg',
        });
    }


    /*  Firestore
    /*   *   *   *   *   *   *   *   */

    setDoc(col: 'user', payload: any) {
        return setDoc( doc( this.firestore, col, this.auth.currentUser?.uid! ), payload );
    }

    async getDoc(col: 'user', email: string) {
        return ( await getDocs( query( collection( this.firestore, col ), where( 'email', '==', `${ email }` )))).docs.map(( doc ) => ({ ...doc.data() }))[0];
    }
}


/*  Export service
/*   *   *   *   *   *   *   *   *   *   */
export default new Service();