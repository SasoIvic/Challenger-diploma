import React, { useState } from 'react';
import { createUseStyles } from 'react-jss';
import { darkPurple, white, lightPurple } from '../mixins';
import {IonItem, IonLabel, IonSelect, IonSelectOption, IonToast, IonToggle, useIonViewDidEnter} from '@ionic/react';
import InputField from './InputField';
import {getData, postData} from "../servis/fetch";

const getAllUsersUrl = "http://192.168.178.32:8000/user/list";
const getUserUrl = "http://192.168.178.32:8000/user/";


const useStyles = createUseStyles({
    NewChallengeBottom:{
        color: darkPurple,
        width: '80%',
        maxWidth: '600px',
        margin: 'auto',

        '& > *':{
            marginBottom: '20px',
        },

        '& .numOfDaysWrapper':{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',

            '& *':{
                marginLeft: '3px',
                marginRight: '3px',
            }
        },

        '& .toggleWrapper':{
            display: 'flex',
            marginLeft: '18px', //da je poravnano z ostalimi label
            marginTop: '10px',

            '& > p':{
                color: 'black',
                lineHeight: '0',
                marginRight: '20px'
            },
        },

        '& .Days': {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: '20px',

            '& > *':{
                backgroundColor: lightPurple,
                width: '30px',
                height: '30px',
                borderRadius: '15px',
                padding: 'auto',
                lineHeight: '30px',
                color: white,
            },
        },

        '& .Duration':{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',

            '& *':{
                width: '50%',
            },
        },

        '& .AddFriends':{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'flex-end',
            width: '100%',
            justifyContent: 'space-between',
        },
        '& .AddFriends > button':{
            backgroundColor: darkPurple,
            height: '30px',
            width: '100px',
            borderRadius: '20px',
            color: white,
            marginLeft: '20px',
        },
        '& .AddFriends  .ionInputWrapper':{
            width: '100%',
        }
    },
    
    '@media (max-width: 576px)': {
        NewChallengeBottom:{
            '& > *':{
                marginBottom: '0px'
            },

            '& .numOfDaysWrapper':{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                width: '100%',

                '& *':{
                    marginLeft: '3px',
                    marginRight: '3px',
                    width: '100%',

                }
            },

            '& .Duration':{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',

                '& *':{
                    width: '100%',
                },
            },
        }
    }
})

const NewChallengeBottom = (props: any) => {
    const classes = useStyles();

    const [user, setUser] = useState();
    const [users, setUsers] = useState([]);
    const [showToast, setShowToast] = useState(false);
    const [selectVal, setSelectVal] = useState("1");


    function onToggleChange() { props.setIsChallengeDaily(!props.isChallengeDaily); }
    function frequencyChange(value: any) { props.setNumOfDays(value); setSelectVal(value); }

    useIonViewDidEnter(() => {
        getData(getUserUrl).then((data: any) => { setUser(data.body); });
        getData(getAllUsersUrl).then((data: any) => { setUsers(data.body); });
    });

    function addUsersChange(value: string) {
        value += "";
        let usersArr = value.split(',');

        if(value === "" || usersArr.length < 1 || usersArr.length > 3) {
            setShowToast(true);
            props.setIsDataOK(false);
            return;
        }
        else{
            usersArr.push(user._id)
            props.setChallengeUsers(usersArr);
            props.setIsDataOK(true);
        }

    }

    return (
        <div className={classes.NewChallengeBottom}>

            <IonToast
                isOpen={showToast}
                onDidDismiss={() => setShowToast(false)}
                message="You can add only 3 users to single challenge."
                duration={1000}
            />


            <div className={'toggleWrapper'}>
                <p>Daily challenge</p>
                <IonToggle mode={'ios'} value="daily" onClick={onToggleChange} />
            </div>

            <div className={'numOfDaysWrapper'}>
            <div>
                <IonItem>
                    <IonLabel position="floating">Frequency</IonLabel>
                    <IonSelect onIonChange={e => frequencyChange(e.detail.value) } value={(props.isChallengeDaily ? "7" : selectVal)} disabled={props.isChallengeDaily ? true : false}>
                        <IonSelectOption value="1">Once per week</IonSelectOption>
                        <IonSelectOption value="2">Twice per week</IonSelectOption>
                        <IonSelectOption value="3">Three times per week</IonSelectOption>
                        <IonSelectOption value="4">Four times per week</IonSelectOption>
                        <IonSelectOption value="5">Five times per week</IonSelectOption>
                        <IonSelectOption value="6">Six times per week</IonSelectOption>
                        {props.isChallengeDaily === true && <IonSelectOption value="7">Every day</IonSelectOption>}
                    </IonSelect>
                </IonItem>
            </div>
            <InputField
                labelText={' Bet amount'} 
                type={'text'} 
                value={props.challengeBet}
                setValue={props.setChallengeBet}>
            </InputField>
            </div>

            <div className={'Duration'}>
                <InputField
                    labelText={' Start date'}
                    type={'date'}
                    value={props.challengeStart}
                    setValue={(e: React.SetStateAction<Date>) => {props.setChallengeStart(e); /*console.log(e)*/}}>
                </InputField>
                <InputField
                    labelText={' End date'} 
                    type={'date'} 
                    value={props.challengeEnd}
                    setValue={props.setChallengeEnd}>
                </InputField>
            </div>

            <div className={'AddFriends'}>
                <IonItem style={{width: '300px'}}>
                    <IonLabel position="floating">Add friends</IonLabel>
                    <IonSelect multiple onIonChange={e => addUsersChange(e.detail.value) }>
                        {users && user && users.map((u: { _id: string, email: string }, index: number) => {
                                if(user._id !== u._id) {
                                    return <IonSelectOption value={u._id}>{u.email}</IonSelectOption>
                                }
                            }
                        )}
                    </IonSelect>
                </IonItem>

                <button onClick={()=>{props.setIsCreated(!props.isCreated)}}>CREATE</button>
            </div>
        </div>
    );
};

export default NewChallengeBottom;