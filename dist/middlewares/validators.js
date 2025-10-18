"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate = exports.idParamRule = exports.taskValidationRules = void 0;
const express_validator_1 = require("express-validator");
const taskValidationRules = () => [
    (0, express_validator_1.body)('title').notEmpty().withMessage('Title is required').isLength({ max: 150 }),
    (0, express_validator_1.body)('description').optional().isString(),
    (0, express_validator_1.body)('status').optional().isIn(['pending', 'completed'])
];
exports.taskValidationRules = taskValidationRules;
const idParamRule = () => [
    (0, express_validator_1.param)('id').isMongoId().withMessage('Invalid task id')
];
exports.idParamRule = idParamRule;
const validate = (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty())
        return res.status(400).json({ errors: errors.array() });
    next();
};
exports.validate = validate;
