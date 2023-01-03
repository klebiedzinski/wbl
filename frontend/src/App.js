import { Route, Routes } from 'react-router-dom';
import Navbar from "./Components/Navbar/Navbar";
import TeamsList from "./Pages/TeamsList/TeamsList";
import Home from "./Pages/Home";
import TeamOverview from './Pages/TeamOverview/TeamOverview';
import NotFound from './Pages/NotFound';
import PlayersList from './Components/TeamPlayersList/TeamPlayersList';
import PlayerForm from './Components/PlayerForm/PlayerForm';
import { useState } from 'react';
import PlayerOverview from './Pages/PlayerOverview/PlayerOverview';
import ScoreBoard from './Pages/Scoreboard/Scoreboard';
import TeamForm from './Components/TeamForm/TeamForm';
import Players from './Pages/Players/Players';
import Login from './Pages/Login/Login';
import Signup from './Pages/Signup/Signup';
import Standings from './Pages/Standings/Standings';
import Profile from './Pages/Profile/Profile';
function App() {
  
const [isScoreboardShown, setIsScoreboardShown] = useState(false)

  return (
    <>
    
    {!isScoreboardShown && <Navbar/>}
    <Routes>
      <Route path="/" element={ <Home/> }/>
      <Route path="/login" element={ <Login/> }/>
      <Route path="/signup" element={<Signup/>}/>
      <Route path="/profile" element={<Profile/>}/>
      <Route path="/standings" element={<Standings/>}/>
      <Route path="/players">
        <Route path='/players/PlayerForm' element={<PlayerForm/>}></Route>
          <Route index element={<Players/>}/>
          <Route path=":player_id" element={<PlayerOverview/>}/>
      </Route> 
      <Route path="/teams"> 
      <Route index element={<TeamsList />}/>
        <Route path="TeamForm" element={<TeamForm/>}> </Route>
        <Route path=":id">
          <Route index element={<TeamOverview/>}/>
          <Route path='PlayersList' element={<PlayersList/>}></Route>
          <Route path=':player_id' element={<PlayerOverview/>}/>
        </Route>
      </Route>
      <Route path="/scoreboard" element={<ScoreBoard setIsScoreboardShown={setIsScoreboardShown}/>}/>

      <Route path='*' element={<NotFound/>}/>
    </Routes>
    </>
  );
}

export default App;
