import SkeletonButton from 'antd/es/skeleton/Button'

const MessageSkeleton = () => {
    return (
        <div>
            <div className="w-[300px] h-[100px] mb-[16px] ml-auto">
                <SkeletonButton active className="!w-full !h-full !rounded-[20px] !overflow-hidden" />
            </div>
            <div className="w-[300px] h-[100px] mb-[16px] ml-auto">
                <SkeletonButton active className="!w-full !h-full !rounded-[20px] !overflow-hidden" />
            </div>
            <div className="w-[300px] h-[100px] mb-[16px] ml-auto">
                <SkeletonButton active className="!w-full !h-full !rounded-[20px] !overflow-hidden" />
            </div>
            <div className="w-[300px] h-[100px] mb-[16px] ml-auto">
                <SkeletonButton active className="!w-full !h-full !rounded-[20px] !overflow-hidden" />
            </div>
        </div>
    )
}

export default MessageSkeleton