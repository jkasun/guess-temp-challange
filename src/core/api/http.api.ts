import axios, { AxiosRequestConfig } from "axios";

const host = 'https://api.openweathermap.org/';

class HttpApi {
    async get(url: string) {
        const { data } = await axios.get(host + url);
        return data;
    }

    async post(url: string, body: any, config?: AxiosRequestConfig) {
        const { data } = await axios.post(host + url, body, config);
        return data;
    }

    async delete(url: string, body?: any) {
        const { data } = await axios.delete(host + url);
        return data;
    }
}

export default new HttpApi();