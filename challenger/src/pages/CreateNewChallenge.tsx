import React, {useEffect, useState} from 'react';
import DefaultPage from '../pages/DefaultPage';
import NewChallengeTop from '../components/NewChallengeTop';
import NewChallengeBottom from '../components/NewChallengeBottom';
import {IonContent, IonPage, IonToast} from "@ionic/react";
import {RouteComponentProps} from "react-router";
import {postData} from "../servis/fetch";

const saveChallengeUrl = "http://192.168.178.32:8000/challenge/save"

const CreateNewChallenge: React.FC<RouteComponentProps> = ({ history }) => {

    const [challengeName, setChallengeName] = useState("");
    const [challengeDescription, setChallengeDescription] = useState("");
    const [isChallengeDaily, setIsChallengeDaily] = useState(false);
    const [numOfDays, setNumOfDays] = useState(null);
    const [challengeBet, setChallengeBet] = useState(0);
    const [challengeStart, setChallengeStart] = useState(new Date());
    const [challengeEnd, setChallengeEnd] = useState(new Date());
    const [challengeUsers, setChallengeUsers] = useState([]);

    const [isCreated, setIsCreated] = useState(false);
    const [isDataOk, setIsDataOK] = useState(false);

    const [showToast, setShowToast] = useState(false);


    useEffect(() => {
        if(isDataOk){
            postData(saveChallengeUrl, {
                name: challengeName,
                description: challengeDescription,
                daily: isChallengeDaily,
                numOfDays: numOfDays,
                bet: challengeBet,
                start: challengeStart,
                end: challengeEnd,
                users: challengeUsers
            })
            .then((data: any) => {
                if (data.status === 0) {
                    setShowToast(true)
                }
            });
        }
    }, [isCreated])

    return (
        <IonPage>
            <IonContent>

                <IonToast
                    isOpen={showToast}
                    onDidDismiss={() => setShowToast(false)}
                    message="Challenge was successfully created."
                    duration={1000}
                />

              <DefaultPage
                TopDark={true}
                Top={<NewChallengeTop
                    challengeName={challengeName}
                    setChallengeName={setChallengeName}
                    challengeDescription={challengeDescription}
                    setChallengeDescription={setChallengeDescription}
                />}
                Bottom={<NewChallengeBottom
                    isChallengeDaily={isChallengeDaily}
                    setIsChallengeDaily={setIsChallengeDaily}
                    numOfDays={numOfDays}
                    setNumOfDays={setNumOfDays}
                    challengeBet={challengeBet}
                    setChallengeBet={setChallengeBet}
                    challengeStart={challengeStart}
                    setChallengeStart={setChallengeStart}
                    challengeEnd={challengeEnd}
                    setChallengeEnd={setChallengeEnd}
                    challengeUsers={challengeUsers}
                    setChallengeUsers={setChallengeUsers}
                    setIsDataOK={setIsDataOK}
                    isCreated={isCreated}
                    setIsCreated={setIsCreated}
                />}>
              </DefaultPage>
            </IonContent>
        </IonPage>
    );
  };

export default CreateNewChallenge;