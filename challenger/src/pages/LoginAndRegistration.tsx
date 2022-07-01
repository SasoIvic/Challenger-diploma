import React, { useEffect, useState } from 'react';
import SwapAnimation from '../components/SwapAnimation';
import SignUp from '../components/SignUp';
import SignIn from '../components/SignIn';
import { createUseStyles } from "react-jss";
import { darkPurple } from "../mixins";
import { RouteComponentProps } from "react-router";
import { IonContent, IonPage } from "@ionic/react";

const useStyles = createUseStyles({
    TextContainer:{
        height: '100%',

        '& .Title': {
            display: 'flex',
            flexDirection: 'column',
            color: darkPurple,
            marginBottom: '50px',

            '& > *':{
                marginBottom: '0px',
                marginTop: '5px'
            },
            '& h1':{
                fontSize: '32px',
                fontWeight: 'bold'
            },
            '& p':{
                fontSize: '13px',
            },
        }
    }
})

const loginOverlay = {
    buttonText: 'Login',
    content: <div className={'Title'}>
                <h1 className='overlayTitle'>Welcome back</h1>
                <p>Login and form new habits</p>
            </div>
}
const registerOverlay = {
    buttonText: 'Register',
    content: <div className={'Title'}>
                <h1 className='overlayTitle'>Welcome to challenger</h1>
                <p>Don't have an account yet?</p>
            </div>
}

const LoginAndRegistration: React.FC<RouteComponentProps> = ({ history }) => {
    const classes = useStyles();

    const [isSuccessfullyLogin, setIsSuccessfullyLogin] = useState(false);

    useEffect(() => { //successfully login
        if(isSuccessfullyLogin){
            history.push(`/profile`);
        }
    }, [isSuccessfullyLogin]);

    return (
        <IonPage>
            <IonContent>
                <div className={classes.TextContainer}>
                <SwapAnimation
                    rightPanel={<SignUp/>}
                    leftPanel={<SignIn setIsSuccessfullyLogin={setIsSuccessfullyLogin}/>}
                    rightOverlay={registerOverlay}
                    leftOverlay={loginOverlay}>
                </SwapAnimation>
                </div>
            </IonContent>
        </IonPage>
    );
};

export default LoginAndRegistration;