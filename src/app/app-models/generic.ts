export interface FieldContent {
	fieldContentId: number;
	valueEn: string;
	valueAr: string;
	fieldId: number;
}

export interface Field {
	fieldId: number;
	type: string;
	name: string;
	description: string;
	isMandatory: boolean;
	maximumLength: number;
	contentTextEn: string;
	contentTextAr: string;
	group: string;
	fieldContent: FieldContent[];
}

export interface Category {
	categoryId: number;
	nameEn: string;
	nameAr: string;
	iconUrl: string;
	parentCategoryId?: any;
	backGroundColor: string;
	highlightColor: string;
	inverseParentCategory: Category[];
	sorting: number;
}

export interface Area {
	areaId: number;
	nameEn: string;
	nameAr: string;
	nestingLevel: number;
	parentAreaId?: any;
	inverseParentArea: Area[];
}
export enum Languages {
	EN = 1,
	AR = 2
}