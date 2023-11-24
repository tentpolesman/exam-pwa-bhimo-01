/* eslint-disable no-param-reassign */
const { serialize } = require('cookie');
const requestGraph = require('../request');
const { expiredToken, customerTokenKey } = require('../../../../swift.config');

const query = `
    mutation getToken(
        $username: String!,
        $password: String!,
    ) {
        generateCustomerTokenCustom(username: $username, password: $password){
        token
        }
    }
`;

const internalGenerateCustomerToken = async (parent, { username, password }, context) => {
    const res = await requestGraph(query, { username, password }, context);
    if (res.generateCustomerTokenCustom) {
        if (context?.res) {
            const serialized = serialize(customerTokenKey, res.generateCustomerTokenCustom.token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict',
                maxAge: expiredToken,
                path: '/',
            });
            context.res.setHeader('Set-Cookie', serialized);
        }
        return {
            originalToken: '',
            token: '',
            message: 'success',
        };
    }
    return res;
};

module.exports = internalGenerateCustomerToken;
