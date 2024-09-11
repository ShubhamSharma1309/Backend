import {asyncHandler} from "../utils/asyncHandler.js";

const registerUser = asyncHandler( async (req,res) => {
    res.status(200).json({
        message : "ok"
    })
} )


export {registerUser}





// yeh method run kab hoga jab koi url hit karega ,, jaise user url hit kiya toh yeh controller aajayega...