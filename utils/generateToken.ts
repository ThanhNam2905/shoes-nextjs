import jwt from 'jsonwebtoken';

export const createAccessToken = (payload) => {
    return jwt.sign(payload, process.env.ACCESS_TOKEN_SERECT, {expiresIn: '15m'});
}

export const createRefreshToken = (payload) => {
    return jwt.sign(payload, process.env.REFRESH_TOKEN_SERECT, {expiresIn: '7d'});
}