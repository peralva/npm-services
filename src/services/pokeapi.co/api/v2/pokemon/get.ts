import Service from '../../../..';

type Url = typeof Class.prototype.url;

export default class Class implements Service {
	url = 'https://pokeapi.co/api/v2/pokemon' as const;
	method = 'GET' as const;

	declare request: {
		url: Url;
		method: typeof Class.prototype.method;
		query?: {
			offset?: number;
			limit?: number;
		};
	};

	declare response: {
		status: 200;
		body: {
			count: number;
			next: null | `${Url}/?offset=${number}&limit=${number}`;
			previous: null | `${Url}/?offset=${number}&limit=${number}`;
			results: {
				name: string;
				url: `${Url}/${number}/`;
			}[];
		};
	};

	instanceOfThisClass(request: unknown): boolean {
		return (
			typeof request === 'object' &&
			request !== null &&
			'method' in request &&
			request.method === this.method &&
			'url' in request &&
			request.url === this.url
		);
	}

	async getResponse(response: Response): Promise<typeof this.response> {
		return {
			status: response.status,
			body: await response.json(),
		} as typeof this.response;
	}
}
