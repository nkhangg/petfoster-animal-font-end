import { store } from '@/redux/store';

import {
    IOtherHistories,
    IApiBestSeller,
    IApiTakeAction,
    IBaseResponse,
    IDataFormPayment,
    IDetailProduct,
    IOrderItem,
    IProductRevenue,
    IProfile,
    IReports,
    ISalesOverviews,
    ISignDataResponse,
    IUser,
    TypesAndBrands,
    IDataFilterPage,
    IDataRequestFilter,
    PagiantionResponse,
    IProductManageList,
    DataProductType,
    ProductInfo,
    IImage,
    IUserManage,
} from './interface';
export type ValidTags = keyof JSX.IntrinsicElements;

export type ApiGetUsers = () => Promise<IUser[]>;

export type ApiLogin = (data: UserFormType) => Promise<ISignDataResponse>;

export type ApiRegister = (data: RegisterFormData) => Promise<ISignDataResponse>;

export type ApiTakeActionType = () => Promise<IBaseResponse<IApiTakeAction>>;

export type ApiDetailProductType = (idProduct: string) => Promise<IBaseResponse<IDetailProduct>>;

export type ApiReportType = () => Promise<IBaseResponse<IReports>>;

export type ApiSalesOverviewType = (year: string) => Promise<IBaseResponse<ISalesOverviews>>;

export type ApiRevenueDateType = (dates: { start?: string; end?: string }) => Promise<IBaseResponse<IProductRevenue>>;

export type ApiPayment = (data: IDataFormPayment) => Promise<IBaseResponse<IOrderItem[]>>;

export type ApiBestSellerType = (page: number | undefined) => Promise<IBaseResponse<IApiBestSeller>>;

export type ApiHistory = (page: number | undefined) => Promise<IBaseResponse<IOtherHistories>>;

export type ApiTypesAndBrands = () => Promise<IBaseResponse<TypesAndBrands>>;

export type ApiResetPassword = (email: string) => Promise<IBaseResponse<any>>;

export type ApiGetCurUser = () => Promise<IBaseResponse<IProfile>>;

export type ApiFilterPage = (data: IDataRequestFilter) => Promise<IBaseResponse<IDataFilterPage>>;

export type ApiDetailProductManaege = (id: string) => Promise<IBaseResponse<DataProductType>>;

export type ApiDelete = (id: string) => Promise<IBaseResponse<any>>;

export type ApiUpdateProduct = (data: DataProductType) => Promise<IBaseResponse<any>>;

export type ApiCreateProduct = (data: DataProductType) => Promise<IBaseResponse<any>>;

export type ApiProductsManage = (page: number | undefined) => Promise<IBaseResponse<PagiantionResponse<IProductManageList>>>;

export type ApiAllUser = (page: number | undefined) => Promise<IBaseResponse<PagiantionResponse<IProfile>>>;

export type ApiVerifyCode = (code: string) => Promise<IBaseResponse<any>>;

export type ApiRefreshVerifyCode = (code: string) => Promise<IBaseResponse<any>>;

export type ApiUpdateProductWithInfo = (id: string, data: ProductInfo) => Promise<IBaseResponse<ProductInfo>>;

export type ApiGetProductInfo = (id: string) => Promise<IBaseResponse<ProductInfo>>;

export type ApiUpdateCurUser = (data: DataRequestUpdateUser) => Promise<IBaseResponse<IProfile>>;

export type ApiGetRepositories = (id: string) => Promise<IBaseResponse<RepoType[]>>;

export type ApiAddARepository = (id: string, data: RepoType) => Promise<IBaseResponse<RepoType>>;

export type ApiUpdateARepository = (data: RepoType) => Promise<IBaseResponse<RepoType>>;

export type ApiDeleteARepository = (id: number) => Promise<IBaseResponse<RepoType>>;

export type ApiGetImagesByProduct = (id: string) => Promise<IBaseResponse<IImage[]>>;

export type ApiCreateImagesByProduct = (id: string, files: File[]) => Promise<IBaseResponse<any>>;

export type ApiDeleteImagesByProduct = (data: { id: string; idImage: number }) => Promise<IBaseResponse<any>>;

export type ApiGetUserManage = (id: string) => Promise<IBaseResponse<IUserManage>>;

export type ApiUpdateUserManage = (data: IUserManage) => Promise<IBaseResponse<any>>;

export type ApiCreateUserManage = (data: IUserManage) => Promise<IBaseResponse<any>>;

export type ApiHistories = () => Promise<IBaseResponse<IProfile>>;

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type RoleType = 'ROLE_ADMIN' | 'ROLE_USER';

export type RegisterFormData = {
    username: string;
    gender: string | boolean;
    fullname: string;
    email: string;
    password: string;
    confirmPassword: string;
};

export type ProfileType = {
    fullname: string;
    email: string;
    phone: string;
    gender: string;
    birthday: string;
    // address: string;
    password: string;
    newPassword: string;
};

export type DataRequestUpdateUser = {
    fullname: string;
    email: string;
    phone: string;
    gender: string;
    birthday: string;
    // address: string;
    avatar?: string;
    password: string;
    newPassword: string;
};

export type SortType = string | null;

export type LocationTileType = 'center' | 'left' | 'right';

export type PagesProfileType = 'me' | 'history' | 'logout';

export type ValidateType = { message: string; error: boolean };

export type UserFormType = { username: string; password: string };

export type RepoType = {
    id?: number;
    size: number;
    quantity: number;
    inPrice: number;
    outPrice: number;
};
export type RepoTypeErrors = {
    size: string;
    quantity: string;
    inPrice: string;
    outPrice: string;
};

export type ModeType = 'create' | 'update';
