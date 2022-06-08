import { onAuthStateChanged, User } from 'firebase/auth';
import { createContext, useContext, useEffect, useState } from 'react';
import { FirebaseService } from '../services/@';


/*  Declare Context
/*   *   *   *   *   *   *   *   *   *   */
export interface Context {

    //  required
    lead: 'green'|'blue',
    user: User|null

    //  optional
};


/*  Define Context
/*   *   *   *   *   *   *   *   *   *   */
export const ctx = createContext<Context>({ lead: 'green', user: null });
export function useAppContext() {
    return useContext( ctx );
}


/*  Define Provider
/*   *   *   *   *   *   *   *   *   *   */
export function AppProvider( prop: {
    children: JSX.Element | JSX.Element[]
}) {

    //  use states
    const [ lead, setLead ] = useState<'green'|'blue'>( 'green' );
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
}} >

    { prop.children }

</ctx.Provider>
)};