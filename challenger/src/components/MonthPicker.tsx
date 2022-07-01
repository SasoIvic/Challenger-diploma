import React, { useState } from 'react';
import {IonIcon, useIonViewDidEnter} from '@ionic/react';
import {caretBackOutline, caretForwardOutline } from 'ionicons/icons';

interface IMonthPicker {
    month: number,
    setMonth: (m: number)=>void,
    year: number,
    setYear: (y: number)=>void,
}

const NotDailyChallenge = ({month, setMonth, year, setYear}: IMonthPicker) => {

    let monthText: string[];
    monthText = [];
    monthText[0] = "January";
    monthText[1] = "February";
    monthText[2] = "March";
    monthText[3] = "April";
    monthText[4] = "May";
    monthText[5] = "June";
    monthText[6] = "July";
    monthText[7] = "August";
    monthText[8] = "September";
    monthText[9] = "October";
    monthText[10] = "November";
    monthText[11] = "December";

    const [displayDate, setDisplayDate] = useState(monthText[new Date().getMonth()] + " " + new Date().getFullYear());
    const [currentDate, setCurrentDate] = useState(new Date());

    useIonViewDidEnter(() => {
        let date = new Date();
        let month = monthText[date.getMonth()];
        let year = date.getFullYear();

        setDisplayDate(month + " " + year);
        setCurrentDate(date);
    });

    function changeMonth(change: number){
        let date = currentDate;
        date.setMonth(date.getMonth() + change);

        let month = monthText[date.getMonth()];
        let year = date.getFullYear();

        setMonth(date.getMonth());
        setYear(year);

        setDisplayDate(month + " " + year);
        setCurrentDate(date);
    }

    return (
        <div className={'MonthPicker'}>
            <IonIcon onClick={()=>changeMonth(-1)} icon={caretBackOutline} />
            {displayDate && displayDate}
            <IonIcon onClick={()=>changeMonth(1)} icon={caretForwardOutline} />
        </div>
    );
};

export default NotDailyChallenge;