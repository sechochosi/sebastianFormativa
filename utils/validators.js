import Joi from "joi";

export const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required()
});

export const registerSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(10).required(),
  firstName: Joi.string().max(50).required(),
  lastName: Joi.string().max(50).required(),
  studentId: Joi.string().length(7).optional().allow(null),
  role: Joi.string().valid("student", "teacher", "admin", "coordinator").optional(),
  faculty: Joi.string().valid(
    "business_school",
    "ciencias_tecnicas",
    "arquitectura_diseno_arte",
    "ciencias_medicas_salud_vida",
    "jurisprudencia_ciencias_sociales_humanidades"
  ).required()
});

export const postSchema = Joi.object({
  title: Joi.string().max(200).required(),
  content: Joi.string().required(),
  category: Joi.string().valid("academic", "research", "news", "announcement").optional(),
  status: Joi.string().valid("draft", "published", "archived").optional()
});
