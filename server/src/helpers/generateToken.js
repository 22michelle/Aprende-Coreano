import jwt from "jsonwebtoken";

export const generateToken = (payload) => {
  try {
    if (!process.env.KEYWORD_TOKEN) {
      throw new Error("Secret key not found");
    }
    const token = jwt.sign(payload, process.env.KEYWORD_TOKEN, {
      expiresIn: "30d",
    });
    return token;
  } catch (error) {
    console.log("Error al generar token", error.message);
    throw error; // Puedes lanzar el error para que sea manejado por el código que llama a esta función
  }
};

