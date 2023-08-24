import { model } from "mongoose";
import { MenuItem, menuItemSchema } from "./common/MenuItem";

const dishModel = model<MenuItem>("dish", menuItemSchema);

export default dishModel;
