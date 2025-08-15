import { useQuery } from "@tanstack/react-query";
import { useCookies } from "react-cookie";
import type { PaymentHistoryType } from "../../@types/NotificationType";
import { Text } from "../../components";
import NotificationMessageNotFound from "./NotificationMessageNotFound";
import { FormatNumber, instance, PhoneFormat } from "../../hooks";

const HistoryPayment = () => {
  const [cookies] = useCookies(['token']);
  // Get All History
  const { data = [], isLoading } = useQuery<PaymentHistoryType[]>({
    queryKey: ['history-payment'],
    queryFn: () => instance().get("/debt/paymant-history", { headers: { "Authorization": `Bearer ${cookies.token}` } }).then(res => res.data.data)
  })
  // Get All History
  return (
    <div className="">
      {isLoading ? "Loading..." : data.length > 0 ? data.map((item: PaymentHistoryType, index) => (
        <div key={item.id} className="cursor-pointer">
           <Text classList="!text-center !text-[12px] !text-[#3478F7]  !mt-[24px] !font-semibold">{index == 0 ? `${item.paidAt.split("T")[0]}` : Number(data[index]?.paidAt?.split("T")[0].split("-")[2]) == Number(data[index - 1]?.paidAt?.split("T")[0]?.split("-")[2]) ? "" : `${item.paidAt.split("T")[0]}`}</Text>
          <div className="flex items-center justify-between py-[16px] border-b-[1px] border-[#ECECEC]">
            <div>
              <Text classList="!font-bold !text-[14px] !mb-[8px]">{item?.Debtor?.name}</Text>
              <Text classList="!font-semibold !text-[13px]">{PhoneFormat(item?.Debtor?.Phone?.length > 0 ? item?.Debtor?.Phone[0]?.phoneNumber : "----")}</Text>
            </div>
            <Text classList="!font-medium !text-[16px]">-{item.amount ? FormatNumber(item.amount) : "----"}</Text>
          </div>
        </div>
      )) : <NotificationMessageNotFound/>}
    </div>
  )
}

export default HistoryPayment