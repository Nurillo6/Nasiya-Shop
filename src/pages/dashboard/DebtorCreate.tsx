import { Button, Input } from "antd"
import { BackIcon } from "../../assets/icons"
import { Heading, Text, UploadImage } from "../../components"
import { useState, type FormEvent } from "react"
import { useCookies } from "react-cookie"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { instance } from "../../hooks/instance"
import { toast } from "react-hot-toast"
import { useNavigate, useParams } from "react-router-dom"

const DebtorCreate = () => {
    const { id } = useParams()
    const [cookies] = useCookies(['token']);
    const navigate = useNavigate()
    const queryClient = useQueryClient()

    // values
    const [name, setName] = useState<string>("")
    const [address, setAddress] = useState<string>("")
    const [note, setNote] = useState<string>("")
    const [phones, setPhones] = useState<Array<string>>([""]);
    const [imgNames, setImgNames] = useState<Array<string>>([])
    // values

    // Images

    // Phone create 
    const handleChange = (index: number, value: string) => {
        let updatedValues = [...phones];
        updatedValues[index] = value;
        setPhones(updatedValues);
    };
    const addPhone = () => {
        setPhones([...phones, ""]);
    };

    // Phone create 

    const [isNote, setIsNote] = useState<boolean>(false)
    const { mutate: createDebtor } = useMutation({
        mutationFn: (data: { name: string, address: string, note?: string | null }) => instance().post('/debtor', data, { headers: { "Authorization": `Bearer ${cookies.token}` } }).then(() => {
            toast.success("Qo'shildi")
            navigate(-1)
            queryClient.invalidateQueries({ queryKey: ['debtor-list'] })
        })
    })
    const { mutate: updateDebtor } = useMutation({
        mutationFn: (data: { name: string, address: string, note?: string | null }) => instance().patch(`/debtor/${id}`, data, { headers: { "Authorization": `Bearer ${cookies.token}` } }).then(() => {
            toast.success("O'zgardi")
            navigate(-1)
            queryClient.invalidateQueries({ queryKey: ['debtor-list'] })
        })
    })
    function handleCreateDebtor(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()
        const data: { name: string, address: string, note?: string | null, phones: Array<string>, images: Array<string> } = {
            name, address, phones,
            images: imgNames,
            note: isNote && note ? note : null,
        }
        if (id) {
            const result = imgNames.map((item: any) => {
                if (item.name) {
                    return `/uploads${item.name.split("uploads")[1]}`
                }
                else {
                    return item
                }
            })
            data.images = result
            updateDebtor(data)
        }
        else {
            createDebtor(data)
        }

    }
    useQuery({
        queryKey: ['update-debtor'],
        queryFn: () => id ? instance().get(`/debtor/${id}`, { headers: { "Authorization": `Bearer ${cookies.token}` } }).then(res => {
            setName(res.data.data.name)
            setAddress(res.data.data.address)
            if (res.data.data.note) {
                setIsNote(true)
                setNote(res.data.data.note)
            }
            setPhones(res.data.data.Phone.map((item: any) => item.phoneNumber))
            setImgNames(res.data.data.ImgOfDebtor)
            return res.data.data
        }) : {}
    })
    
    return (
        <div className="containers !mt-[34px]">
            <div className="flex w-[50%] !mb-[32px] justify-between items-center">
                <button onClick={() => navigate(-1)} type="button" className="cursor-pointer duration-300 hover:scale-[1.2]"> <BackIcon /> </button>
                <Heading tag="h2" classList="!text-[18px]">Mijoz {id ? "tahrirlash" : "yaratish"}</Heading>
            </div>
            <form onSubmit={handleCreateDebtor} autoComplete="off">
                <label className=" block">
                    <span className="text-[13px] font-semibold mb-[8px]">Ismi *</span>
                    <Input value={name} onChange={(e) => setName(e.target.value)} allowClear type="text" className="!bg-[#F6F6F6] !h-[44px]" size="large" name="username" placeholder="Ismini kiriting" />
                </label>
                {phones.map((_, index) => (
                    <label className="!mt-[24px] block" key={index}>
                        <span className="text-[13px] font-semibold mb-[8px]">Telefon raqami *</span>
                        <Input onChange={(e) => handleChange(index, e.target.value)} value={phones[index]} type="tel" allowClear className="!bg-[#F6F6F6] !h-[44px]" size="large" name="phoneNumber" placeholder="Telefon raqami" />
                    </label>
                ))}
                <Text onClick={addPhone} classList="!font-medium cursor-pointer text-end !text-[#3478F7] mt-[8px] mb-[24px]">+ Ko‘proq qo‘shish</Text>
                <label className="mb-[24px] block">
                    <span className="text-[13px] font-semibold mb-[8px]">Yashash manzili *</span>
                    <Input value={address} onChange={(e) => setAddress(e.target.value)} type="tel" allowClear className="!bg-[#F6F6F6] !h-[44px]" size="large" name="address" placeholder="Yashash manzilini kiriting" />
                </label>
                {isNote ?
                    <label className="mb-[24px] block">
                        <span className="text-[13px] font-semibold mb-[8px]">Eslatma</span>
                        <Input.TextArea value={note} onChange={(e) => setNote(e.target.value)} rows={4} allowClear className="!bg-[#F6F6F6]" size="large" name="note" placeholder="Eslatma kiriting" />
                    </label>
                    : <Button onClick={() => setIsNote(true)} htmlType="button" type="default" size="large" className="!h-[48px] w-full">Eslatma qo‘shish</Button>}
                <label className="mt-[24px] block">
                    <span className="text-[13px] font-semibold block mb-[8px]">Rasm biriktirish</span>
                    <UploadImage imgNames={imgNames} setImgNames={setImgNames} />
                </label>
                <Button type="primary" htmlType="submit" size="large" className="!my-[24px] !w-full !h-[49px] !font-medium !text-[18px]">{id ? "Tahrirlash" : "Saqlash"}</Button>
            </form>
        </div>
    )
}

export default DebtorCreate

