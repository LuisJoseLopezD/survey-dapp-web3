import React, { createContext, useState, ReactNode, useContext } from "react";

// Define the types for your context
interface DataContextType {
    surveyResult: any[]; // Change 'any[]' to the appropriate type for surveyResult
    setSurveyResult: React.Dispatch<React.SetStateAction<any[]>>;
    contractAddress: string;
    connected: boolean;
    setConnected: React.Dispatch<React.SetStateAction<boolean>>;
    surveyDone: string;
    setSurveyDone: React.Dispatch<React.SetStateAction<string>>;
    minutes: number;
    setMinutes: React.Dispatch<React.SetStateAction<number>>;
    seconds: number;
    setSeconds: React.Dispatch<React.SetStateAction<number>>;
}

// Create the context
export const DataContext = createContext<DataContextType | undefined>(undefined);

// Define the DataProvider props
interface DataProviderProps {
    children: ReactNode;
}

// Create the DataProvider component
export const DataProvider: React.FC<DataProviderProps> = ({ children }) => {
    const [surveyResult, setSurveyResult] = useState<any[]>([]);
    const contractAddress = "0x437eF217203452317C3C955Cf282b1eE5F6aaF72";
    const [connected, setConnected] = useState(false);
    const [surveyDone, setSurveyDone] = useState("NO");
    const [minutes, setMinutes] = useState(5);
    const [seconds, setSeconds] = useState(0);

    const contextValues: DataContextType = {
        surveyResult,
        setSurveyResult,
        contractAddress,
        connected,
        setConnected,
        surveyDone,
        setSurveyDone,
        minutes,
        setMinutes,
        seconds,
        setSeconds,
    };

    return (
        <DataContext.Provider value={contextValues}>
            {children}
        </DataContext.Provider>
    );
};

// Create a custom hook to use the context
export const useDataContext = () => {
    const context = useContext(DataContext);
    if (context === undefined) {
        throw new Error("useDataContext must be used within a DataProvider");
    }
    return context;
};