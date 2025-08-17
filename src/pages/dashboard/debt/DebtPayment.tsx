import { useNavigate, useParams } from "react-router-dom"
import { AnyPaymentItem, CustomModal, Heading, SuccessModal, Text } from "../../../components"
import { ArrowIcon, BackIcon } from "../../../assets/icons"
import { useState, type FormEvent } from "react"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import type { DebtType } from "../../../@types/Debt"
import { Button, Input } from "antd"
import { FindMonth, FormatNumber, instance } from "../../../hooks"

const DebtPayment = () => {
    const { debtId } = useParams()
    const navigate = useNavigate()
    const queryClient = useQueryClient()

    
    const [showSuccess, setShowSuccess] = useState<boolean>(false)
    const [showForMonthPayment, setShowForMonthPayment] = useState<boolean>(false)
    const [showAnyPayment, setShowAnyPayment] = useState<boolean>(false)
    const [showChooseDatePayment, setShowChooseDatePayment] = useState<boolean>(false)

    const { data: debtData } = useQuery<DebtType>({
        queryKey: ['single-debt'],
        queryFn: () => instance.get(`/debt/${debtId}`).then(res => res.data.data)
    })

    // one month
    const { mutate: oneMonthMutate, isPending: oneMonthPenning } = useMutation({
        mutationFn: (data: { debtId: string | undefined }) => instance.post("/debt/oneMonth", data),
        onSuccess: () => {
            setShowSuccess(true)
            queryClient.invalidateQueries({ queryKey: ['single-debt'] })
            queryClient.invalidateQueries({ queryKey: ['single-debtor'] })
            queryClient.invalidateQueries({ queryKey: ['history-payment'] })
        }
    })
    function handleShowSuccess() {
        oneMonthMutate({ debtId })
    }
    // one month
    // any payment
    const { mutate: oneAnyPayment, isPending: anyPaymenPenning } = useMutation({
        mutationFn: (data: { debtId: string | undefined, amount: number }) => instance.post("/debt/anyQuantity", data),
        onSuccess: () => {
            setShowSuccess(true)
            queryClient.invalidateQueries({ queryKey: ['single-debt'] })
            queryClient.invalidateQueries({ queryKey: ['single-debtor'] })
            queryClient.invalidateQueries({ queryKey: ['history-payment'] })
        }
    })
    function handleSubmitAnyPayment(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()
        const data = { debtId, amount: (e.target as HTMLFormElement).amount.value - 0 }
        oneAnyPayment(data)
    }
    // any payment

    // Choose date to pay
    const [totolPay, setTotalPay] = useState<number[]>([])
    const [payAll, setPayAll] = useState(false)
    const [payMonth, setPayMonth] = useState<Array<number>>([])
    const { mutate: oneManyPayment, isPending: manyPaymenPenning } = useMutation({
        mutationFn: (data: { debtId: string | undefined, months: number[] }) => instance.post("/debt/manyMonth", data),
        onSuccess: () => {
            setShowSuccess(true)
            queryClient.invalidateQueries({ queryKey: ['single-debt'] })
            queryClient.invalidateQueries({ queryKey: ['single-debtor'] })
            queryClient.invalidateQueries({ queryKey: ['history-payment'] })
        }
    })
    function handleManyMonthClick() {
        const data = { debtId, months: payMonth }
        oneManyPayment(data)
    }
    function handlePayAll() {
        setPayAll((_prev: boolean) => {
            if (!payAll) {
                setPayMonth(debtData?.Payment ? debtData?.Payment.map(item => item.month) : [])
                setTotalPay(debtData?.Payment ? debtData?.Payment.map(item => item.amount) : [])
                return true
            }
            else {
                setPayMonth([])
                setTotalPay([])

                return false
            }
        })

    }
    function addAmount(arr: number[]) {
        if (arr.length > 0) {
            let total = arr?.reduce((value: number, item: number) => {
                return value += item
            })
            return FormatNumber(total)
        }
    }
    // Choose date to pay

    return (
        <>
            <div className="containers !mt-[30px]">
                <div className="flex items-center justify-between mb-[27px] w-[50%] gap-[12px]">
                    <button className="cursor-pointer" onClick={() => navigate(-1)}> <BackIcon /> </button>
                    <Heading tag="h2">Nasiyani so‘ndirish</Heading>
                </div>
                <Heading classList="!text-[18px] !mb-[20px]" tag="h2">To‘lov</Heading>
                <ul>
                    <li onClick={() => setShowForMonthPayment(true)} className="flex items-center justify-between cursor-pointer py-[16px] border-b-[1px] border-[#EEEEEE]">
                        <Text classList="!text-[14px] font-normal">1 oyga so‘ndirish</Text>
                        <button className="rotate-[180deg]"><ArrowIcon classList="payment-debt" /></button>
                    </li>
                    <li onClick={() => setShowAnyPayment(true)} className="flex items-center justify-between cursor-pointer py-[16px] border-b-[1px] border-[#EEEEEE]">
                        <Text classList="!text-[14px] font-normal">Har qanday miqdorda so‘ndirish</Text>
                        <button className="rotate-[180deg]"><ArrowIcon classList="payment-debt" /></button>
                    </li>
                    <li onClick={() => setShowChooseDatePayment(true)} className="flex items-center justify-between cursor-pointer py-[16px] border-b-[1px] border-[#EEEEEE]">
                        <Text classList="!text-[14px] font-normal">To‘lov muddatini tanlash</Text>
                        <button className="rotate-[180deg]"><ArrowIcon classList="payment-debt" /></button>
                    </li>
                </ul>
            </div>
            <CustomModal show={showForMonthPayment} setShow={setShowForMonthPayment}>
                <Heading classList="!font-bold !text-[20px]" tag="h2">1 oy uchun so‘ndirish</Heading>
                <div className="p-4 rounded-[16px] bg-[#DDE9FE] mt-[32px] mb-[200px]">
                    <Heading classList="!font-bold !text-[16px] !mb-[4px] text-[#3478F7]" tag="h3">{FormatNumber(debtData?.Payment[0]?.amount ? debtData?.Payment[0]?.amount : 0)} so‘m</Heading>
                    <Text>{FindMonth(Number(debtData?.Payment[0]?.date?.split("T")[0]?.split("-")[1]) - 1)} oyi uchun so‘ndiriladi</Text>
                </div>
                <Button loading={oneMonthPenning} onClick={handleShowSuccess} className="!h-[42px] !font-medium !text-[14px] w-full" size="large" htmlType="button" type="primary">1 oylik uchun so‘ndirish</Button>
            </CustomModal>
            <CustomModal show={showAnyPayment} setShow={setShowAnyPayment}>
                <form onSubmit={handleSubmitAnyPayment} autoComplete="off">
                    <Heading classList="!font-bold !text-[20px] !mb-[32px]" tag="h2">Har qanday miqdorda so‘ndirish</Heading>
                    <label className="!mb-[215px] block">
                        <span className="text-[13px] font-semibold mb-[8px]">Miqdorni kiriting *</span>
                        <Input type="number" allowClear className="!bg-[#F6F6F6] !h-[44px]" size="large" name="amount" placeholder="To‘lov miqdori" />
                    </label>
                    <Button loading={anyPaymenPenning} className="!h-[42px] !font-medium !text-[14px] w-full" size="large" htmlType="submit" type="primary">So‘ndirish</Button>
                </form>
            </CustomModal>
            <CustomModal show={showChooseDatePayment} setShow={setShowChooseDatePayment}>
                <Heading classList="!font-bold !text-[20px]" tag="h2">To‘lov muddatini tanlang</Heading>
                <div className="flex items-center justify-between mt-[22px] pb-[22px] border-b-[1px] border-[#ECECEC]">
                    <div>
                        <Text classList="!text-[14px] !font-medium">So‘ndirish:</Text>
                        <Text classList="!text-[16px] !font-bold text-[#3478F7]">{addAmount(totolPay) ? addAmount(totolPay) : 0} so‘m</Text>
                    </div>
                    <button onClick={handlePayAll} className="text-[14px] font-bold text-[#3478F7] cursor-pointer hover:scale-[1.1] duration-300">Hammasini tanlang</button>
                </div>
                <ul>
                    {debtData?.Payment.map(item => <AnyPaymentItem setTotalPay={setTotalPay} payAll={payAll} item={item} key={item.id} setPayMonth={setPayMonth} payMonth={payMonth} />)}
                </ul>
                <Button loading={manyPaymenPenning} onClick={handleManyMonthClick} className="!h-[42px] !mt-[16px] !font-medium !text-[14px] w-full" size="large" htmlType="submit" type="primary">So‘ndirish</Button>
            </CustomModal>
            {showSuccess && <SuccessModal />}
        </>
    )
}

export default DebtPayment