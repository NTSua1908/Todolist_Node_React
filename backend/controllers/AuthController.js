const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const roleEnum = require("../common/enum/Role.enum");

class AuthController {
  async login(req, res) {
    const { username, password } = req.body;

    try {
      const user = await User.findOne({ username });
      if (user) {
        const isPasswordCorrect = bcrypt.compareSync(password, user.password);
        if (isPasswordCorrect) {
          const token = await generateToken(user);

          //Update refresh token
          user.refreshToken = token.refreshToken;
          await user.save();

          return res.status(200).json({
            username: user.username,
            displayName: user.displayName,
            token,
          });
        }
      }
    } catch (error) {
      return res.status(500).json(error);
    }
    return res.status(400).json({ message: "Username or password incorrect" });
  }

  //===============
  async refreshToken(req, res) {
    const refreshToken = req.body.refreshToken;
    if (refreshToken) {
      try {
        const user = await User.findOne({ refreshToken });
        if (!user) return res.sendStatus(403);

        jwt.verify(refreshToken, process.env.ACCESS_TOKEN_REFRESH);
        const token = await generateToken(user);

        user.refreshToken = token.refreshToken;
        await user.save();

        return res.status(200).json({ token });
      } catch (error) {
        return res.sendStatus(403);
      }
    }
    return res.sendStatus(401);
  }
}

const generateToken = async (user) => {
  await user.populate("roles");
  const roles = user.roles.map((role) => roleEnum[role.normalizeName]);

  const accessToken = jwt.sign(
    { id: user._id, username: user.username, roles },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: "60m",
    }
  );

  const refreshToken = jwt.sign(
    { id: user._id, username: user.username, roles },
    process.env.ACCESS_TOKEN_REFRESH,
    {
      expiresIn: "30d",
    }
  );

  return { accessToken, refreshToken };
};

module.exports = new AuthController();
