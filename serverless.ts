import type { AWS } from '@serverless/typescript';

import hello from '@functions/hello';
import { connect } from '@functions/websocket';
import dynamoDbTables from './dynamodb-tables';


const serverlessConfiguration: AWS = {
  service: 'serverless-websocket-ts',
  frameworkVersion: '2',
  custom: {
    ['serverless-offline']: {
      httpPort: 3000,
      // babelOptions: {
      //   presets: ["env"]
      // }
    },
    ['bundle']: {
      linting: false
    },
    dynamodb: {
      stages: ['dev'],
      start: {
        port: 8008,
        inMemory: true,
        heapInitial: '200m',
        heapMax: '1g',
        migrate: true,
        seed: true,
        convertEmptyValues: true,
        // Uncomment only if you already have a DynamoDB running locally
        // noStart: true
      }
    }
  },
  plugins: [
    'serverless-bundle',
    'serverless-dynamodb-local',
    'serverless-offline',
    'serverless-dotenv-plugin',
  ],
  package: {
    individually: true,
  },
  provider: {
    name: 'aws',
    runtime: 'nodejs14.x',
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      APIG_ENDPOINT: '',
      CONNECTIONS_TABLE: 'Connections'
    },
    lambdaHashingVersion: '20201221',
  },
  // import the function via paths
  functions: { 
    hello,
    connect
  },

  resources: {
    Resources: dynamoDbTables,
  }
};

module.exports = serverlessConfiguration;
