import React, {useEffect, useState} from 'react';
import DefaultPage from '../pages/DefaultPage';
import ProfileTop from '../components/ProfileTop';
import ProfileBottom from '../components/ProfileBottom';
import {RouteComponentProps} from "react-router";
import {IonContent, IonPage, useIonViewDidEnter} from "@ionic/react";

const Profile: React.FC<RouteComponentProps> = ({ history }) => {

    const [openChallenge, setOpenChallenge] = useState("");
    const [newChallenge, setNewChallenge] = useState("");


    useEffect(() => { //successfully login
        if(openChallenge !== ""){ history.push(openChallenge); }
    }, [openChallenge]);

    useEffect(() => { //successfully login
        if(newChallenge !== ""){ history.push("/newChallenge"); }
    }, [newChallenge]);

    useIonViewDidEnter(() => {
        setOpenChallenge("");
    })

    return (
        <IonPage>
            <IonContent>
                <DefaultPage
                  TopDark={true}
                  Top={<ProfileTop setNewChallenge={setNewChallenge}/>}
                  Bottom={<ProfileBottom setOpenChallenge={setOpenChallenge} />}>
                </DefaultPage>
            </IonContent>
        </IonPage>
    );
  };

export default Profile;