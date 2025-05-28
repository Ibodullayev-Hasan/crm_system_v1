import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ITenant } from "../../../shared/interfaces";
import * as mongoose from "mongoose"
import { Subscription } from "../../subscription/schema/subscription.schema";

export type TenantDocument = Tenant & mongoose.Document

@Schema()
export class Tenant implements ITenant {

	@Prop({ required: true })
	tenant_name: string;

	@Prop({ required: true })
	adress: string;

	@Prop({ required: true })
	tenant_phone: string;

	@Prop()
	createdAt: mongoose.Schema.Types.Date;

	@Prop()
	updatedAt: mongoose.Schema.Types.Date;

	@Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Subscription' })
	subscription: Subscription | null;

	@Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', unique: true })
	admin?: mongoose.Types.ObjectId;

}

export const TenantSchema = SchemaFactory.createForClass(Tenant)