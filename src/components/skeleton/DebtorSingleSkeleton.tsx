import SkeletonButton from 'antd/es/skeleton/Button'

const DebtorSingleSkeleton = () => {
    return (
        <div className='containers !mt-[30px]'>
            <div className="w-full flex items-center justify-between mb-[28px]">
                <div className='w-[45%] h-[25px]'>
                    <SkeletonButton active className="!w-full !h-full !rounded-[20px] !overflow-hidden" />
                </div>
                <div className='w-[45%] h-[25px]'>
                    <SkeletonButton active className="!w-full !h-full !rounded-[20px] !overflow-hidden" />
                </div>
            </div>
            <div className="w-full h-[84px] mb-[24px]">
                <SkeletonButton active className="!w-full !h-full !rounded-[20px] !overflow-hidden" />
            </div>
            <div className="w-[104px] h-[20px] mb-[16px]">
                <SkeletonButton active className="!w-full !h-full !rounded-[20px] !overflow-hidden" />
            </div>
            <div className="w-full h-[148px] mb-[16px]">
                <SkeletonButton active className="!w-full !h-full !rounded-[20px] !overflow-hidden" />
            </div>
            <div className="w-full h-[148px] mb-[16px]">
                <SkeletonButton active className="!w-full !h-full !rounded-[20px] !overflow-hidden" />
            </div>
            <div className="w-full h-[148px] mb-[16px]">
                <SkeletonButton active className="!w-full !h-full !rounded-[20px] !overflow-hidden" />
            </div>
            <div className="w-full h-[148px] mb-[16px]">
                <SkeletonButton active className="!w-full !h-full !rounded-[20px] !overflow-hidden" />
            </div>
        </div>
    )
}

export default DebtorSingleSkeleton