import SkeletonButton from 'antd/es/skeleton/Button'

const NotificationSkeleton = () => {
    return (
        <div>
            <div className="w-full h-[74px] mb-[4px]">
                <SkeletonButton active className="!w-full !h-full !rounded-[20px] !overflow-hidden" />
            </div>
            <div className="w-full h-[74px] mb-[4px]">
                <SkeletonButton active className="!w-full !h-full !rounded-[20px] !overflow-hidden" />
            </div>
            <div className="w-full h-[74px] mb-[4px]">
                <SkeletonButton active className="!w-full !h-full !rounded-[20px] !overflow-hidden" />
            </div>
            <div className="w-full h-[74px] mb-[4px]">
                <SkeletonButton active className="!w-full !h-full !rounded-[20px] !overflow-hidden" />
            </div>
        </div>
    )
}

export { NotificationSkeleton }