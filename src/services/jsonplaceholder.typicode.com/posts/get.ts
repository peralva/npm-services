import Service from '../..';

export default class Class implements Service {
	url = 'https://jsonplaceholder.typicode.com/posts' as const;
	method = 'GET' as const;

	declare request: {
		url: typeof Class.prototype.url;
		method: typeof Class.prototype.method;
	};

	declare response: {
		status: 200;
		body: {
			userId: number;
			id: number;
			title: string;
			body: string;
		}[];
	};

	instanceOfThisClass(request: this['request']): boolean {
		return request.method === this.method && request.url === this.url;
	}

	async getResponse(response: Response): Promise<typeof this.response> {
		return {
			status: response.status,
			body: await response.json(),
		} as typeof this.response;
	}
}
