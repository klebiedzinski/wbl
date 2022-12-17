import { Route, Routes } from 'react-router-dom';
import Navbar from "./Components/Navbar/Navbar";
import TeamsList from "./Components/TeamsList/TeamsList";
import Home from "./Components/Home";
import TeamOverview from './Components/TeamOverview/TeamOverview';
import NotFound from './Components/NotFound';
import PlayersList from './Components/PlayersList/PlayersList'
import PlayerForm from './Components/PlayerForm';
import {Team, Player} from './Data';
import { useState } from 'react';
//DATA SRCS

import teampopowiczki_pic from "./Data/Teams_pics/teampopowiczki_pic.jpg"
import teamwieniec_pic from "./Data/Teams_pics/teamwieniec_pic.jpg"
import ypo_pic from "./Data/Teams_pics/ypo_pic.jpg"
import przecina_pic from "./Data/Teams_pics/przecina_pic.jpg"
import astrodunkteam_pic from "./Data/Teams_pics/astrodunkteam_pic.jpg"
import PlayerOverview from './Components/PlayerOverview/PlayerOverview';
import ScoreBoard from './Components/Scoreboard/Scoreboard';
function App() {
  
  
/////////DATA
      const popowiczki = new Team({
        name: "Popowiczki",
        src: teampopowiczki_pic
    })
    const wieniec = new Team({
        name: "Wieniec",
        src: teamwieniec_pic
    })
    const przecina = new Team({
        name: "Przecina",
        src: przecina_pic
    })
    const ypo = new Team({
        name: "YPO",
        src: ypo_pic
    })
    const astrodunkteam = new Team({
        name: "Astrodunk",
        src: astrodunkteam_pic
    })
//////////////////////////

const [isScoreboardShown, setIsScoreboardShown] = useState(false)

const [teams,setTeams] = useState([popowiczki,wieniec,przecina,ypo,astrodunkteam])
  return (
    <>
    
    {!isScoreboardShown && <Navbar/>}
    <Routes>
      <Route path="/" element={ <Home/> }/>
      <Route path="/scoreboard" element={<ScoreBoard setIsScoreboardShown={setIsScoreboardShown}/>}/>
      <Route path={"/teams"}> 
      <Route index element={<TeamsList teams={teams} setTeams={setTeams}/>}/>
        <Route path=":name">
          <Route index element={<TeamOverview teams={teams} setTeams={setTeams}/>}/>
          <Route path='PlayersList' element={<PlayersList teams={teams}/>}></Route>
          <Route path='PlayerForm' element={<PlayerForm teams={teams} setTeams={setTeams}/>}></Route>
          <Route path=':player_id' element={<PlayerOverview teams={teams} />}/>
        </Route>
      </Route>

      <Route path='*' element={<NotFound/>}/>
    </Routes>
    </>
  );
}

export default App;
