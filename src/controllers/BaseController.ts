import router from '../utils/Router';
import Store from '../utils/Store';

export default class BaseController {
    public router: typeof router = router;
    public store: typeof Store = Store;
}