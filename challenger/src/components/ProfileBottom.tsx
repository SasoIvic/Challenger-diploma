import React, { useState} from 'react';
import { createUseStyles } from 'react-jss';
import {getData} from '../servis/fetch';
import {UsersChallenges} from '../interfaces/UsersChallenges'
import {gray, green, red} from '../mixins';
import { IonList, IonItem, IonLabel, IonIcon, useIonViewDidEnter } from '@ionic/react';
import { checkmark, closeOutline, ellipseOutline } from 'ionicons/icons';
import {SERVER_URL} from "../config";

const getChallengeUserUrl = "http://192.168.178.32:8000/challengeUser/";

const useStyles = createUseStyles({
    ProfileBottom:{
        width: '80%',
        margin: 'auto',
        zIndex: 0,


        '& .Days': {
            marginLeft: '30%',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
        },
        '& .Days > *': {
            fontWeight: 'bold',
            color: gray
        },
        '& .Completed': {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
        },
        '& .ChallengeName':{
            maxWidth: '30%',
            fontWeight: 'bold',
        },

        '& .closeOutline': {
            color: red,
            fontWeight: 'bold',
            fontSize: '22px'
        },
        '& .checkmark': {
            color: green,
            fontWeight: 'bold',
            fontSize: '22px'
        },
        '& .ellipseOutline': {
            color: gray,

        },
    },
    
    '@media (max-width: 576px)': {
        ProfileBottom:{
            width: '100%',
        },
    }
})

const ProfileBottom = (props: any) => {
    const classes = useStyles();

    const [challenges, setChallenges] = useState();

    useIonViewDidEnter(() => {
        getData(getChallengeUserUrl).then((data: any) => { setChallenges(data.body); });
    })

    return (
        <IonList className={classes.ProfileBottom}>
            <IonItem>
                <IonLabel className={'Days'}>
                <p>M</p><p>T</p><p>W</p><p>T</p><p>F</p><p>S</p><p>S</p>
                </IonLabel>
            </IonItem>

            {challenges && challenges.map((challenge: UsersChallenges) =>
                <IonItem key={challenge.mychallenge._id} button onClick={() => {
                    props.setOpenChallenge("/dailyChallenge/" + challenge.mychallenge._id);
                }}>
                    <IonLabel className={'ChallengeName'}>{challenge.mychallenge.name}</IonLabel>
                    <IonLabel className={'Completed'}>
                    {challenge && challenge.arrayOfDates.map((isCompleted, index) =>
                        <IonIcon key={index} className={isCompleted === null ? 'ellipseOutline' : isCompleted === true ? 'checkmark' : 'closeOutline'}  icon={isCompleted === null ? ellipseOutline : isCompleted === true ? checkmark : closeOutline} />
                    )}
                    </IonLabel>
                </IonItem>
            )}
        </IonList>
    );
};

export default ProfileBottom;