const authModel = require("../models/user.model");
const fileService = require("./file.service");
const bcrypt = require("bcrypt");
const tokenService = require("./token.service");
const { use } = require("../routes/post.route");
const mailService = require("./mail.service");
const UserDto = require("../dtos/user.dto");
const BaseError = require("../errors/base.error");
const userModel = require("../models/user.model");

class AuthService {
  async register(email, password) {
    const existUser = await authModel.findOne({ email });
    if (existUser) {
      throw BaseError.BadRequest(`This user ${email} already exist`);
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const user = await authModel.create({ email, password: hashPassword });

    await mailService.sendMail(
      email,
      `${process.env.API_URL}/api/auth/activation/${user.id}`
    );
    const tokens = tokenService.generateToken({ ...user });
    await tokenService.saveToken(user.id, tokens.refreshToken);
    return { user: user, ...tokens };
  }
  async activation(userId) {
    const user = await authModel.findById(userId);
    if (!user) {
      throw BaseError.BadRequest("User is not found");
    }
    user.isActivated = true;
    await user.save(); //bu malumotlar bazasidan ham o'zgartirib quyish
  }
  async login(email, password) {
    const user = await authModel.findOne({ email });

    if (!user) {
      throw BaseError.BadRequest("User is not defined ");
    }
    const isPassword = await bcrypt.compare(password, user.password);
    if (!isPassword) {
      throw BaseError.BadRequest("password is not correct");
    }
    const tokens = tokenService.generateToken({ ...user });
    await tokenService.saveToken(user.id, tokens.refreshToken);
    return { user: user, ...tokens };
  }
  async logout(refreshToken) {
    const token = await tokenService.removeToken(refreshToken);
    return token;
  }
  async refresh(refreshToken) {
    if (!refreshToken) {
      throw BaseError.UnauthorizedError("Bad authonization");
    }
    const userPayload = tokenService.validateRefreshToken(refreshToken);
 
    const tokenDB = await tokenService.findToken(refreshToken);
    if (!userPayload || !tokenDB) {
      throw BaseError.UnauthorizedError("Bad authonization");
    }
    const user = await authModel.findById(userPayload._doc._id);

    const tokens = tokenService.generateToken({ ...user });
    await tokenService.saveToken(user.id, tokens.refreshToken);
    return { user: user, ...tokens };
  }

  async getUsers(){
    return await userModel.find();
  }
}
module.exports = new AuthService();
