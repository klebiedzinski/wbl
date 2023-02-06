import React from "react";
import { BiLogOutCircle } from "react-icons/bi"; //logout
import { AiOutlineCalendar } from "react-icons/ai"; //games
import { AiOutlineTeam } from "react-icons/ai"; //players
import { RiTeamLine } from "react-icons/ri"; //teams
import { AiOutlineUser } from "react-icons/ai"; //profile
import { HiOutlineTable } from "react-icons/hi"; //standings
import { GrUserAdmin } from "react-icons/gr"; //admin
import { BiLogInCircle } from "react-icons/bi"; //login
import { AiOutlineHome } from "react-icons/ai"; //home
export const NavbarData = [
  {
    title: "Home",
    path: "/",
    icon: <AiOutlineHome />,
  },
  {
    title: "Teams",
    path: "/teams",
    icon: <RiTeamLine />,
  },
  {
    title: "Players",
    path: "/players",
    icon: <AiOutlineTeam />,
  },
  {
    title: "Games",
    path: "/games",
    icon: <AiOutlineCalendar />,
  },
  {
    title: "Standings",
    path: "/standings",
    icon: <HiOutlineTable />,
  },
  {
    title: "Profile",
    path: "/profile",
    icon: <AiOutlineUser />,
  },
  {
    title: "Admin",
    path: "/admin",
    icon: <GrUserAdmin />,
  },
  {
    title: "Logout",
    path: "/logout",
    icon: <BiLogOutCircle />,
  },

];
