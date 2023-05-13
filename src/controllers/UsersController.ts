import UsersApi from '../api/UsersApi';
import { Options } from "../utils/HTTPTransport";
import { MESSENGER } from '../utils/Router';
import BaseController from './BaseController';

class UsersController extends BaseController {
    async changeData(data: Options) {
        try {
            const { status, response } = await UsersApi.changeData(data);
            if (status === 200) {
                this.store.set('user', JSON.parse(response));
            } else {
                throw new Error(JSON.parse(response).reason);
            }
        } catch (e) {
            console.log(e);
        }
    }

    async createUser(data: Options): Promise<void> {
        try {
            const { status, response } = await UsersApi.createUser(data);
            if (status === 200) {
                this.getUserInfo();
                this.router.go(MESSENGER);
            } else {
                throw new Error(JSON.parse(response).reason);
            }
        } catch (e) {
            console.log(e);
        }
    }

    async login(data: Options): Promise<void> {
        try {
            const { status, response } = await UsersApi.login(data);
            if (status === 200) {
                this.getUserInfo();
                this.router.go(MESSENGER);
            } else {
                throw new Error(JSON.parse(response).reason);
            }
        } catch (e) {
            console.log(e);
        }
    }

    async getUserInfo(): Promise<boolean> {
        try {
            const { status, response } = await UsersApi.getUser();
            if (status === 200 && response) {
                this.store.set('user', JSON.parse(response));
                return true;
            }
            return false;
        } catch (e) {
            console.log(e);
            return false;
        }
    }

    async logout(): Promise<void> {
        try {
            const { status, response } = await UsersApi.logout();
            if (status === 200) {
                this.store.setResetState();
                this.router.go('/');
            } else {
                throw new Error(JSON.parse(response).reason);
            }
        } catch (e) {
            console.log(e);
        }
    }
}

export default new UsersController();