import React from 'react';
import HeaderComponent from '../header/header';
import ContentComponent from '../content/content';

let HomeComponent = () => {
    return (
        <React.Fragment>
            <HeaderComponent headerContent="Customer Rewards Tracker" />
            <ContentComponent />
        </React.Fragment>
    )
}

export default HomeComponent;