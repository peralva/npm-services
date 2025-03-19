import Service from '../../../..';
import { CustomDate } from '@peralva/custom-date';
import { validateCpfCnpj } from '@peralva/validate-cpf-cnpj';

type CommonResponseBody<T> = {
	/** Código de status HTTP indicando a situação
	 * @example 200
	 */
	situacao: T;

	/** Mensagem detalhada descrevendo a situação
	 * @example 'Operação realizada com sucesso'
	 */
	mensagem: string;

	/** Identificador único de correlação para rastreamento de logs e requisições
	 * @example 'c1982708-d2dd-44aa-9236-99b2a9d65b2a'
	 */
	idCorrelacao: `${string}-${string}-${string}-${string}-${string}`;

	/** Data e hora do momento da requisição */
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
	url = 'https://api.jamef.com.br/documentos/v1/nota-fiscal' as const;
	method = 'POST' as const;

	declare request: {
		url: typeof Class.prototype.url;
		method: typeof Class.prototype.method;
		headers: {
			'Content-Type': 'application/json';
			Authorization: `Bearer ${string}.${string}.${string}`;
		};
		body:
			| {
					/** Código da filial Jamef
					 * @example '06'
					 */
					codigoFilialJamef: string;

					/** XML codificado em Base64
					 * @example 'PD94bWwgdmVyc2lvbj0iMS4wIj8+CgotPG5mZVByb2MgeG1sbnM9Imh0dHA6Ly93d3cucG9ydGFsZmlzY2FsLmluZi5ici9uZmUiIHZlcnNhbz0iNC4wMCI+CgoKLTxORmUgeG1sbnM9Imh0dHA6Ly93d3cucG9ydGFsZmlzY2FsLmluZi5ici9uZmUiPgoKCi08aW5mTkZlIHZlcnNhbz0iNC4wMCIgSWQ9Ik5GZTMzMjIwNzAyODkwOTc5MDAwMTQ2NTUwNTUwMDEyNTA2MjcxMjM5MTE5MTAzIj4KCgotPGlkZT4KCjxjVUY+MzM8L2NVRj4KCjxjTkY+MjM5MTE5MTA8L2NORj4KCjxuYXRPcD5WRU5EQSBERSBNRVJDQURPUklBIFNVSkVJVEEgQU8gUkVHSU1FIERFIFMuVC4tU1VCU1RJVFVUTzwvbmF0T3A+Cgo8bW9kPjU1PC9tb2Q+Cgo8c2VyaWU+NTU8L'
					 */
					xmlBase64: string;
			  }
			| {
					/** Array de notas fiscais a serem processadas */
					notasFiscais: {
						/** Objeto com os dados do remetente */
						remetente: {
							/** CNPJ/CPF do Remetente
							 * @example '12345678000123'
							 */
							documento: string;

							/** Nome do Remetente
							 * @example 'EMPRESA EXEMPLO LTDA'
							 */
							nome: string;

							/** Logradouro do Remetente
							 * @example 'RUA DAS FLORES'
							 */
							logradouro: string;

							/** Número do endereço do Remetente
							 * @example '500'
							 */
							numeroEndereco: string;

							/** Complemento do endereço do Remetente
							 * @example 'BLOCO A'
							 */
							complementoEndereco?: string;

							/** Bairro do Remetente
							 * @example 'CENTRO'
							 */
							bairro: string;

							/** Código IBGE do Município do Remetente
							 * @example '1234567'
							 */
							codigoIbge: string;

							/** Município do Remetente
							 * @example 'EXEMPLOMUNI'
							 */
							municipio: string;

							/** Estado do Remetente
							 * @example 'EX'
							 */
							estado: string;

							/** Cep do Remetente
							 * @example '12345000'
							 */
							cep: string;

							/** Telefone do Remetente
							 * @example '40028922'
							 */
							telefone?: string;

							/** Inscrição Estadual do Remetente (ISENTO se PF)
							 * @example 'ISENTO'
							 */
							inscricaoEstadual?: string;

							/** E-mail do Remetente
							 * @example 'contato@exemplo.com'
							 */
							email?: string;
						};

						/** Objeto com os dados do destinatário */
						destinatario: {
							/** CNPJ/CPF do Destinatário
							 * @example '98765432000198'
							 */
							documento: string;

							/** Nome do Destinatário
							 * @example 'CLIENTE EXEMPLAR S/A'
							 */
							nome: string;

							/** Logradouro do Destinatário
							 * @example 'AV. DOS NEGÓCIOS'
							 */
							logradouro: string;

							/** Número do endereço do Destinatário
							 * @example '1000'
							 */
							numeroEndereco: string;

							/** Complemento do endereço do Destinatário
							 * @example 'TORRE 2'
							 */
							complementoEndereco?: string;

							/** Bairro do Destinatário
							 * @example 'NEGÓCIOS'
							 */
							bairro: string;

							/** Código IBGE do Município do Destinatário
							 * @example '7654321'
							 */
							codigoIbge: string;

							/** Indicador de Inscrição Estadual. Valores possíveis:
							 *
							 * 1 - Contribuinte ICMS
							 *
							 * 2 - Isento
							 *
							 * 3 - Não contribuinte

							 * @example '1'
							 */
							indicadorInscricaoEstadual: '1' | '2' | '3';

							/** Município do Destinatário
							 * @example 'EXEMPLOMUNI'
							 */
							municipio: string;

							/** Estado do Destinatário
							 * @example 'NG'
							 */
							estado: string;

							/** CEP do Destinatário
							 * @example '98765000'
							 */
							cep: string;

							/** Telefone do Destinatário
							 * @example '08001234567'
							 */
							telefone?: string;

							/** Inscrição Estadual do Destinatário (ISENTO se PF)
							 * @example '123456789'
							 */
							inscricaoEstadual?: string;

							/** E-mail do Destinatário
							 * @example 'exemplo@cliente.com'
							 */
							email?: string;
						};

						/** Objeto com os dados do consignatario (Só deve ser preenchido caso
						 * houver)
						 */
						consignatario?: {
							/** CNPJ/CPF do Consignatário */
							documento: string;

							/** Nome do Consignatário */
							nome: string;

							/** Logradouro do Consignatário */
							logradouro: string;

							/** Complemento do endereço do Consignatário */
							complementoEndereco?: string;

							/** Bairro do Consignatário */
							bairro: string;

							/** Código IBGE do Município do Consignatário */
							codigoIbge: string;

							/** Município do Consignatário */
							municipio: string;

							/** Estado do Consignatário */
							estado: string;

							/** CEP do Consignatário */
							cep: string;

							/** Telefone do Consignatário */
							telefone?: string;

							/** Inscrição Estadual do Consignatário (ISENTO se PF) */
							inscricaoEstadual?: string;

							/** E-mail do Consignatário */
							email?: string;
						};

						/** Objeto com os dados do local de entrega (Só deve ser preenchido caso
						 * a entrega for em local diferente do endereço do destinatário)
						 */
						localentrega?: {
							/** CNPJ/CPF do Recebedor */
							documento: string;

							/** Logradouro do Recebedor */
							logradouro: string;

							/** Número do endereço do Recebedor */
							numeroEndereco: string;

							/** Complemento do endereço do Recebedor */
							complementoEndereco?: string;

							/** Bairro do Recebedor */
							bairro: string;

							/** Código IBGE do Município do Recebedor */
							codigoIbge: string;

							/** Município do Recebedor */
							municipio: string;

							/** Estado do Recebedor */
							estado: string;

							/** CEP do Recebedor */
							cep: string;
						};

						/** Objeto com os dados do frete */
						frete: {
							/** Quem pagará o frete. Valores possíveis:
							 *
							 * 0 - Remetente
							 *
							 * 1 - Destinatário
							 *
							 * 2 - Consignatário

							 * @example '1'
							 */
							pagadorFrete: '0' | '1' | '2';

							/** Tipo da Nota Fiscal. Valores possíveis:
							 *
							 * 0 - Entrada
							 *
							 * 1 - Saída

							 * @example '1'
							 */
							tipoNotaFiscal?: '0' | '1';

							/** Número da Nota Fiscal
							 * @example '123456'
							 */
							numeroNotaFiscal: string;

							/** Série da Nota Fiscal
							 * @example '1'
							 */
							serieNotaFiscal: string;

							/** Data de emissão da Nota Fiscal
							 * @example new Date('2023-12-18')
							 */
							dataEmissaoNotaFiscal: Date;

							/** Quantidade de Volumes
							 * @example 5
							 */
							quantidadeVolumeNotaFiscal: number;

							/** Peso dos Volumes
							 * @example 50
							 */
							pesoNotaFiscal: number;

							/** Peso cubado em metros cúbicos
							 * @example 0.75
							 */
							pesoCubadoNotaFiscal?: number;

							/** Metragem cúbica dos volumes
							 * @example 0.05
							 */
							metragemCubica?: number;

							/** Valor da Nota Fiscal
							 * @example 1000
							 */
							valorNotaFiscal: number;

							/** CFOP da Nota Fiscal
							 * @example '5102'
							 */
							cfop: string;

							/** Número do Pedido */
							numeroPedido?: string;

							/** Chave da Nota Fiscal Eletrônica
							 * @example '12345678901234567890123456789012345678901234'
							 */
							chaveNotaFiscal: string;

							/** Indica se é uma Vide Nota. Valores possíveis:
							 *
							 * 1 - Sim
							 *
							 * 2 - Não

							 * @example '2'
							 */
							videNotaFiscal?: '1' | '2';

							/** Indica se o cliente retira na filia. Valores possíveis:
							 *
							 * 1 - Sim
							 *
							 * 2 - Não

							 * @example '2'
							 */
							clienteRetira?: '1' | '2';

							/** Código da Filial da Jamef
							 * @example '01'
							 */
							filialNotaFiscal: string;
						};
					}[];
			  };
	};

	declare response:
		| (CommonResponse<200> & {
				body: {
					dado: {
						/**
						 * @example '0001'
						 */
						codigo: string;

						/**
						 * @example 'SUCESSO'
						 */
						mensagem: string;

						/**
						 * @example '20241217161854**'
						 */
						protocolo: string;

						/**
						 * @example '000272034'
						 */
						nota: string;

						/**
						 * @example '001'
						 */
						serie: string;
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

	instanceOfThisClass(request: this['request']): boolean {
		return request.method === this.method && request.url === this.url;
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

	before(request: typeof this.request): void {
		if ('notasFiscais' in request.body) {
			request.body.notasFiscais.forEach((notaFiscal) => {
				notaFiscal.remetente.documento = validateCpfCnpj(
					notaFiscal.remetente.documento,
					{ clearData: true },
				).parsed;

				notaFiscal.destinatario.documento = validateCpfCnpj(
					notaFiscal.destinatario.documento,
					{ clearData: true },
				).parsed;

				if (notaFiscal.consignatario) {
					notaFiscal.consignatario.documento = validateCpfCnpj(
						notaFiscal.consignatario.documento,
						{ clearData: true },
					).parsed;
				}

				if (notaFiscal.localentrega) {
					notaFiscal.localentrega.documento = validateCpfCnpj(
						notaFiscal.localentrega.documento,
						{ clearData: true },
					).parsed;
				}

				notaFiscal.frete.dataEmissaoNotaFiscal = new CustomDate(
					notaFiscal.frete.dataEmissaoNotaFiscal,
				).toCustomString('yyyyMMdd', { timezone: -180 }) as never;

				notaFiscal.frete.quantidadeVolumeNotaFiscal =
					notaFiscal.frete.quantidadeVolumeNotaFiscal.toString() as never;

				notaFiscal.frete.pesoNotaFiscal =
					notaFiscal.frete.pesoNotaFiscal.toFixed(2) as never;

				notaFiscal.frete.valorNotaFiscal =
					notaFiscal.frete.valorNotaFiscal.toFixed(2) as never;
			});
		}
	}
}
