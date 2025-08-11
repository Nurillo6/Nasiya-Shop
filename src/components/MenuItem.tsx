import type { ReactNode } from "react"
import Text from "./Text"
import { NavLink } from "react-router-dom"

const MenuItem = ({icon, title, to}:{icon:ReactNode, title:string, to:string}) => {
    return (
        <NavLink to={to} className="w-[25%] text-[#637D92] cursor-pointer py-[9.5px] text-center">
            {icon}
            <Text classList="!text-[10px] !font-normal">{title}</Text>
        </NavLink>
    )
}

export default MenuItem