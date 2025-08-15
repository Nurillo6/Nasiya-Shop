import { useCookies } from "react-cookie";
import { ArrowIcon } from "../../../assets/icons"
import { CustomModal, Heading, Text } from "../../../components"
import { useState } from "react";
import { LogOutIcon } from "../../../assets/images";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";

const Settings = () => {
  const [, , removeCookie] = useCookies(['token']);
  const [openModal, setOpenModal] = useState<boolean>(false)
  const navigate = useNavigate()
  const settingsList = [
    {
      id: 1,
      heading: "Asosiy",
      children: [
        { id: 2, title: "Shaxsiy ma’lumotlar" },
        { id: 3, title: "Xavfsizlik" },
      ]
    },
    {
      id: 4,
      heading: "Boshqa",
      children: [
        { id: 5, title: "Yordam" },
        { id: 6, title: "Taklif va shikoyatlar" },
        { id: 7, title: "Dastur haqida" },
        { id: 8, title: "Ommaviy oferta" },
        { id: 9, title: "Maxfiylik siyosati" },
      ]
    },
    {
      id: 10,
      heading: "Chiqish",
      children: []
    }
  ]
  function handleLogOut() {
    removeCookie("token")
    navigate("/")
  }
  return (
    <>
      <div className="containers !mt-[30px]">
        <div className="pb-[16px] border-b-[1px] border-[#ECECEC]">
          <Heading tag="h2" classList="!font-semibold !text-[20px]">Sozlamalar</Heading>
        </div>
        <div>
          {settingsList.map(item => (
            <div className="cursor-pointer" key={item.id}>
              <div onClick={() => item.heading == "Chiqish" ? setOpenModal(true) : {}}>
                <Heading classList={`!font-medium !mt-[28px] !mb-[2px] !text-[16px] ${item.heading == "Chiqish" ? "text-[#F94D4D]" : "!text-[#3478F7]"}`} tag="h3">{item.heading}</Heading>
              </div>
              <ul>
                {item.children.length > 0 && item.children.map(item2 => (
                  <div key={item2.id} className="py-[18px] border-b-[1px] border-[#ECECEC] flex items-center justify-between">
                    <Text classList="!font-medium !text-[16px]">{item2.title}</Text>
                    <ArrowIcon classList="rotate-[180deg] payment-debt" />
                  </div>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <CustomModal show={openModal} setShow={setOpenModal}>
        <div className="text-center w-full">
          <img className="mx-auto mb-[16px]" src={LogOutIcon} alt="LogOut Img" width={60} height={60} />
          <Heading classList="!font-bold !text-[18px]" tag="h2">Hisobdan chiqish</Heading>
          <Text classList="!font-normal !text-[14px] mb-[49px]">Siz haqiqatan hisobdan chiqmoqchimisiz?</Text>
          <div className="flex items-center justify-between">
            <Button onClick={() => handleLogOut()} type="default" size="large" className="!h-[42px] !text-[14px] !font-bold !text-[#3478F7] !w-[48%] flex items-center justify-center">Ha, chiqish</Button>
            <Button onClick={() => setOpenModal(false)} type="primary" size="large" className="!h-[42px] !text-[14px] !font-bold !w-[48%] flex items-center !bg-[#F94D4D] justify-center">Bekor qilish</Button>
          </div>
        </div>
      </CustomModal>
    </>
  )
}

export default Settings