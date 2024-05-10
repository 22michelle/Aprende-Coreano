import { response } from "../helpers/Response.js";
import { UserModel } from "../models/userModel.js";
import bcrypt from "bcrypt";
import { generateToken } from "../helpers/generateToken.js";
import jwt from "jsonwebtoken";

const userCtrl = {};

// Create User
userCtrl.register = async (req, res) => {
  try {
    const { email, password, name } = req.body;
    const userExists = await UserModel.findOne({ $or: [{ email }, { name }] });

    if (userExists) {
      if (userExists.email === email) {
        return response(
          res,
          409,
          false,
          "",
          "El correo electrónico ya existe en otro registro."
        );
      } else {
        return response(res, 409, false, "", "Nombre ya en uso");
      }
    }

    const salt = bcrypt.genSaltSync(10);
    const passwordHash = bcrypt.hashSync(password, salt);

    const newUser = new UserModel({ email, password: passwordHash, name });
    await newUser.save();

    const token = generateToken({ user: newUser._id });

    response(
      res,
      201,
      true,
      { ...newUser._doc, password: null, token },
      "Usuario creado"
    );
  } catch (error) {
    response(res, 500, false, null, error.message);
  }
};

// Login User
userCtrl.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });

    // Verificar si el usuario existe y si la contraseña es correcta
    if (!user || !bcrypt.compareSync(password, user.password)) {
      return response(res, 401, false, "", "Correo electrónico o contraseña incorrecta");
    }

    // Generar un token de autenticación válido
    const token = generateToken({ user: user._id });

    // Devolver el token junto con información del usuario (opcional)
    response(res, 200, true, { token, user }, "Bienvanid@ al curso de Aprende coreano");
  } catch (error) {
    response(res, 500, false, null, error.message);
  }
};

// Delete User
userCtrl.deleteUser = async (req, res) => {
  try {
    const { email } = req.params;
    const user = await UserModel.findOneAndDelete({ email });

    if (!user) {
      return response(res, 404, false, "", "Usuario no encontrado");
    }

    response(res, 200, true, null, "Usuario eliminado");
  } catch (error) {
    response(res, 500, false, null, error.message);
  }
};

// Update User
userCtrl.updateUser = async (req, res) => {
  try {
    const { email } = req.params;
    const { name } = req.body;

    const user = await UserModel.findOneAndUpdate(
      { email },
      { name },
      { new: true }
    );

    if (!user) {
      return response(res, 404, false, "", "Usuario no encontrado");
    }

    response(
      res,
      200,
      true,
      { ...user._doc, password: null },
      "Usuario actualizado"
    );
  } catch (error) {
    response(res, 500, false, null, error.message);
  }
};

// Get all Users
userCtrl.getAllUsers = async (req, res) => {
  try {
    const users = await UserModel.find();
    response(res, 200, true, users, "Users obtained successfully");
  } catch (error) {
    response(res, 500, false, null, error.message);
  }
};

// Get User by Token
userCtrl.getUserByToken = async (req, res) => {
  try {
    const { token } = req.params;

    if (!token) {
      return response(res, 400, false, "", "El token es requerido");
    }

    // Decodificar el token
    const decoded = jwt.verify(token, process.env.KEYWORD_TOKEN);
    const userId = decoded.user;

    const user = await UserModel.findById(userId);

    if (!user) {
      return response(res, 404, false, "", "Usuario no encontrado");
    }

    response(
      res,
      200,
      true,
      { ...user._doc, password: null, token },
      "Usuario encontrado"
    );
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      response(res, 401, false, null, "El token ha expirado");
    }
    response(res, 500, false, null, error.message);
  }
};

// Get User by Id
userCtrl.getUserById = async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.userId);

    if (!user) {
      return response(res, 404, false, "", "Usuario no encontrado");
    }

    response(res, 200, true, { ...user._doc, password: null }, "Usuario encontrado");
  } catch (error) {
    response(res, 500, false, null, error.message);
  }
};

// Get User by Email
userCtrl.getUserByEmail = async (req, res) => {
  try {
    const { email } = req.params;
    const user = await UserModel.findOne({ email });

    if (!user) {
      return response(res, 404, false, "", "Usuario no encontrado");
    }

    response(res, 200, true, { ...user._doc, password: null }, "Usuario encontrado");
  } catch (error) {
    response(res, 500, false, null, error.message);
  }
};


export default userCtrl;