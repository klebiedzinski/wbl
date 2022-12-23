import { Route, Routes } from 'react-router-dom';
import Navbar from "./Components/Navbar/Navbar";
import TeamsList from "./Pages/TeamsList/TeamsList";
import Home from "./Pages/Home";
import TeamOverview from './Pages/TeamOverview/TeamOverview';
import NotFound from './Pages/NotFound';
import PlayersList from './Components/PlayersList/PlayersList'
// import PlayerForm from './Components/PlayerForm';
import { useState } from 'react';
import PlayerOverview from './Pages/PlayerOverview/PlayerOverview';
import ScoreBoard from './Pages/Scoreboard/Scoreboard';
import useFetch from './hooks/useFetch';

function App() {
  
const [isScoreboardShown, setIsScoreboardShown] = useState(false)

  // const {data: teams, isLoading, error} = useFetch('http://localhost:4001/teams')

  return (
    <>
    
    {!isScoreboardShown && <Navbar/>}
    <Routes>
      <Route path="/" element={ <Home/> }/>
      <Route path="/scoreboard" element={<ScoreBoard setIsScoreboardShown={setIsScoreboardShown}/>}/>
      <Route path={"/teams"}> 
      <Route index element={<TeamsList />}/>
        <Route path=":id">
          <Route index element={<TeamOverview/>}/>
          <Route path='PlayersList' element={<PlayersList/>}></Route>
          {/* <Route path='PlayerForm' element={<PlayerForm teams={teams} />}></Route> */}
          <Route path=':player_id' element={<PlayerOverview/>}/>
        </Route>
      </Route>

      <Route path='*' element={<NotFound/>}/>
    </Routes>
    </>
  );
}

export default App;
