import { action, configure, makeObservable, observable } from 'mobx';
import { createContext, useEffect, useState } from 'react';
import { FClientUtil } from '../Common/Common';
import Router from 'next/router';


type RootStoreConstructorArgs = {

};
export class FRootAppStore
{

    static _inst: FRootAppStore;

    constructor(Args: RootStoreConstructorArgs)
    {
        if (FRootAppStore._inst)
        {
            throw new Error('singleton pattern violated!');
        }
        FRootAppStore._inst = this;
        //  configure({ enforceActions: 'never' });

        /*
            instantiate our substores, this is the ONLY place they should ever be instantiated
            so we can ensure only one instance ever exists
        */

        //this._UIState = new FUIState();

        // makeObservable(this, {
        //     ACT_SetAuthSession: action
        //     , OBS_AuthSession: observable
        // });

    }

    static GetInstance(Args: RootStoreConstructorArgs)
    {
        if (FRootAppStore._inst)
        {
            return FRootAppStore._inst;
        }
        return new FRootAppStore(Args);
    }
}


export const AppRootStoreContext = createContext<FRootAppStore>(null as any);

export const RootContextProvider = (props: any) =>
{
    const [RootStore, SetRootStore] = useState<FRootAppStore>(FRootAppStore.GetInstance({}));

    useEffect(() =>
    {
        const AppStore = FRootAppStore.GetInstance({ });
        SetRootStore(AppStore);
    });

    return (
        <AppRootStoreContext.Provider value={RootStore!}>
            {props.children}
        </AppRootStoreContext.Provider>
    );
};
