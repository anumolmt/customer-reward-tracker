import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import SearchComponent from '../search-form/search-form';
import TableComponent from '../table/table';
import StatusComponent from '../status/status';
import { getData } from '../../common/services/restUtilities';

let ContentComponent = () => {

    const [transactionData, setTransactionData] = useState([]);
    const [filteredTransactionData, setFilteredTransactionData] = useState([]);
    const [userInformation, setUserInformation] = useState("");
    const useStyle = makeStyles(theme => ({
        contentContainer: {
            width: "100%",
            padding: "3%",
            height: 400
        },
        searchArea: {
            padding: "20px 0px"
        }
    }));
    const styles = useStyle();

    const fecthData = async () => {
        await getData('transactionInfo')
            .then((response) => {
                let transactionData = response.data;
                setTransactionData(transactionData);
                setFilteredTransactionData([...transactionData]);
                setUserInformation("");
            })
            .catch((error) => {
                console.log(error);
                setUserInformation("Some error occured, please try again later");
                setTransactionData([]);
                setFilteredTransactionData([...transactionData]);
            });
    }

    useEffect(() => {
        fecthData();
    }, []);

    const filterCustomerData = (customerId) => {
        if (customerId) {
            let filteredTransactionData = transactionData.filter(data => {
                return data.customerId === customerId;
            })
            if (filteredTransactionData.length > 0) {
                setFilteredTransactionData(filteredTransactionData);
                setUserInformation("");
            } else {
                setFilteredTransactionData(filteredTransactionData);
                setUserInformation("No records found!");
            }
        } else {
            let filteredTransactionData = [...transactionData];
            setFilteredTransactionData(filteredTransactionData);
        }
    }

    return (
        <React.Fragment>
            <div className={styles.searchArea}>
                <SearchComponent filterCustomerData={filterCustomerData} />
            </div>
            <div className={styles.contentContainer}>
                <TableComponent transactionData={filteredTransactionData} />
                <StatusComponent userInformation={userInformation} />
            </div>
        </React.Fragment>
    )
}

export default ContentComponent;