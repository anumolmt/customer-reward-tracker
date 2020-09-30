import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    header: {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.common.white,
        height: 50,
        padding: 5,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 20
    },
}));

let HeaderComponent = (props) => {
    const styles = useStyles();
    return (
        <div className={styles.header}> {props.headerContent}</div>
    )
}

export default HeaderComponent;