import { Types } from "mongoose";
import { Tenant } from "../../module/tenant/schema/tenant.schema";
import { SubscriptionPlan } from "../enums";

export interface ISubscription {
	plan:SubscriptionPlan
	isActive:boolean
	paidUntil:string
	paymentMethod:string	
	tenantId:Tenant | Types.ObjectId
}