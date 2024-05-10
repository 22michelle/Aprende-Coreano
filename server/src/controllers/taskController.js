import { response } from "../helpers/Response.js";
import { TaskModel } from "../models/taskModel.js";

const taskCtrl = {};

// Crear una nueva tarea
taskCtrl.createTask = async (req, res) => {
  try {
    const { title, description, dueDate, createdBy } = req.body;

    const newTask = new ModuleTask({
      title,
      description,
      dueDate,
      createdBy,
    });

    await newTask.save();

    response(res, 200, true, newTask, "Task creada exitosamente");
  } catch (error) {
    response(res, 500, false, null, error.message);
  }
};

// Obtener todas las tareas con su estado
taskCtrl.getAllTasksWithStatus = async (req, res) => {
  try {
    // Encuentra todas las tareas en la base de datos
    const tasks = await TaskModel.find();

    // Prepara las tareas para ser devueltas con su estado
    const tasksWithStatus = tasks.map(task => ({
      _id: task._id,
      title: task.title,
      description: task.description,
      dueDate: task.dueDate,
      status: task.status // Devuelve el estado de la tarea
    }));

    // Retorna las tareas con su estado
    response(res, 200, true, tasksWithStatus, "Tareas encontradas satisfactoriamente");
  } catch (error) {
    response(res, 500, false, null, error.message);
  }
};
// Obtener tarea por id
taskCtrl.getTaskById = async (req, res) => {
  try {
    const task = TaskModel.findById(req.params.moduleId);

    if (!task) {
      return response(res, 404, false, "", "Tarea no encontrada");
    }

    response(res, 200, true, "Tarea encontrada satisfactoriamente");
  } catch (error) {
    response(res, 500, false, null, error.message);
  }
};

// Actualizar tarea por id
taskCtrl.updateTask = async (req, res) => {
  try {
    const { title, description, dueDate, assignedTo, attachments  } = req.body;
    const { taskId } = req.params;

    const updateTask = await TaskModel.findByIdAndUpdate(
      taskId,
      { title, description, dueDate, assignedTo, attachments },
      { new: true } // Devuelve el documento actualizado
    );

    if (!updateTask) {
      return response(res, 404, false, "", "Tarea no encontrada");
    }

    response(res, 200, true, "Tarea encontrada exitosamente");
  } catch (error) {
    response(res, 500, false, null, error.message);
  }
};

// Eliminar un tarea por su id
taskCtrl.deleteTask = async (req, res) => {
  const task = TaskModel.findByIdAndDelete(req.params.taskId);

  if (!task) {
    return response(res, 404, false, "", "Tarea no encontrada");
  }

  try {
    response(res, 200, true, "Tarea encontrada exitosamente");
  } catch (error) {
    response(res, 500, false, null, error.message);
  }
};



export default taskCtrl;