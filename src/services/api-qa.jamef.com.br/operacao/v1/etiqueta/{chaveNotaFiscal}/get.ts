import Service from '../../../../..';
import ApiJamefComBrOperacaoV1EtiquetaChaveNotaFiscalGet from '../../../../../api.jamef.com.br/operacao/v1/etiqueta/{chaveNotaFiscal}/get';

const apiJamefComBrDocumentosV1NotaFiscalPost: ApiJamefComBrOperacaoV1EtiquetaChaveNotaFiscalGet =
	new ApiJamefComBrOperacaoV1EtiquetaChaveNotaFiscalGet();

export default class Class implements Service {
	url = 'https://api-qa.jamef.com.br/operacao/v1/etiqueta/' as const;

	method: ApiJamefComBrOperacaoV1EtiquetaChaveNotaFiscalGet['method'] =
		apiJamefComBrDocumentosV1NotaFiscalPost.method;

	declare request: Omit<
		ApiJamefComBrOperacaoV1EtiquetaChaveNotaFiscalGet['request'],
		'url'
	> & {
		url: `${typeof Class.prototype.url}${string}`;
	};

	declare response: ApiJamefComBrOperacaoV1EtiquetaChaveNotaFiscalGet['response'];

	instanceOfThisClass(request: this['request']): boolean {
		return (
			request.method === this.method &&
			request.url.length > this.url.length &&
			request.url.substring(0, this.url.length) === this.url
		);
	}

	async getResponse(
		...args: Parameters<
			typeof apiJamefComBrDocumentosV1NotaFiscalPost.getResponse
		>
	): ReturnType<
		ApiJamefComBrOperacaoV1EtiquetaChaveNotaFiscalGet['getResponse']
	> {
		return apiJamefComBrDocumentosV1NotaFiscalPost.getResponse(...args);
	}
}
