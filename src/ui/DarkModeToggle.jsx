import { useDarkMode } from "../context/DarkModeContext";
import ButtonIcon from "./ButtonIcon";
import { HiOutlineMoon, HiOutlineSun } from "react-icons/hi";

function DarkModeToggle() {
    const {isDarkMode, toggleDarkMode} = useDarkMode();

    return (
        <ButtonIcon onClick={toggleDarkMode}>
            
            {isDarkMode ? <HiOutlineSun/> : <HiOutlineMoon></HiOutlineMoon>}
        </ButtonIcon>
    )
}

export default DarkModeToggle
