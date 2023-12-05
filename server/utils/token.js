const jwt = require('jsonwebtoken'); // Import Json Web Token module

// Set hash algorithm
const header = { algorithm: process.env.ALG }

// ****************************** Access token **************************************
const mainToken = async (id, username, role) => {
        
    // Access token expiration : 7 days
    const exp = Date.now() + 1000 * 60 * 60 * 24 * 7;
    
    // Generate access token
    const token = await jwt.sign({ id, username, role, exp },
        process.env.ACCESS_TOKEN_SECRET, header)
    return token
}

// ****************************** Access token **************************************
const accessToken = async (id, username, role) => {
                              
    // Access token expiration : 15 min
    const exp = Date.now() + 1000 * 60 * 15;
        
    // Generate access token
    const token = await jwt.sign({ id, username, role, exp },
        process.env.ACCESS_TOKEN_SECRET, header)
    return token
}

// ****************************** Refresh token **************************************
const refreshToken = async (id, username, role) => {
                              
    // Access token expiration : 30 days
    const exp = Date.now() + 1000 * 60 * 60 * 24 * 30;
        
    // Generate access token
    const token = await jwt.sign({ id, username, role, exp },
        process.env.REFRESH_TOKEN_SECRET, header)
    return token
}

module.exports = { mainToken, accessToken, refreshToken }




