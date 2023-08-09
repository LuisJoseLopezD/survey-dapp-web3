import { createContext, useState} from "react";

export const DataContext = createContext();

export const DataProvider = ({children}) => {

    const [surveyResult, setSurveyResult] = useState([]);
    const contractAddress = "0x437eF217203452317C3C955Cf282b1eE5F6aaF72";
    const [connected, setConnected] = useState(false);
    const [surveyDone, setSurveyDone] = useState("NO");
    const [minutes, setMinutes] = useState(5);
    const [seconds, setSeconds] = useState(0);

    return (
        <DataContext.Provider value={{
            surveyResult, setSurveyResult,
            contractAddress,
            connected, setConnected,
            surveyDone, setSurveyDone,
            minutes, setMinutes,
            seconds, setSeconds
        }}>
            {children}
        </DataContext.Provider>
    )
}