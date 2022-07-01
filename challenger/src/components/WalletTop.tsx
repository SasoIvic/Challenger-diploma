import React, {useEffect, useState} from "react";
import { createUseStyles } from "react-jss";
import InputField from "../components/InputField";
import {getData, postData} from '../servis/fetch';
import CircleDate from "./CircleDate";
import {IUsersChallengeData} from "../interfaces/UserChallengeData";
import useIdFromUrl from "../hooks/useIdFromUrl";

const getUsersStatistics = "http://192.168.178.32:8000/user/getUsersStatistics";
const getChallengeByIdUrl = "http://192.168.178.32:8000/challenge/getChallenge/";

const useStyles = createUseStyles({
    Container: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        minWidth: '35%',

        '& .WalletGraph':{
            height: '100%',
            display: 'contents',
        },

        '& h1': {
            textAlign: 'left',
            fontWeight: 'bold',
            fontSize: '32px',
        },
    },

    "@media (max-width: 576px)": {

    },
});

const WalletTop = (props: any) => {
    const classes = useStyles();

    const [users, setUsers] = useState();
    const [sumDebt, setSumDebt] = useState();
    const [challenge, setChallenge] = useState();

    const challengeId = useIdFromUrl();

    useEffect(() => {
        if(challengeId) {
            getData(getChallengeByIdUrl + challengeId).then((data: any) => { setChallenge(data.body); });
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
    }, [challengeId, props.confirmPaymentServer]);


    return (
        <div className={classes.Container}>
            {users &&
            <div className={'WalletGraph'}>
                <h1>Wallet</h1>
                <h1> {challenge && challenge.name}</h1>
                <CircleDate
                    greenPart={(users[0] ? users[0].debt : null)}
                    redPart={(users[1] ? users[1].debt : null)}
                    orangePart={(users[2] ? users[2].debt : null)}
                    grayPart={(users[3] ? users[3].debt : null)}
                    size={300}
                    day={sumDebt + "€"}
                    isLabels={true}
                    hasLightBg={true}
                />
            </div>
            }
        </div>
    );
};
export default WalletTop;
