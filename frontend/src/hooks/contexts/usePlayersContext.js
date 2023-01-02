import { PlayersContext } from "../../context/PlayersContext";
import { useContext } from "react";

export const usePlayersContext = () => {
    
    const context = useContext(PlayersContext);

    if (!context) {
        throw new Error("usePlayersContext must be used within a PlayersContextProvider");
    }

    return context
}

    