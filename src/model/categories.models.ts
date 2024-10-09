import {Schema, model} from "mongoose";


export interface ICategory extends Document {
    name: string;
    created_at: string,
  }
  

const CategoriesSchema = new Schema<ICategory>({
    name: {type: String, required: true},
    created_at: {type: String, required: true}
});


const categoriesModel= model<ICategory>("categories", CategoriesSchema)

export default categoriesModel;