export const isValid= (schema)=>{
    return (req, res, next)=>{
        const copyReq= {...req.body, ...req.params, ...req.query};
        const validationResults= schema.validate(copyReq, {abortEarly: false});
        if(validationResults.error){
            const message= validationResults.error.details.map((error)=>error.message);
            return next(new Error(message));
        }  
        return next();
    };
};