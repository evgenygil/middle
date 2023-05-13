import Store from '../utils/Store';
import { searchAndCloneObject } from '../utils/Helpers';

import ChatsApi from '../api/ChatsApi';

class MessageController {
    public EVENTS: Record<string, string> = {
        OPEN: 'open',
        MESSAGE: 'message',
        ERROR: 'error',
        CLOSE: 'close',
    };

    private _userId: number | string | undefined;
    private _chatId: number | string | undefined;
    private _token: string;
    private _ping: number | undefined;

    public events: Record<string, Function> | {} = {};
    public baseUrl: string = 'wss://ya-praktikum.tech/ws/chats';
    public socket: WebSocket | null = null;

    constructor() {
        this._handleOpen = this._handleOpen.bind(this);
        this._handleMessage = this._handleMessage.bind(this);
        this._handleError = this._handleError.bind(this);
        this._handleClose = this._handleClose.bind(this);
    }

    public async getConnectData(): Promise<void> {
        this._userId = Store?.getState()?.user?.id;
        this._chatId = Number(Store?.getState()?.currentChat?.chat?.id);
        this._token = await this.getToken(this._chatId);
    }

    public async connect(): Promise<void> {
        await this.getConnectData();
        const url = `${this.baseUrl}/${this._userId}/${this._chatId}/${this._token}`;
        try {
            this.socket = new WebSocket(url);
            this._addEvents();
        } catch (e) {
            console.log(e);
        }
    }

    private _reconnect(): void {
        this.connect();
    }

    public async disconnect(): Promise<void> {
        if (!this.socket) return;
        clearInterval(this._ping);
        this._ping = undefined;

        this._removeEvents();
        await this.socket?.close();
        this.socket = null;
    }

    public async changeCurrentChat(id: number | undefined | string): Promise<void> {
        if (!id) return;
        const chat = searchAndCloneObject(Store.getState().chats, 'id', Number(id));
        if (chat && chat?.id !== Store?.getState()?.currentChat?.chat?.id) {
            Store.set('currentChat.chat', chat);

            await this.disconnect();
            this.connect();
        }
    }


    private _addEvents() {
        this.socket?.addEventListener(this.EVENTS.OPEN, this._handleOpen);
        this.socket?.addEventListener(this.EVENTS.MESSAGE, this._handleMessage);
        this.socket?.addEventListener(this.EVENTS.ERROR, this._handleError);
        this.socket?.addEventListener(this.EVENTS.CLOSE, this._handleClose);
    }

    private _removeEvents() {
        this.socket?.removeEventListener(this.EVENTS.OPEN, this._handleOpen);
        this.socket?.removeEventListener(this.EVENTS.MESSAGE, this._handleMessage);
        this.socket?.removeEventListener(this.EVENTS.ERROR, this._handleError);
        this.socket?.removeEventListener(this.EVENTS.CLOSE, this._handleClose);
    }


    private async getToken(chatID: number) {
        try {
            const { status, response } = await ChatsApi.getToken(chatID);
            if (status === 200) {
                return JSON.parse(response).token;
            } else {
                throw new Error(JSON.parse(response).reason);
            }
        } catch (e) {
            console.log(e);
        }
    }

    private _handleOpen() {
        Store.set('currentChat.messages', []);
        this.getMessage();
        this._ping = setInterval(() => {
            this.socket?.send(JSON.stringify({
                content: '',
                type: '',
            }));
        }, 20000);
    }

    private _handleMessage(e: MessageEvent) {
        const data = JSON.parse(e.data);
        if (Array.isArray(data) && data.length) {
            if (data[0].id === 1) {
                Store.set('currentChat.messages', data);
            } else {
                const oldMessages = Store?.getState()?.currentChat?.messages ?? [];
                Store.set('currentChat.messages', [...oldMessages, ...data]);
            }
        } else if (typeof data === 'object' && data?.type === 'message') {
            const oldMessages = Store?.getState()?.currentChat?.messages ?? [];
            Store.set('currentChat.messages', [data, ...oldMessages]);
        }
    }

    private _handleError(e: any) {
        console.log(e.message);
        this.disconnect();
    }

    public getMessage(): void {
        this.socket?.send(JSON.stringify({
            content: 0,
            type: 'get old',
        }));
    }

    public sendMessage(message: Record<string, unknown>): void {
        const content = message['messagе'];
        this.socket?.send(JSON.stringify({
            content,
            type: 'message',
        }));
    }

    private _handleClose(e: any) {
        if (e.wasClean) {
            console.log('Соединение закрыто');
        } else {
            console.log('Обрыв соединения');
        }

        console.log(e);

        this.disconnect();
        if (e.code === 1006) {
            this._reconnect();
        }
    }
}


export default new MessageController();