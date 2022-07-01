import React, { useState, useRef } from 'react';
import { createUseStyles } from 'react-jss';
import { darkPurple, lightPurple, white } from '../mixins';
import {Capacitor, KeyboardInfo, Plugins} from '@capacitor/core';
import { useIonViewDidEnter } from "@ionic/react";

const useStyles = createUseStyles({
    Container:{
        height: '100%',

        '& .FormWrapper': {
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: white,

            '& > .Register': {
                '@media screen and (min-width: 576px)': {
                    display: (rightActive: Boolean) => rightActive ? 'flex' : 'none',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                },
                backgroundColor: darkPurple,
                '& > *': {
                    width: '60%',
                }
            },
            '& > .Login': {
                '@media screen and (min-width: 576px)': {
                    display: (rightActive: Boolean) => !rightActive ? 'flex' : 'none',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                },
                backgroundColor: darkPurple,
                '& > *': {
                    width: '60%',
                },
                animation: 'slideRight 10s',
            },

            '& h1':{
                color: 'white',
            },

        },

        '& .TextWrapper':{
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: darkPurple,
            height: '100%',

            '& > .Overlay':{
                backgroundColor: white,
                height: '100%',
                color: darkPurple,

                '& > .RegisterOverlay': {
                    '@media screen and (min-width: 576px)': {
                        display: (rightActive: Boolean) => !rightActive ? 'flex' : 'none',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginLeft: 'auto',
                        marginRight: 'auto',
                    },
                },
                '& > .LoginOverlay': {
                    '@media screen and (min-width: 576px)': {
                        display: (rightActive: Boolean) => rightActive ? 'flex' : 'none',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginLeft: 'auto',
                        marginRight: 'auto',
                    },
                },

                '& > *': {
                    width: '60%',
                    marginLeft: '40px'
                },

                '& button': {
                    borderRadius: '20px',
                    backgroundColor: darkPurple,
                    color: white,
                    fontSize: '12px',
                    padding: '12px 45px',
                    letterSpacing: '1px',
                    marginTop: '10px',

                    '&:active': {
                        transform: 'scale(0.95)'
                    },
                    '&:hover':{
                        backgroundColor: lightPurple,
                    },
                    '&:focus': {
                        outline: 'none'
                    },
                },
            }
        },

        '@media screen and (min-width: 576px)': {
            display: 'flex',

            '& .FormWrapper':{
                width: '100%',
                height: '100%',

                '& > .Register': {
                    height: '100%',
                    display: (rightActive: Boolean) => !rightActive ? 'block' : 'none',
                    borderBottomLeftRadius: (rightActive: Boolean) => rightActive ? '40px' : '0px',
                },
                '& > .Login': {
                    height: '100%',
                    display: (rightActive: Boolean) => rightActive ? 'block' : 'none',
                    borderTopRightRadius: (rightActive: Boolean) => rightActive ? '0px' : '40px',
                },
            },
            '& .TextWrapper':{
                width: '100%',
                height: '100%',

                '& .Overlay': {
                    borderBottomLeftRadius: (rightActive: Boolean) => rightActive ? '0px' : '40px',
                    borderTopRightRadius: (rightActive: Boolean) => rightActive ? '40px' : '0px',

                    '& > .RegisterOverlay': {
                        height: '100%',
                    },
                    '& > .LoginOverlay': {
                        height: '100%',
                    },
                }
            }
        },
    },

    '@media (max-width: 576px)': {
        Container:{
            height: '100%',

            '& .FormWrapper': {
                display: 'flex',
                flexDirection: 'column',
                backgroundColor: white,

                '& > .Register': {
                    display: (rightActive: Boolean) => rightActive ? 'block' : 'none',
                    borderTopRightRadius: (rightActive: Boolean) => rightActive ? '40px' : '0px',
                    backgroundColor: darkPurple,
                    '& > *': {
                        width: '50%',
                        marginLeft: '70px'
                    }
                },
                '& > .Login': {
                    display: (rightActive: Boolean) => !rightActive ? 'block' : 'none',
                    borderBottomLeftRadius: (rightActive: Boolean) => !rightActive ? '40px' : '0px',
                    backgroundColor: darkPurple,
                    '& > *': {
                        width: '50%',
                        marginLeft: '70px'
                    }
                },

                '& h1':{
                    color: 'white',
                },

            },

            '& .TextWrapper':{
                display: 'flex',
                flexDirection: 'column',
                backgroundColor: darkPurple,
                height: '50%',

                '& > .Overlay':{
                    backgroundColor: white,
                    height: '100%',
                    color: darkPurple,
                    borderTopRightRadius: (rightActive: Boolean) => rightActive ? '0px' : '40px',
                    borderBottomLeftRadius: (rightActive: Boolean) => rightActive ? '40px' : '0px',

                    '& > .RegisterOverlay': {
                        marginTop: '40px',
                        display: (rightActive: Boolean) => !rightActive ? 'block' : 'none',
                    },
                    '& > .LoginOverlay': {
                        marginTop: '40px',
                        display: (rightActive: Boolean) => rightActive ? 'block' : 'none',
                    },

                    '& > *': {
                        width: '60%',
                        marginLeft: '40px'
                    },

                    '& button': {
                        borderRadius: '20px',
                        backgroundColor: darkPurple,
                        color: white,
                        fontSize: '12px',
                        padding: '12px 45px',
                        letterSpacing: '1px',
                        marginTop: '10px',
                        marginBottom: '20px',

                        '&:active': {
                            transform: 'scale(0.95)'
                        },
                        '&:hover':{
                            backgroundColor: lightPurple,
                        },
                        '&:focus': {
                            outline: 'none'
                        },
                    },
                }
            }
        },
    },
})

