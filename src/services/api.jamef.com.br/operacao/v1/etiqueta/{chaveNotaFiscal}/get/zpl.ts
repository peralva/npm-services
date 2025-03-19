import Service from '../../../../../..';

type CommonResponseBody<T> = {
	/** Código de status HTTP indicando a situação
	 * @example 200
	 */
	situacao: T;

	/** Mensagem de erro ou sucesso
	 * @example 'Operação realizada com sucesso'
	 */
	mensagem: string;

	/** Identificador único de correlação para rastreamento de logs e requisições
	 * @example '123e4567-e89b-12d3-a456-426614174000'
	 */
	idCorrelacao: `${string}-${string}-${string}-${string}-${string}`;

	/** Data e hora da resposta */
	dataHora: Date;
};

type CommonResponse<T> = {
	status: T;
	body: CommonResponseBody<T>;
};

type Errors = {
	/** Mensagem detalhada descrevendo o erro */
	errors: {
		/** Descrição detalhada do erro
		 * @example 'Detalhes do erro ocorrido durante a execução'
		 */
		detalhes: string;

		/** Nome do componente que causou o erro
		 * @example 'Componente específico que falhou'
		 */
		componenteFalho: string;
	}[];
};

export default class Class implements Service {
	url = 'https://api.jamef.com.br/operacao/v1/etiqueta/' as const;
	method = 'GET' as const;

	declare request: {
		url: `${Class['url']}${string}`;
		method: Class['method'];
		headers: { Authorization: `Bearer ${string}.${string}.${string}` };
		query: { tipoRetorno: 'ZPL' };
	};

	declare response:
		| (CommonResponse<200> & {
				body: {
					dado: {
						/** Etiquetas em ZPL
						 * @example '^XATA000JSN^LT0^MNW^MTT^PON...'
						 */
						etiquetasZPL: string[];

						/** Chave da Nota Fiscal
						 * @example '4.1240401610517e+43'
						 */
						chaveNotaFiscal: string;
					}[];
				};
		  })
		| {
				status: 429;
				body: {
					/**
					 * @example 'Quota has been exceeded'
					 */
					error: string;
				};
		  }
		| {
				status: 401;
				body: { error: string } | (CommonResponseBody<401> & Errors);
		  }
		| ((
				| CommonResponse<400>
				| CommonResponse<403>
				| CommonResponse<404>
				| CommonResponse<500>
				| CommonResponse<502>
				| CommonResponse<504>
		  ) & {
				body: Errors;
		  });

	instanceOfThisClass(request: Service['request']): boolean {
		return (
			request.method === this.method &&
			'query' in request &&
			'tipoRetorno' in request.query &&
			request.query.tipoRetorno === 'ZPL' &&
			request.url.length > this.url.length &&
			request.url.substring(0, this.url.length) === this.url
		);
	}

	async getResponse(response: Response): Promise<typeof this.response> {
		const result = {
			status: response.status,
			body: await response.json(),
		} as typeof this.response;

		if ('dataHora' in result.body) {
			result.body.dataHora = new Date(result.body.dataHora);
		}

		return result;
	}
}
