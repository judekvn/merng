import passport from 'passport';
import { Strategy as FacebookStrategy } from 'passport-facebook';
import User from './data/models/User';
import UserLogin from './data/models/UserLogin';
import UserClaim from './data/models/UserClaim';
import UserProfile from './data/models/UserProfile';
import config from './config';

/**
 * Sign in with Facebook.
 */
passport.use(
  new FacebookStrategy(
    {
      clientID: config.auth.facebook.id,
      clientSecret: config.auth.facebook.secret,
      callbackURL: '/login/facebook/return',
      profileFields: [
        'displayName',
        'name',
        'email',
        'link',
        'locale',
        'timezone',
      ],
      passReqToCallback: true,
    },
    (req, accessToken, refreshToken, profile, done) => {
      /* eslint-disable no-underscore-dangle */
      const loginName = 'facebook';
      const claimType = 'urn:facebook:access_token';
      const fooBar = async () => {
        if (req.user) {
          const userLogin = await UserLogin.findOne({
            name: loginName,
            key: profile.id,
          });
          if (userLogin) {
            // There is already a Facebook account that belongs to you.
            // Sign in with that account or delete it, then link it with your current account.
            done();
          } else {
            const user = await User.create({
              email: profile._json.email,
            });
            await UserLogin.create({
              name: loginName,
              key: profile.id,
              user: user.id,
            });
            await UserClaim.create({
              type: claimType,
              value: profile.id,
              user: user.id,
            });
            await UserProfile.create({
              displayName: profile.displayName,
              gender: profile._json.gender,
              picture: `https://graph.facebook.com/${
                profile.id
              }/picture?type=large`,
              user: user.id,
            });
            done(null, {
              id: user.id,
              email: user.email,
              __typename: 'CurrentUser',
            });
          }
        } else {
          const userLoggedInBefore = await UserLogin.findOne({
            name: loginName,
            key: profile.id,
          }).populate('user', 'id email');
          if (userLoggedInBefore) {
            done(null, {
              id: userLoggedInBefore.user.id,
              email: userLoggedInBefore.user.email,
              __typename: 'CurrentUser',
            });
          } else {
            const userSameEmail = await User.findOne({
              email: profile._json.email,
            });
            if (userSameEmail) {
              // There is already an account using this email address. Sign in to
              // that account and link it with Facebook manually from Account Settings.
              done(null);
            } else {
              const user = await User.create({
                email: profile._json.email,
              });
              await UserLogin.create({
                name: loginName,
                key: profile.id,
                user: user.id,
              });
              await UserClaim.create({
                type: claimType,
                value: profile.id,
                user: user.id,
              });
              await UserProfile.create({
                displayName: profile.displayName,
                gender: profile._json.gender,
                picture: `https://graph.facebook.com/${
                  profile.id
                }/picture?type=large`,
                user: user.id,
              });
              done(null, {
                id: user.id,
                email: user.email,
                __typename: 'CurrentUser',
              });
            }
          }
        }
      };

      fooBar().catch(done);
    },
  ),
);

export default passport;
