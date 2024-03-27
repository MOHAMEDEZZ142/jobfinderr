import multer, {diskStorage} from "multer";
export const uploadCloud= ()=>{
    const storage= diskStorage({});  // by default save file in "temp" folder 
    const multerUpload= multer({storage});
    return multerUpload;
};