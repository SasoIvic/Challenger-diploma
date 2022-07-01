import React, {useEffect, useState} from 'react';
import MonthPicker from './MonthPicker';
import useIdFromUrl from "../hooks/useIdFromUrl";
import CircleDate from "./CircleDate";
import {postData} from "../servis/fetch";
import {ICalendarData} from "../interfaces/CalendarData";
import {ICalendarValues} from "../interfaces/NotDailyCalendarValues";

const getCompletedDatesForCertainMonthForAllUsers = "http://192.168.178.32:8000/user/getCalendar/";

const NotDailyChallenge = (props: any) => {

    const challengeId = useIdFromUrl();

    const [calendarData, setCalendarData] = useState();
    const [month, setMonth] = useState(new Date().getMonth());
    const [year, setYear] = useState(new Date().getFullYear());
    const [numOfWeeks, setNumOfWeeks] = useState();
    const [calenderElements, setCalenderElements] = useState();
    const [calenderOffset, setCalenderOffset] = useState();

    const [finalValues, setFinalValues] = useState();


    useEffect(() => {
        weekCount(year, month);

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

    useEffect(()=>{
        //go trough every week and se if 2 times completed
        if(calenderOffset) {
            //console.log(calenderElements);

            var arr = new Array<ICalendarValues>();

            var counter = calenderOffset.length;

            var red = 0;
            var green = 0;
            var gray = 0;
            var orange = 0;

            if (calenderElements && calenderElements.length > 0) {
                calenderElements.forEach((el: any, index: number) => {
                    //console.log(calenderElements[index].chartData);

                    if(calenderElements[index].chartData.redPart === 1){
                        red++;
                    }
                    if(calenderElements[index].chartData.greenPart === 1){
                        green++;
                    }
                    if(calenderElements[index].chartData.grayPart === 1){
                        gray++;
                    }
                    if(calenderElements[index].chartData.orangePart === 1){
                        orange++;
                    }

                    counter++;
                    if(counter === 7){
                        //shrani rezultat
                        var calVal: ICalendarValues = {red: [], green: [], gray: [], orange: []};

                        if(red >= 2){
                            calVal.red.push(true);
                        }
                        else{
                            calVal.red.push(false);
                        }
                        if(red >= 1){
                            calVal.red.push(true);
                        }
                        else{
                            calVal.red.push(false);
                        }


                        if(green >= 2){
                            calVal.green.push(true);
                        }
                        else{
                            calVal.green.push(false);
                        }
                        if(green >= 1){
                            calVal.green.push(true);
                        }
                        else{
                            calVal.green.push(false);
                        }


                        if(gray >= 2){
                            calVal.gray.push(true);
                        }
                        else{
                            calVal.gray.push(false);
                        }
                        if(gray >= 1){
                            calVal.gray.push(true);
                        }
                        else{
                            calVal.gray.push(false);
                        }


                        if(orange >= 2){
                            calVal.orange.push(true);
                        }
                        else{
                            calVal.orange.push(false);
                        }
                        if(orange >= 1){
                            calVal.orange.push(true);
                        }
                        else{
                            calVal.orange.push(false);
                        }

                        arr.push(calVal);

                        red = 0;
                        green = 0;
                        gray = 0;
                        orange = 0;

                        counter = 0;
                    }
                })
            }

            //shrani zadnji rezultat
            var calVal: ICalendarValues = {red: [], green: [], gray: [], orange: []};


            if(red >= 2){
                calVal.red.push(true);
            }
            else{
                calVal.red.push(false);
            }
            if(red >= 1){
                calVal.red.push(true);
            }
            else{
                calVal.red.push(false);
            }


            if(green >= 2){
                calVal.green.push(true);
            }
            else{
                calVal.green.push(false);
            }
            if(green >= 1){
                calVal.green.push(true);
            }
            else{
                calVal.green.push(false);
            }


            if(gray >= 2){
                calVal.gray.push(true);
            }
            else{
                calVal.gray.push(false);
            }
            if(gray >= 1){
                calVal.gray.push(true);
            }
            else{
                calVal.gray.push(false);
            }


            if(orange >= 2){
                calVal.orange.push(true);
            }
            else{
                calVal.orange.push(false);
            }
            if(orange >= 1){
                calVal.orange.push(true);
            }
            else{
                calVal.orange.push(false);
            }

            arr.push(calVal);
            setFinalValues(arr);
            console.log(arr);
        }

    }, [calenderOffset])


    function weekCount(year: number, month_number: number) {

        var firstOfMonth = new Date(year, month_number-1, 1);
        var lastOfMonth = new Date(year, month_number, 0);
        var used = firstOfMonth.getDay() + lastOfMonth.getDate();

        setNumOfWeeks(Math.ceil( used / 7));
    }

    return (
        <div className={"DailyChallenge"}>

            <MonthPicker
                month={month}
                setMonth={setMonth}
                year={year}
                setYear={setYear}
            />


            <div className={'Calendar'} style={{width: "70%"}}>
                {finalValues && finalValues.map((a:{red: any[], green: any[], gray: any[], orange: any[]}, index: number) => {
                    return <div key={index}>
                        <p style={{color: "white", fontWeight: "bold"}}>Week {index +1}</p>

                        <CircleDate key={index}
                            greenPart={a.green[1]}
                            grayPart={a.gray[1]}
                            orangePart={a.orange[1]}
                            redPart={a.red[1]}
                            size={40}
                            day={1}
                            isLabels={false}
                        />

                        <CircleDate key={index}
                                    greenPart={a.green[0]}
                                    grayPart={a.gray[0]}
                                    orangePart={a.orange[0]}
                                    redPart={a.red[0]}
                                    size={40}
                                    day={2}
                                    isLabels={false}
                        />

                    </div> }
                )}
            </div>

        </div>
    );
};

export default NotDailyChallenge;