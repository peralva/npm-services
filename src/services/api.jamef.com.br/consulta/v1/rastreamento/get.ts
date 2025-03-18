import Service from '../../../..';

type CommonResponseBody<T> = {
	/** Código da situação da resposta
	 * @example 200
	 */
	situacao: T;

	/** Mensagem de erro ou sucesso
	 * @example 'O CNPJ do remetente ou Destinatário não foi informado'
	 */
	mensagem: string;

	/** ID de correlação para rastreamento
	 * @example '5bd2a69c-c0dc-42ff-95ba-444844495662'
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
	url = 'https://api.jamef.com.br/consulta/v1/rastreamento' as const;
	method = 'GET' as const;

	declare request: {
		url: typeof Class.prototype.url;
		method: typeof Class.prototype.method;
		headers: { Authorization: `Bearer ${string}.${string}.${string}` };
		query: (
			| {
					/** CNPJ/CPF do cliente que será responsável pelo pagamento do frete */
					documentoPagadorFrete: string;

					/** CNPJ/CPF do cliente remetente (Emissor da Nota Fiscal) */
					documentoRemetente?: string;

					/** CNPJ/CPF do cliente de destino (Recebedor da mercadoria) */
					documentoDestinatario?: string;
			  }
			| {
					/** CNPJ/CPF do cliente que será responsável pelo pagamento do frete */
					documentoPagadorFrete?: string;

					/** CNPJ/CPF do cliente remetente (Emissor da Nota Fiscal) */
					documentoRemetente: string;

					/** CNPJ/CPF do cliente de destino (Recebedor da mercadoria) */
					documentoDestinatario?: string;
			  }
			| {
					/** CNPJ/CPF do cliente que será responsável pelo pagamento do frete */
					documentoPagadorFrete?: string;

					/** CNPJ/CPF do cliente remetente (Emissor da Nota Fiscal) */
					documentoRemetente?: string;

					/** CNPJ/CPF do cliente de destino (Recebedor da mercadoria) */
					documentoDestinatario: string;
			  }
		) &
			(
				| {
						/** Número da nota fiscal eletrônica (NF-e) */
						numeroNotaFiscal: string;

						/** Número do conhecimento de transporte eletrônico (CT-e) */
						numeroConhecimento?: string;
				  }
				| {
						/** Número da nota fiscal eletrônica (NF-e) */
						numeroNotaFiscal?: string;

						/** Número do conhecimento de transporte eletrônico (CT-e) */
						numeroConhecimento: string;
				  }
			) & {
				/** Série da nota fiscal eletrônica (NF-e) */
				serieNotaFiscal?: string;

				/** Série do conhecimento de transporte eletrônico (CT-e) */
				serieConhecimento?: string;
			};
	};

	declare response:
		| (CommonResponse<200> & {
				body: {
					dado: {
						/** Detalhes do rastreamento */
						rastreamento: {
							/**
							 * @example 'Normal'
							 */
							tipo: string;

							remetente: {
								/**
								 * @example 'ZOO VAREJO DIGITAL LTDA'
								 */
								nome: string;

								/**
								 * @example 'SERRA'
								 */
								cidade: string;

								/**
								 * @example 'ES'
								 */
								uf: string;
							};
							destinatario: {
								/**
								 * @example 'EVERALDO GOMES'
								 */
								nome: string;

								/**
								 * @example 'TAQUARA'
								 */
								cidade: string;

								/**
								 * @example 'RS'
								 */
								uf: string;
							};
							conhecimento: {
								/** Numero do Conhecimento de Transporte Eletronico (CT-e)
								 * @example '003417216'
								 */
								numero: string;

								/** Serie do Conhecimento de Transporte Eletronico (CT-e)
								 * @example '1'
								 */
								serie: string;

								/** Chave do Conhecimento de Transporte Eletronico (CT-e)
								 * @example '32240320147617002608570010033495181906130624'
								 */
								chave: string;
							};
							notaFiscal: {
								/** Numero da Nota Fiscal (NF-e)
								 * @example '951004'
								 */
								numero: string;

								/** Serie da Nota Fiscal
								 * @example '1'
								 */
								serie: string;

								/** Chave da Nota Fiscal
								 * @example '32240371052559000537550020010574711359917785'
								 */
								chave: string;

								/** Numero do Pedido de compra
								 * @example '1705224'
								 */
								pedido: string;
							};
							frete: {
								/** Numero do Pedido de compra
								 * @example 73.84
								 */
								valorFrete: number;

								/** Data da Previsão de entrega */
								previsaoEntrega: Date;

								/** Link do Comprovante de entrega
								 * @example 'https://jamef-ms-prod-s3uploadfiles.s3.amazonaws.com/140033495181/DIGITALIZACAO/140033495181.pdf'
								 */
								urlComprovanteEntrega: string;
							};

							eventosRastreio: {
								data: Date;

								/**
								 * @example 'DOCUMENTO EMITIDO'
								 */
								status: string;

								/**
								 * @example '00'
								 */
								codigoOcorrencia: string;

								localOrigem: {
									/**
									 * @example 'SERRA'
									 */
									cidade: string;

									/**
									 * @example 'ES'
									 */
									uf: string;
								};

								localDestino: {
									cidade: string;
									uf: string;
								};
							}[];
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

	instanceOfThisClass(request: unknown): boolean {
		return (
			typeof request === 'object' &&
			request !== null &&
			'method' in request &&
			request.method === this.method &&
			'url' in request &&
			request.url === this.url
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
				dado.rastreamento.forEach((rastramento) => {
					rastramento.frete.previsaoEntrega = new Date(
						`${rastramento.frete.previsaoEntrega}T00:00:00-03:00`,
					);

					rastramento.eventosRastreio.forEach((eventoRastreio) => {
						eventoRastreio.data = new Date(`${eventoRastreio.data}-03:00`);
					});
				});
			});
		}

		return result;
	}
}
