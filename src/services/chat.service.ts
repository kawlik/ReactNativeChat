import { addDoc, arrayUnion, collection, doc, DocumentReference, getDocs, query, updateDoc, where } from 'firebase/firestore';
import { FirebaseService } from './@';


/*  Define service
/*   *   *   *   *   *   *   *   *   *   */
class Service {

    constructor(
        private readonly chats = () => collection( FirebaseService.Firestore, 'chat' ),
    ) { }

    /*  Chat Queries
    /*   *   *   *   *   *   *   *   */

    getChats() {
        return query( this.chats(), where( 'users', 'array-contains', FirebaseService.Auth.currentUser?.email ));
    }

    async getChat0( email: string ) {

        //  get ref if avaialble
        const id1 = ( await getDocs( this.getChat1( email ))).docs.map(( doc ) => doc.id );
        const id2 = ( await getDocs( this.getChat1( email ))).docs.map(( doc ) => doc.id );

        //  test refs
        if( !!id1.length || !!id2.length ) return;

        //  create new chat
        await addDoc( this.chats(), {
            users: [ FirebaseService.Auth.currentUser?.email, email ],
            posts: [],
            last: {
                user: FirebaseService.Auth.currentUser?.email,
                post: 'Hello, friend! Lets\s chat!',
            },
        });
    }

    getChat1( email: string ) {
        return query( this.chats(), where( 'users', 'in', [[ `${ FirebaseService.Auth.currentUser?.email }`, `${ email }` ]] ));
    }

    getChat2( email: string ) {
        return query( this.chats(), where( 'users', 'in', [[ `${ email }`, `${ FirebaseService.Auth.currentUser?.email }` ]] ));
    }

    postMess( ref: DocumentReference, post: { post: string, user: string }) {
        updateDoc( ref, { posts: arrayUnion( post ), last: post });
    }
}


/*  Export service
/*   *   *   *   *   *   *   *   *   *   */
export default new Service();