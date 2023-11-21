const loginPassword = require('../../../core/api/rest/auth/loginWithPassword');

export default function handler(req, res) {
    loginPassword(req, res);
}
