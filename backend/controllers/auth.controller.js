import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Auth from "../models/auth.model.js";
import fetch from "node-fetch";
export const signUp = async (req, res) => {
  const { email, password } = req.body;

  const existingUser = await Auth.findOne({ email });
  if (existingUser)
    return res.status(400).json({ message: "Email already registered" });

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new Auth({ email, password: hashedPassword });
  try {
    await newUser.save();

    const token = jwt.sign({ id: newUser._id }, process.env.JWT_TOKEN, {
      expiresIn: "1h",
    });

    res.status(201).json({
      token,
      user: {
        id: newUser._id,
        email: newUser.email,
      },
    });
  } catch (error) {
    res.status(500).json({ error, message: "Server error" });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    // Find user by email
    const user = await Auth.findOne({ email });
    if (!user) return res.status(400).json({ message: "User not found" });

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid email or password" });

    // Generate JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_TOKEN, {
      expiresIn: "1h",
    });

    res.status(201).json({
      token,
      user: {
        id: user._id,
        email: user.email,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const getUser = async (req, res) => {
  const userId = req.user.id;
  try {
    const user = await Auth.findById(userId).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
export const updatePassword = async (req, res) => {
  const { userId, currentPassword, newPassword } = req.body;

  try {
    const user = await Auth.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    // Verify current password
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch)
      return res.status(401).json({ message: "Current password is incorrect" });

    // Hash and update the new password
    const hashedNewPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedNewPassword;

    await user.save();

    res.status(200).json({
      message: "Password updated successfully",
      user: {
        id: user._id,
        email: user.email,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const linkedinCallback = async (req, res) => {
  try {
    const { code } = req.query;

    // 1. Exchange code for access token
    const tokenRes = await fetch(
      "https://www.linkedin.com/oauth/v2/accessToken",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          grant_type: "authorization_code",
          client_id: process.env.LINKEDIN_CLIENT_ID,
          client_secret: process.env.LINKEDIN_CLIENT_SECRET,
          redirect_uri: "http://localhost:5000/api/auth/linkedin/callback",
          code,
        }),
      }
    );

    if (!tokenRes.ok) {
      const errText = await tokenRes.text();
      return res
        .status(400)
        .json({ error: "Failed to get access token", details: errText });
    }

    const { access_token } = await tokenRes.json();
    // 2. Fetch user info
    const userRes = await fetch("https://api.linkedin.com/v2/userinfo", {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });

    if (!userRes.ok) {
      const errText = await userRes.text();
      return res
        .status(400)
        .json({ error: "Failed to fetch user data", details: errText });
    }

    const userData = await userRes.json();
    let user = await Auth.findOne({ email: userData.email });
    if (!user) {
      user = await Auth.create({
        email,
        provider: "linkedin",
        linkedin: {
          accessToken: access_token,
          linkedinId: userData.sub,
          firstName: userData.given_name,
          lastName: userData.family_name,
        },
      });
    } else {
      // Update existing user's token
      user.linkedin = user.linkedin || {};
      user.linkedin.accessToken = access_token;
      user.linkedin.linkedinId = userData.sub;
      user.linkedin.firstName = userData.given_name;
      user.linkedin.lastName = userData.family_name;
      await user.save();
    }

    // 4. Generate token
    try {
      const token = jwt.sign(
        { id: user._id, email: user.email },
        process.env.JWT_TOKEN,
        {
          expiresIn: "1d",
        }
      );
      // Redirect to frontend with token
      res.redirect(`${process.env.FRONTEND_URL}/oauth-success?token=${token}`);
    } catch (error) {
      res.status(500).json({ message: "OAuth token generation failed" });
    }
  } catch (error) {
    console.error("LinkedIn OAuth error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const linkedin = async (req, res) => {
  const params = new URLSearchParams({
    response_type: "code",
    client_id: process.env.LINKEDIN_CLIENT_ID,
    redirect_uri: "http://localhost:5000/api/auth/linkedin/callback",
    scope: "openid email profile",
  });

  const authUrl = `https://www.linkedin.com/oauth/v2/authorization?${params}`;
  res.redirect(authUrl);
};
