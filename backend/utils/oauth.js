import jwt from "jsonwebtoken";

export const generateTokenAndRedirect = (req, res) => {
  try {
    const user = req.user; // Passport sets this after successful auth
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
};
