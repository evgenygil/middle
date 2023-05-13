import BaseAPI from './BaseApi';
import HTTPTransport from "../utils/HTTPTransport";

class ChatsApi extends BaseAPI{
    public baseUrl = "https://ya-praktikum.tech/api/v2/chats";
    public http = new HTTPTransport(this.baseUrl);

    public getChats(): Promise<any> {
        return this.http.get('/');
    }

    public getToken(id: number): Promise<any> {
        return this.http.post(`/token/${id}`);
    }

    public createChat(title: string): Promise<any> {
        return this.http.post('/', {
            data: { title },
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        });
    }

    public addUsers(chatId: number, users: Array<number>): Promise<any> {
        return this.http.put('/users', {
            data: { chatId, users },
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        });
    }

    public deleteChat(data: {}): Promise<any> {
        return this.http.delete('/', {
            data,
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        });
    }

    public deleteUsers(data: {}): Promise<any> {
        return this.http.delete('/users', {
            data,
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        });
    }
}
export default new ChatsApi();