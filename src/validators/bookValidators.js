import {check , validationResult} from "express-validator"

export const validateAddBook = [
    check('title')
        .notEmpty().withMessage('title is Required!'),
    check('author')
        .notEmpty().withMessage("Author is Required!"),
    check('publishedDate')
        .optional()
        .isISO8601().withMessage('Published date must be a valid date'),
    check('genre')
        .optional()
        .notEmpty().withMessage("Genre is Required!"),
    (req,res,next) =>{
        const errors = validationResult(req)
        if(!errors.isEmpty()){
            return res.status(400).json({errors:errors.array()});
        }
        next();
    }
    
];

export const validateUpdateBook = [
    check('title')
        .notEmpty().withMessage("title must not be Empty!"),
    check('author')
        .optional()
        .notEmpty().withMessage('Author is Required!'),
    check('publishedDate')
        .optional()
        .notEmpty().withMessage('published Date must be Valid!'),
    check('genre')
        .optional()
        .notEmpty().withMessage('genre must not be empty'),
    (req,res,next) => {
        const errors = validationResult(req)

        if(!errors.isEmpty()){
            return res.status(400).json({errors:errors.array()});
        }
        next();
    }
]
