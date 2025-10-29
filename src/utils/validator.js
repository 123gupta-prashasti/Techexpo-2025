const validator = require('validator');
// req.body me data present hoga
const validate = (data)=>{

    const mandatoryField = ['firstName', 'emailId', 'password'];

    const IsAllowed = mandatoryField.every((k)=>Object.keys(data).includes(k))
    if(!IsAllowed)
        throw new Error("Some field Missing");
    if(!validator.isEmail(data.emailId))
        throw new Error("Invalid email");   
    if(!validator.isStrongPassword(data.password))
    throw new Error("Weak Password");

}

module.exports = validate;