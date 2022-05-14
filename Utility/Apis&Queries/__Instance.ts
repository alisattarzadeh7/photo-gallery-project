import { i18n } from 'next-i18next';
import { apiBasicParam, apiOptions } from '../interfaces';
import photoToast from '../helpers/photoToast';
import AxiosInstance from './AxiosInstance';

export class Api {
    url = '';

    params = undefined;

    response: any = null;

    errors: object = {};

    constructor(url: string, params: any) {
        this.url = url;
        this.params = params;
    }

    showErrors() {
        // @ts-ignore
        Object.keys(this.errors).map((key) => photoToast(this.errors[key][0], 'error'));
        return this;
    }

    getData() {
        if (this.response) return this.response;
        return false;
    }

    showSuccess(msg: string) {
        if (Object.keys(this.errors).length === 0) return photoToast(i18n.t((msg).toString()), 'success');
        return this;
    }

    async request(requestOptions: any) {
        try {
            const { data: result } = await AxiosInstance.request({
                url: this.url,
                params: this.params,
                ...requestOptions,
            });
            this.response = result;
        } catch (e) {
            // @ts-ignore
            this.errors = e.response.data;
        }
        return this;
    }

    optionsHandler(options: apiOptions) {
        if (options.showErrors) {
            this.showErrors();
        }
        if (options.showSuccess) {
            this.showSuccess(options.showSuccess);
        }
        if (options.returnData) {
            return this.getData();
        }
        return Object.keys(this.errors).length === 0;
    }

    static call({ url, params, ...requestOptions }: apiBasicParam, options: apiOptions) {
        return new Api(url, params).request(requestOptions).then((result) => result.optionsHandler(options));
    }
}
