import { createStore } from 'vuex';
import loading from './loading';
import user from './user';
import estate from './estate';
import customer from './customer';

export default createStore({
	namespaces: true,
	modules: {
		loading,
		user,
		estate,
		customer,
	},
});
