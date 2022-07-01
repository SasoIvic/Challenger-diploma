import React, {useEffect, useRef, useState} from "react";
import { Doughnut } from "react-chartjs-2";
import { createUseStyles } from "react-jss";
import { green, gray, orange, red, white, darkPurple, lightPurple } from "../mixins";
import 'chartjs-plugin-piechart-outlabels';
import { useIonViewDidEnter } from "@ionic/react";

const useStyles = createUseStyles({
    CircleDate:{
        width: '50px',

        '& .centerText':{
            position: 'absolute',
            width: (size: Number) => size,
            height: (size: Number) => size,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
        }
    }
})

const CircleDate = ({greenPart, grayPart, orangePart, redPart, size, day, isLabels, hasLightBg}:any) => {
    const classes = useStyles(size);
    const [chartData, setChartData] = useState({});

    let sum = greenPart + grayPart + orangePart + redPart;

    const chart = () => {
        setChartData({
        labels: [],
        datasets: [{
            label: "",
            data: [
                (sum === 0 ? 1 : 0),
                greenPart,
                grayPart,
                orangePart,
                redPart,
            ],
            backgroundColor: [lightPurple, green, gray, orange, red],
            borderWidth: 0,
        }],
        });
    };

    const options = {
        responsive: false,
        backgroundColor: white,
        cutoutPercentage: (isLabels ? 85 : 60),
        layout: {
            padding: (isLabels ? 50 : 5)
        },
        plugins: {
            legend: false,
            outlabels: {
                text: (isLabels ? ['', greenPart ? greenPart + '€' : "", grayPart ? grayPart + '€' : "", orangePart ? orangePart + '€' : "", redPart ? redPart + '€' : ""] : ''),
                color: [darkPurple, green, gray, orange, red],
                stretch: 20,
                lineColor: hasLightBg ? white : darkPurple,
                backgroundColor: hasLightBg? white : darkPurple,
                font: {
                    resizable: true,
                    minSize: 22,
                    maxSize: 33,
                    weight: 'bold',
                }
            }
        }
    }

    useEffect(()=>{
        chart();
    }, [])



    return (
        <div className={classes.CircleDate} style={{width: size, height:size,}}>
            <div style={{width: size, height:size,}}>
                <div className={'centerText'}>
                    <p style={{color: hasLightBg ? darkPurple : white, fontSize: (isLabels ? '40px':'12px')}}>{day}</p>
                </div>
                <div style={{width: size, height:size,}}>
                    <Doughnut width={size} height={size} options={options} data={chartData}/>
                </div>
            </div>
        </div>

    );
};

export default CircleDate;