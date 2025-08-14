import { Checkbox } from 'antd'
import Text from './Text'
import { useEffect, useState, type Dispatch, type FC, type SetStateAction } from 'react'
import type { DebtPaymentType } from '../@types/Debt'
import { FormatNumber } from '../hooks/FormatNumber'

const AnyPaymentItem: FC<{setTotalPay:Dispatch<SetStateAction<number[]>>, payAll:boolean, payMonth: number[], item: DebtPaymentType, setPayMonth: Dispatch<SetStateAction<number[]>> }> = ({payAll,setPayMonth, item, setTotalPay }) => {
    const [check, setCheck] = useState<boolean>(false)

    function handleCheck() {
        setCheck(prev => !prev);
        setPayMonth((prev: number[]) => {
            if (!check) {
                return [...prev, item.month];
            } else {
                return prev.filter((id: number) => id !== item.month);
            }
        });
        setTotalPay((prev: number[]) => {
            if (!check) {
                return [...prev, item.amount];
            } else {
                const deleteIndex = prev.findIndex(data => data == item.amount)
                prev.splice(deleteIndex, 1)
                return prev
            }
        });
    }
    useEffect(() => {
        setCheck(payAll)
    },[payAll])
    return (
        <li onClick={handleCheck} className="py-[16px] cursor-pointer border-b-[1px] flex items-center justify-between border-[#ECECEC]">
            <div>
                <Text classList="!font-medium !text-[12px]">{item?.month}-oy</Text>
                <Text classList="!font-semibold !text-[14px]">{item?.date?.split("T")[0]}</Text>
            </div>
            <div className="flex items-center gap-[12px]">
                <Text classList="!font-bold !text-[14px]">{FormatNumber(item.amount)} so‘m</Text>
                <Checkbox checked={check}></Checkbox>
            </div>
        </li>
    )
}

export default AnyPaymentItem