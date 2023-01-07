import { Route, Routes, Navigate } from 'react-router-dom';
import { useState } from 'react';
import { useAuthContext } from './hooks/contexts/useAuthContext';

//pages
import Home from "./Pages/Home";
import ScoreBoard from './Pages/Scoreboard/Scoreboard';
import NotFound from './Pages/NotFound';

import TeamsList from "./Pages/TeamsList/TeamsList";
import TeamForm from './Components/TeamForm/TeamForm';
import TeamOverview from './Pages/TeamOverview/TeamOverview';
import Players from './Pages/Players/Players';
import PlayerOverview from './Pages/PlayerOverview/PlayerOverview';
import PlayersList from './Components/TeamPlayersList/TeamPlayersList';
import PlayerForm from './Components/PlayerForm/PlayerForm';
import Games from './Pages/Games/Games';
import GameOverview from './Pages/GameOverview/GameOverview';
import Standings from './Pages/Standings/Standings';

//user menagment pages
import Signup from './Pages/Signup/Signup';
import Profile from './Pages/Profile/Profile';
import Login from './Pages/Login/Login';

//components
import Navbar from "./Components/Navbar/Navbar";


function App() {
  
const [isScoreboardShown, setIsScoreboardShown] = useState(false)


  const { user } = useAuthContext();

  return (
    <>
    
    {!isScoreboardShown && <Navbar/>}
    <Routes>
      <Route path="/" element={ <Home/> }/>
      <Route path="/login" element={ <Login/> }/>
      <Route path="/signup" element={<Signup/>}/>
      <Route path="/profile" element={user ? <Profile/> : <Home/>}/>
      <Route path="/standings" element={<Standings/>}/>
      <Route path="/players">
        <Route path='/players/PlayerForm' element={ ( user && user.admin) ? <PlayerForm/> : <Home/>}></Route>
          <Route index element={<Players/>}/>
          <Route path=":player_id" element={<PlayerOverview/>}/>
      </Route> 
      <Route path="/teams"> 
      <Route index element={<TeamsList />}/>
        <Route path="TeamForm" element={( user && user.admin) ? <TeamForm/> : <Home/>}> </Route>
        <Route path=":id">
          <Route index element={<TeamOverview/>}/>
          <Route path='PlayersList' element={<PlayersList/>}></Route>
          <Route path=':player_id' element={<PlayerOverview/>}/>
        </Route>
      </Route>
      <Route path="/games">
        <Route index element={<Games/>}/>
        <Route path=":game_id" element={<GameOverview/>}/>
      </Route>
      <Route path="/scoreboard" element={ (user && (user.stolik || user.admin)) ? <ScoreBoard setIsScoreboardShown={setIsScoreboardShown}/> : <Home/>}/>

      <Route path='*' element={<NotFound/>}/>
    </Routes>
    </>
  );
}

export default App;
