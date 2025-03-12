import { describe, it } from 'node:test';
import assert from 'node:assert';
import { services } from '.';

describe(__filename, () => {
	it('without extra', async () => {
		assert.deepEqual(
			(
				await services({
					url: 'https://jsonplaceholder.typicode.com/posts/1',
					method: 'GET',
				})
			).body,
			{
				userId: 1,
				id: 1,
				title:
					'sunt aut facere repellat provident occaecati excepturi optio reprehenderit',
				body: 'quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto',
			},
		);
	});

	it('with extra', async () => {
		assert.deepEqual(
			(
				await services({
					url: 'https://pokeapi.co/api/v2/pokemon',
					method: 'GET',
					query: { limit: 1 },
				})
			).body.results[0],
			{
				name: 'bulbasaur',
				url: 'https://pokeapi.co/api/v2/pokemon/1/',
			},
		);
	});
});
