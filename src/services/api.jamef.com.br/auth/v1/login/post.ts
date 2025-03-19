import Service from '../../../..';

type CommonResponse<T> = {
	status: T;
	body: {
		/** Código de status HTTP indicando a situação
		 * @example 200
		 */
		situacao: T;

		/** Mensagem detalhada descrevendo a situação
		 * @example 'Usuário autenticado com sucesso'
		 */
		mensagem: string;

		/** Identificador único de correlação para rastreamento de logs e requisições
		 * @example '6a2dc000-b812-11ef-9cb7-0c37964d58xA'
		 */
		idCorrelacao: `${string}-${string}-${string}-${string}-${string}`;

		/** Data e hora do momento da requisição */
		dataHora: Date;
	};
};

export default class Class implements Service {
	url = 'https://api.jamef.com.br/auth/v1/login' as const;
	method = 'POST' as const;

	declare request: {
		url: typeof Class.prototype.url;
		method: typeof Class.prototype.method;
		headers: { 'Content-Type': 'application/json' };
		body: {
			/** Email cadastrado no portal developers
			 * @example 'sistemas@jamef.com.br'
			 */
			username: string;

			/** Senha
			 * @example '12343456'
			 */
			password: string;
		};
	};

	declare response:
		| (CommonResponse<200> & {
				body: {
					dado: [
						{
							/**
							 * @example 'eyJraWQiOiJhYm9GanNHcXFIU2lvSXZJUUFJNjNuQ0xnWUxMSjRBVFBWajBnXC95SDZ5Zz0iLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiI3NGU4MzQyOC1jMDYxLTcwNmYtMDBkZC0zMjM5NWRlZTZhY2UiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiaXNzIjoiaHR0cHM6XC9cL2NvZ25pdG8taWRwLnVzLWVhc3QtMS5hbWF6b25hd3MuY29tXC91cy1lYXN0LTFfZlJSNmRvVll4IiwiY29nbml0bzp1c2VybmFtZSI6Ijc0ZTgzNDI4LWMwNjEtNzA2Zi0wMGRkLTMyMzk1ZGVlNmFjZSIsIm9yaWdpbl9qdGkiOiIwZWVhMTg5Yy1hYTY0LTRhOGEtYTAxOS0wMzBjZDU4YWJmYTUiLCJhdWQiOiI3M3NpY2ozZXYxcjFodm5objV1cGw4cG4wbCIsImV2ZW50X2lkIjoiZTUyZGEwYjMtNWZlZC00YTMwLTg5NzktNGY0YTAxNTJhMWQ3IiwiY3VzdG9tOm5hbWUiOiJXaWxsaWFtIiwiY3VzdG9tOmNucGoiOiIzMjEzMTIzMTIzMTIzMSIsInRva2VuX3VzZSI6ImlkIiwiYXV0aF90aW1lIjoxNzM0Mzg5OTQ2LCJwaG9uZV9udW1iZXIiOiIrNTUzMTk3NTAzOTc0OCIsImV4cCI6MTczNDM5MzU0NiwiaWF0IjoxNzM0Mzg5OTQ2LCJqdGkiOiI1NTU3YjYwNi1mOTAxLTQzYzQtYTlhYy02NDUzYjU5NTM1NTAiLCJlbWFpbCI6IndpbGxpYW1ndXN0YXZvNzJAZ21haWwuY29tIn0.Uz-FHKSAK2D7PwLNmCknIGBApki2nlc3vvpuPpMwGPkJqb81HVpWkfUSWMdJXiM3ylluTTMGbTcRwKKu321MLNk-uzRXEWWy7HjIHxHI7qfxSVHU36PswHPov3NybNMRNAR3STVfQQWRFeblgeWBaoKkBjNMtRfZ6vXaNWhd6rpZTVw_wLAZFmtzrU7gOcwqv1fZmPSwkRa35XpS9-QYeNc58zZXJqL1IllhRHp1loLe9eK71QL4gb-KPt313EOqgh3NaTZZT1hB8bngB-0A6cVAs1eb9iY3SZEcjvwuM8luUM2ZIDDfnUeFBugl5s8PkA5fEAGPv5oz0Ccnct7rpA'
							 */
							accessToken: `${string}.${string}.${string}`;

							/**
							 * @example 'eyJjdHkiOiJKV1QiLCJlbmMiOiJBMjU2R0NNIiwiYWxnIjoiUlNBLU9BRVAifQ.ZNHXl8KgGHmKQgzoARjfKoSohGMLf-CKEBlZmFG3KGClE8cBtHtMkxF2Be8o82rxwdU526p2sHXSafttbTF4G4MRVxyQvwZvlof19TjMhyTiLCqifgGx5F-FxzgsQ8ndEKver-4p3kTao_CeJOlNrwN-E1DHPwr6YFzOySIRzH5UMOoTxmwpYwooVC8A20gXCXKclBtS6QkxB2LwGeykAXFJ93eYGb-55BL4F7FHemPJEmv3rM3eHicQR_bbtF9o-YFPUHLqElrU4ivuf-gieHc2iKQzSEaStuOU2SyOmg83ON9eEvmVdIqppYITWO8-OlvzFIb81mXfYNeua9HRSA.YfXt9KRg05n_e1HP.cR8E1myFOA3IWoLBan1Ei8M_AhjkAvHpmgmxq04gvJIOhDUhTAr2VGIMMWx9_HQFmD0GCR18RKzFv3VAQlcc8w04GAUp8PQ3OEkZ9O058wOlCn9Wt5lTQ8PYMDaSG7GtbdTmhrTHf3xyrm4YnO3t9CK66YgUgNJyKuH_UN6VrImC8Eyq4ltz3XFdplTnws-Xs7toHR5k3bM4fKUZMkpRggqCi7cSP8akjA857sDEEoSBTED31i5wqaxreyPCHU7UiDSr24nXMhZPyLrm0jUfiXM89Ru2jxO2ajte5arXhbaPF5P6X_53wWSLLsTYOitkA2TxhPbVnvH5t-8eF3PfvXbf27wxcIl8BP9JrU-IV_a78CjvL_-HSuBxcNqqDQWiBJrZd2HJ9qekESSO1meJ016efwDlg5MEoZntpqkOXOPd-beIxjpEwbgWlAxdOLLGJJWXRi6osNlM-fmJqOqMOFJ3CNwVnaE6LnQoQRd8fAWw7qkkkrYPqL2UPz1FDovZzDDzx_w5m0dDkVtvP78-x3R1ghw5_kU4J3z4p57TtL1AAAMmrne4CN6EPUTjM31_L7cElx3EC22aXbcx4sWsvPqD88drtSSlorMH14IKMjXS3HU2WxWmlR7g14iwCmjeP2FRL_e8OsUauqLMBELmFnYc_1vTfp2SjwfiHmugb8fWNqbpSW28G0_r-58GoA9ZJcbaq_-oHwSqu_mlJr_trmIhVoD_LibxI6ZzubH7SdkAXsP3-imEGu8e44IO6QpKNdt81CrHrlgvq--LpdrT6ixVxWy96rEc5ZsQ5LYAP9Z_FFhKAQrk6XnrMZpe1PgXFSS7CdpxE-dy3bmjY_h46QMFsTCHFjB8T8Mzk_6n5HuWjxAyM1nqUObaLXOkKOVKHeR9hQNdaNp3SZPUArTeMkb83Hp_FHIcpjOp-e2F7pJ7mpbOiCx_YwuqU8gKmmBCYxJGPF_GxxpdvXf79meoHVvoy1y2PpNlS0LQtw_INjTk1Z13qZyUqobmHTvQEUTLzSVvzeEMBJGeRi92_FVVGTPzHD_givHPIsvIwswI48td81TP0epaJFLxeHFavIlaoHYmo_s31rPQnBvAPWNVm_KZGuX3nIKKAFJ_SOti3kf6WiwPU8v2kwC99GtMKdLVDTBps_UleWL48c2DyVTjOpHtk-_m4QDD-R9TTAztp45AHXY_vsue3uEb1iQohDrHQHJc_OFAYit1jRxq-68ICysJfThP-lYnpf_mmu70d7oRAfOfrIsCc7FpgtEnxc6KJ3lonxQtbuNwjGeb2h79gruoEeAZ8ervaf3roYsQsxo6wI1N4mkCfzZrcphRQig.jVRO_GjfbN-L2IO0UddFYQ'
							 */
							refreshToken: `${string}.${string}.${string}`;

							/**
							 * @example 3600
							 */
							expiresIn: number;
						},
					];
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
		| ((
				| CommonResponse<400>
				| CommonResponse<401>
				| CommonResponse<403>
				| CommonResponse<404>
				| CommonResponse<500>
				| CommonResponse<502>
				| CommonResponse<504>
		  ) & {
				body: {
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
}
