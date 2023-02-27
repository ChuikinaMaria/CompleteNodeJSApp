import { App } from './app';
import { ExeptionFilter } from './errors/exeption.filter';
import { IExeptionFilter } from './errors/exeption.filter.interface';
import { LoggerService } from './logger/logger.service';
import { UserController } from './users/users.controller';
import { Container, ContainerModule, interfaces } from 'inversify';
import { TYPES } from './types';
import { ILogger } from './logger/logger.interface';
import { UserService } from './users/user.service';
import { IUserService } from './users/user.service.interface';
import { IUserController } from './users/users.controller.interface';
import { IConfigService } from './config/config.service.interface';
import { ConfigService } from './config/config.service';
import { PrismaService } from './common/database/prisma.service';
import { IUsersRepository } from './users/users.repository.interface';
import { UsersRepository } from './users/users.repository';

export interface IBootstrapReturn {
	appContainer: Container;
	app: App;
}

export const appBindings = new ContainerModule((bind: interfaces.Bind) => {
	bind<ILogger>(TYPES.ILogger).to(LoggerService).inSingletonScope();
	bind<IExeptionFilter>(TYPES.ExeptionFilter).to(ExeptionFilter);
	bind<IUserController>(TYPES.UserController).to(UserController);
	bind<IUserService>(TYPES.UserService).to(UserService);
	bind<PrismaService>(TYPES.PrismaService).to(PrismaService).inSingletonScope();
	bind<IConfigService>(TYPES.ConfigService).to(ConfigService).inSingletonScope();
	bind<IUsersRepository>(TYPES.UsersRepository).to(UsersRepository).inSingletonScope();
	bind<App>(TYPES.Application).to(App);
});

function bootstrap(): IBootstrapReturn {
	const appContainer = new Container();
	appContainer.load(appBindings);
	const app = appContainer.get<App>(TYPES.Application);
	app.init();
	return { app, appContainer };
}

export const { app, appContainer } = bootstrap();
