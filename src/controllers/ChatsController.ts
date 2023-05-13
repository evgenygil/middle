import ChatsApi from '../api/ChatsApi';
import Store from '../utils/Store';
import BaseController from './BaseController';
import MessageController from './MessageController';

class ChatsController extends BaseController {
    public async getChats(): Promise<void> {
        try {
            if (this.router?._currentRoute?._pathname !== '/messenger') return;
            const { status, response } = await ChatsApi.getChats();
            if (status === 200) {
                Store.set('chats', JSON.parse(response));
            } else {
                throw new Error(JSON.parse(response).reason);
            }
        } catch (e) {
            console.log(e);
        }
    }

    public async createChat(title: string): Promise<boolean | number> {
        if (!title) return false;
        try {
            const { status, response } = await ChatsApi.createChat(title);
            if (status === 200) {
                const chatId = JSON.parse(response)?.id;
                await this.getChats();
                MessageController.changeCurrentChat(chatId);
                return chatId;
            } else {
                throw new Error(JSON.parse(response).reason);
            }
        } catch (e) {
            console.log(e);
            return false;
        }
    }

    public async deleteChat(): Promise<void> {
        try {
            const chatId = this?.store?.getState()?.currentChat?.chat?.id;
            if (typeof chatId !== 'number') return;
            const { status, response } = await ChatsApi.deleteChat({ chatId });
            if (status === 200) {
                this.getChats();
                this.store.set('currentChat', {
                    chat: null,
                    messages: null,
                });
            } else {
                throw new Error(JSON.parse(response).reason);
            }
        } catch (e) {
            console.log(e);
        }
    }

    public async addUser(id: number, user: number): Promise<boolean> {
        if (!id || !user) return false;
        try {
            const { status, response } = await ChatsApi.addUsers(id, [user]);
            if (status === 200) {
                return true;
            } else {
                throw new Error(JSON.parse(response).reason);
            }
        } catch (e) {
            console.log(e);
        }
        return false;
    }

    public async addNewChatUser(user: Record<string, string | number>): Promise<boolean | void> {
        const { display_name, login, id } = user;
        let chat = this?.store?.getState()?.currentChat?.chat?.id;
        if (!confirm(`Вы хотите ${chat ? 'добавить в текущий чат ' : 'создать новый чат с '}${login}`)) {
            return;
        }
        if (!chat) {
            const title = display_name ?? login;
            chat = await this.createChat(String(title));
            return;
        }
        if (!chat) return;
        const result = await this.addUser(Number(chat), Number(id));
        return result;
    }
}

export default new ChatsController();