import axios from 'axios';

export const axiosRequest = async (
    method: string,
    url: string,
    headers?: any,
) => {
    return await axios({
        method: method,
        url: url,
        headers: headers,
    }).then(async (response: any) => {
        return await response.data;
    });
};
