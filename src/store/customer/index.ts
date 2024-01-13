import { Customer, CustomerResult } from '@/types/customer';

export interface CustomerState {
	path: string;
	result: CustomerResult | Record<string, unknown>;
	customer: Customer | Record<string, unknown>;
	customerList: Customer[];
}
