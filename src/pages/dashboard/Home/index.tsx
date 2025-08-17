import { HomeSkeleton } from "../../../components"
import { useQuery } from "@tanstack/react-query"
import type { SellerType } from "../../../@types/SellerType"
import { instance} from "../../../hooks"
import HomeContent from "./HomeContent"

const Home = () => {
    const { data: sellerData2, isLoading } = useQuery<SellerType>({
        queryKey: ["get-seller"],
        queryFn: () => instance.get("/seller/me").then(res => res.data.data)
    })
    return isLoading ? <HomeSkeleton /> : <HomeContent sellerData2={sellerData2} />
}

export default Home
