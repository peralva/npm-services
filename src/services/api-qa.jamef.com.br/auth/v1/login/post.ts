import Service from '../../../..';
import Method from '../../../../../interfaces/Method';
import apiJamefComBrAuthV1LoginPost from '../../../../api.jamef.com.br/auth/v1/login/post';

class Class implements Service {
	url = 'https://api-qa.jamef.com.br/auth/v1/login' as const;

	method: typeof apiJamefComBrAuthV1LoginPost.method =
		apiJamefComBrAuthV1LoginPost.method;

	declare request: Omit<typeof apiJamefComBrAuthV1LoginPost.request, 'url'> & {
		url: typeof Class.prototype.url;
	};

	declare response: typeof apiJamefComBrAuthV1LoginPost.response;

	instanceOfThisClass(url: string, method: Method): boolean {
		return url === this.url && method === this.method;
	}

	async getResponse(
		...args: Parameters<typeof apiJamefComBrAuthV1LoginPost.getResponse>
	): ReturnType<typeof apiJamefComBrAuthV1LoginPost.getResponse> {
		return apiJamefComBrAuthV1LoginPost.getResponse(...args);
	}
}

const apiQaJamefComBrAuthV1LoginPost: Class = new Class();
export default apiQaJamefComBrAuthV1LoginPost;
