import { createStore } from 'vuex';
import loading from './loading';
import user from './user';

export default createStore({
	namespaces: true,
	modules: {
		loading,
		user,
	},
});
