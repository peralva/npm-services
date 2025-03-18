import Service from '../../../..';
import ApiJamefComBrAuthV1LoginPost from '../../../../api.jamef.com.br/auth/v1/login/post';

const apiJamefComBrAuthV1LoginPost: ApiJamefComBrAuthV1LoginPost =
	new ApiJamefComBrAuthV1LoginPost();

export default class Class implements Service {
	url = 'https://api-qa.jamef.com.br/auth/v1/login' as const;

	method: ApiJamefComBrAuthV1LoginPost['method'] =
		apiJamefComBrAuthV1LoginPost.method;

	declare request: Omit<ApiJamefComBrAuthV1LoginPost['request'], 'url'> & {
		url: typeof Class.prototype.url;
	};

	declare response: ApiJamefComBrAuthV1LoginPost['response'];

	instanceOfThisClass(request: this['request']): boolean {
		return request.method === this.method && request.url === this.url;
	}

	async getResponse(
		...args: Parameters<typeof apiJamefComBrAuthV1LoginPost.getResponse>
	): ReturnType<ApiJamefComBrAuthV1LoginPost['getResponse']> {
		return apiJamefComBrAuthV1LoginPost.getResponse(...args);
	}
}
