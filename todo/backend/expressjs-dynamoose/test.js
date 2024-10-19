const AWS = require('aws-sdk');

const dynamoDB = new AWS.DynamoDB({
    endpoint: 'http://localhost:8000',
    region: 'eu-west-3' // or your preferred region
});

const params = {
    TableName: 'todos'
};

dynamoDB.listTables(params, (err, data) => {
    if (err) console.log(err); else console.log(data);
});
