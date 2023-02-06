import { Request, Response, NextFunction } from 'express';
import { BaseController } from '../common/base.controller';
import { HTTPError } from '../errors/http-error.class';
import { LoggerService } from '../logger/logger.service';
import {injectable, inject} from 'inversify'
import { TYPES } from '../types';
import { ILogger } from '../logger/logger.interface';
import 'reflect-metadata';


@injectable()
export class UserController extends BaseController {
	constructor(
		@inject(TYPES.ILogger) private loggerService: ILogger
	) {
		super(loggerService);
		this.bindRoutes([
			{path: '/register', method: 'post', func: this.register },
			{path: '/login', method: 'post', func: this.login}
		])
	}

	login(req: Request, res: Response, next: NextFunction) {
		//this.ok(res, 'login');
		next(new HTTPError(401, 'ошибка авторизации', 'login'));
	};

	register(req: Request, res: Response, next: NextFunction) {
		this.ok(res, 'register');
	};
}