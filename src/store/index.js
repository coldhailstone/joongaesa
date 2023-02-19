import { createStore } from 'vuex';
import user from './user';

export default createStore({
	namespaces: true,
	modules: {
		user,
	},
});
