import { Request, Response, NextFunction } from "express";
import { body, param, validationResult } from "express-validator"

const taskValidationRules = () => [
  body('title').notEmpty().withMessage('Title is required').isLength({ max: 150 }),
  body('description').optional().isString(),
  body('status').optional().isIn(['pending', 'completed'])
];

const idParamRule = () => [
  param('id').isMongoId().withMessage('Invalid task id')
];

const validate = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
  next();
};

export { taskValidationRules, idParamRule, validate }