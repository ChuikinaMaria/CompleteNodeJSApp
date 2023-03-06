import { App } from '../src/app';
import { boot } from '../src/main';
import request from 'supertest';

let application: App;

beforeAll(async () => {
	const { app } = await boot;
	application = app;
});

describe('Users e2e', () => {
	it('Register - error', async () => {
		const res = await request(application.app)
			.post('/users/register')
			.send({ email: '1@a.be', password: '1' });
		expect(res.statusCode).toBe(422);
	});

	it('Login - success', async () => {
		const res = await request(application.app)
			.post('/users/login')
			.send({ email: 'm@m.be', password: 'asdasdasd' });
		expect(res.body.jwt).not.toBeUndefined();
	});

	it('Login - wrong password', async () => {
		const res = await request(application.app)
			.post('/users/login')
			.send({ email: 'm@m.be', password: '!!!!!' });
		expect(res.statusCode).toBe(401);
	});

	it('Info - success', async () => {
		const login = await request(application.app)
			.post('/users/login')
			.send({ email: 'm@m.be', password: 'asdasdasd' });
		const res = await request(application.app)
			.get('/users/info')
			.set('Authorization', `Bearer ${login.body.jwt}`);

		expect(res.body.email).toBe('m@m.be');
	});

	it('Info - failed', async () => {
		const res = await request(application.app)
			.get('/users/info')
			.set('Authorization', `Bearer WrongToken`);

		expect(res.statusCode).toBe(401);
	});
});

afterAll(() => {
	application.close();
});

// {
// 	"email": "m@m.be",
// 	"password": "asdasdasd",
// 	"name": "SAShA"

// }
