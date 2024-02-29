import { sequelize } from "../connection.js";
import { superUser } from "./superUser.model.js";
import { Publishment } from "./publishment.model.js";

export class Post extends Publishment{};
Post.init({},{sequelize, modelName:"post", timestamps:true});

superUser.hasMany(Post);
Post.belongsTo(superUser);

Post.belongsTo(Publishment);