import Service from '../../../..';
import ApiJamefComBrDocumentosV1NotaFiscalPost from '../../../../api.jamef.com.br/documentos/v1/nota-fiscal/post';

const apiJamefComBrDocumentosV1NotaFiscalPost: ApiJamefComBrDocumentosV1NotaFiscalPost =
	new ApiJamefComBrDocumentosV1NotaFiscalPost();

export default class Class implements Service {
	url = 'https://api-qa.jamef.com.br/documentos/v1/nota-fiscal' as const;

	method: ApiJamefComBrDocumentosV1NotaFiscalPost['method'] =
		apiJamefComBrDocumentosV1NotaFiscalPost.method;

	declare request: Omit<
		ApiJamefComBrDocumentosV1NotaFiscalPost['request'],
		'url'
	> & {
		url: typeof Class.prototype.url;
	};

	declare response: ApiJamefComBrDocumentosV1NotaFiscalPost['response'];

	instanceOfThisClass(request: this['request']): boolean {
		return request.method === this.method && request.url === this.url;
	}

	async getResponse(
		...args: Parameters<
			typeof apiJamefComBrDocumentosV1NotaFiscalPost.getResponse
		>
	): ReturnType<ApiJamefComBrDocumentosV1NotaFiscalPost['getResponse']> {
		return apiJamefComBrDocumentosV1NotaFiscalPost.getResponse(...args);
	}

	before(
		...args: Parameters<typeof apiJamefComBrDocumentosV1NotaFiscalPost.before>
	): ReturnType<ApiJamefComBrDocumentosV1NotaFiscalPost['before']> {
		return apiJamefComBrDocumentosV1NotaFiscalPost.before(...args);
	}
}
