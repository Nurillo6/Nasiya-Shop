import SkeletonAvatar from "antd/es/skeleton/Avatar"
import SkeletonButton from "antd/es/skeleton/Button"

const CalendarSkeleton = () => {
    return (
        <div className="containers !pt-[30px]">
            <div className="flex gap-[15px] w-[70%] mb-[36px] justify-between items-center">
                <SkeletonAvatar active size={"large"} />
                <SkeletonButton active className="!w-[150px]" size="small" />
            </div>
            <div className="flex justify-between items-center mb-[16px]">
                <SkeletonButton active className="!w-[90%] !rounded-[20px] !overflow-hidden" />
                <SkeletonButton active className="!w-[90%] !rounded-[20px] !overflow-hidden" />
            </div>
            <div className="flex justify-between items-center mb-[16px]">
                <SkeletonButton active className="!w-[90%] !rounded-[20px] !overflow-hidden" />
                <SkeletonButton active className="!w-[90%] !rounded-[20px] !overflow-hidden" />
            </div>

            <div className="flex justify-between w-full mb-[40px]">
                <SkeletonButton active className="!w-[100%] !h-[283px] !rounded-[16px] !overflow-hidden" />
            </div>

            <SkeletonButton active className="!w-[200px] !mb-[20px]" size="small" />
            <SkeletonButton active className="!w-[100%] !h-[72px] !mb-[12px] !rounded-[16px] !overflow-hidden" />
            <SkeletonButton active className="!w-[100%] !h-[72px] !rounded-[16px] !overflow-hidden" />
        </div>
    )
}

export default CalendarSkeleton