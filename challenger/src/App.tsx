import React from 'react';
import { Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';

import LoginAndRegistration from './pages/LoginAndRegistration';
import Home from './pages/Home';
import Profile from './pages/Profile';
import CreateNewChallenge from './pages/CreateNewChallenge';
import DailyChallenge from './pages/DailyChallenge'
import Wallet from './pages/Wallet';
import MyProject from './pages/Random';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonRouterOutlet>
        <Route path="/home" component={Home} exact />
        <Route path="/" component={LoginAndRegistration} exact />
        <Route path="/profile" component={Profile} exact />
        <Route path="/newChallenge" component={CreateNewChallenge} exact />
        <Route path="/dailyChallenge" component={DailyChallenge} />
        <Route path="/wallet" component={Wallet} />
        <Route path="/random" component={MyProject} />

      </IonRouterOutlet>
    </IonReactRouter>
  </IonApp>
);

export default App;
