import { onAuthStateChanged, User } from 'firebase/auth';
import { createContext, useContext, useEffect, useState } from 'react';
import { AsyncStorage } from 'react-native';
import { FirebaseService } from '../services/@';


/*  Declare Context
/*   *   *   *   *   *   *   *   *   *   */
export interface Context {

    //  required
    user: User | null
    lead: string,

    //  optional
    setLead?: ( color: string ) => void,
};


/*  Define Context
/*   *   *   *   *   *   *   *   *   *   */
export const ctx = createContext<Context>({ user: null, lead: 'green' });
export function useAppContext() {
    return useContext( ctx );
}


/*  Define Provider
/*   *   *   *   *   *   *   *   *   *   */
export function AppProvider( prop: {
    children: JSX.Element | JSX.Element[]
}) {

    //  use states
    const [ lead, setLead ] = useState<string>( 'green' );
    const [ user, setUser ] = useState<User|null>( null );


    //  use effects
    useEffect(() => {

        const unsubscribeAuthStateChanged = onAuthStateChanged( FirebaseService.Auth, ( user ) => setUser( user ));

        AsyncStorage.getItem( 'lead', ( error, color ) => {

            if( error ) return console.error( 'Async storage has failed!', error );

            setLead( color || 'green' );
        });

    return () => {

        unsubscribeAuthStateChanged();

    }}, []);


return(
<ctx.Provider value={{
    
    lead: lead,
    user: user,

    setLead: ( color: string ) => {

        //  set in app
        setLead( color );

        //  set in storage
        AsyncStorage.setItem( 'lead', color ).catch( err => console.error( 'Async storage has failed!', err ));
    },
}} >

    { prop.children }

</ctx.Provider>
)};