import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { IUser } from "../../../shared/interfaces";
import { Role } from "../../../shared/enums";
import * as mongoose from "mongoose"

export type UserDocument = User & mongoose.Document

@Schema({ timestamps: true })
export class User implements IUser {

	id: mongoose.Types.ObjectId

	@Prop({ required: true })
	full_name: string;

	@Prop({ required: true, unique: true })
	email: string;

	@Prop({ required: true })
	password: string;

	@Prop({ enum: Role, default: Role.Admin })
	role?: Role;

	@Prop()
	refresh_token?: string

	@Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Tenant', required: false })
	tenantId: mongoose.Types.ObjectId;
}

export const UserSchema = SchemaFactory.createForClass(User)