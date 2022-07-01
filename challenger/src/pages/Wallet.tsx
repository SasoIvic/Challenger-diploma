import React, {useState} from 'react';
import DefaultPage from '../pages/DefaultPage';
import DailyChallengeTop from '../components/DailyChallengeTop';
import DailyChallengeBottom from '../components/DailyChallengeBottom';
import {RouteComponentProps} from "react-router";
import {IonContent, IonPage} from "@ionic/react";
import ModalWallet from "../components/ModalWallet";
import WalletTop from "../components/WalletTop";
import WalletBottom from "../components/WalletBottom";

const Wallet: React.FC<RouteComponentProps> = ({ history }) => {

    const [confirmPaymentServer, setConfirmPaymentServer] = useState(false);

    return (
        <IonPage>
            <IonContent>
                <DefaultPage
                    TopDark={false}
                    Top={<WalletTop confirmPaymentServer={confirmPaymentServer} />}
                    Bottom={<WalletBottom confirmPaymentServer={confirmPaymentServer} setConfirmPaymentServer={setConfirmPaymentServer} />}>
                </DefaultPage>
            </IonContent>
        </IonPage>
    );
};

export default Wallet;