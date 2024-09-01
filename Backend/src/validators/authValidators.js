import {check , validationResult} from "express-validator"

export const validateRegister = [
    check('username')
        .notEmpty().withMessage('username is required')
        .isLength({min:3}).withMessage("username must be atleast 3 charachters long"),
    check('email')
        .isEmail().withMessage('please provide a valid message'),
    check('preferredGenre')
        .notEmpty().withMessage('please provide a Genre'),
    check('password')
        .isLength({min:6}).withMessage('Password atleast must have 6 chracters long '),
    (req,res,next) =>{
        const errors = validationResult(req)
        if(!errors.isEmpty()){
            return res.status(400).json({errors:errors.array()})
        }
        next();
    }
        
];
export const validateLogin =[
    check('password')
        .notEmpty().withMessage('password is required!'),
    (req,res,next) =>{
        const errors = validationResult(req)
        if(!errors.isEmpty()){
            return res.status(400).json({errors:errors.array()});
        }
        next();
    }
];
