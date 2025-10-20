const jwt = require('jsonwebtoken');

exports.generateToken = (res, userId, role) => {

    const token = jwt.sign({ userId, role }, process.env.JWT_SECRET, {
        expiresIn: '30d'
    });

    res.cookie('careerJwt', token, {
        httpOnly: true,
        secure: false,
        sameSite: 'Lax',
        maxAge: 30 * 24 * 60 * 60 * 1000 // 30 Days
    })
}