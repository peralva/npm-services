import Method from '../interfaces/Method';
import Primitive from '../interfaces/Primitive';
import Json from '../interfaces/Json';

export default class Service {
	declare url: string;
	declare method: Method;

	declare request: {
		url: string;
		method: Service['method'];
		body?: Json;
		query?:
			| object
			| {
					key: string;
					value: Primitive;
			  }[];
	};

	declare response?: {
		body?: Json;
	};

	declare instanceOfThisClass: (request: this['request']) => boolean;
	declare before?: (request: never) => void;
	declare getResponse: (response: Response) => Promise<unknown>;
}
