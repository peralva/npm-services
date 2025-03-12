import Service from '../../../..';
import Method from '../../../../../interfaces/Method';

type Url = typeof Class.prototype.url;

class Class implements Service {
	url = 'https://pokeapi.co/api/v2/pokemon' as const;
	method = 'GET' as const;

	declare request: {
		url: Url;
		method: typeof Class.prototype.method;
		query?: {
			offset?: number;
			limit?: number;
		};
	};

	declare response: {
		status: 200;
		body: {
			count: number;
			next: null | `${Url}/?offset=${number}&limit=${number}`;
			previous: null | `${Url}/?offset=${number}&limit=${number}`;
			results: {
				name: string;
				url: `${Url}/${number}/`;
			}[];
		};
	};

	instanceOfThisClass(url: string, method: Method): boolean {
		return url === this.url && method === this.method;
	}

	async getResponse(response: Response): Promise<typeof this.response> {
		return {
			status: response.status,
			body: await response.json(),
		} as typeof this.response;
	}
}

const pokeapiCoApiV2PokemonGet: Class = new Class();
export default pokeapiCoApiV2PokemonGet;
