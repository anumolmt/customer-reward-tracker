const express = require('express');
const cors = require('cors');

const app = express();
const corsOptions = {
    origin: "http://localhost:3000"
}
const port = 8080;

app.use(cors(corsOptions));

const getStatus = (req, res) => {
    console.log('In ');
    res.status = 200;
    res.json({
        version: require('./package.json').version,
        message: 'Server is running'
    });
}

const getTransactions = (req, res) => {
    let response = {
        statusCode: 200,
        body: {
            userMessage: 'Transaction data fetched succesfully',
            data: require('./transaction-data.js').data
        }
    }
    res.statusCode = response.statusCode;
    res.json(response.body);
}

let getCustomerInfo = (req, res) => {
    let response = {
        statusCode: 200,
        body: {
            userMessage: 'Transaction data fetched succesfully',
            data: require('./customer-data.js').data
        }
    }
    res.statusCode = response.statusCode;
    res.json(response.body);
}

//Define end points
app.get('/status', getStatus);
app.get('/transactionInfo', getTransactions);
app.get('/customerInfo', getCustomerInfo);

//Start server
app.listen(port, () => {
    console.log(`The server app is listening at http://localhost:${port}`)
});