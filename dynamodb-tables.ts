export default {
    ConnectionsTable: {
        Type: 'AWS::DynamoDB::Table',
        Properties: {
            TableName: '${self:provider.environment.CONNECTIONS_TABLE}',
            AttributeDefinitions: [
                { AttributeName: 'connectionId', AttributeType: 'S' }
            ],
            KeySchema: [
                { AttributeName: 'connectionId', KeyType: 'HASH' }
            ],
            SSESpecification: {
                SSEEnabled: true
            },
            TimeToLiveSpecification: {
                AttributeName: 'ttl',
                Enabled: true
            }
        }
    },
}