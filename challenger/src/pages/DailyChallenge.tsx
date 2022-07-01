import React, {useEffect, useState} from 'react';
import DefaultPage from '../pages/DefaultPage';
import DailyChallengeTop from '../components/DailyChallengeTop';
import DailyChallengeBottom from '../components/DailyChallengeBottom';
import {RouteComponentProps} from "react-router";
import {IonContent, IonPage} from "@ionic/react";

const DailyChallenge: React.FC<RouteComponentProps> = ({ history }) => {

    const [updateData, setUpdateData] = useState(false);
    const [openWallet, setOpenWallet] = useState("");

    useEffect(() => {
        //console.log(openWallet);
        if(openWallet !== ""){ history.push("/wallet/" + openWallet); }
    }, [openWallet]);

    return (
        <IonPage>
            <IonContent>
                <DefaultPage
                  TopDark={false}
                  Top={<DailyChallengeTop updateData={updateData} setUpdateData={setUpdateData} setOpenWallet={setOpenWallet}/>}
                  Bottom={<DailyChallengeBottom updateData={updateData} setOpenWallet={setOpenWallet}/>}>
                </DefaultPage>
            </IonContent>
        </IonPage>
    );
  };

export default DailyChallenge;