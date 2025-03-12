import getQueryValues from './utils/getQueryValues';
import QueryValueType from './interfaces/QueryValueType';

import jsonplaceholderTypicodeComPostsGet from './services/jsonplaceholder.typicode.com/posts/get';
import jsonplaceholderTypicodeComPostsIdGet from './services/jsonplaceholder.typicode.com/posts/{id}/get';
import pokeapiCoApiV2PokemonGet from './services/pokeapi.co/api/v2/pokemon/get';
import apiJamefComBrAuthV1LoginPost from './services/api.jamef.com.br/auth/v1/login/post';
import apiQaJamefComBrAuthV1LoginPost from './services/api-qa.jamef.com.br/auth/v1/login/post';

/*
	Quando importar novo serviço, lembrar de adicionar uma linha no tipo Responses incrementando o
	índice
*/
const SERVICES: [
	typeof jsonplaceholderTypicodeComPostsGet,
	typeof jsonplaceholderTypicodeComPostsIdGet,
	typeof pokeapiCoApiV2PokemonGet,
	typeof apiJamefComBrAuthV1LoginPost,
	typeof apiQaJamefComBrAuthV1LoginPost,
] = [
	jsonplaceholderTypicodeComPostsGet,
	jsonplaceholderTypicodeComPostsIdGet,
	pokeapiCoApiV2PokemonGet,
	apiJamefComBrAuthV1LoginPost,
	apiQaJamefComBrAuthV1LoginPost,
] as const;

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
	never
);

export const services = async <T extends Requests>(
	request: T,
): Promise<Responses<T>> => {
	const service = SERVICES.find((service) =>
		service.instanceOfThisClass(request.url, request.method),
	);

	if (!service) throw new Error('Not implemented');

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
		init.body =
			typeof request.body === 'string'
				? request.body
				: JSON.stringify(request.body);
	}

	return (await service.getResponse(
		await fetch(`${request.url}${queryString}`, init),
	)) as Responses<T>;
};
