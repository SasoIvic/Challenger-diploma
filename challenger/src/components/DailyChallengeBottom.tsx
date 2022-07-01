import React, { useEffect, useState } from 'react';
import { createUseStyles } from 'react-jss';
import { white, gray, green, orange, red, darkPurple } from '../mixins';
import NotDailyChallenge from '../components/NotDailyChallenge';
import DailyChallenge from '../components/DailyChallenge';
import CircleDate from '../components/CircleDate';
import {getData, postData} from "../servis/fetch";
import useIdFromUrl from "../hooks/useIdFromUrl";
import {useIonViewDidEnter} from "@ionic/react";
import {IUsersChallengeData} from "../interfaces/UserChallengeData";
import { ModalProvider } from "react-modal-hook";
import ModalWallet from "./ModalWallet";

const getChallengeByIdUrl = "http://192.168.178.32:8000/challenge/getChallenge/";
const getUsersStatistics = "http://192.168.178.32:8000/user/getUsersStatistics";

const useStyles = createUseStyles({
    DailyChallengeBottom:{

        /* modal window */

        '& .modalWrapper':{
            position: 'fixed',
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
        },
        '& .modalBox':{
            position: 'relative',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            minHeight: '30%',
            width: '60%',
            overflowY: 'auto',
            backgroundColor: white,
            boxShadow: '0 0 10px rgba(0,0,0,0.25)',
            zIndex: '101',
            padding: '40px',
        },
        '& .modalBackDrop':{
            position: 'fixed',
            top: '0',
            bottom: '0',
            left: '0',
            right: '0',
            zIndex: '100',
            backgroundColor: 'rgba(0,0,0,0.3)',
        },

        /*-------------*/

        width: '80%',
        margin: 'auto',

        '& .Persons': {
            display: 'flex',
            justifyContent: 'space-between',
            maxWidth: '500px',
            margin: 'auto',

            '& > *':{
                display: 'flex',
                flexDirection: 'column',
                marginBottom: '20px',

                '& > *':{
                    marginTop: '0',
                    marginBottom: '0',
                    fontWeight: 'bold',
                },
            },
        },
        
        '& .Calendar':{
            width: '100%',
            margin: 'auto',
            maxWidth: '350px',

            '& > *':{
                display: 'flex',
                justifyContent: 'space-between',
            },
        },

        '& .MonthPicker':{
            color: white,
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            marginBottom: '20px',
            fontWeight: 'bold',

            '& > *':{
                marginLeft: '10px',
                marginRight: '10px',
            },
        },

        '& .WalletGraph':{
            color: white,
            display: 'grid',
            flexDirection: 'column',
            justifyContent: 'center',
            marginBottom: '20px',
            marginTop: '40px'
        },
    },
    WalletBtn: {
        border: '1px solid ' + white,
        borderRadius: '30px',
        backgroundColor: darkPurple,
        color: white,
        width: '80%',
        margin: 'auto',
        fontSize: '20px',
        padding: '10px 50px 10px',
    },

    '@media (max-width: 576px)': {
        DailyChallengeBottom:{
            marginTop: '50px'
        }
    }
});

const DailyChallengeBottom = (props: any) => {
    const classes = useStyles();

    const [users, setUsers] = useState();
    const [sumDebt, setSumDebt] = useState();
    const [challenge, setChallenge] = useState();
    const [showWalletBtn, setShowWalletBtn] = useState(false);
    const challengeId = useIdFromUrl();

    const colors = [
        green,
        red,
        orange,
        gray
    ]

    useEffect(() => {
        if(challengeId) {
            getData(getChallengeByIdUrl + challengeId).then((data: any) => { setChallenge(data.body); });
            postData(getUsersStatistics, {
                challengeId: challengeId,
            })
            .then((data: any) => {
                //console.log(data.body);
                setUsers(data.body);

                let sum = 0;
                data.body.forEach((userData : IUsersChallengeData) => {
                    sum += userData.debt;
                })
                setSumDebt(sum);
            });
        }
    }, [challengeId, props.updateData]);

    useIonViewDidEnter(() => {
        reportWindowSize();
        window.addEventListener('resize', reportWindowSize);
    })

    function reportWindowSize() {
        if (window.matchMedia('(max-width: 576px)').matches) { setShowWalletBtn(true); }
        else{ setShowWalletBtn(false); }
    }

    return (
        <div className={classes.DailyChallengeBottom}>
            <div className={'Persons'}>

                {users && users.map((user: { userId: string, name: string, performance: any }, index: number) => {

                    return <div key={user.userId} style={{color: colors[index]}} className={'Data'}>
                        <p>{user.name}</p>
                        <p>{user.performance}%</p>
                    </div>
                    }
                )}

            </div>

            {challenge && challenge.daily ? <DailyChallenge updateData={props.updateData}/> : <NotDailyChallenge updateData={props.updateData}/>}

            {users &&
            <div className={'WalletGraph'}>
                <h1>AMOUNT IN WALLET</h1>
                <CircleDate
                    greenPart={(users[0] ? users[0].debt : null)}
                    redPart={(users[1] ? users[1].debt : null)}
                    orangePart={(users[2] ? users[2].debt : null)}
                    grayPart={(users[3] ? users[3].debt : null)}
                    size={300}
                    day={sumDebt + "€"}
                    isLabels={true}
                />
                {showWalletBtn && <button key={'btnWallet'} onClick={()=>props.setOpenWallet(challengeId)} className={classes.WalletBtn}>WALLET</button>}
            </div>
            }
        </div>
    );
};

export default DailyChallengeBottom;