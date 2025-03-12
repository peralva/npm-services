import Service from '../../..';
import Method from '../../../../interfaces/Method';

class Class implements Service {
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

	instanceOfThisClass(url: string, method: Method): boolean {
		return (
			url.substring(0, this.url.length) === this.url &&
			url.length > this.url.length &&
			method === this.method
		);
	}

	async getResponse(response: Response): Promise<typeof this.response> {
		return {
			status: response.status,
			body: await response.json(),
		} as typeof this.response;
	}
}

const jsonplaceholderTypicodeComPostsIdGet: Class = new Class();
export default jsonplaceholderTypicodeComPostsIdGet;
