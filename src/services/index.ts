import Method from '../interfaces/Method';
import QueryValueType from '../interfaces/QueryValueType';

export default class Service {
	declare url: string;
	declare method: Method;

	declare request: {
		url: string;
		method: typeof Service.prototype.method;
		query?:
			| object
			| {
					key: string;
					value: QueryValueType;
			  }[];
	};

	declare response?: {
		body?: object | string;
	};

	declare instanceOfThisClass: (request: this['request']) => boolean;
	declare before?: (request: never) => void;
	declare getResponse: (response: Response) => Promise<unknown>;
}
