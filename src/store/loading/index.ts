import { Module } from 'vuex';
import { RootState } from '..';

export interface LoadingState {
	isLoading: boolean;
}

export const loading: Module<LoadingState, RootState> = {
	namespaced: true,
	state: {
		isLoading: false,
	},
	mutations: {
		SET_LOADING: (state, loading) => {
			state.isLoading = loading;
		},
	},
};
