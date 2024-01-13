export interface CustomerResult {
	id?: string;
	revisit: string;
	revisitDate: string;
	revisitTime: string;
	contractDate: string;
	moveDate: string;
	contractAddress: {
		postcode: string;
		address: string;
		addressDetail: string;
	};
	deposit: number;
	downPayment: number;
	cost: number;
	currentLesseePhone: number;
	lessee: {
		name: string;
		registrationNumber: string;
		phone: number;
		emergencyPhone: number;
		postcode: string;
		address: string;
		addressDetail: string;
	};
	landlord: {
		name: string;
		registrationNumber: string;
		phone: number;
		emergencyPhone: number;
		postcode: string;
		address: string;
		addressDetail: string;
	};
}
