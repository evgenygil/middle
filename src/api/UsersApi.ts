import HTTPTransport, { Options } from "../utils/HTTPTransport";
import BaseAPI from './BaseApi';

class UsersApi extends BaseAPI {
    public http = new HTTPTransport(`${this.baseUrl}/user`);
    public httpAuth = new HTTPTransport(`${this.baseUrl}/auth`);

    public changeData(data: Options): Promise<any> {
        return this.http.put('/profile', {
            data,
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        });
    }

    public changeAvatar(data: FormData): Promise<any> {
        return this.http.put('/profile/avatar', {
            data,
        });
    }

    public changePassword(data: Options): Promise<any> {
        return this.http.put('/password', {
            data,
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        });
    }

    public getUserById(id: number): Promise<any> {
        return this.http.get(`/user/${id}`);
    }

    public searchUser(login: string): Promise<any> {
        return this.http.post('/search', {
            data: { login },
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        });
    }

    public createUser(data: Options): Promise<any> {
        return this.httpAuth.post('/signup', {
            data,
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        });
    }

    public login(data: Options): Promise<any> {
        return this.httpAuth.post('/signin', {
            data,
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        });
    }

    public getUser(): Promise<any> {
        return this.httpAuth.get('/user');
    }

    public logout(): Promise<any> {
        return this.httpAuth.post('/logout');
    }
}
export default new UsersApi();