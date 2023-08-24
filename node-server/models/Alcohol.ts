import { model } from "mongoose";
import { MenuItem, menuItemSchema } from "./common/MenuItem";

const alcoholModel = model<MenuItem>("alcohol", menuItemSchema);

export default alcoholModel;
