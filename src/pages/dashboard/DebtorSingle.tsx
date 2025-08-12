import { useNavigate, useParams } from "react-router-dom"
import { BackIcon, StarIcon, StartIconActive } from "../../assets/icons"
import { CustomModal, Heading, Text } from "../../components"
import { MoreOutlined, PlusOutlined } from "@ant-design/icons"
import { Button, Popover } from "antd"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { instance } from "../../hooks/instance"
import { useCookies } from "react-cookie"
import type { SingleDebtorType } from "../../@types/Debtor"
import { FormatNumber } from "../../hooks/FormatNumber"
import { useState } from "react"
import { FindMonth } from "../../hooks/FindMonth"

const DebtorSingle = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const queryClient = useQueryClient()
    const [cookies, , removeCookies] = useCookies(['token']);
    const [show, setShow] = useState(false)

    const { data: SingleDebtor, isLoading } = useQuery<SingleDebtorType>({
        queryKey: ['single-debtor'],
        queryFn: () => instance().get(`/debtor/${id}`, { headers: { "Authorization": `Bearer ${cookies.token}` } }).then(res => res.data.data).catch(err => {
            if (err.response.status == 401) {
                removeCookies("token")
                location.pathname = "/"
            }
        })
    })

    function handleUpdateBtnClick() {
        navigate("update")
        queryClient.invalidateQueries({ queryKey: ['update-debtor'] })
    }

    const content = (
        <div className="w-[172px]">
            <Text onClick={() => handleUpdateBtnClick()} classList="!font-medium duration-300 hover:scale-[1.01] cursor-pointer  border-b-[1px] border-[#ECECEC] !pb-[16px] !pt-[8px]">Tahrirlash</Text>
            <Text onClick={() => setShow(true)} classList="!font-medium duration-300 hover:scale-[1.01] cursor-pointer !pt-[16px] !pb-[8px] !text-[#F94D4D]">O‘chirish</Text>
        </div>
    )
    const emtyPage = (
        <div className="text-center w-[252px] mx-auto mt-[100px]">
            <Heading classList="!font-bold !mb-[8px] !text-[16]" tag="h2">Mijozda hali nasiya mavjud emas</Heading>
            <Text classList="!font-normal !text-[14]">Nasiya yaratish uchun pastdagi “+” tugmasini bosing</Text>
        </div>
    )
    function findPrecent(Payment: any) {
        const activePay = Payment.filter((item: any) => item.isActive == false)
        return (activePay.length * 100) / Payment.length
    }
    //  Change star
    const { mutate: changeStar } = useMutation({
        mutationFn: (id: string | undefined) => instance().patch(`/debtor/star/${id}`, {}, { headers: { "Authorization": `Bearer ${cookies.token}` } }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['single-debtor'] })
        },
    })
    //  Change star

    // Delete part
    const { mutate: deleteDebtor, isPending } = useMutation({
        mutationFn: (id: string | undefined) => instance().delete(`/debtor/${id}`, { headers: { "Authorization": `Bearer ${cookies.token}` } }),
        onSuccess: () => {
            setShow(false)
            navigate(-1)
            queryClient.invalidateQueries({ queryKey: ['debtor-list'] })
        }
    })
    // Delete end
    // Created At Nov 1, 2024 14:51 Front formatda togirlash kerak
    function showDebtorDebt(id:string){
        queryClient.invalidateQueries({queryKey:['single-debt']})
        navigate(`debt/${id}`)
    }

    return (
        <div className="containers !mt-[34px] relative">
            <div className="flex items-center justify-between mb-[20px]">
                <div className="flex items-center gap-[12px]">
                    <button className="cursor-pointer" onClick={() => navigate(-1)}> <BackIcon /> </button>
                    <Heading tag="h2">{isLoading ? "----" : SingleDebtor?.name}</Heading>
                </div>
                <div className="flex items-center gap-[14px]">
                    <button onClick={() => changeStar(id)} className="duration-300 debtor-single hover:scale-[1.2] cursor-pointer"> {SingleDebtor?.star ? <StartIconActive /> : <StarIcon />}  </button>
                    <Popover className="debtor-single-popop" placement="bottomRight" content={content} trigger="click">
                        <button className="duration-300 hover:scale-[1.2] cursor-pointer"> <MoreOutlined className="scale-[1.2]" /> </button>
                    </Popover>
                </div>
            </div>
            <div className="rounded-[20px] bg-[#BBD2FC] py-[18px] pl-[18px] !mb-[24px]">
                <Text classList="!text-[12px]">Umumiy nasiya:</Text>
                <strong className="font-bold text-[#000] text-[22px]">
                    {FormatNumber(SingleDebtor?.totalAmount ? SingleDebtor?.totalAmount : "0")} so‘m
                </strong>
            </div>
            <Heading classList="!mb-[16px]" tag="h2">Faol nasiyalar</Heading>
            <div className="flex flex-col gap-[16px]">
                {isLoading ? "Loading..." : SingleDebtor?.Debt.length == 0 ? emtyPage : SingleDebtor?.Debt.map(item => (
                    <div onClick={() => showDebtorDebt(item.id)} key={item.id} className="p-4 cursor-pointer rounded-[16px] bg-[#F6F6F6]">
                        <div className="flex items-center justify-between mb-[20px]">
                            <Text classList="!font-medium !text-[14px]">{FindMonth(Number(item.date.split("T")[0].split("-")[1]) - 1)} {item.date.split("T")[0].split("-")[2]}, {item.date.split("T")[0].split("-")[0]} {item.date.split("T")[1].split(".")[0]}</Text>
                            <Text classList="!font-medium text-[#3478F7]">{FormatNumber(item.totalPayments)} so‘m</Text>
                        </div>
                        <Text classList="!font-normal !text-[12px]">Keyingi to‘lov: {item.nextPayment.date.split("T")[0]}</Text>
                        <strong className="block mb-[16px]"><span className="font-extrabold text-[#735CD8] text-[16px]">{FormatNumber(item.nextPayment.amount)}</span> <span className="font-normal text-[12px]">so‘m</span></strong>
                        <div className="w-full h-[8px] rounded-full bg-[#CCCCCC] relative">
                            <span style={{ width: `${findPrecent(item.Payment)}%` }} className={`h-[100%] absolute rounded-full bg-[#30AF49]`}></span>
                        </div>
                    </div>
                ))}
            </div>
            <Button onClick={() => navigate("create-debt")} className="!text-[16px] !fixed !right-[calc(50%-185px)] !bottom-[80px] !font-medium !h-[48px]" type="primary" size="large" icon={<PlusOutlined />}>Qo'shish</Button>
            <CustomModal show={show} setShow={setShow}>
                <Heading tag="h2">O'chirmoqchisiz?</Heading>
                <div className="flex items-center justify-between mt-3">
                    <Button loading={isPending} onClick={() => deleteDebtor(id)} className="w-[100%] " size="large" type="primary" htmlType="button">Tasdiqlash</Button>
                </div>
            </CustomModal>
        </div>
    )
}

export default DebtorSingle