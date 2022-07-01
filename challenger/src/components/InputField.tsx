import React from 'react';
import { IonInput, IonItem, IonLabel, IonIcon } from '@ionic/react';
import { createUseStyles } from 'react-jss'

const useStyles = createUseStyles({
    ionInputWrapper:{
    }
})

const InputField = (props: any) => {
    const classes = useStyles();

    function handleChange(e: any) {
        props.setValue(e.target.value);
    }

    return (
        <IonItem color={props.color} className={classes.ionInputWrapper}>
            <IonLabel className={'label'} position="floating">
                {props.icon && <IonIcon icon={props.icon} />}
                {props.labelText}
            </IonLabel>
            <IonInput value={props.value} type={props.type} onIonChange={handleChange} required/>
        </IonItem>
    );
};
export default InputField;