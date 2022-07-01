import React, { useState } from 'react';
import { createUseStyles } from 'react-jss';
import InputField from './InputField';
import { IonItem, IonLabel, IonTextarea, IonIcon } from '@ionic/react';
import { arrowBackOutline } from 'ionicons/icons';
import { white } from "../mixins";

const useStyles = createUseStyles({
    NewChallengeTop:{
        height: '100%',

        '@media screen and (min-width: 576px)': {
            '& .Container':{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100%',
            },

            '& .Edit': {
                position: 'absolute',
                left: '20px',
                top: '30px',
                border: '1px solid white',
                padding: '5px',
                borderRadius: '20px'
            },
        },

        '& h1': {
            textAlign: 'left',
            fontWeight: 'bold',
            fontSize: '32px',
        },
        '& .textarea':{
            borderRadius: '10px',

        },
        '& .label':{
            border: 'none'
        },
        '& .textareaWrapper':{
            marginTop: '30px',
            marginBottom: '20px',
            width: '40vw',
            textAlign: 'left',

            "& ion-label":{
                marginLeft: '16px',
            },
            "& ion-item":{
                marginTop: '19px',
                border: '1px solid ' + white,
                color: white,
            }
        }
    },

    '@media (max-width: 576px)': {
        NewChallengeTop:{
            height: '100%',
            width: '100%',

            '& .Container': {
                height: '100%',
                width: '100%',
            },
            '& .Row':{
                height: '100%',
                padding: '30px',
            },

            '& .Edit': {
                position: 'absolute',
                right: '20px',
                top: '30px',
                border: '1px solid white',
                padding: '5px',
                borderRadius: '20px'
            },

            marginTop: '0',

            '& h1': {
                fontSize: '50px',
                fontWeight: 'bold',
                textAlign: 'left',
                marginTop: '0px',
            },
            '& .topInputs':{
                width: '80%'
            },
            '& .textareaWrapper':{
                width: '100%'
            }
        },
        
    }
})

const NewChallengeTop = (props: any) => {
    const classes = useStyles();

    return (
        <div className={classes.NewChallengeTop}>

            <IonIcon className={'Edit'} icon={arrowBackOutline} />

            <div className={'Container'}>
                <div className={'Row'}>
                    <h1>New Challenge</h1>
                    <div className={'topInputs'}>
                        <InputField
                            color={'primary'}
                            labelText={' Name'}
                            type={'text'}
                            value={props.challengeName}
                            setValue={props.setChallengeName}>
                        </InputField>

                        <div className={'textareaWrapper'}>
                            <IonLabel position="fixed">
                                Description
                            </IonLabel>
                        <IonItem color={'none'} className={'textarea'}>
                            <IonTextarea
                                value={props.challengeDescription}
                                onIonChange={e => props.setChallengeDescription(e.detail.value!)}>
                            </IonTextarea>
                        </IonItem>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NewChallengeTop;