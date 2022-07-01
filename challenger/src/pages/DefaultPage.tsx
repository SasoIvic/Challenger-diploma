import React from 'react';
import {createUseStyles} from 'react-jss';
import {darkPurple, white} from '../mixins';
import {IonContent} from '@ionic/react';

const useStyles = createUseStyles({
    DefaultPage:{
        textAlign: 'center',
        height: '100%',
        display: 'flex',

        '@media screen and (min-width: 576px)': {
            '& .ProfileWrapper':{
                height: '100%',
                display: 'flex',
                alignItems: 'center'
            },
        },

        '& .Top': {
            backgroundColor: (isTopDark: Boolean) => isTopDark ? darkPurple : white,
            padding: '20px',
            borderTopRightRadius: '40px',
            color: (isTopDark: Boolean) => !isTopDark ? darkPurple : white,
        },
        '& .Bottom': {
            backgroundColor: (isTopDark: Boolean) => !isTopDark ? darkPurple : white,
            padding: '20px',
            borderBottomLeftRadius: '40px',
            color: (isTopDark: Boolean) => !isTopDark ? darkPurple : white,
            width: '100%',
        },
        '& .BottomWrapper': {
            display: 'flex',
            backgroundColor: (isTopDark: Boolean) => isTopDark ? darkPurple : white,
            width: '100%',
            height: '100%'
        },
        '& .TopWrapper': {
            display: 'flex',
            backgroundColor: (isTopDark: Boolean) => !isTopDark ? darkPurple : white,
        },
    },

    '@media (max-width: 576px)': {
        DefaultPage:{
            display: 'block',
            height: 'auto',
    
            '& .Top': {
                borderBottomLeftRadius: '40px',
                borderTopRightRadius: '0',
                width: '100%'
            },
            '& .Bottom': {
                borderTopRightRadius: '40px',
                borderBottomLeftRadius: '0',
                width: '100%',
            },
        },
    }
})

const DefaultPage = ({TopDark, Top, Bottom}: any) => {
    const classes = useStyles(TopDark);

    return (
        <IonContent
            scrollEvents={true}
            onIonScrollStart={() => {}}
            onIonScroll={() => {}}
            onIonScrollEnd={() => {}}
        >
        <div className={classes.DefaultPage}>
          <div className="TopWrapper">
            <div className="Top">
              {Top}
            </div>
          </div>
          <div className="BottomWrapper">
            <div className="Bottom">
                <div className="ProfileWrapper">
                    {Bottom}
                </div>
            </div>
          </div>
        </div>
        </IonContent>
    );
};

export default DefaultPage;