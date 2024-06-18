import Joi from "joi";
import { ObjectId } from "mongodb";

export const tripValidation = (data)=>{

    const schema = Joi.object({

        name:Joi.string().min(3).max(20).required(),
        date:Joi.date().required(),
        trip_payment:Joi.number().required().min(0)
      
    })

    return schema.validate(data)
}

export const supplierValidation = (data)=>{

    const schema = Joi.object({

        name:Joi.string().min(3).max(20).required(),
        tripRef:Joi.string().min(3).max(40).required(),
        date:Joi.date().required(),
      
    })

    return schema.validate(data)
}

export const clientValidation = (data)=>{

    const schema = Joi.object({

        name:Joi.string().min(3).max(20).required(),
        phone:Joi.string().min(10).max(20).required(),
        supplierRef:Joi.string().min(3).max(40).required(),
        weight:Joi.number().min(1).required(),
        date:Joi.date()
      
    })

    return schema.validate(data)
}

export const deliveryValidation = (data)=>{

    const schema = Joi.object({

        name:Joi.string().min(3).max(20).required(),
        clientRef:Joi.string().min(3).max(40).required(),
        weight:Joi.number().min(0).required(),
        balance:Joi.number().min(0),
        date:Joi.date().required(),
        deliverer:Joi.string().min(3).max(40).required(),
      
    })

    return schema.validate(data)
}

export const paymentValidation = (data)=>{

    const schema = Joi.object({

        // name:Joi.string().min(3).max(20).required(),
        clientRef:Joi.string().min(20).max(40).required(),
        amount:Joi.number().min(0).required(),
        kg_rate:Joi.number().min(0).required(),
        date:Joi.date().required(),
        recieptNo:Joi.string().min(1).max(40).required(),
      
    })

    return schema.validate(data)
}

export const expenseValidation = (data)=>{

    const schema = Joi.object({

        // name:Joi.string().min(3).max(20).required(),
        tripRef:Joi.string().min(20).max(40).required(),
        tax:Joi.number().min(0).required(),
        transport:Joi.number().min(0).required(),
        market_fees:Joi.number().min(0).required(),
        date:Joi.date().required(),
        name:Joi.string().min(3).max(40).required(),
      
    })

    return schema.validate(data)
}

export const employeeValidation = (data)=>{

    const schema = Joi.object({

        name:Joi.string().min(3).max(20).required(),
        role:Joi.string().min(4).max(20).required(),
        email:Joi.string().max(20).required(),
        phone:Joi.string().min(10).required(),
        address:Joi.string().min(3).required(),
        date:Joi.date().required(),
        password:Joi.string().min(3).max(40).required(),
      
    })

    return schema.validate(data)
}

export const loginValidation = (data)=>{

    const schema = Joi.object({

        email:Joi.string().max(20).required(),
        password:Joi.string().min(3).max(40).required(),
      
    })

    return schema.validate(data)
}

// export const isValidObjectId=(id)=>{

//     if(ObjectId.isValid(id)){
//         if((String)(new ObjectId(id)) === id)
//             return true;
//         return false;
//     }
//     return false;

// }