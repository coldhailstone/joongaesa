export interface Estate {
	id?: string;
	title: string;
	link: string;
	postcode: string;
	address: string;
	addressDetail: string;
	photo: [];
	deposit: number;
	monthly: number;
	contractType: string;
	buildingType: string;
	buildingForm: string;
	useApprovalDate: string;
	dong: string;
	ho: string;
	wholeFloor: string;
	correspondingFloor: string;
	roomStructure: string;
	pyung: string;
	m2: string;
	roomDirection: string;
	bathroomCount: number;
	elevator: string;
	pet: string;
	parking: string;
	cost: number;
	managementCost: [];
	option: [];
	moveDate: string;
	landLordPhone: number;
	currentLesseePhone: number;
	description: string;
}

export interface CustomerEstate {
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
}
