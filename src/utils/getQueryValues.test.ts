import { describe, it } from 'node:test';
import assert from 'node:assert';
import getQueryValues from './getQueryValues';

describe(__filename, () => {
	it('1 key', () => {
		assert.equal(
			[
				{
					key: 'param',
					value: 'a',
				},
			].reduce(
				(previousValue, currentValue, currentIndex) =>
					getQueryValues(
						previousValue,
						currentIndex,
						currentValue.key,
						currentValue.value,
					),
				'',
			),
			'?param=a',
		);
	});

	it('2 keys', () => {
		assert.equal(
			[
				{
					key: 'param',
					value: 'a',
				},
				{
					key: 'param',
					value: 'b',
				},
			].reduce(
				(previousValue, currentValue, currentIndex) =>
					getQueryValues(
						previousValue,
						currentIndex,
						currentValue.key,
						currentValue.value,
					),
				'',
			),
			'?param=a&param=b',
		);
	});

	it('string', () => {
		assert.equal(
			[
				{
					key: 'param',
					value: 'a',
				},
			].reduce(
				(previousValue, currentValue, currentIndex) =>
					getQueryValues(
						previousValue,
						currentIndex,
						currentValue.key,
						currentValue.value,
					),
				'',
			),
			'?param=a',
		);
	});

	it('number', () => {
		assert.equal(
			[
				{
					key: 'param',
					value: 1,
				},
			].reduce(
				(previousValue, currentValue, currentIndex) =>
					getQueryValues(
						previousValue,
						currentIndex,
						currentValue.key,
						currentValue.value,
					),
				'',
			),
			'?param=1',
		);
	});

	it('boolean', () => {
		assert.equal(
			[
				{
					key: 'param',
					value: true,
				},
			].reduce(
				(previousValue, currentValue, currentIndex) =>
					getQueryValues(
						previousValue,
						currentIndex,
						currentValue.key,
						currentValue.value,
					),
				'',
			),
			'?param=true',
		);
	});

	it('null', () => {
		assert.equal(
			[
				{
					key: 'param',
					value: null,
				},
			].reduce(
				(previousValue, currentValue, currentIndex) =>
					getQueryValues(
						previousValue,
						currentIndex,
						currentValue.key,
						currentValue.value,
					),
				'',
			),
			'?param=null',
		);
	});

	it('Date', () => {
		assert.equal(
			[
				{
					key: 'param',
					value: new Date('2025-01-22T14:28:59.123-03:00'),
				},
			].reduce(
				(previousValue, currentValue, currentIndex) =>
					getQueryValues(
						previousValue,
						currentIndex,
						currentValue.key,
						currentValue.value,
					),
				'',
			),
			'?param=2025-01-22T17:28:59.123Z',
		);
	});
});
