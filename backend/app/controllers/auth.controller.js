const config = require("../config/config");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const db = require("../models");
const User = db.user;
const Role = db.role;
// const Invoice = db.invoice;

responsePayload = (status, message, payload) => ({
  status,
  message,
  payload,
});

exports.signup = async (req, res) => {
  try {
    const role = await Role.findOne({
      where: {
        name: req.body.role,
      },
    });
    if (!role)
      return res
        .status(400)
        .json(responsePayload(false, "Role code không tồn tại!", null));

    const hashedPassword = bcrypt.hashSync(req.body.password, 8);

    const user = await User.create({
      email: req.body.email,
      password: hashedPassword,
    });

    await user.setRole(role);

    res.json(
      responsePayload(
        true,
        "Đăng ký tài khoản thành công! Vui lòng trở lại đăng nhập để tiếp tục!",
        user
      )
    );
  } catch (err) {
    res.status(500).json(responsePayload(false, err.message, null));
  }
};

exports.signin = async (req, res) => {
  try {
    const user = await User.findOne({
      where: {
        email: req.body.email,
      },
      include: [Role], // Include the Role model
    });

    if (!user) {
      return res
        .status(400)
        .json(responsePayload(false, "Người dùng này không tồn tại!", null));
    }

    let passwordIsValid = bcrypt.compareSync(req.body.password, user.password);

    if (!passwordIsValid) {
      return res
        .status(401)
        .json(responsePayload(false, "Mật khẩu không đúng!", null));
    }

    // Generate JWT token with user role
    let token = jwt.sign(
      {
        id: user.id,
        role: user.role ? user.role.roleCode : "guest", // Get user roleCode or use 'guest' as default
      },
      config.auth.secret,
      {
        expiresIn: 86400, // 24 hours
      }
    );

    res.json(
      responsePayload(true, "Đăng nhập thành công!", {
        accessToken: token,
        user: {
          id: user.id,
          email: user.email,
          role: user.role ? user.role.name : "guest", // Get user role name or use 'guest' as default
        },
      })
    );
  } catch (err) {
    res.status(500).json(responsePayload(false, err.message, null));
  }
};
