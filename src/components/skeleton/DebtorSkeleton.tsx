import SkeletonButton from "antd/es/skeleton/Button"

const DebtorSkeleton = () => {
    return (
        <div className="containers !pt-[30px]">
            <div className="flex justify-between mb-[36px] items-center">
                <div className="w-[65%]">
                    <SkeletonButton active className="!w-[100%]" size="small" />
                </div>
                <div className="w-[20%]">
                    <SkeletonButton active className="!w-[100%]" size="small" />
                </div>
            </div>
            <div className="w-full h-[143px] mb-[16px]">
                <SkeletonButton active className="!w-full !h-full !rounded-[20px] !overflow-hidden" />
            </div>
            <div className="w-full h-[143px] mb-[16px]">
                <SkeletonButton active className="!w-full !h-full !rounded-[20px] !overflow-hidden" />
            </div>
            <div className="w-full h-[143px] mb-[16px]">
                <SkeletonButton active className="!w-full !h-full !rounded-[20px] !overflow-hidden" />
            </div>
            <div className="w-full h-[143px] mb-[16px]">
                <SkeletonButton active className="!w-full !h-full !rounded-[20px] !overflow-hidden" />
            </div>
        </div>
    )
}
const DebtorListSkeleton = () => {
    return (
        <div>
             <div className="w-full h-[143px] mb-[16px]">
                <SkeletonButton active className="!w-full !h-full !rounded-[20px] !overflow-hidden" />
            </div>
             <div className="w-full h-[143px] mb-[16px]">
                <SkeletonButton active className="!w-full !h-full !rounded-[20px] !overflow-hidden" />
            </div>
             <div className="w-full h-[143px] mb-[16px]">
                <SkeletonButton active className="!w-full !h-full !rounded-[20px] !overflow-hidden" />
            </div>
             <div className="w-full h-[143px] mb-[16px]">
                <SkeletonButton active className="!w-full !h-full !rounded-[20px] !overflow-hidden" />
            </div>
        </div>
    )
}
export {DebtorSkeleton, DebtorListSkeleton}