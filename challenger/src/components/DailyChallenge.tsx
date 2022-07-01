import React, {useEffect, useState} from 'react';
import CircleDate from '../components/CircleDate';
import MonthPicker from './MonthPicker';
import {useIonViewDidEnter} from "@ionic/react";
import {postData} from "../servis/fetch";
import useIdFromUrl from "../hooks/useIdFromUrl";
import {ICalendarData} from "../interfaces/CalendarData";

const getCompletedDatesForCertainMonthForAllUsers = "http://192.168.178.32:8000/user/getCalendar/";

const DailyChallenge = (props: any) => {

    const challengeId = useIdFromUrl();

    const [calendarData, setCalendarData] = useState();
    const [month, setMonth] = useState(new Date().getMonth());
    const [year, setYear] = useState(new Date().getFullYear());
    const [rows, setRows] = useState();
    const [calenderElements, setCalenderElements] = useState();
    const [calenderOffset, setCalenderOffset] = useState();

    useEffect(() => {
        if(challengeId) {
            setCalenderElements([]);
            postData(getCompletedDatesForCertainMonthForAllUsers, {
                challengeId: challengeId,
                month: month + 1,
                year: year
            })
            .then((data: any) => {

                setCalendarData(data.body as ICalendarData[]);
            });
        }
    }, [challengeId, month, year, props.updateData]);

    const getCalenderOffset = () => {
        const calenderDate = new Date(year, month);
        return calenderDate.getDay() === 0 ? 6 : calenderDate.getDay() - 1;
    }

    useEffect(() => {
        if(!calendarData || calendarData.length === 0){
            setCalenderElements([]);
        }
        else {
            setCalenderElements(calendarData[0].arrDates.map((dayData:boolean, index:number)=>{
                return {
                    dayData: {
                        index:index + 1,
                    },
                    chartData: {
                        greenPart: (calendarData.length > 0 && calendarData[0].arrDates[index] ? 1 : 0),
                        redPart: (calendarData.length > 1 && calendarData[1].arrDates[index] ? 1 : 0),
                        orangePart: (calendarData.length > 2 && calendarData[2].arrDates[index] ? 1 : 0),
                        grayPart: (calendarData.length > 3 && calendarData[3].arrDates[index] ? 1 : 0)
                    },
                };
            }))
        }
        setCalenderOffset(Array(getCalenderOffset()).fill(0));
    }, [calendarData])


    return (
        <div className={"DailyChallenge"}>

            <MonthPicker
                month={month}
                setMonth={setMonth}
                year={year}
                setYear={setYear}
            />

            <div className={'Calendar'}>
                <div style={{display: "grid", gridTemplateColumns: "repeat(7, 1fr)", minHeight: '200px'}}>
                    {calenderOffset && calenderOffset.map((data: any, index: number) => <div key={index}/>)}
                    {calenderElements && calenderElements.map((dayElement: { dayData: any, chartData: any }) => {
                        return <CircleDate key={dayElement.dayData.index}
                            greenPart={dayElement.chartData.greenPart}
                            grayPart={dayElement.chartData.grayPart}
                            orangePart={dayElement.chartData.orangePart}
                            redPart={dayElement.chartData.redPart}
                            size={40}
                            day={dayElement.dayData.index}
                            isLabels={false}
                        /> }
                    )}
                </div>


            </div>

        </div>
    );
};

export default DailyChallenge;