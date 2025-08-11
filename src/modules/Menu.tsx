import { ClientIcon, HomeIcon, ReportIcon, SettingsIcon } from "../assets/icons"
import { MenuItem } from "../components"
import { PATH } from "../hooks/Path"

const Menu = () => {
  return (
    <div className="border-t-[1px] fixed bg-white z-50 w-full bottom-0 border-[#EDEDED]">
      <div className="containers">
        <div className="flex justify-between">
          <MenuItem to={PATH.main} title="Asosiy" icon={<HomeIcon classList="!mx-auto !mb-[2px]" />} />
          <MenuItem to={PATH.debtor} title="Mijozlar" icon={<ClientIcon classList="!mx-auto !mb-[2px]" />} />
          <MenuItem to="/report" title="Hisobot" icon={<ReportIcon classList="!mx-auto !mb-[2px]" />} />
          <MenuItem to="/settings" title="Sozlama" icon={<SettingsIcon classList="!mx-auto !mb-[2px]" />} />
        </div>
      </div>
    </div>
  )
}

export default Menu