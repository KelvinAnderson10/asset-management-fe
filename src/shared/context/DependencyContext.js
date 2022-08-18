import {createContext} from "react";

export const DependencyContext = createContext({});

export function DependencyProvider({children, services}) {
    return (
        <DependencyContext.Provider value={services}>
            {children}
        </DependencyContext.Provider>
    )
}