const SwapAnimation = ({rightPanel, leftPanel, rightOverlay, leftOverlay}: any) => {
    const container = useRef(null);
    const textWrapper = useRef(document.createElement("div"));
    const formWrapper = useRef(document.createElement("div"));

    const [rightActive, setRightActive] = useState(false);
    const [hideOverlay, setHideOverlay] = useState(false);
    const classes = useStyles(rightActive);

    function reportWindowSize() { return window.matchMedia('(max-width: 576px)').matches; }

    useIonViewDidEnter(() => {
        try {
            if (Capacitor.platform !== "web") {
                reportWindowSize();
                //window.addEventListener('resize', reportWindowSize);
                //window.addEventListener('resize', ChangeLayout);
            }
        }
        catch (e) {
            console.log(e);
        }
    })

    function animation() {
        //animation
        formWrapper.current.style.transition = 'transform 1s';
        textWrapper.current.style.transition = 'transform 1s';

        let translateDirection  = 'X';
        let pushFormDown = 100 + '%';
        let pushTextUp = 100 + '%';
        let setTextWrapperHeight = 100 + '%';

        if(reportWindowSize()){
            translateDirection = 'Y';
            pushFormDown = (window.innerHeight - 459) + 'px'; //pageHeight - FormWrapperHeight
            pushTextUp = 459 + 'px'; //FormWrapperHeight
            setTextWrapperHeight = (window.innerHeight - 459) + 'px'; //pageHeight - FormWrapperHeight
        }

        if(!rightActive){
            formWrapper.current.style.transform = 'translate'+translateDirection+'('+pushFormDown+')';
            textWrapper.current.style.transform = 'translate'+translateDirection+'(-'+pushTextUp+')';
            textWrapper.current.style.height = setTextWrapperHeight;
        }
        else{
            formWrapper.current.style.transform = 'translate'+translateDirection+'(0)';
            textWrapper.current.style.transform = 'translate'+translateDirection+'(0)';
        }
    }

    function ChangeLayout() {
        setRightActive(!rightActive);
        animation();
    }

    try{
        if (Capacitor.platform !== "web") {
            const { Keyboard } = Plugins;

            Keyboard.addListener('keyboardWillShow', (info: KeyboardInfo) => {
                setHideOverlay(true);
            });
            window.addEventListener('keyboardWillHide', () => {
                setHideOverlay(false);
            });
        }
    }
    catch(e){
        console.log(e);
    }

    return (
        <div className={classes.Container} ref={container}>
            <div className={'FormWrapper'} ref={formWrapper}>
                <div className={'Register'}>
                    {rightPanel}
                </div>
                <div className={'Login'}>
                    {leftPanel}
                </div>
            </div>

            <div className={'TextWrapper'} ref={textWrapper}>
                <div className='Overlay'>
                    <div className='LoginOverlay'>
                        {leftOverlay.content}
                        <button
                            className='ChangeLayoutBtn'
                            onClick={ChangeLayout}
                        >
                            {leftOverlay.buttonText}
                        </button>
                    </div>
                    <div className='RegisterOverlay'>
                        {rightOverlay.content}
                        <button
                            className='ChangeLayoutBtn'
                            onClick={ChangeLayout}
                        >
                            {rightOverlay.buttonText}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
  };

export default SwapAnimation;