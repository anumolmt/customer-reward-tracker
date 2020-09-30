import React, { useState, useEffect } from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';

import TableContainer from '@material-ui/core/TableContainer';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';

import * as CONSTANTS from '../../common/constants/constants';

let TableComponent = (props) => {
    const [columns, setColumns] = useState([]);

    const useStyle = makeStyles({
        container: {
            height: "inherit"
        }
    })

    const StyledTableCell = withStyles((theme) => ({
        head: {
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.common.white,
            textAlign: "center"
        },
        body: {
            textAlign: "center"
        },
    }))(TableCell);

    const StyledTableRow = withStyles((theme) => ({
        root: {
            '&:nth-of-type(odd)': {
                backgroundColor: theme.palette.action.hover,
            },
        },
    }))(TableRow);

    useEffect(() => {
        if (props && props.transactionData && props.transactionData.length > 0) {
            let amountHeader = [];
            let rewardsHeader = [];

            props.transactionData[0]
                .transactions
                .map((data, index) => {
                    let month = data["date"].substring(5, 7);
                    amountHeader.push(CONSTANTS.MONTHS_MAPPING[month] + " Purchase");
                    rewardsHeader.push(CONSTANTS.MONTHS_MAPPING[month] + " Rewards");
                    return;
                });
            setColumns(['Customer Id', ...amountHeader, ...rewardsHeader, 'Total Rewards']);
        }
    }, [props]);

    const getTotalRewards = (transactions) => {
        let rewards = 0;
        transactions.forEach(data => {
            let purchaseAmount = data['amount'];
            rewards += getRewards(purchaseAmount)
        })
        return rewards;
    }

    const getRewards = (purchaseAmount) => {

        let rewards = purchaseAmount > CONSTANTS.UPPER_REWARD_THRESHOLD ?
            ((purchaseAmount - CONSTANTS.UPPER_REWARD_THRESHOLD) * 2) + CONSTANTS.LOWER_REWARD_THRESHOLD :
            purchaseAmount > CONSTANTS.LOWER_REWARD_THRESHOLD ?
                purchaseAmount - CONSTANTS.LOWER_REWARD_THRESHOLD :
                0;
        return Math.round(rewards);
    }

    const classes = useStyle();
    return (
        <TableContainer className={classes.container}>
            <Table stickyHeader>
                <TableHead>
                    <TableRow>
                        {columns.map((columnname, index) =>
                            <StyledTableCell key={index}>{columnname.toUpperCase()}</StyledTableCell>)}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {props && props.transactionData && props.transactionData.map((transactionData, outerindex) => {
                        return <StyledTableRow key={outerindex}>
                            <StyledTableCell>{transactionData.customerId}</StyledTableCell>
                            {transactionData && transactionData.transactions.map((transaction, innerIndex) =>
                                <StyledTableCell key={innerIndex}>{`$` + transaction["amount"].toFixed(2)}</StyledTableCell>
                            )}
                            {transactionData && transactionData.transactions.map((transaction, innerIndex) =>
                                <StyledTableCell key={innerIndex}>{getRewards(transaction["amount"])}</StyledTableCell>
                            )}
                            <StyledTableCell>{getTotalRewards(transactionData.transactions)}</StyledTableCell>
                        </StyledTableRow>
                    }
                    )}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default TableComponent;