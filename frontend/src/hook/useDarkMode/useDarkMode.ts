import { useContext } from "react";
import { DarkModeContext } from "../../app/DarkModeProvider";

export const useDarkMode = () => useContext(DarkModeContext);
