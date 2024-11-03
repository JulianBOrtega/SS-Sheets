import OBR from "@owlbear-rodeo/sdk";
import { createContext, useEffect, useState } from "react";
import { IDataManagement, UseDataManagement } from "../hooks/UseDataManagement";

export interface IDataContext {
    loading: boolean
    dataManagement?: IDataManagement
}

export const DataContext = createContext<IDataContext>({
    loading: true,
});

const DataProvider = ({children}: any) => {
    const [loading, setLoading] = useState(true);
    const dataManagement = UseDataManagement(loading);

    useEffect(() => {
        OBR.onReady(() => {
            setLoading(false);
        });
    }, []);


    return (
        <DataContext.Provider value={{
            loading,
            dataManagement
        }}>
            {children}
        </DataContext.Provider>
    )
}

export default DataProvider;