import Service from '../../../../../..';
import Production from '../../../../../../api.jamef.com.br/operacao/v1/etiqueta/{chaveNotaFiscal}/get/dados';

const production: Production = new Production();

export default class Class implements Service {
	url = 'https://api-qa.jamef.com.br/operacao/v1/etiqueta/' as const;

	method: Production['method'] = production.method;

	declare request: Omit<Production['request'], 'url'> & {
		url: `${typeof Class.prototype.url}${string}`;
	};

	declare response: Production['response'];

	instanceOfThisClass(request: this['request']): boolean {
		return (
			request.method === this.method &&
			request.query.tipoRetorno === 'DADOS' &&
			request.url.length > this.url.length &&
			request.url.substring(0, this.url.length) === this.url
		);
	}

	async getResponse(
		...args: Parameters<typeof production.getResponse>
	): ReturnType<Production['getResponse']> {
		return production.getResponse(...args);
	}
}
