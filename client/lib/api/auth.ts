import { paths, strings } from "@/constants";
import { ApiResponse, JoinForm } from "@/interfaces";
import { axios } from ".";

export const userAPI = {
  join: async (joinForm: JoinForm): Promise<ApiResponse> => {
    try {
      const response = await axios.post<ApiResponse>(paths.api.join, joinForm);

      return {
        ...response.data,
        message: strings.api.users.join.success,
      };
    } catch (err: any) {
      const errResponse: ApiResponse = err.response.data || {
        success: false,
        status: 500,
      };
      return errResponse;
    }
  },
};
