'use strict';

const AWS = require('aws-sdk'); 

const dynamoDb = new AWS.DynamoDB.DocumentClient();
const params = {
  TableName: process.env.DYNAMODB_TABLE,
};

module.exports.list = (event, context, callback) => {
  dynamoDb.scan(params, (error, result) => {
    if (error) {
      console.error(error);
      callback(new Error('Couldn\'t fetch the todos.'));
      return;
    }
    const response = {
      statusCode: 200, headers: {
                        "Access-Control-Allow-Origin": "*", 
                        "Access-Control-Allow-Credentials": true
                    },
      body: JSON.stringify(result.Items),
    };
    callback(null, response);
  });
};
