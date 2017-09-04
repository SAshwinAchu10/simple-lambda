'use strict';

const AWS = require('aws-sdk'); 

const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports.update = (event, context, callback) => {
  const timestamp = new Date().getTime();
  const data = JSON.parse(event.body);
  if (typeof data.text !== 'string' || typeof data.checked !== 'boolean') {
    console.error('Validation Failed');
    callback(new Error('Couldn\'t update the todo item.'));
    return;
  }

  const params = {
    TableName: process.env.DYNAMODB_TABLE,
    Key: {
      id: event.pathParameters.id,
    },
    ExpressionAttributeNames: {
      '#todo_text': 'text',
    },
    ExpressionAttributeValues: {
      ':text': data.text,
      ':updatedAt': timestamp,
    },
    UpdateExpression: 'SET #todo_text = :text, updatedAt = :updatedAt',
    ReturnValues: 'ALL_NEW',
  };
  dynamoDb.update(params, (error, result) => {
    if (error) {
      console.error(error);
      callback(new Error('Couldn\'t update the todo item.'));
      return;
    }
    const response = {
      statusCode: 200,headers: {
                        "Access-Control-Allow-Methods": "*",
                        "Access-Control-Allow-Origin": "*",
                        "Access-Control-Allow-Credentials": true 
                    },
      body: JSON.stringify(result.Attributes),
    };
    callback(null, response);
  });
};
