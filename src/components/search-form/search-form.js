import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

let SearchComponent = (props) => {
    const [customerId, setCustomerId] = useState('');

    const useStyles = makeStyles(theme => (
        {
            searchContainer: {
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-around",
                flexWrap: "wrap"
            },
            searchOptions: {
                display: "flex",
                alignItems: "stretch"
            }
        }
    ))

    const updateCustomerId = (event) => {
        setCustomerId(event.target.value);
    }
    const styles = useStyles();
    return (
        <form>
            <div className={styles.searchContainer}>
                <div className={styles.searchOptions}>
                    <TextField variant="outlined"
                        label="Customer Id"
                        placeholder="1, 2 ,3 ..."
                        value={customerId}
                        onChange={(event) => updateCustomerId(event)}></TextField>
                    <Button variant="contained" color="primary"
                        onClick={() => props.filterCustomerData(parseInt(customerId))}>
                        Filter Customers
                    </Button>
                </div>
                <div className={styles.searchOptions}>
                    <Button variant="contained"
                        color="primary"
                        onClick={() => props.filterCustomerData()}>
                        Show All Customers
                    </Button>
                </div>
            </div>
        </form >
    )
}

export default SearchComponent;