import { model } from "mongoose";
import { MenuItem, menuItemSchema } from "./common/MenuItem";

const softDrinkModel = model<MenuItem>("softDrink", menuItemSchema);

export default softDrinkModel;
