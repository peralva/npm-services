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
		query: { tipoRetorno: 'DADOS' };
	};

	declare response:
		| (CommonResponse<200> & {
				body: {
					dado: {
						etiquetas: {
							/** Numero da Nota Fiscal
							 * @example '123456'
							 */
							notaFiscal: string;

							/** Codigo barra do volume
							 * @example 'AB12345678'
							 */
							codigoBarra: string;

							/** Sequencia do volume
							 * @example 1
							 */
							sequenciaVolume: number;

							/** Endereco do Destino
							 * @example 'RUA EXEMPLO, 123'
							 */
							enderecoDestino: string;

							/** Complemento do Endereco
							 * @example 'APTO 101'
							 */
							complementoEndereco: string;

							/** Bairro do Destino
							 * @example 'BAIRRO CENTRAL'
							 */
							bairroDestino: string;

							/** Municipio Destino
							 * @example 'CIDADE FICTICIA'
							 */
							municipioDestino: string;

							/** Cep Destino
							 * @example '12345000'
							 */
							cepDestino: string;

							/** Nome Destinatario
							 * @example 'CLIENTE DESTINO LTDA'
							 */
							nomeDestino: string;

							/** Nome do Remetente
							 * @example 'EMPRESA REMETENTE SA'
							 */
							nomeRemetente: string;

							/** Setor Jamef
							 * @example '12'
							 */
							setor: string;

							/** Sigla Origem
							 * @example 'XYZ'
							 */
							siglaOrigem: string;

							/** Veiculo Coleta
							 * @example 'ABC123'
							 */
							veiculoColeta: string;

							/** Sigla Destino
							 * @example 'DEF'
							 */
							siglaDestino: string;

							/** Filial Via
							 * @example 'GHI'
							 */
							filialVia: string;

							/** Veiculo Entrega
							 * @example 'JKL456'
							 */
							veiculoEntrega: string;
						}[];
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
			request.query.tipoRetorno === 'DADOS' &&
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

		if (result.status === 200) {
			result.body.dado.forEach((dado) => {
				dado.etiquetas.forEach((etiqueta) => {
					etiqueta.sequenciaVolume = Number(etiqueta.sequenciaVolume);
				});
			});
		}

		return result;
	}
}
