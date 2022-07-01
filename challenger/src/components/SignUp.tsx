import React, { useState } from "react";
import { createUseStyles } from "react-jss";
import InputField from "../components/InputField";
import { postData } from '../servis/fetch';
import { person, lockClosed, mail } from "ionicons/icons";
import { darkPurple, lightPurple, white, red } from "../mixins";
import {SERVER_URL} from "../config";

const registerUrl = "http://192.168.178.32:8000/user/register";

const useStyles = createUseStyles({
    Form: {
        "& .Title": {
            display: "flex",
            flexDirection: "column",
            color: white,
            marginBottom: "50px",

            "& > *": {
                marginBottom: "0px",
                marginTop: "5px",
            },
            "& h1": {
                fontSize: "50px !important",
                fontWeight: "bold",
            },
            "& p": {
                fontSize: "13px",
                color: white,
            },
        },

        "& .ErrorMsg": {
            color: red,
            position: 'relative',
            padding: '0 1.25rem',
            marginBottom: '1rem',
        },

        "& button": {
            borderRadius: "20px",
            backgroundColor: darkPurple,
            color: white,
            border: "1px solid " + white,
            fontSize: "12px",
            padding: "12px 45px",
            letterSpacing: "1px",
            marginTop: "50px",
            marginBottom: "60px",

            "&:active": {
                transform: "scale(0.95)",
            },
            "&:hover": {
                backgroundColor: lightPurple,
            },
            "&:focus": {
                outline: "none",
            },
        },
    },
    "@media (max-width: 576px)": {
        Form: {
            marginTop: "30px",
            "& .bgImage": {
                display: "unset",
                zIndex: 2,
            },
            "& .Title": {
                display: "flex",
                flexDirection: "column",
                color: white,
                marginBottom: "10px",

                "& > *": {
                    marginBottom: "0px",
                    marginTop: "3px",
                },
                "& h1": {
                    fontSize: "35px !important",
                    fontWeight: "bold",
                },
                "& p": {
                    fontSize: "11px",
                    color: white,
                },
            },
            "& button": {
                fontSize: "11px",
                marginTop: "30px",
                marginBottom: "30px",
            },
        }
    },
});

const SignUp = () => {
    const classes = useStyles();

    const [email, setEmail] = useState();
    const [name, setName] = useState();
    const [password, setPassword] = useState();

    const [error, setError] = useState("");

    function Register() {
        if(email && password && name) {
            postData(registerUrl, {
                email: email,
                password: password,
                username: name,
            }).then((data: any) => {
                console.log(data);
                if (data.status !== 0) { setError(data.body); }
            });
        }
        else{
            setError("Fill all input fields");
        }
    }

    return (
        <div className={classes.Form}>
            <div className={"Title"}>
                <h1>Challenge</h1>
                <h1>Friends</h1>
                <p>and form new habits</p>
            </div>

            {error &&
            <div className={"ErrorMsg"}>
                <p>{error}</p>
            </div>}

            <InputField
                color={"primary"}
                labelText={" Name"}
                icon={person}
                type={"text"}
                value={name}
                setValue={setName}
            />
            <InputField
                color={"primary"}
                labelText={" Email"}
                icon={mail}
                type={"email"}
                value={email}
                setValue={setEmail}
            />
            <InputField
                color={"primary"}
                labelText={" Password"}
                icon={lockClosed}
                type={"password"}
                value={password}
                setValue={setPassword}
            />
            <div className="spacer_s" />
            <button onClick={Register}>Register</button>
        </div>
    );
};
export default SignUp;
