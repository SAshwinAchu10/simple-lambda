Sign In to ---> aws.amazon.com console
Open Select from Services

Click Create function



Select a Blank blueprint, Or Hello World

In the next page, Jus click next, We can add API gateway later on the coming steps

Create a function name, Description

Below role option---> Create a new role and add a role name(User-defined)
Below policy templates, select simple microservices permission
which is enough to run this project
In inline editor Add the following code:
<----- 'use strict';
var AWS = require('aws-sdk');
var docClient = new AWS.DynamoDB.DocumentClient();

console.log('Loading function');

exports.handler = (event, context, callback) => {
    console.log('PARAMS'+parseInt(event.params.querystring.bookid));
    var params = {
        TableName : "Books",
        Key:{
            "bookid": parseInt(event.params.querystring.bookid)
        }
    };
docClient.get(params, function(err,data){
        
            if(err){
            console.log('error da monkey');
        }else{
            callback(null, JSON.parse(JSON.stringify(data,null,2))); 
        }
    });
  
}; ------>

Now You can test the function by clicking Test Button.
				pass json as 
				{
  "body-json": {},
  "params": {
    "path": {},
    "querystring": {
      "bookid": 1
    }
  }
}
and Click test-->
log wil display the json object from DB

			CREATED A FUNCTION
 
**Under Services Select API Gateway and create a gateway for the function we created.

once API is created,
Under Actions---> Click Create Resource
Now create a method for the resource, Under actions select ---> Create Method---> Select GET Method and save.
then select --->Lambda Region
Under Lambda Function select the function name which we created already And save.
Click Method Request-->URL Query String --> Add query string--> give name of unique to access data from our database( eg: bookid) and save
Go back and select Integration Request--> Select Body Mapping Templates --> Add mapping template --> type format (eg:application/json) and save.
Test url by passing the query string value
              API SETUP DONE
			  
**under Services Select Dynamo DB
Create a table -->add column (bookid)(number type) which is used as referance as query string in above steps.
Once done go to table and click create item, and set a value for bookid, and append two more fields (bookname: string) & (author: String) and give them values and save.
Under Actions Select Deploy Api and create a stage and save	
Once done, URl can be invoked, Issues? no prob. Hold
               DB SETUP DONE
URL/resourcename?bookid=1 is accessable


**Website hosting 

will commit in a while