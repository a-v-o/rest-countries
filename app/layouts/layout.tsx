import { useState } from "react";
import { Link, Outlet } from "react-router";
import { FaMoon, FaRegMoon } from "react-icons/fa";

export default function Layout() {
  const [mode, setMode] = useState("");
  return (
    <div data-theme={mode}>
      <header className="h-16 flex justify-between items-center px-8 md:px-16 w-full dark:bg-[hsl(209,_23%,_22%)] text-black dark:text-white">
        <div>
          <Link to={"/"}>
            <h1 className="font-bold">Where in the world?</h1>
          </Link>
        </div>
        <div>
          <button
            className="flex items-center gap-1"
            onClick={() => {
              mode == "dark" ? setMode("") : setMode("dark");
            }}
          >
            {mode == "dark" ? <FaMoon /> : <FaRegMoon></FaRegMoon>}
            Dark Mode
          </button>
        </div>
      </header>
      <div className="bg-[hsl(0,_0%,_98%)] dark:bg-[hsl(207,_26%,_17%)] text-[hsl(200,_15%,_8%)] dark:text-white w-full">
        <Outlet />
      </div>
    </div>
  );
}
