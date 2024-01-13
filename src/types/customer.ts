export interface Customer {
	id?: string;
	phone: number;
	visitDate: string;
	visitTime: string;
	gender: string;
	age: number;
	links: [{ url: string; memo: string }];
	buildingType: string;
	contractType: string;
	residence: string;
	deposit: number;
	monthly: number;
	loan: string;
	loanProduct: string;
	geunlin: string;
	position: string;
	moveDate: string;
	elevator: string;
	pet: string;
	parking: string;
	window: string;
	condition: string;
	roomStructure: string;
	roomDirection: string;
	floor: string;
	option: string;
	description: string;
	estateIds: string[];
	estateList: [];
}

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
