
import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/apiGateway';
import { formatJSONResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';
import * as AWS from 'aws-sdk';
import schema from './schema';


// const apig = new AWS.ApiGatewayManagementApi({
//   endpoint: process.env.APIG_ENDPOINT
// });

const dynamodb = new AWS.DynamoDB.DocumentClient();

const connectionTable = process.env.CONNECTIONS_TABLE;

const connectionHandler: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
  console.log(event);
  const { body, requestContext: { connectionId, routeKey }} = event;
  console.log(body, routeKey);
  await dynamodb.put({
    TableName: connectionTable,
    Item: {
      connectionId,
      // Expire the connection an hour later. This is optional, but recommended.
      // You will have to decide how often to time out and/or refresh the ttl.
      ttl: parseInt((Date.now() / 1000).toString() + 3600)
    }
  }).promise();
  // return { statusCode: 200 };
  return formatJSONResponse({ statusCode: 200 });
}

export const connect = middyfy(connectionHandler);
