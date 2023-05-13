enum METHODS {
    GET = 'GET',
    POST = 'POST',
    PUT = 'PUT',
    DELETE = 'DELETE',
}

export type Options = {
    method: METHODS
    data?:  any
    headers?: any
};

type OptionWithoutMethod = Omit<Options, 'method'>;

type HTTPMethod = (url: string, options?: OptionWithoutMethod ) => Promise<unknown>

export default class HTTPTransport {
    baseUrl: string = '';

    constructor(baseUrl: string) {
        this.baseUrl = baseUrl;
    }

    get:HTTPMethod = (url, options = {}) => {
        return this.request(url, {...options, method: METHODS.GET})
    }

    post:HTTPMethod = (url, options = {}) => {
        return this.request(url, {...options, method: METHODS.POST});
    };

    put:HTTPMethod = (url, options = {}) =>  {
        return this.request(url, {...options, method: METHODS.PUT});
    };

    delete:HTTPMethod = (url, options = {}) =>  {
        return this.request(url, {...options, method: METHODS.DELETE});
    };

    getQueryStringFromObject(queryObject: Object) {
        return '?' + new URLSearchParams(queryObject).toString();
    }

    request(url: string, options: Options = { method: METHODS.GET }): Promise<XMLHttpRequest> {
        const {method, data, headers = {}} = options;

        if (this.baseUrl) {
            url = this.baseUrl + url;
        }

        return new Promise(function(resolve, reject) {
            const xhr = new XMLHttpRequest();
            xhr.open(method, url);
            xhr.withCredentials = true;

            Object.keys(headers).forEach((key) => {
                xhr.setRequestHeader(key, headers[key]);
            });

            xhr.onload = function() {
                resolve(xhr);
            };

            xhr.onabort = reject;
            xhr.onerror = reject;
            xhr.ontimeout = reject;

            if (method === METHODS.GET || !data) {
                xhr.send();
            } else {
                // xhr.send(data);
                const sendData = data instanceof FormData ? data : JSON.stringify(data);
                // console.log(sendData);
                xhr.send(sendData);
            }
        });
    };
}