import React, { useState,useEffect } from "react";
import Countdown from "./Countdown";
const ScoreBoard = () => {
    const [quarter, setQuarter] = useState("1st");
    const [team1, setTeam1] = useState("Popowiczki");
    const [team2, setTeam2] = useState("Przecina");
    const [isLive, setIsLive] = useState(false);
    const [isEditClicked, setIsEditClicked] = useState(false);
    const [team1Score, setTeam1Score] = useState(0);
    const [team2Score, setTeam2Score] = useState(0);


    const addPoints = (team,ammount) => {
            (team === team1) ? setTeam1Score(team1Score + ammount) : setTeam2Score(team2Score + ammount);
    }
    const removePoints = (team,ammount) => {
        if((team === team1 && team1Score > 0) || (team === team2 && team2Score > 0)){
            (team === team1) ? setTeam1Score(team1Score - ammount) : setTeam2Score(team2Score - ammount);
        }
    };
    
    return ( 
        <div className="ScoreBoard">
            <div className="header">
            
                <div className="time">
                    <Countdown quarter={quarter} setQuarter={setQuarter} team1Score={team1Score} team2Score={team2Score}/>
                </div>
                <div className="quarter">{quarter}</div>
                <button className="edit" onClick={() => {(!isLive) ? setIsEditClicked(!isEditClicked) : setIsLive(false)}}>edit</button>
                {isEditClicked && <div className="edit">
                <select name="quarter" id="quarter" onChange={(e) => setQuarter(e.target.value)} >
                    <option value="1st" on>1st</option>
                    <option value="2nd">2nd</option>
                    <option value="3rd">3rd</option>
                    <option value="4th">4th</option>
                    <option value="OT">OT</option>
                </select>
                
                   
                    <button onClick={() => setIsEditClicked(!isEditClicked)}>save</button>


                </div>}
               
            </div>
            <div className="content">
                <div className="team">
                    <div className="team-leftbar">
                        <button onClick={() => addPoints(team1,1)}>+1</button>
                        <button onClick={() => addPoints(team1,2)}>+2</button>
                        <button onClick={() => addPoints(team1,3)}>+3</button>
                        <button onClick={() => removePoints(team1,1)}>-1</button>
                    </div>
                    <div className="team-rightbar">
                        <div className="team-name">{team1}</div>
                        <div className="team-score">{team1Score}</div>
                    </div>
                </div>
                
                <div className="team">
                    <div className="team-rightbar">
                        <div className="team-name">{team2}</div>
                        <div className="team-score">{team2Score}</div>
                    </div>
                    <div className="team-leftbar">
                        <button onClick={() => addPoints(team2,1)}>+1</button>
                        <button onClick={() => addPoints(team2,2)}>+2</button>
                        <button onClick={() => addPoints(team2,3)}>+3</button>
                        <button onClick={() => removePoints(team2,1)}>-1</button>
                    </div>
                </div>
            </div>
        </div>
     );
}

 
export default ScoreBoard;