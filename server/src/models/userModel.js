import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import mongoosePaginate from "mongoose-paginate-v2";

const { Schema, model } = mongoose;

const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "El nombre es requerido"],
      unique: true,
    },
    email: {
      type: String,
      required: [true, "El email es requerido"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^[\w-]+@([\w-]+\.)+[\w-]{2,4}$/, "Please, enter a valid email"],
    },
    password: {
      type: String,
      required: [true, "L a contraseña es requerida"],
      minlength: [6, "La contraseña debe tener al menos 6 caracteres."],
    },
    role: {
      type: String,
      enum: ["student", "teacher"],
      default: "student",
    },
  },
  {
    timestamps: true,
  }
);

// Metodo para comparar contraseña
UserSchema.method.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Metodo para generar JWT token
UserSchema.methods.generateAuthToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_SECRET,
  });
};

// Agregar plugin para paginar resultados
UserSchema.plugin(mongoosePaginate);

export const UserModel = model("User", UserSchema);
