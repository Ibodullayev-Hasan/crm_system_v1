import { Types } from "mongoose"
import { Role } from "../enums"
import { Tenant } from "../../module/tenant/schema/tenant.schema"

export interface IUser {
	full_name: string
	email: string
	password: string
	tenantId?: Tenant | Types.ObjectId
	role?: Role
	refresh_token?: string
}