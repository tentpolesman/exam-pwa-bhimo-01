const { customerTokenKey, expiredToken } = require('@config');
const { serialize } = require('cookie');

const requestGraph = require('../../graphql/request/index');

const query = `
    mutation getToken(
        $username: String!,
        $password: String!,
    ) {
        generateCustomerTokenCustom(
            username: $username,
            password: $password
        ) {
            token
        }
    }
`;

module.exports = async (req, res) => {
    try {
        const { username, password } = JSON.parse(req.body);

        const respondGql = await requestGraph(query, { username, password });
        if (respondGql.generateCustomerTokenCustom) {
            const serialized = serialize(customerTokenKey, respondGql.generateCustomerTokenCustom.token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict',
                maxAge: expiredToken,
                path: '/',
            });

            const serialized2 = serialize('isLogin', '1', {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'lax',
                maxAge: expiredToken,
                path: '/',
            });

            res.setHeader('Set-Cookie', [serialized, serialized2]);
            return res.status(201).json(respondGql.generateCustomerTokenCustom);
        }

        return res.status(500).send(respondGql);
    } catch (error) {
        console.log(error);
        return res.status(500).send(error);
    }
};
