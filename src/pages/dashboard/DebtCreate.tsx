import { useNavigate, useParams } from "react-router-dom"
import { Heading, UploadImage } from "../../components"
import { BackIcon } from "../../assets/icons"
import { Button, Checkbox, DatePicker, Input, Select, type CheckboxChangeEvent } from "antd"
import { useState, type FormEvent } from "react"
import dayjs from "dayjs"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { instance } from "../../hooks/instance"
import { useCookies } from "react-cookie"
import toast from "react-hot-toast"

export const termList = [
  { value: 1, label: "1 oy" },
  { value: 2, label: "2 oy" },
  { value: 3, label: "3 oy" },
  { value: 4, label: "4 oy" },
  { value: 5, label: "5 oy" },
  { value: 6, label: "6 oy" },
]

const DebtCreate = () => {
  const { id: debtorId, debtId } = useParams()
  const [cookies] = useCookies(['token']);
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const [productName, setProductName] = useState<string>("")
  const [date, setDate] = useState<string>()
  const [dateValue, setDateValue] = useState<any>("")
  const [amount, setAmount] = useState<number>()
  const [term, setTerm] = useState<number>()

  const [isNote, setIsNote] = useState<boolean>(false)
  const [note, setNote] = useState<string>("")
  const [images, setImages] = useState<Array<string>>([])

  function checkToday(e: CheckboxChangeEvent) {
    if (e.target.checked) {
      setDateValue(dayjs())
      setDate(dayjs().toISOString())
    }
    else {
      setDateValue(null)
    }
  }
  function chooseDate(date: any) {
    setDateValue(date)
    setDate(date.format("YYYY-MM-DDTHH:mm:ss.SSS[Z]"))
  }
  const { mutate: createDebt } = useMutation({
    mutationFn: (data: any) => instance().post("/debt", data, { headers: { "Authorization": `Bearer ${cookies.token}` } }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['single-debtor'] })
      toast.success("Yaratildi")
      navigate(-1)
    }
  })
  const { mutate: updateDebt } = useMutation({
    mutationFn: (data: any) => instance().patch(`/debt/${debtId}`, data, { headers: { "Authorization": `Bearer ${cookies.token}` } }).then(() => {
      toast.success("O'zgardi")
      navigate(-1)
      queryClient.invalidateQueries({ queryKey: ['single-debt'] })
    })
  })
  const createDebtSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const data = { productName, date, amount, term, note, images, debtorId }

    if (debtId) {
      const result = images.map((item: any) => {
        if (item.name) {
          return `/uploads${item.name.split("uploads")[1]}`
        }
        else {
          return item
        }
      })
      data.images = result
      updateDebt(data)
    }
    else {
      createDebt(data)
    }
  }

  useQuery({
    queryKey: ['update-debt'],
    queryFn: () => debtId ? instance().get(`/debt/${debtId}`, { headers: { "Authorization": `Bearer ${cookies.token}` } }).then(res => {
      setProductName(res.data.data.productName)
      setAmount(res.data.data.amount)
      setDateValue(dayjs(res.data.data.date))
      setTerm(res.data.data.term)
      setDate(res.data.data.date)
      if (res.data.data.note) {
        setIsNote(true)
        setNote(res.data.data.note)
        setImages(res.data.data.ImgOfDebt)
      }
      return {}
    }) : {}
  })

  return (
    <div className="containers !mt-[30px]">
      <div className="flex w-[50%] !mb-[26px] justify-between items-center ">
        <button onClick={() => navigate(-1)} type="button" className="cursor-pointer duration-300 hover:scale-[1.2]"> <BackIcon /> </button>
        <Heading tag="h2" classList="!text-[18px]">Mijoz {debtId ? "tahrirlash" : "yaratish"}</Heading>
      </div>
      <form onSubmit={createDebtSubmit} autoComplete="off">
        <label className=" block">
          <span className="text-[13px] font-semibold mb-[8px]">Mahsulot nomi *</span>
          <Input value={productName} onChange={(e) => setProductName(e.target.value)} allowClear type="text" className="!bg-[#F6F6F6] !h-[44px]" size="large" name="username" placeholder="Ismini kiriting" />
        </label>
        <label className="mt-[24px] block">
          <span className="text-[13px] font-semibold mb-[8px]">Mahsulot Narxi *</span>
          <Input value={amount} onChange={(e) => setAmount(Number(e.target.value))} allowClear type="number" className="!bg-[#F6F6F6] !h-[44px]" size="large" name="amount" placeholder="Narx kiriting" />
        </label>
        <div className="debt-date-picker flex justify-between items-end mt-[24px]">
          <label className="w-[70%] flex flex-col">
            <span className="text-[13px] font-semibold mb-[8px]">Sana</span>
            <DatePicker className="!h-[44px]" value={dateValue} onChange={chooseDate} size="large" />
          </label>
          <Checkbox onChange={checkToday} className="!mb-[10px] !text-[14px] !font-medium">Bugun</Checkbox>
        </div>
        <label className="my-[24px] flex flex-col">
          <span className="text-[13px] font-semibold mb-[8px]">Muddat</span>
          <Select
            className="!h-[44px]"
            value={term}
            size="large"
            allowClear
            showSearch
            placeholder="Qarz muddatini tanlang"
            optionFilterProp="label"
            onChange={(e) => setTerm(e)}
            options={termList}
          />
        </label>
        {isNote ?
          <label className="mb-[24px] block">
            <span className="text-[13px] font-semibold mb-[8px]">Eslatma</span>
            <Input.TextArea value={note} onChange={(e) => setNote(e.target.value)} rows={4} allowClear className="!bg-[#F6F6F6]" size="large" name="note" placeholder="Eslatma kiriting" />
          </label>
          : <Button onClick={() => setIsNote(true)} htmlType="button" type="default" size="large" className="!h-[48px] mb-[24px] w-full">Izoh qo‘shish</Button>}
        <UploadImage imgNames={images} setImgNames={setImages} />
        <Button htmlType="submit" type="primary" size="large" className="!h-[49px] !w-full !mt-[32px] !text-[18px] !font-medium">{debtId ? "Tahrirlash" : "Saqlash"}</Button>
      </form>
    </div>
  )
}

export default DebtCreate