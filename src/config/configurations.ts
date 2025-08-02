import "dotenv/config"

export const configs = {
	app: {
		port: parseInt((process.env.SERVER_PORT), 10) || 5000,
		env: process.env.NODE_ENV || 'development',
		version: process.env.APP_VERSION || "1",
		prefix: process.env.APP_PREFIX || "api"
	},
	db: {
		uri: process.env.MONGO_URL || ""
	},
	cors: {
		origin: process.env.CORS_ORIGIN
	},
	jwt: {
		secretKey: process.env.SECRET_KEY,
		accessTokenTime: process.env.JWT_ACCESS_EXPIRES_TIME,
		refreshTokenTime: process.env.JWT_REFRESH_EXPIRES_TIME,
		aesKey: process.env.AES_KEY
	}
}