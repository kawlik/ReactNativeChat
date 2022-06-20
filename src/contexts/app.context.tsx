import { onAuthStateChanged, User } from 'firebase/auth';
import { createContext, useContext, useEffect, useState } from 'react';
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

    return () => {

        unsubscribeAuthStateChanged();

    }}, []);


return(
<ctx.Provider value={{
    
    lead: lead,
    user: user,

    setLead: ( color: string ) => {
        switch( color ) {

            //  optional colors
            case '#00ff00': return setLead( '#00ff00' );
            case '#00ff00': return setLead( '#00ff00' );
            case '#00ff00': return setLead( '#00ff00' );
            case '#00ff00': return setLead( '#00ff00' );
            case '#00ff00': return setLead( '#00ff00' );

            //  default color
            default:        return setLead( 'green' );
        }
    },
}} >

    { prop.children }

</ctx.Provider>
)};