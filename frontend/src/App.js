import { Route, Routes, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuthContext } from "./hooks/contexts/useAuthContext";

//pages
import Home from "./Pages/Home/Home";
import ScoreBoard from "./Pages/Scoreboard/Scoreboard";
import NotFound from "./Pages/NotFound";
import TeamsList from "./Pages/TeamsList/TeamsList";
import TeamForm from "./Components/Forms/TeamForm/TeamForm";
import TeamOverview from "./Pages/TeamOverview/TeamOverview";
import Players from "./Pages/Players/Players";
import PlayerOverview from "./Pages/PlayerOverview/PlayerOverview";
import PlayersList from "./Pages/TeamOverview/TeamPlayersList/TeamPlayersList";
import PlayerForm from "./Components/Forms/PlayerForm/PlayerForm";
import Games from "./Pages/Games/Games";
import GameOverview from "./Pages/GameOverview/GameOverview";
import Standings from "./Pages/Standings/Standings";

//user menagment pages
import Signup from "./Pages/Signup/Signup";
import Profile from "./Pages/Profile/Profile";
import Login from "./Pages/Login/Login";
import AdminPanel from "./Pages/AdminPanel/AdminPanel";

//components
import Navbar from "./Components/Navbar/Navbar";
import Footer from "./Components/Footer/Footer";
import UpcomingGames from "./Components/UpcomingGames/UpcomingGames";

function App() {
  const { user } = useAuthContext();

  return (
    <>
      <div className="App">
        <Navbar />
        <div className="upcoming_games">
          <UpcomingGames limit={5} team_id={"all"}/>
        </div>
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={!user ? <Login /> : <Home />} />
            <Route path="/signup" element={!user ? <Signup /> : <Home />} />
            <Route path="/profile" element={user ? <Profile /> : <Home />} />
            <Route path="/standings" element={<Standings />} />
            <Route
              path="/admin"
              element={user && user.admin ? <AdminPanel /> : <Home />}
            />
            <Route path="/players">
              <Route
                path="/players/PlayerForm"
                element={user && user.admin ? <PlayerForm /> : <Home />}
              ></Route>
              <Route index element={<Players />} />
              <Route path=":player_id" element={<PlayerOverview />} />
            </Route>
            <Route path="/teams">
              <Route index element={<TeamsList />} />
              <Route
                path="TeamForm"
                element={user && user.admin ? <TeamForm /> : <Home />}
              >
                {" "}
              </Route>
              <Route path=":id">
                <Route index element={<TeamOverview />} />
                <Route path="PlayersList" element={<PlayersList />}></Route>
                <Route path=":player_id" element={<PlayerOverview />} />
              </Route>
            </Route>
            <Route path="/games">
              <Route index element={<Games />} />
              <Route path=":game_id" element={<GameOverview />} />
            </Route>
            <Route
              path="/scoreboard"
              element={
                user && (user.stolik || user.admin) ? <ScoreBoard /> : <Home />
              }
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </>
  );
}

export default App;
