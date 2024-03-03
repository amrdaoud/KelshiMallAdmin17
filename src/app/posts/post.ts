export interface PostListViewModel {
	postId: number;
	title: string;
	description: string;
	postingDate: Date;
	price: number;
	isNegotiable: boolean;
	isFeatured: boolean;
	storeId: number;
	storeName: string;
    userId: string;
    userName: string;
    mobileNumber: string;
	categoryId: number;
	categoryName: string;
	parentCategoryId: number;
	parentCategoryName: string;
	totalViews: number;
	status: string;
	area: string;
	city: string;
	statusReason: string;
	lastActivatedBy: string;
}

export interface PostFilterModel {
    SearchQuery?: string;
    PageIndex: number;
    PageSize: number;
    SortActive: string;
    SortDirection: string;
    DateFrom?: Date;
    DateTo?: Date;
    Status?: string;
    UserId?: string;
    StoreId?: number;
	IsFeatured?: boolean;
	IsReposted?: boolean;
}

export interface Post {
	postId: number;
	title: string;
	thumbnailUrl: string;
	description: string;
	postingDate: Date;
	price: number;
	isNegotiable: boolean;
	isFeatured: boolean;
	storeId: number;
	categoryId: number;
	parentCategoryId: number;
	status: string;
	area: string;
	city: string;
	storeTitle: string;
	userMobile: string;
	postData: PostData[]
	postAttachment: PostAttachmentBindingModel[];
	statusReason: string;
	categoryName: string;
	parentCategoryName: string;
	lastActivatedBy: string;
	userId: string;
	dynamicStatus?: string;
	isReposted: boolean;
}

export interface PostData {
	postDataId: number;
	parameterType: string;
	parameterTypeName: string;
	parameterValue: string;
	parameterCheckValue: boolean;
	postId: number;
	parameterLabel: string;
}

export interface Attachement {
	attachementId: number;
	filePath: string;
	fileName: string;
	fileType: string;
	creationDate: Date;
	paramters: string;
	fileExtension: string;
	isPrimary: boolean;
	url: string;
}


export interface PostAttachmentBindingModel {
	postAttachmentId: number;
	postId: number;
	attachementId: number;
	attachment: Attachement;
}
export interface ChangeStatusModel {
	PostId: number;
	Status: string;
	StatusReason: string;
}