import React, { useState } from 'react';
import { createUseStyles } from 'react-jss';
import {green, lightGreen, orange, red, white} from '../mixins';
import { IonIcon, useIonViewDidEnter } from '@ionic/react';
import {addOutline, buildOutline, checkmarkOutline, closeOutline} from 'ionicons/icons';
import { getData } from '../servis/fetch';

const getUserDataUrl = 'http://192.168.178.32:8000/user/';
const getUserGeneralPerformanceUrl = 'http://192.168.178.32:8000/user/getUserGeneralPreformance';

const useStyles = createUseStyles({
    ProfileTop:{
        '@media screen and (min-width: 576px)': {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%',

            '& .Edit': {
                position: 'absolute',
                left: '20px',
                top: '30px',
                border: '1px solid white',
                padding: '5px',
                borderRadius: '20px'
            },
            '& .Username': {
                marginLeft: 'auto',
                marginRight: 'auto',
            },
        },
        '& .ProfileImage': {
            //backgroundColor: white,
            backgroundImage: 'url(https://png.pngitem.com/pimgs/s/78-786293_1240-x-1240-0-avatar-profile-icon-png.png)',
            backgroundPosition: 'center',
            backgroundSize: '170px 170px',
            height: '150px',
            width: '150px',
            margin: 'auto',
            marginBottom: '30px',
            borderRadius: '75px'
        },
        '& .CheckComplete':{
            width: '50%',
            display: 'flex',
            justifyContent: 'space-around',
            margin: 'auto',
        },
        '& .Username': {
            fontSize: '32px',
            fontWeight: 'bold',
            marginBottom: '80px',
            width: '25vw',
            maxWidth: '400px',
        },
        '& .Add':{
            width: '50px',
            height: '50px',
            borderRadius: '25px',
            color: white,
            backgroundColor: red,
            zIndex: 1,
            fontSize: '30px',
            fontWeight: 'bold',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
        },
        '& .GeneralPerformance': {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',

            '& > *':{
                display: 'flex',
                flexDirection: 'row',
                marginBottom: '30px',
                justifyContent: 'center',

                '& > *':{
                    margin: '0 20px',
                    fontWeight: 'bold',
                },
            },
        },
    },

    '@media (max-width: 576px)': {
        ProfileTop:{
            display: 'block',
            height: '100%',
            width: '100%',

            '& .Container': {
                height: '100%',
                width: '100%',
            },
            '& .Row':{
                height: '100%',
                padding: '15px',
            },
    
            '& .Edit': {
                position: 'absolute',
                right: '20px',
                top: '30px',
                border: '1px solid white',
                padding: '5px',
                borderRadius: '20px'
            },
            '& .UserData': {
                marginTop: '0',
                display: 'flex',
                flexDirection: 'row',
            },
            '& .ProfileImage': {
                backgroundColor: white,
                backgroundSize: '90px 90px',
                height: '80px',
                width: '80px',
                marginRight: '30px',
                margin: '10px',
                marginBottom: '30px',
                borderRadius: '40px'
            },
            '& .Username': {
                marginTop: '25px',
                fontSize: '35px',
                fontWeight: 'bold',
                marginBottom: '10%',
            },
            '& .Add':{
                position: 'relative',
                bottom: '-60px',
                right: '-150px'
            },
            '& .GeneralPerformance': {
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginBottom: '20px',
                fontSize: '13px',
            },
            '& .PerformanceData': {
                display: 'flex',
                flexDirection: 'column',
                marginBottom: '20px'
            },
            '& .PerformanceData > *': {
                margin: '0 20px',
                fontWeight: 'bold',
            },
        },
    },
})

const ProfileTop = (props: any) => {
    const classes = useStyles();

    const [userData, setUserData] = useState();
    const [generalPerformance, setGeneralPerformance] = useState();

    useIonViewDidEnter(() => {
        getData(getUserDataUrl).then((data: any) => { setUserData(data); });
        getData(getUserGeneralPerformanceUrl).then((data: any) => { setGeneralPerformance(data); });
    })

    return (
        <div className={classes.ProfileTop}>

            <IonIcon className={'Edit'} icon={buildOutline} />

            <div className={'Container'}>
                <div className={'Row'}>
                    <div className={'UserData'}>
                        <div className={'ProfileImage'}>
                    </div>
                        <div className={'Username'}>
                            {userData && userData.body.username}
                        </div>
                    </div>
                    <div className={'GeneralPerformance'}>
                        <div className={'PerformanceData'}>
                            <p>PERFORMANCE:</p>
                            <p>{generalPerformance && generalPerformance.preformance}%</p>
                        </div>
                        <div className={'PerformanceData'}>
                            <p>DEBT:</p>
                            <p>{generalPerformance && generalPerformance.debt}€</p>
                        </div>
                        <div className={'PerformanceData'}>
                            <p>STRIKE:</p>
                            <p>{generalPerformance && generalPerformance.strike}</p>
                        </div>
                    </div>

                    <div className={'CheckComplete'}>
                        <button className={'Add'} onClick={()=>props.setNewChallenge("newChallenge")}><IonIcon icon={addOutline} /></button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfileTop;