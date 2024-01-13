import { createStore } from 'vuex';
import { CustomerDetailState, customerDetail } from './customer/detail';
import { CustomerListState, customerList } from './customer/list';
import { EstateDetailState, estateDetail } from './estate/detail';
import { EstateListState, estateList } from './estate/list';
import { LoadingState, loading } from './loading';
import { UserState, user } from './user';

export interface RootState {
	loading: LoadingState;
	user: UserState;
	estateList: EstateListState;
	estateDetail: EstateDetailState;
	customerList: CustomerListState;
	customerDetail: CustomerDetailState;
}

export default createStore<RootState>({
	modules: {
		loading,
		user,
		estateList,
		estateDetail,
		customerList,
		customerDetail,
	},
});
