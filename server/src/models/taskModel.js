import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const { Schema, model } = mongoose;

const TaskSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "El título es requerido"],
    },
    description: {
      type: String,
      required: [true, "La descripción es requerida"],
    },
    dueDate: {
      type: Date,
      required: [true, "La fecha de vencimiento es requerida"],
    },
    // id usuario que creo la task
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "El ID del creador del módulo es requerido"],
    },
    // array de ids para los estudiantes que fue asignada la task
    assignedTo: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    // array de ids de usuarios que han completado la task
    completedBy: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    // Una lista de URLs o nombres de archivos adjuntos a la tarea
    attachments: [String],
    status: {
      type: String,
      enum: ["pendiente", "completada"],
      default: "pendiente",
    },
  },
  {
    timestamps: true,
  }
);

// Agregar plugin para paginar resultados
TaskSchema.plugin(mongoosePaginate);

export const TaskModel = model("Task", TaskSchema);
