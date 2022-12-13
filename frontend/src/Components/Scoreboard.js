import React, { useState,useEffect } from "react";
import Countdown from 'react-countdown';
const ScoreBoard = () => {
    const [quarter, setQuarter] = useState(1);
    const [team1, setTeam1] = useState("Popowiczki");
    const [team2, setTeam2] = useState("Przecina");
    const [time, setTime] = useState(600000);
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
    //ref of countdown component
    const timerRef = React.useRef(null);
    const startTimer = () => {
        console.log(timerRef.current)
        setIsLive(true);
        timerRef.pause();
    }

    return ( 
        <div className="ScoreBoard">
            <div className="header">
                <button onClick={() => startTimer()}>Play</button>
                <div className="time">
                    {//Countdown component from react-countdown library that is controllable
                    //and can be started and stopped by passing a controlled prop as true
                    //and then using the start() and stop() methods of the ref
                    
                    


                    }



                    <Countdown
                        date={Date.now() + time}
                        intervalDelay={0}
                        precision={2}
                        renderer={({minutes, seconds,completed }) => <div>{minutes}:{seconds}</div>}
                        ref={timerRef}
                        autoStart={true}
                        controlled={true}
                        
                    />
                </div>
                <div className="quarter">{quarter}</div>
                <button className="edit">edit</button>
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
                <p>X</p>
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