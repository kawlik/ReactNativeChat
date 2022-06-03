import { onAuthStateChanged, User } from 'firebase/auth';
import { createContext, useContext, useEffect, useState } from 'react';
import { FirebaseService } from '../services/@';


/*  Declare Context
/*   *   *   *   *   *   *   *   *   *   */
export interface Context {

    //  required
    user: User|null

    //  optional
};


/*  Define Context
/*   *   *   *   *   *   *   *   *   *   */
export const ctx = createContext<Context>({ user: null });
export function useAppContext() {
    return useContext( ctx );
}


/*  Define Provider
/*   *   *   *   *   *   *   *   *   *   */
export function AppProvider( prop: {
    children: JSX.Element | JSX.Element[]
}) {

    //  use user state
    const [ user, setUser ] = useState<User|null>( null );


    //  use effects
    useEffect(() => {

        const unsubscribeAuthStateChanged = onAuthStateChanged( FirebaseService.Auth, ( user ) => setUser( user ));

    return () => {

        unsubscribeAuthStateChanged();

    }}, []);


return(
<ctx.Provider value={{
    user: user,
}} >

    { prop.children }

</ctx.Provider>
)};