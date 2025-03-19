import Service from '../../../..';

export default class Class implements Service {
	url = 'https://pokeapi.co/api/v2/pokemon' as const;
	method = 'GET' as const;

	declare request: {
		url: Class['url'];
		method: Class['method'];
		query?: {
			offset?: number;
			limit?: number;
		};
	};

	declare response: {
		status: 200;
		body: {
			count: number;
			next: null | `${Class['url']}/?offset=${number}&limit=${number}`;
			previous: null | `${Class['url']}/?offset=${number}&limit=${number}`;
			results: {
				name: string;
				url: `${Class['url']}/${number}/`;
			}[];
		};
	};

	instanceOfThisClass(request: Service['request']): boolean {
		return request.method === this.method && request.url === this.url;
	}

	async getResponse(response: Response): Promise<typeof this.response> {
		return {
			status: response.status,
			body: await response.json(),
		} as typeof this.response;
	}
}
