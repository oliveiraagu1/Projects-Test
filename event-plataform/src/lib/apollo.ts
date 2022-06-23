import { ApolloClient, InMemoryCache } from "@apollo/client";

export const client = new ApolloClient({
    uri: 'https://api-sa-east-1.graphcms.com/v2/cl4p3zxer1njr01z4dyeo1cv4/master',
    cache: new InMemoryCache()
})