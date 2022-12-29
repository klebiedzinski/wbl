import { TeamsContext } from "../context/TeamsContext";
import { useContext } from "react";

export const useTeamsContext = () => {
    
    const context = useContext(TeamsContext);

    if (!context) {
        throw new Error("useTeamsContext must be used within a TeamsContextProvider");
    }

    return context
}

    