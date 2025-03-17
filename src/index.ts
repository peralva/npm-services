import getQueryValues from './utils/getQueryValues';
import QueryValueType from './interfaces/QueryValueType';

import ApiJamefComBrAuthV1LoginPost from './services/api.jamef.com.br/auth/v1/login/post';
import ApiJamefComBrConsultaV1RastreamentoGet from './services/api.jamef.com.br/consulta/v1/rastreamento/get';
import ApiJamefComBrDocumentosV1NotaFiscalPost from './services/api.jamef.com.br/documentos/v1/nota-fiscal/post';
import ApiJamefComBrOperacaoV1EtiquetaChaveNotaFiscalGet from './services/api.jamef.com.br/operacao/v1/etiqueta/{chaveNotaFiscal}/get';
import ApiQaJamefComBrAuthV1LoginPost from './services/api-qa.jamef.com.br/auth/v1/login/post';
import ApiQaJamefComBrConsultaV1RastreamentoGet from './services/api-qa.jamef.com.br/consulta/v1/rastreamento/get';
import ApiQaJamefComBrDocumentosV1NotaFiscalPost from './services/api-qa.jamef.com.br/documentos/v1/nota-fiscal/post';
import ApiQaJamefComBrOperacaoV1EtiquetaChaveNotaFiscalGet from './services/api-qa.jamef.com.br/operacao/v1/etiqueta/{chaveNotaFiscal}/get';
import JsonplaceholderTypicodeComPostsGet from './services/jsonplaceholder.typicode.com/posts/get';
import JsonplaceholderTypicodeComPostsIdGet from './services/jsonplaceholder.typicode.com/posts/{id}/get';
import PokeapiCoApiV2PokemonGet from './services/pokeapi.co/api/v2/pokemon/get';

/*
	Quando importar novo serviço, lembrar de adicionar uma linha no tipo Responses incrementando o
	índice
*/
const SERVICES: [
	ApiJamefComBrAuthV1LoginPost,
	ApiJamefComBrConsultaV1RastreamentoGet,
	ApiJamefComBrDocumentosV1NotaFiscalPost,
	ApiJamefComBrOperacaoV1EtiquetaChaveNotaFiscalGet,
	ApiQaJamefComBrAuthV1LoginPost,
	ApiQaJamefComBrConsultaV1RastreamentoGet,
	ApiQaJamefComBrDocumentosV1NotaFiscalPost,
	ApiQaJamefComBrOperacaoV1EtiquetaChaveNotaFiscalGet,
	JsonplaceholderTypicodeComPostsGet,
	JsonplaceholderTypicodeComPostsIdGet,
	PokeapiCoApiV2PokemonGet,
] = [
	new ApiJamefComBrAuthV1LoginPost(),
	new ApiJamefComBrConsultaV1RastreamentoGet(),
	new ApiJamefComBrDocumentosV1NotaFiscalPost(),
	new ApiJamefComBrOperacaoV1EtiquetaChaveNotaFiscalGet(),
	new ApiQaJamefComBrAuthV1LoginPost(),
	new ApiQaJamefComBrConsultaV1RastreamentoGet(),
	new ApiQaJamefComBrDocumentosV1NotaFiscalPost(),
	new ApiQaJamefComBrOperacaoV1EtiquetaChaveNotaFiscalGet(),
	new JsonplaceholderTypicodeComPostsGet(),
	new JsonplaceholderTypicodeComPostsIdGet(),
	new PokeapiCoApiV2PokemonGet(),
] as const;

export type {
	ApiJamefComBrAuthV1LoginPost,
	ApiJamefComBrConsultaV1RastreamentoGet,
	ApiJamefComBrDocumentosV1NotaFiscalPost,
	ApiJamefComBrOperacaoV1EtiquetaChaveNotaFiscalGet,
	ApiQaJamefComBrAuthV1LoginPost,
	ApiQaJamefComBrConsultaV1RastreamentoGet,
	ApiQaJamefComBrDocumentosV1NotaFiscalPost,
	ApiQaJamefComBrOperacaoV1EtiquetaChaveNotaFiscalGet,
	JsonplaceholderTypicodeComPostsGet,
	JsonplaceholderTypicodeComPostsIdGet,
	PokeapiCoApiV2PokemonGet,
};

type Service<T extends number> = (typeof SERVICES)[T];
type Request<T extends number> = Service<T>['request'];
type Response<T extends number> = Service<T>['response'];
type Requests = Request<number>;

// prettier-ignore
type Responses<T extends Requests> = (
	T extends Request<0> ? Response<0> :
	T extends Request<1> ? Response<1> :
	T extends Request<2> ? Response<2> :
	T extends Request<3> ? Response<3> :
	T extends Request<4> ? Response<4> :
	T extends Request<5> ? Response<5> :
	T extends Request<6> ? Response<6> :
	T extends Request<7> ? Response<7> :
	T extends Request<8> ? Response<8> :
	T extends Request<9> ? Response<9> :
	T extends Request<10> ? Response<10> :
	never
);

export const services = async <T extends Requests>(
	request: T,
): Promise<Responses<T>> => {
	const service = SERVICES.find((service) =>
		service.instanceOfThisClass(request.url, request.method),
	);

	if (!service) throw new Error('Not implemented');

	if ('before' in service) service.before(request as never);

	let queryString = '';

	if ('query' in request) {
		if (Array.isArray(request.query)) {
			queryString = request.query.reduce(
				(previousValue, currentValue, currentIndex) => {
					if ('key' in currentValue && 'value' in currentValue) {
						return getQueryValues(
							previousValue,
							currentIndex,
							currentValue.key,
							currentValue.value,
						);
					}

					return previousValue;
				},
				queryString,
			);
		} else if (typeof request.query === 'object' && request.query !== null) {
			const query: Record<string, QueryValueType> = request.query;

			queryString = Object.keys(query).reduce(
				(previousValue, currentValue, currentIndex) => {
					if (query[currentValue] !== undefined) {
						return getQueryValues(
							previousValue,
							currentIndex,
							currentValue,
							query[currentValue],
						);
					}

					return previousValue;
				},
				queryString,
			);
		}
	}

	const init: RequestInit = { method: request.method };

	if ('headers' in request) init.headers = request.headers;

	if ('body' in request) {
		if (typeof request.body === 'string') {
			init.body = request.body;
		} else {
			init.body = JSON.stringify(request.body);
		}
	}

	return (await service.getResponse(
		await fetch(`${request.url}${queryString}`, init),
	)) as Responses<T>;
};
