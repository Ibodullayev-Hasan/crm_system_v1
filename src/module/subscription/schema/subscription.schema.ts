import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ISubscription } from "../../../shared/interfaces";
import { SubscriptionPlan } from "../../../shared/enums";
import { Document } from "mongoose";
import * as mongoose from "mongoose"


export type SubscriptionDocument = Subscription & Document

@Schema({ timestamps: true })
export class Subscription implements ISubscription {

	@Prop({ enum: SubscriptionPlan, default: SubscriptionPlan.Standart })
	plan: SubscriptionPlan;

	@Prop({ required: true })
	isActive: boolean;

	@Prop({ required: true })
	paidUntil: string;

	@Prop({ required: true })
	paymentMethod: string;

	@Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Tenant', required: true })
	tenantId: mongoose.Types.ObjectId;

}

export const SubscriptionSchema = SchemaFactory.createForClass(Subscription)