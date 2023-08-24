import { model } from "mongoose";
import { MenuItem, menuItemSchema } from "./common/MenuItem";

const drinkModel = model<MenuItem>("drink", menuItemSchema);

export default drinkModel;
