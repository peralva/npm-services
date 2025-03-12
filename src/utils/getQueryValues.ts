import QueryValueType from '../interfaces/QueryValueType';

export default (
	previousValue: string,
	currentIndex: number,
	key: string,
	value: QueryValueType,
) =>
	`${previousValue}${currentIndex > 0 ? '&' : '?'}${key}=${value instanceof Date ? value.toISOString() : value}`;
