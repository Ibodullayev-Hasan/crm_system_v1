import { ForbiddenException, NestMiddleware } from "@nestjs/common";
import { Request, Response } from "express";

export class DomenMiddleware implements NestMiddleware {
	private readonly allowedDomains = ['localhost', 'disappointed-romonda-ibodullayevdev-b2713e43.koyeb.app'];
	private readonly allowedIp = ['100.64.0.2'];

	use(req: Request, res: Response, next: (error?: Error | any) => void) {
		const host = req.headers.host?.split(':')[0] || '';

		const ipAdress = req.socket.remoteAddress?.replace(/^.*:/, '') || '';
		// console.log(ipAdress);
		// console.log(this.allowedDomains);
		
		if (!this.allowedDomains.includes(host)) {
			throw new ForbiddenException('Access denied');
		}

		next();
	}
}

