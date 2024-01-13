import { Estate } from '@/types/estate';

export interface EstateState {
	path: string;
	estate: Estate | Record<string, unknown>;
	estateList: Estate[];
}
