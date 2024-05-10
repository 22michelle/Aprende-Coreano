import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const { Schema, model } = mongoose;

const ModuleSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "El título es requerido"],
    },
    description: {
      type: String,
      required: [true, "La descripción es requerida"],
    },
    // ID del usuario que creó el módulo
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "El ID del creador del módulo es requerido"],
    },
    // Array de IDs de los estudiantes a los que se asignó el módulo
    assignedTo: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    // Array de IDs de usuarios que han completado el módulo
    completedBy: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    // Una lista de URLs o nombres de archivos adjuntos al módulo
    attachments: [String],
    status: {
      type: String,
      enum: ["pendiente", "completado"],
      default: "pendiente",
    },
  },
  {
    timestamps: true,
  }
);

// Agregar plugin para paginar resultados
ModuleSchema.plugin(mongoosePaginate);

export const ModuleModel = model("Module", ModuleSchema);3