import { Strategy } from "passport-google-oauth20";
import passport from "passport";
import dotenv from "dotenv";
import { User } from "../models/userModel.js";
dotenv.config();

var GoogleStrategy = Strategy;
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: "http://localhost:5000/api/auth/callback",
      passReqToCallback: true,
    },
    async (req, accessToken, refreshToken, profile, cb) => {
      console.log(profile);
    }
  )
);
