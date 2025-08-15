import { useCookies } from "react-cookie"
import { useNavigate, useParams } from "react-router-dom";
import { Heading, Text } from "../../../components";
import { BackIcon, CreateExampleIcon, SendMessageIcon } from "../../../assets/icons";
import { Button, Popover } from "antd";
import { MoreOutlined } from "@ant-design/icons";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { MessageType } from "../../../@types/NotificationType";
import { useState, type FormEvent } from "react";
import { FindMonth, instance } from "../../../hooks";

const NotificationMessage = () => {
    const { debtorId } = useParams()
    const [cookies] = useCookies(['token']);
    const queryClient = useQueryClient()
    const navigate = useNavigate()

    // Get All Messages
    const { data, isLoading } = useQuery<{ notifications: MessageType[], debtor: { name: string } }>({
        queryKey: ['detor-notification'],
        queryFn: () => instance().get("/notification", { headers: { "Authorization": `Bearer ${cookies.token}` }, params: { debtorId } }).then(res => res.data.data)
    })
    // Get All Messages

    // Create Message 
    const [message, setMessage] = useState<string>("")
    const { mutate } = useMutation({
        mutationFn: (data: { message: string, debtorId: string | undefined }) => instance().post("/notification", data, { headers: { "Authorization": `Bearer ${cookies.token}` } }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['detor-notification'] })
            setMessage("")
        }
    })

    function handleCreateMessage(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()
        const data = { message, debtorId }
        mutate(data)
    }
    // Create Message 

    // Back
    function handleBack() {
        queryClient.invalidateQueries({ queryKey: ['messages'] })
        navigate(-1)
    }
    // Back

    // Delete
    const { mutate: deleteMessage, isPending } = useMutation({
        mutationFn: () => instance().delete(`/notification/${debtorId}`, { headers: { "Authorization": `Bearer ${cookies.token}` } }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['messages'] })
            navigate(-1)
        }
    })
    const content = (
        <>
            <Heading classList="!mb-[10px]" tag="h2">O'chirmoqchimisiz?</Heading>
            <Button loading={isPending} onClick={() => deleteMessage()} className="w-full" size="large" type="primary" htmlType="button">O'chirish</Button>
        </>
    )
    // Delete
    return (
        <div className="containers">
            <div className="flex fixed z-50 top-0 pt-[30px] w-full bg-white max-w-[400px] items-center border-b-[1px] border-[#ECECEC] justify-between pb-[11px] mb-[28px]">
                <button className="cursor-pointer duration-300 hover:scale-[1.2]" onClick={() => handleBack()}> <BackIcon /> </button>
                <Heading tag="h2">{data?.debtor ? data?.debtor?.name : "---"}</Heading>
                <Popover className="debtor-single-popop" placement="bottomRight" content={content} trigger="click">
                    <button> <MoreOutlined className="!text-[24px] cursor-pointer duration-300 hover:scale-[1.2]" /> </button>
                </Popover>
            </div>
            <div className="mt-[80px] pb-[80px] space-y-[20px]">
                {isLoading ? "Loading..." : data?.notifications?.map((item, index) => (
                    <div key={item.id}>
                        <Text classList="font-medium !text-[12px] !text-center">{index == 0 ? `${item.createdAt.split("T")[0].split("-")[2]} ${FindMonth(Number(item.createdAt.split("T")[0].split("-")[1]))}` : Number(data.notifications[index]?.createdAt?.split("T")[0].split("-")[2]) == Number(data.notifications[index - 1]?.createdAt?.split("T")[0]?.split("-")[2]) ? "" : `${item.createdAt.split("T")[0].split("-")[2]} ${FindMonth(Number(item.createdAt.split("T")[0].split("-")[1]))}`}</Text>
                        <div className="p-4 ml-auto relative max-w-[300px] !mt-[20px] rounded-[16px] bg-[#F5F5F5]">
                            <Text classList="font-normal !text-[13px]">{item.message}</Text>
                            <span className="text-[10px] absolute bottom-[2px] right-[8px]">{item.createdAt.split("T")[1].split(".")[0]}</span>
                        </div>
                    </div>
                ))}
            </div>
            <form onSubmit={handleCreateMessage} autoComplete="off" className="flex fixed w-full max-w-[400px] bg-white py-[8px] bottom-[60px] mx-auto justify-between items-center">
                <button type="button" className="cursor-pointer hover:scale-[1.2] duration-300"> <CreateExampleIcon /> </button>
                <div className="w-[90%] flex items-center justify-between pr-[18px] bg-[#F5F5F5] rounded-[50px]">
                    <input onChange={(e) => setMessage(e.target.value)} value={message} className="w-[90%] py-[12px] outline-none pl-[16px]" type="text" placeholder="Xabar yuborish..." />
                    <button type="submit" className="cursor-pointer hover:scale-[1.2] duration-300"> <SendMessageIcon /> </button>
                </div>
            </form>
        </div>
    )
}

export default NotificationMessage