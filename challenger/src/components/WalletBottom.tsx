import React, {useEffect, useState} from "react";
import { createUseStyles } from "react-jss";
import {darkPurple, gray, green, orange, red, white} from "../mixins";
import {getData, postData} from "../servis/fetch";
import {IUsersChallengeData} from "../interfaces/UserChallengeData";
import useIdFromUrl from "../hooks/useIdFromUrl";
import InputField from "./InputField";
import { IonToast } from '@ionic/react';


const getUsersStatistics = "http://192.168.178.32:8000/user/getUsersStatistics";
const payUrl = "http://192.168.178.32:8000/challengeUser/savePayment";


const useStyles = createUseStyles({
    Container: {
        color: white,
        width: '100%',

        '& .sc-ion-input-md-h': {
            "--padding-top": '35px',
            "--padding-start": '10px',
            "--padding-bottom": '0px',
        },
        '& .formWrapper':{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: '30px',
        },
        '& .form':{
            display: 'flex',
            flexDirection: 'row',
        },
        '& ion-item':{
            width: '70px',
            marginLeft: '20px',
            marginRight: '10px',
            top: '-25px',

        },
        '& .ConfirmBtn': {
            border: '1px solid ' + white,
            borderRadius: '30px',
            backgroundColor: darkPurple,
            color: white,
            width: '60%',
            margin: 'auto',
            fontSize: '20px',
            padding: '10px 50px 10px',
            maxWidth: '200px'
        }
    },

    "@media (max-width: 576px)": {

    },
});

const WalletBottom = (props: any) => {
    const classes = useStyles();

    const paymentsTemplate = [
        { id: "", value: "" },
        { id: "", value: "" },
        { id: "", value: "" },
        { id: "", value: "" },
    ]

    const [users, setUsers] = useState();
    const challengeId = useIdFromUrl();
    const [sumDebt, setSumDebt] = useState();
    const [showToast, setShowToast] = useState(false);

    const [paymentsArr, setPaymentsArr] = useState(paymentsTemplate);

    useEffect(() => {
        console.log(paymentsArr);
    }, [paymentsArr])

    useEffect(() => {
        if(challengeId) {
            postData(getUsersStatistics, {
                challengeId: challengeId,
            })
                .then((data: any) => {
                    setUsers(data.body);

                    let sum = 0;
                    data.body.forEach((userData : IUsersChallengeData) => {
                        sum += userData.debt;
                    })
                    setSumDebt(sum);
                });
        }
    }, [challengeId, props.updateData, props.confirmPaymentServer]);

    const colors = [
        green,
        red,
        orange,
        gray
    ];

    function handleChangeValue(value: string, index: number, userId: string){
        const copy = [...paymentsArr];
        copy[index].value = value;
        copy[index].id = userId;

        setPaymentsArr(copy);
    }

    function confirmPayment() {
        paymentsArr.forEach(payment => {
            if(payment.value !== "" && payment.value !== null) {
                postData(payUrl, {
                    user: payment.id,
                    challenge: challengeId,
                    paidDebt: payment.value,
                })
                    .then((data: any) => {
                        if (data.status === 0) {
                            props.setConfirmPaymentServer(!props.confirmPaymentServer);
                            setShowToast(true)
                        }
                    });
            }
        })

        setPaymentsArr(paymentsTemplate);
    }

    return (
        <div className={classes.Container}>

            <IonToast
                isOpen={showToast}
                onDidDismiss={() => setShowToast(false)}
                message="Payment successful."
                duration={1000}
            />

            <h3 style={{marginBottom: '20px', fontWeight: 'bold'}}>PAID AMOUNT</h3>

            <div className={'formWrapper'}>
            {users && users.map((user: { userId: string, name: string, performance: any, debt: number }, index: number) => {

                    return <div key={user.userId} style={{color: colors[index]}} className={"form"}>
                        <p><b>{user.name}</b></p>
                        <InputField
                            color={"primary"}
                            labelText={""}
                            icon={""}
                            type={"number"}
                            value={paymentsArr[index].value}
                            setValue={(value: any)=>handleChangeValue(value, index, user.userId)}
                        />
                        <p style={{color: white}}> / {user.debt} €</p>
                    </div>
                }
            )}
            </div>

            <button onClick={confirmPayment} className={"ConfirmBtn"}>CONFIRM</button>

        </div>
    );
};
export default WalletBottom;
