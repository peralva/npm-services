import Service from '../../..';

export default class Class implements Service {
	url = 'https://jsonplaceholder.typicode.com/posts/' as const;
	method = 'GET' as const;

	declare request: {
		url: `${typeof Class.prototype.url}${number}`;
		method: typeof Class.prototype.method;
	};

	declare response: {
		status: 200;
		body: {
			userId: number;
			id: number;
			title: string;
			body: string;
		};
	};

	instanceOfThisClass(request: unknown): boolean {
		return (
			typeof request === 'object' &&
			request !== null &&
			'method' in request &&
			request.method === this.method &&
			'url' in request &&
			typeof request.url === 'string' &&
			request.url.length > this.url.length &&
			request.url.substring(0, this.url.length) === this.url
		);
	}

	async getResponse(response: Response): Promise<typeof this.response> {
		return {
			status: response.status,
			body: await response.json(),
		} as typeof this.response;
	}
}
