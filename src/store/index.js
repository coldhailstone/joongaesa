import { createStore } from 'vuex';
import loading from './loading';
import user from './user';
import estate from './estate';

export default createStore({
	namespaces: true,
	modules: {
		loading,
		user,
		estate,
	},
});
