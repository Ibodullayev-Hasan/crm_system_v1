import { User } from "../module/user/schema/user.schema";

declare global {
	namespace Express {
		export interface Request {
			user?: User
		}
	}
}