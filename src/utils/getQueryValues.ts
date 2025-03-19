import Primitive from '../interfaces/Primitive';

export default (
	previousValue: string,
	currentIndex: number,
	key: string,
	value: Primitive,
) =>
	`${previousValue}${currentIndex > 0 ? '&' : '?'}${key}=${value instanceof Date ? value.toISOString() : value}`;
