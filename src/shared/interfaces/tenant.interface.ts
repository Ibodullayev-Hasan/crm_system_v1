import { Date, Types } from "mongoose"
import { Subscription } from "../../module/subscription/schema/subscription.schema"
import { User } from "../../module/user/schema/user.schema"

export interface ITenant {
	tenant_name: string
	adress: string
	tenant_phone: string
	createdAt: Date
	updatedAt: Date
	subscription: Subscription | null
	admin?: User | Types.ObjectId
}