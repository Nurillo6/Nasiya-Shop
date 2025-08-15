import SkeletonAvatar from "antd/es/skeleton/Avatar"
import SkeletonButton from "antd/es/skeleton/Button"

const HomeSkeleton = () => {
    return (
        <div className="containers !pt-[30px]">
            <div className="flex items-center justify-between mb-[38px]">
                <div className="flex gap-[15px] w-[80%] items-center">
                    <SkeletonAvatar active size={"large"} />
                    <SkeletonButton active className="!w-[200px]" size="small" />
                </div>
                <SkeletonButton active className="!w-[40px] !rounded-[6px] !overflow-hidden !h-[40px]" />
            </div>
            <SkeletonButton active className="!w-full !mb-[31px] !h-[88px] !rounded-[20px] !overflow-hidden" />

            <div className="flex justify-between w-full mb-[40px]">
                <SkeletonButton active className="!w-[90%] !h-[127px] !rounded-[16px] !overflow-hidden" />
                <SkeletonButton active className="!w-[90%] !h-[127px] !rounded-[16px] !overflow-hidden" />
            </div>
            <SkeletonButton active className="!w-[200px] !mb-[26px]" size="small" />
            <div className="flex items-center justify-between mb-[28px]">
                <div className="flex items-center gap-[12px]">
                    <SkeletonAvatar active size={"large"} />
                    <div className="flex flex-col">
                        <SkeletonButton active className="!w-[100px] !mb-[4px]" size="small" />
                        <SkeletonButton active className="!w-[200px]" size="small" />
                    </div>
                </div>
                <SkeletonAvatar active size={"large"} />
            </div>
            <div className="flex justify-between items-center">
                <SkeletonButton active className="!w-[90%]" size="small" />
                <SkeletonButton active className="!w-[90%]" size="small" />
            </div>
        </div>

    )
}

export default HomeSkeleton