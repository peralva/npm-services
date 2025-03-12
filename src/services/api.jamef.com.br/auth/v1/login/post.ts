import Service from '../../../..';
import Method from '../../../../../interfaces/Method';

type CommonBody = {
	situacao: number;
	mensagem: string;
	idCorrelacao: `${string}-${string}-${string}-${string}-${string}`;
	dataHora: `${number}-${number}-${number}T${number}:${number}:${number}.${number}-03:00`;
};

class Class implements Service {
	url = 'https://api.jamef.com.br/auth/v1/login' as const;
	method = 'POST' as const;

	declare request: {
		url: typeof Class.prototype.url;
		method: typeof Class.prototype.method;
		headers: { 'Content-Type': 'application/json' };
		body: {
			username: string;
			password: string;
		};
	};

	declare response:
		| {
				status: 200;
				body: CommonBody & {
					situacao: 200;
					dado: [
						{
							accessToken: string;
							refreshToken: string;
							expiresIn: number;
						},
					];
				};
		  }
		| {
				status: 401;
				body: CommonBody & {
					situacao: 401;
					errors: {
						detalhes: string;
						componenteFalho: string;
					}[];
				};
		  }
		| {
				status: 429;
				body: { error: string };
		  };

	instanceOfThisClass(url: string, method: Method): boolean {
		return url === this.url && method === this.method;
	}

	async getResponse(response: Response): Promise<typeof this.response> {
		return {
			status: response.status,
			body: await response.json(),
		} as typeof this.response;
	}
}

const apiJamefComBrAuthV1LoginPost: Class = new Class();
export default apiJamefComBrAuthV1LoginPost;
