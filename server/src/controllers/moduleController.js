import { response } from "../helpers/Response.js";
import { ModuleModel } from "../models/moduleMode.js";

const moduleCtrl = {};

// Crear un nuevo módulo
moduleCtrl.createModule = async (req, res) => {
  try {
    const { title, description, createdBy } = req.body;

    const newModule = new ModuleModel({
      title,
      description,
      createdBy,
    });

    await newModule.save();

    response(res, 200, true, newModule, "Módulo creado exitosamente");
  } catch (error) {
    response(res, 500, false, null, error.message);
  }
};

// Obtener todos los módulos
moduleCtrl.getAllModules = async (req, res) => {
  try {
    const modules = await ModuleModel.find();
    response(res, 200, true, modules, "Módulos encontrados satisfactoriamente");
  } catch (error) {
    response(res, 500, false, null, error.message);
  }
};

// Obtener módulo por id
moduleCtrl.getModuleById = async (req, res) => {
  try {
    const module = ModuleModel.findById(req.params.moduleId);

    if (!module) {
      return response(res, 404, false, "", "Módulo no encontrado");
    }

    response(res, 200, true, "Módulo encontrado satisfactoriamente");
  } catch (error) {
    response(res, 500, false, null, error.message);
  }
};

// Actualizar módulo por id
moduleCtrl.updateModule = async (req, res) => {
  try {
    const { title, description } = req.body;
    const { moduleId } = req.params;

    const updateModule = await ModuleModel.findByIdAndUpdate(
      moduleId,
      { title, description },
      { new: true } // Devuelve el documento actualizado
    );

    if (!updateModule) {
      return response(res, 404, false, "", "Módulo no encontrado");
    }

    response(res, 200, true, "Módulo encontrado exitosamente");
  } catch (error) {
    response(res, 500, false, null, error.message);
  }
};

// Eliminar un módulo por su id
moduleCtrl.deleteModule = async (req, res) => {
  const module = ModuleModel.findByIdAndDelete(req.params.moduleId);

  if (!module) {
    return response(res, 404, false, "", "Módulo no encontrado");
  }

  try {
    response(res, 200, true, "Módulo encontrado exitosamente");
  } catch (error) {
    response(res, 500, false, null, error.message);
  }
};

export default moduleCtrl;