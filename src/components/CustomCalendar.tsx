import React, { useEffect, type Dispatch, type SetStateAction } from 'react';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
import { Button, Calendar } from 'antd';
import dayLocaleData from 'dayjs/plugin/localeData';
import Heading from './Heading';
import Text from './Text';
import { FormatNumber } from '../hooks/FormatNumber';
import { ArrowIcon } from '../assets/icons';
import { FindMonth } from '../hooks/FindMonth';
dayjs.extend(dayLocaleData);

const wrapperStyle: React.CSSProperties = {
  width: "100%",
};

const CustomCalendar: React.FC<{totalForMonth:number | string, setNowDate: Dispatch<SetStateAction<dayjs.Dayjs | undefined>>, nowDate: dayjs.Dayjs | undefined }> = ({ nowDate, setNowDate, totalForMonth }) => {
 

  function handleChooseDay(value: any) {
    setNowDate(value);
  }
  function handleChangeMonth(value: dayjs.Dayjs, onChange: (date: dayjs.Dayjs) => void) {
    const newMonth = value.add(1, 'month');
    onChange(newMonth);
  }
  function handleChangeMonth2(value: dayjs.Dayjs, onChange: (date: dayjs.Dayjs) => void) {
    const newMonth = value.subtract(1, 'month');
    onChange(newMonth);
  }

  return (
    <div style={wrapperStyle}>
      <Calendar
        onChange={handleChooseDay}
        fullscreen={false}
        value={nowDate}
        headerRender={({ value, onChange }) => {
          useEffect(() => {
            setNowDate(value)
          },[])
          console.log(value);
          
          return (
            <>
              <div className="flex items-center justify-between !mt-[36px]">
                <Heading tag="h2" classList="!font-bold !text-[18px]">{FindMonth(value.month())}, {value.year()}</Heading>
                <div className="space-x-[16px]">
                  <Button onClick={() => handleChangeMonth2(value, onChange)} className="!w-[40px] !p-0 hover:!border-[#735CD8] !rounded-[12px] !h-[40px]"><ArrowIcon /></Button>
                  <Button onClick={() => handleChangeMonth(value, onChange)} className="!w-[40px] !p-0 hover:!border-[#735CD8] !rounded-[12px] !h-[40px]"><ArrowIcon classList="rotate-[180deg]" /></Button>
                </div>
              </div>
              <div className="flex items-center justify-between my-[20px]">
                <Text classList="!font-semibold">Oylik jami:</Text>
                <strong className="text-[14px] font-extrabold">{FormatNumber(totalForMonth)} <span className="font-normal">so‘m</span></strong>
              </div>
            </>
          )
        }}
      />
    </div>
  );
};

export default CustomCalendar;
