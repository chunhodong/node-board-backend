const KakaoStrategy = require('passport-kakao').Strategy;

const User = require('../models/member');
const bcrypt = require('bcrypt');

module.exports = (passport) => {
    passport.use(new KakaoStrategy({

        clientID: '56b95df96ccb51eec9663792dd7ca6ee',
        callbackURL: '/auth/kakao/callback'
    }, async (accessToken, refreshToken, profile, done) => {
        try {
            const exUser = await User.findUserBySns({ snsId: profile.id, provider: 'kakao' });
            if (exUser.length > 0) {
                done(null, exUser[0]);
            } else {
                const hash = await bcrypt.hash(profile._json.kaccount_email, 12);
                await User.createUserOne({
                    email: profile._json && profile._json.kaccount_email,
                    nick: profile.displayName,
                    password:hash,
                    snsId: profile.id,
                    provider: 'kakao',
                });
                const newUser = await User.findUserBySns({ snsId: profile.id, provider: 'kakao' });
                done(null, newUser[0]);
            }
        } catch (error) {
            console.error(error);
            done(error);
        }

    }));
};
