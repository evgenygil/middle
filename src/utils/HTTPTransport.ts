enum METHODS {
    GET = 'GET',
    POST = 'POST',
    PUT = 'PUT',
    DELETE = 'DELETE',
}

type Options = {
    method: METHODS
    data?:  any
};

type OptionWithoutMethod = Omit<Options, 'method'>;

export default class HTTPTransport {
    get(url: string, options: OptionWithoutMethod = {}): Promise<XMLHttpRequest> {
        return this.request(url, {...options, method: METHODS.GET})
    }

    post(url: string, options: OptionWithoutMethod = {}): Promise<XMLHttpRequest>{
        return this.request(url, {...options, method: METHODS.POST});
    };

    put(url: string, options: OptionWithoutMethod = {}): Promise<XMLHttpRequest> {
        return this.request(url, {...options, method: METHODS.PUT});
    };

    delete(url: string, options: OptionWithoutMethod = {}): Promise<XMLHttpRequest> {
        return this.request(url, {...options, method: METHODS.DELETE});
    };

    getQueryStringFromObject(queryObject: Object) {
        return '?' + new URLSearchParams(queryObject).toString();
    }

    request(url: string, options: Options = { method: METHODS.GET }): Promise<XMLHttpRequest> {
        const {method, data} = options;

        return new Promise(function(resolve, reject) {
            const xhr = new XMLHttpRequest();
            xhr.open(method, url);

            xhr.onload = function() {
                resolve(xhr);
            };

            xhr.onabort = reject;
            xhr.onerror = reject;
            xhr.ontimeout = reject;

            if (method === METHODS.GET || !data) {
                xhr.send();
            } else {
                xhr.send(data);
            }
        });
    };
}