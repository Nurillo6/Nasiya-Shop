import { Button, Input, Popover, Radio, Select } from "antd"
import { CreateDebtorIcon, SearchIcon, SortIcon, StarIcon, StartIconActive } from "../../assets/icons"
import { Heading, Text } from "../../components"
import { Link, useNavigate } from "react-router-dom"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { instance } from "../../hooks/instance"
import { useCookies } from "react-cookie"
import type { ClientDebtor } from "../../@types/ClientDebtor"
import { FormatNumber } from "../../hooks/FormatNumber"
import { PhoneFormat } from "../../hooks/PhoneFormat"
import { useEffect, useState, type FormEvent } from "react"
import debounce from "../../hooks/debounce"
import type { CheckboxGroupProps } from "antd/es/checkbox"
import { PATH } from "../../hooks/Path"


const Debtor = () => {
    const navigate = useNavigate()
    const [cookies, , removeCookies] = useCookies(['token']);
    const queryClient = useQueryClient()

    const [params, setParams] = useState<{ search?: string, sortOrder?: "asc" | "desc", sortBy?: "createdAt" | "name" }>({})

    // Search
    const [searchValue, setSearchValue] = useState<string>("")
    const search = debounce(searchValue, 300)
    function handleSearach(value: string | undefined) {
        if (value) {
            setSearchValue(value)
        }
        else {
            setSearchValue(" ")
        }
    }
    // Search

    // Sort
    const [clicked, setClicked] = useState<boolean>(false)
    const plainOptions: CheckboxGroupProps<string>['options'] = [{ label: "A-Z", value: "asc" }, { label: "Z-A", value: "desc" }];
    const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc")
    const [sortBy, setSortBy] = useState<"createdAt" | "name">("createdAt")
    const content = (
        <form onSubmit={handleSort} className="flex flex-col gap-[15px]">
            <Select
                onChange={(e: "createdAt" | "name") => setSortBy(e)}
                style={{ width: "100%" }}
                defaultValue={"createdAt"}
                options={
                    [
                        {
                            label: "Sana bo'yicha",
                            value: "createdAt"
                        },
                        {
                            label: "Ism bo'yicha",
                            value: "name"
                        },
                    ]
                }
            />
            <Radio.Group options={plainOptions} onChange={(e) => setSortOrder(e.target.value)} value={sortOrder} />
            <Button htmlType="submit" type="primary">Filter</Button>
        </form>
    )
    function handleSort(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()
        setParams({ ...params, sortBy, sortOrder })
        setClicked(false)
    }
    useEffect(() => {
        if (search) {
            setParams({ ...params, search })
        }
    }, [search])
    // Sort 

    //  Change star
    const {mutate:changeStar} = useMutation({
        mutationFn:(id:string) => instance().patch(`/debtor/star/${id}`, {}, {headers:{"Authorization":`Bearer ${cookies.token}`}}),
        onSuccess:() => {
            queryClient.invalidateQueries({queryKey:['debtor-list']})
        },
    })
    //  Change star

    // Get All
    const { data: debtorList = [], isLoading } = useQuery<ClientDebtor[]>({
        queryKey: ['debtor-list', params],
        queryFn: () => instance().get("/debtor", { params, headers: { "Authorization": `Bearer ${cookies.token}` } }).then(res => res.data.data).catch(err => {
            if (err.response.status == 401) {
                removeCookies("token")
                location.pathname = "/"
            }
        })
    })
    // Get All
    function handleSingleCreate(id:string){
        queryClient.invalidateQueries({queryKey:['single-debtor']})
        navigate(`${id}`)
       
    }
    return (
        <div className="containers relative">
            <div className="flex sticky !py-[30px] top-[0] bg-white z-50 justify-between items-center">
                <Input onChange={(e) => handleSearach(e.target.value)} prefix={<SearchIcon />} className="!w-[90%] !bg-[#F6F6F6]" size="large" placeholder="Mijozlarni qidirish..." />
                <Popover placement="bottomRight" open={clicked} trigger={"click"} content={content} title="Title">
                    <button onClick={() => setClicked(!clicked)} className="cursor-pointer hover:scale-[1.2] duration-300"><SortIcon /></button>
                </Popover>
            </div>
            <div className="flex flex-col gap-[16px]">
                {isLoading ? "laading..." : debtorList.map((item: ClientDebtor) => (
                    <div onClick={() => handleSingleCreate(item.id)} id="debtor-wrapper" key={item.id} className="p-[16px] cursor-pointer duration-300 hover:scale-[1.01] relative rounded-[16px] border-[1px] border-[#ECECEC] bg-[#F6F6F6]">
                        <Heading classList="!text-[24px] mb-[4px]" tag="h2">{item.name}</Heading>
                        <Link className="font-medium text-[14px] mb-[16px]" to={`tel:${item.Phone.length ? item.Phone[0].phoneNumber : ""}`}>{item.Phone.length ? PhoneFormat(item?.Phone[0].phoneNumber) : "---"}</Link>
                        <div className="mt-[16px]">
                            <span className="font-semibold  text-[12px] mb-[4px] block">Jami nasiya:</span>
                            <Text classList="!text-[16px] text-[#F94D4D]">{FormatNumber(item.totalDebt)} so‘m</Text>
                        </div>
                        <button onClick={(e) => {
                            e.stopPropagation()
                            changeStar(item.id)
                        }} className="absolute duration-300 hover:scale-[1.2] cursor-pointer top-[33px] right-[19px]"> {item.star ? <StartIconActive/> : <StarIcon />}  </button>
                    </div>
                ))}
            </div>
            <Button onClick={() => navigate(PATH.debtorCreate)} className="!text-[16px] !fixed !right-[calc(50%-185px)] !bottom-[80px] !font-medium !h-[48px]" type="primary" size="large" icon={<CreateDebtorIcon/>}>Yaratish</Button>
        </div>
    )
}

export default Debtor