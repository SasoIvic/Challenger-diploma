import React, {useState} from 'react';
import {IonButton, IonContent, IonPage} from "@ionic/react";
import {createUseStyles} from 'react-jss';
import {darkPurple, white} from "../mixins";

const useStyles = createUseStyles({
    Container:{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        marginTop: '300px'
    }
})

const MyProject: React.FC = () => {
    const classes = useStyles();

    const [NumberHolder, setNumberHolder] = useState(1);

    const GenerateRandomNumber=()=>{
        var RandomNumber = Math.floor(Math.random() * 100) + 1;
        setNumberHolder(RandomNumber);
    }

    return (
        <IonPage>
            <IonContent >
                <div className={classes.Container}>
                    <p style={{marginBottom: 10, fontSize: 20}}>{NumberHolder}</p>
                    <IonButton
                        expand="block"
                        onClick={GenerateRandomNumber}>
                        GENERATE RANDOM NUMBER
                    </IonButton>
                </div>
            </IonContent>
        </IonPage>
    );
};

export default MyProject;