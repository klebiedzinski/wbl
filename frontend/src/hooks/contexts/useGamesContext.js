import { GamesContext } from "../../context/GamesContext";
import { useContext } from "react";

export const useGamesContext = () => {
    
    const context = useContext(GamesContext);

    if (!context) {
        throw new Error("useGamesContext must be used within a PlayersContextProvider");
    }

    return context
}

    