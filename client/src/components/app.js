import React from 'react';
import Routes from './router';

import MainNav from './partials/main_nav';

export default function App(){


    return (
        <div className="App">
            <Routes />
            <MainNav />
        </div>
    );
}
