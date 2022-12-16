import { useEffect, useState } from "react";
const Countdown = ({quarter, setQuarter, team1Score, team2Score}) => {
    const [time, setTime] = useState(600000);
    const [isLive, setIsLive] = useState(false);

    useEffect(() => {
    let interval = null;
    if (isLive) {
        interval = setInterval(() => {
        
        if (time === 0) {
            clearInterval(interval);
            if (quarter === "1st") {
                setQuarter("2nd");
                 setTime(600000);
                 setIsLive(false);
            }
            else if (quarter === "2nd") {
                setQuarter("3rd");
                setTime(600000);
                setIsLive(false);
            }
            else if (quarter === "3rd") {
                setQuarter("4th");
                setTime(600000);
                setIsLive(false);
            }
            else if (quarter === "4th" && team1Score===team2Score){
                setQuarter("OT")
                setTime(300000);
                setIsLive(false);
            }
            else if (quarter === "OT" && team1Score===team2Score){
                setTime(300000);
                setIsLive(false);
            };
            
        }
        else setTime(time - 10)
        }, 10);
    } else {
        clearInterval(interval);
    }
    return () => clearInterval(interval);
    }, [isLive, time]);
    return ( 
        <>
        <div className="clock">
            <span>{("0"+Math.floor(((time / 60000) % 60))).slice(-2)}:</span>
            <span>{("0"+Math.floor(((time / 1000) % 60))).slice(-2)}:</span>
            <span>{("0"+((time / 10) % 100)).slice(-2)}</span>
        </div>
        <div className="clock-buttons">
            <button onClick={() => setIsLive(true)}>Start</button>
            <button onClick={() => setIsLive(false)}>Stop</button>
            <button onClick={() => setTime(time + 10000)}>+10sec</button>
        </div>
        </>
     );
}
 
export default Countdown;