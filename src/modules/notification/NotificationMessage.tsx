import { useQuery, useQueryClient } from "@tanstack/react-query";
import type { NotificationType } from "../../@types/NotificationType";
import { NotificationSkeleton, Text } from "../../components";
import NotificationMessageNotFound from "./NotificationMessageNotFound";
import { useNavigate } from "react-router-dom";
import { FindMonth, instance, PhoneFormat } from "../../hooks";

const NotificationMessage = () => {
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  // Get All Messages
  const { data = [], isLoading } = useQuery<NotificationType[]>({
    queryKey: ['messages'],
    queryFn: () => instance.get("/notification", {params:{get:"Sended"}}).then(res => res.data.data.notifications)
  })
  // Get All Messages
  function showDebtNotification(id:string){
    navigate(`${id}`)
    queryClient.invalidateQueries({queryKey:['detor-notification']})
  }
  return (
    <div>
      {isLoading ? <NotificationSkeleton/> : data.length > 0 ? data?.map((item: NotificationType) => (
        <div onClick={() => showDebtNotification(item.id)} key={item.id} className="flex cursor-pointer items-center justify-between py-[16px] border-b-[1px] border-[#ECECEC]">
          <div>
            <Text classList="!font-bold !text-[14px] !mb-[8px]">{item.name}</Text>
            <Text classList="!font-semibold !text-[13px]">{PhoneFormat(item.Phone.length > 0 ? item?.Phone[0]?.phoneNumber : "----")}</Text>
          </div>
          <Text classList="!font-semibold !text-[12px]">{item?.Notification[0]?.createdAt.split("T")[0].split("-")[2]} {item.Notification.length > 0 ? FindMonth(Number(item?.Notification[0]?.createdAt.split("T")[0].split("-")[1])) : "--"}</Text>
        </div>
      )) : <NotificationMessageNotFound/>}
    </div>
  )
}

export default NotificationMessage