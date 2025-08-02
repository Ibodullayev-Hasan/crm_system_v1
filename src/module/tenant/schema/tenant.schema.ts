import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ITenant } from "../../../shared/interfaces";
import * as mongoose from "mongoose"
import { Subscription } from "../../subscription/schema/subscription.schema";

export type TenantDocument = Tenant & mongoose.Document

@Schema({ timestamps: true })
export class Tenant implements ITenant {

	@Prop({ required: true })
	tenant_name: string;

	@Prop({ required: true })
	adress: string;

	@Prop({ required: true })
	tenant_phone: string;

	@Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Subscription', default: null })
	subscription: Subscription | null;

	@Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User'})
	admin?: mongoose.Types.ObjectId;

}

export const TenantSchema = SchemaFactory.createForClass(Tenant)