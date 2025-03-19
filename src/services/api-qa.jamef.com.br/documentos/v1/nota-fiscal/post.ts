import Service from '../../../..';
import Production from '../../../../api.jamef.com.br/documentos/v1/nota-fiscal/post';

const production: Production = new Production();

export default class Class implements Service {
	url = 'https://api-qa.jamef.com.br/documentos/v1/nota-fiscal' as const;

	method: Production['method'] = production.method;

	declare request: Omit<Production['request'], 'url'> & {
		url: Class['url'];
	};

	declare response: Production['response'];

	instanceOfThisClass(request: Service['request']): boolean {
		return request.method === this.method && request.url === this.url;
	}

	async getResponse(
		...args: Parameters<typeof production.getResponse>
	): ReturnType<Production['getResponse']> {
		return production.getResponse(...args);
	}

	before(
		...args: Parameters<typeof production.before>
	): ReturnType<Production['before']> {
		return production.before(...args);
	}
}
