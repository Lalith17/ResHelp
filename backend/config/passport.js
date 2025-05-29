import passport from "passport";
import GoogleStrategy from "passport-google-oauth20";
import GitHubStrategy from "passport-github2";
import Auth from "../models/auth.model.js";
import dotenv from "dotenv";
dotenv.config();
passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser(async (id, done) => {
  const user = await Auth.findById(id);
  done(null, user);
});

// Google Strategy
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/api/auth/google/callback",
    },
    async (_, __, profile, done) => {
      let user = await Auth.findOne({ email: profile.emails[0].value });
      if (!user) {
        user = await Auth.create({
          email: profile.emails[0].value,
          provider: "google",
        });
      }
      done(null, user);
    }
  )
);

// GitHub Strategy
passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: "/api/auth/github/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let email =
          profile.emails?.[0]?.value || `${profile.username}@github.com`;

        // Find or create user
        let user = await Auth.findOne({ email });
        if (!user) {
          user = await Auth.create({
            email,
            provider: "github",
            github: {
              accessToken, // store token here
              username: profile.username,
            },
          });
        } else {
          // Update existing user's token
          user.github = user.github || {};
          user.github.accessToken = accessToken;
          user.github.username = profile.username;
          await user.save();
        }
        done(null, user);
      } catch (error) {
        done(error, null);
      }
    }
  )
);
