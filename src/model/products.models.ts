import {Schema, model} from "mongoose";


  
export interface IProduct extends Document {
    name: string;
    description?: string;
    category_id: string;
    price: number | string;
    created_at: string
  }
  

const ProductSchema = new Schema<IProduct>({
    name: {type: String, required: true},
    description : {type: String, required: false},
    category_id: {type: String, required: true},
    price: {type: String, required: true},
    created_at: {type: String, required: true}
});


const ProductModel= model<IProduct>("product_details", ProductSchema)

export default ProductModel;