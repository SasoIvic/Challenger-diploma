import React, { useEffect, useState } from 'react';
import { createUseStyles } from 'react-jss';
import {darkPurple, white, red, green, lightRed, lightGreen} from '../mixins';
import {IonIcon, useIonViewDidEnter} from '@ionic/react';
import { buildOutline, checkmarkOutline, closeOutline } from 'ionicons/icons';
import {getData, postData} from "../servis/fetch";
import useIdFromUrl from "../hooks/useIdFromUrl";

const getChallengeByIdUrl = "http://192.168.178.32:8000/challenge/getChallenge/";
const postChallengePerformanceByIdUrl = "http://192.168.178.32:8000/user/getUserPreformance/";
const postChallengeCompleteUrl = "http://192.168.178.32:8000/challenge/complete/";

const useStyles = createUseStyles({
    DailyChallengeTop:{
        '@media screen and (min-width: 576px)': {
            height: '100%',

            '& .Container': {
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
            },
            '& .Row':{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
            },
            '& .Edit': {
                position: 'absolute',
                left: '20px',
                top: '30px',
                border: '1px solid ' + darkPurple,
                padding: '5px',
                borderRadius: '20px'
            },
            '& h1': {
                width: '30vw !important',
                maxWidth: '500px',
            },
            '& .CheckComplete':{
                width: '50%',
                display: 'flex',
                justifyContent: 'space-around',
                margin: 'auto',
            },
        },

        '& h1': {
            fontSize: '32px',
            fontWeight: 'bold',
            width: '80%',
            marginBottom: '5px',
        },
        '& small': {
            marginBottom: '30px',
        },

        '& .ChallengePerformance': {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',

            '& > *':{
                display: 'flex',

                '& > *':{
                    margin: '0px 10px 30px',
                    fontWeight: 'bold',
                },
            },
            marginBottom: '20px',
        },
    },
    Check:{
        width: '50px',
        height: '50px',
        borderRadius: '25px',
        backgroundColor: (performance: any) => performance && performance.isTodayCompleted ? lightGreen : green,
        pointerEvents: (performance: any) => performance && performance.isTodayCompleted ? 'none' : 'unset',
        color: white,
        fontSize: '30px',
        fontWeight: 'bold',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    Uncheck:{
        width: '50px',
        height: '50px',
        borderRadius: '25px',
        backgroundColor: (performance: any) => performance && performance.isTodayCompleted ? red : lightRed,
        pointerEvents: (performance: any) => performance && performance.isTodayCompleted ? 'unset' : 'none',
        color: white,
        fontSize: '30px',
        fontWeight: 'bold',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    WalletBtn:{
        border: '1px solid ' + darkPurple,
        padding: '10px 50px 10px',
        borderRadius: '30px',
        backgroundColor: white,
        color: darkPurple,
        fontSize: '20px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '50px',
    },

    '@media (max-width: 576px)': {
        DailyChallengeTop:{
            height: '100%',
            width: '100%',

            '& .Container': {
                height: '100%',
                width: '100%',
            },
            '& .Row':{
                height: '100%',
                padding: '30px',
                alignItems: 'left',
            },

            '& .Edit': {
                position: 'absolute',
                right: '20px',
                top: '30px',
                border: '1px solid ' + darkPurple,
                padding: '5px',
                borderRadius: '20px',
            },

            '& h1': {
                fontSize: '50px',
                fontWeight: 'bold',
                textAlign: 'left',
                marginTop: '0px',
            },

            '& .ChallengePerformance': {
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: '20px',
                marginBottom: '-50px',
                fontSize: '13px',

                '& > *':{
                    display: 'flex',
                    flexDirection: 'column',

                    '& > *':{
                        margin: '0',
                        fontWeight: 'bold',
                    },
                },
            },

            '& .CheckComplete':{
                display: 'flex',
                justifyContent: 'flex-end',
                marginRight: '20px',
            },
        },
        Check:{
            position: 'relative',
            bottom: '-75px',
        },

        Uncheck:{
            position: 'relative',
            bottom: '-75px', 
            marginLeft: '20px',   
        },
        WalletBtn:{
            border: '1px solid ' + darkPurple,
            padding: '10px 50px 10px',
            borderRadius: '30px',
            backgroundColor: white,
            color: darkPurple,
            fontSize: '20px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
        },
    }
})

const DailyChallengeTop = (props: any) => {

    const [challenge, setChallenge] = useState();
    const [performance, setPerformance] = useState();
    const [showWalletBtn, setShowWalletBtn] = useState(false);
    const challengeId = useIdFromUrl();

    const classes = useStyles(performance);

    useIonViewDidEnter(() => {
       reportWindowSize();
       window.addEventListener('resize', reportWindowSize);
    });

   useEffect(() => {
       if(challengeId) {
           getData(getChallengeByIdUrl + challengeId).then((data: any) => { setChallenge(data.body); });
           postChallengePerformance()
       }
   }, [challengeId]);


    function reportWindowSize() {
        if (window.matchMedia('(min-width: 576px)').matches){ setShowWalletBtn(true); }
        else{ setShowWalletBtn(false); }
    }

    function CompleteChallenge(isComplete: boolean){
        postData(postChallengeCompleteUrl + challengeId, {complete: isComplete}).then((data: any) => {
            if(data.status === 0){ postChallengePerformance() }
        });
    }

    function postChallengePerformance() {
        postData(postChallengePerformanceByIdUrl, {challenge: challengeId})
        .then((data: any) => {
            setPerformance(data.body);
            props.setUpdateData(!props.updateData);
        });
    }

    return (
        <div className={classes.DailyChallengeTop}>

            <IonIcon className={'Edit'} icon={buildOutline} />

            <div className={'Container'}>
                <div className={'Row'}>
                    <h1>{challenge && challenge.name}</h1>
                    <small>{challenge && challenge.description}</small>

                    <div className={'ChallengePerformance'}>
                        <div>
                            <p>PERFORMANCE:</p>
                            <p>{performance && performance.preformance}%</p>
                        </div>
                        <div>
                            <p>DEBT:</p>
                            <p>{performance && performance.debt}€</p>
                        </div>
                        <div>
                            <p>STRIKE:</p>
                            <p>{performance && performance.strike}</p>
                        </div>
                    </div>

                    <div className={'CheckComplete'}>
                        <button className={classes.Check} onClick={()=>CompleteChallenge(true)}><IonIcon icon={checkmarkOutline} /></button>
                        <button className={classes.Uncheck} onClick={()=>CompleteChallenge(false)}><IonIcon icon={closeOutline} /></button>
                    </div>

                    <div className={'WalletButtonWrapper'}>
                        {showWalletBtn && <button key={'btnWallet'} onClick={()=>props.setOpenWallet(challengeId)} className={classes.WalletBtn}>WALLET</button>}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DailyChallengeTop;