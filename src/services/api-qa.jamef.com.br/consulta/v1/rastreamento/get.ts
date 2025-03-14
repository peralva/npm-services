import Service from '../../../..';
import Method from '../../../../../interfaces/Method';
import ApiJamefComBrConsultaV1RastreamentoGet from '../../../../api.jamef.com.br/consulta/v1/rastreamento/get';

const apiJamefComBrConsultaV1RastreamentoGet: ApiJamefComBrConsultaV1RastreamentoGet =
	new ApiJamefComBrConsultaV1RastreamentoGet();

export default class Class implements Service {
	url = 'https://api-qa.jamef.com.br/consulta/v1/rastreamento' as const;

	method: ApiJamefComBrConsultaV1RastreamentoGet['method'] =
		apiJamefComBrConsultaV1RastreamentoGet.method;

	declare request: Omit<
		ApiJamefComBrConsultaV1RastreamentoGet['request'],
		'url'
	> & {
		url: typeof Class.prototype.url;
	};

	declare response: ApiJamefComBrConsultaV1RastreamentoGet['response'];

	instanceOfThisClass(url: string, method: Method): boolean {
		return url === this.url && method === this.method;
	}

	async getResponse(
		...args: Parameters<
			typeof apiJamefComBrConsultaV1RastreamentoGet.getResponse
		>
	): ReturnType<ApiJamefComBrConsultaV1RastreamentoGet['getResponse']> {
		return apiJamefComBrConsultaV1RastreamentoGet.getResponse(...args);
	}
}
