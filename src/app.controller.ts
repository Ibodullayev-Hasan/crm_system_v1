
import { Get, Controller, Render, Res } from '@nestjs/common';
import { Response } from 'express';

@Controller()
export class AppController {
	@Get()
	getHello(@Res() res: Response) {
		res.render('hello', {name:"CRM"});
	}

}
