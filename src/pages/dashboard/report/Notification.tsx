import { Button, Segmented } from "antd";
import { MessageIcon } from "../../../assets/icons"
import { CustomModal, Heading, Text } from "../../../components"
import { useState } from "react";
import { HistoryPayment, NotificationMessage } from "../../../modules";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import type { NotificationType } from "../../../@types/NotificationType";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import NotificationMessageNotFound from "../../../modules/notification/NotificationMessageNotFound";
import { FindMonth, instance, PhoneFormat } from "../../../hooks";

const Notification = () => {
  const [showMessage, setShowMessage] = useState<"Xabarlar tarixi" | "To‘lovlar tarixi">("Xabarlar tarixi")
  const [showModalAddMessage, setShowModalAddMessage] = useState<boolean>(false)
  const [cookies] = useCookies(['token']);
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  function handleSendMessage(id: string) {
    queryClient.invalidateQueries({ queryKey: ['detor-notification'] })
    navigate(`${id}`)
  }
  // Get All Messages
  const { data = [], isLoading } = useQuery<NotificationType[]>({
    queryKey: ['add-message-debtor'],
    queryFn: () => instance().get("/notification", { headers: { "Authorization": `Bearer ${cookies.token}` }, params: { get: "All" } }).then(res => res.data.data.notifications)
  })
  // Get All Messages
  return (
    <>
      <div className="containers !mt-[30px] !pb-[18px] border-b-[1px] border-[#ECECEC] !mb-[16px]">
        <div className="flex items-center justify-between ">
          <Heading tag="h2" classList="!font-bold !text-[22px]">Hisobot</Heading>
        </div>
      </div>
      <div className="containers">
        <Segmented onChange={(e: "Xabarlar tarixi" | "To‘lovlar tarixi") => setShowMessage(e)} className="!w-full !h-[44px]" size="large" options={['Xabarlar tarixi', 'To‘lovlar tarixi']} />
        <div className="mt-[16px]">
          {showMessage == "Xabarlar tarixi" ? <NotificationMessage /> : <HistoryPayment />}
        </div>
      </div>
      <Button onClick={() => setShowModalAddMessage(true)} className="!text-[16px] !fixed !rounded-full !right-[calc(50%-185px)] !bottom-[80px] !p-0 !font-medium !h-[58px] !w-[58px]" type="primary" size="large" icon={<MessageIcon />}></Button>
      <CustomModal show={showModalAddMessage} setShow={setShowModalAddMessage}>
        <div className="h-[50vh] overflow-y-auto">
          {isLoading ? "Loading..." : data.length > 0 ? data?.map((item: NotificationType) => (
            <div onClick={() => handleSendMessage(item.id)} key={item.id} className="flex hover:bg-slate-100 duration-300 cursor-pointer items-center justify-between py-[16px] border-b-[1px] border-[#ECECEC]">
              <div>
                <Text classList="!font-bold !text-[14px] !mb-[8px]">{item.name}</Text>
                <Text classList="!font-semibold !text-[13px]">{PhoneFormat(item.Phone.length > 0 ? item?.Phone[0]?.phoneNumber : "----")}</Text>
              </div>
              <Text classList="!font-semibold !text-[12px]">{item?.Notification[0]?.createdAt.split("T")[0].split("-")[2]} {item.Notification.length > 0 ? FindMonth(Number(item?.Notification[0]?.createdAt.split("T")[0].split("-")[1])) : "--"}</Text>
            </div>
          )) : <NotificationMessageNotFound />}
        </div>
      </CustomModal>
    </>
  )
}

export default Notification