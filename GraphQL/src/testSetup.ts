import supertest from 'supertest';
import { setupServer } from './index';
import { getConnection } from 'typeorm';
import { SuperTest, Test } from 'supertest';
import { DocumentNode } from 'graphql';
import { print } from 'graphql/language/printer';
import { gql } from 'apollo-server-express';
// @ts-ignore
export class GraphQL {
    private requestPromise: Promise<SuperTest<Test>>;
    constructor() {
        this.requestPromise = buildRequest();
    }
    async mutate(query: DocumentNode, variables = {}) {
        const request = await this.requestPromise;
        const response = await request.post('/graphql')
            .send({
                queryName: '',
                variables: variables,
                query: print(query)
            });
        return {
            text: response.text,
            response: response,
            error: response.error,
            result: JSON.parse(response.text).data
        }
    }
    async query(query: DocumentNode, variables = {}) {
        return this.mutate(query, variables);
    }
}
async function closeConnection() {
    try {
        const connection = await getConnection();
        if (connection) {
            await getConnection().close();
        }
    } catch {
    }
}
afterEach(async () => {
    await closeConnection();
});
export async function buildRequest(context = null) {
    await closeConnection();
    const app = await setupServer();
    return supertest(app);
}
export async function buildGraphQL() {
    const graphql = new GraphQL();
    // Make empty query to initialize app
    await graphql.mutate(gql`query { movies { id } }`, {});
    return graphql;
}