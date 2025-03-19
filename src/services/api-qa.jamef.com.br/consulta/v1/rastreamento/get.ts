import Service from '../../../..';
import Production from '../../../../api.jamef.com.br/consulta/v1/rastreamento/get';

const production: Production = new Production();

export default class Class implements Service {
	url = 'https://api-qa.jamef.com.br/consulta/v1/rastreamento' as const;

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
}
