import React from 'react';


const Home = () => {

    return (
        <div className="container">
            <div className="form-container sign-in-container">
                <form action="#">
                    <h1>SIGN IN</h1>
                    <a href="#">Forgot your password?</a>
                    <button>SIGN IN</button>
                </form>
            </div>
            <div className="overlay-container">
                <div className="overlay">
                    <div className="overlay-panel overlay-right">
                        <h1>WELCOME TO CHALLENGER</h1>
                        <p>Are you ready to change your habits?</p>
                        <p>Enter your personal details and start journey with us</p>
                        <button className="ghost">SIGN UP</button>
                    </div>
                </div>
            </div>
        </div>
    );
  };

export default Home;