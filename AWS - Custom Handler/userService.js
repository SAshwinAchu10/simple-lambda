'use strict';

const uuidGenerator = require('node-uuid');

class UserService {
  constructor (dynamoDb, tableName) {

      this.dynamoDb = dynamoDb;
      this.tableName = tableName;
  }

  
  getUser (userId) {
    
    var params = {
        TableName: this.tableName,
        Key: { 
            userId: { S: userId}
        },
        AttributesToGet: [
            'userId',
            'email',
            'skills',
            'name'
        ]
    };
    return this.dynamoDb.getItem(params).promise().then(function (data) {
      let user = {};
      user.userId = data.Item.userId.S;
      user.skills = data.Item.skills.S;
      user.name = data.Item.name.S;
      user.email = data.Item.email.S;

      return user;
    });
  }

  updateUser (userId, userDetails) {

    var params = {
        TableName: this.tableName,
        Key: { 
          userId: { S: userId}
        },
        AttributeUpdates: {}
    };

    if (userDetails.email) {
      params.AttributeUpdates.email = {
        Action: 'PUT',
        Value: {S: userDetails.email}
      }
    }

    if (userDetails.skills) {
      params.AttributeUpdates.skills = {
        Action: 'PUT',
        Value: {S: userDetails.skills}
      }
    }
    if (userDetails.name) {
      params.AttributeUpdates.name = {
        Action: 'PUT',
        Value: {S: userDetails.name}
      }
    }

    return this.dynamoDb.updateItem(params).promise();
  }

  createUser(userDetails) {

    let userId = uuidGenerator.v4();

    var params = {
        TableName: this.tableName,
        Item: {
          userId: { S: userId},
          email: {S: userDetails.email},
          name: {S: userDetails.name}

        }
    };

    if (userDetails.skills) {
      params.Item.skills = {S: userDetails.skills}
    }
    if (userDetails.name) {
      params.Item.name = {S: userDetails.name}
    }
    return this.dynamoDb.putItem(params).promise().then(function (data) {
      console.log('Created user ' + userId);

      return {userId: userId};
    });
  }

  deleteUser(userId) {

    var params = {
        TableName: this.tableName,
        Key: {
          userId: { S: userId}
        }
    };

    return this.dynamoDb.deleteItem(params).promise();
  }
}

module.exports = UserService;