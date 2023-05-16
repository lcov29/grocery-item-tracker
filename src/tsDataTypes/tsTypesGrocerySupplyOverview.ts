type SupplyOverviewDatabaseRecord = {
   topcategory: string,
   subcategory: string,
   product: string,
   amount: string
};


type SupplyListDatabaseRecord = {
   topcategory: string,
   subcategory: string,
   product: string,
   weight: string,
   id: number,
   distributor: string,
   buyDate: string,
   expirationDate: string
};


type ProductListDatabaseRecord = {
   id: number,
   name: string
};


type CategoryName = 'topcategory' | 'subcategory';


type SupplyItem = {
   id: number,
   buyDate: string,
   distributor: string,
   expirationDate: string
};


type ProductSupplyData = {
   name: string,
   total: number,
   itemList: SupplyItem[],
   minimum?: number
};


type ProductSupplyOverview = {
   name: string,
   total: number,
   minimum?: number
};


type SubCategory = {
   name: string,
   total: number,
   minimum?: number,
   productList?: ProductSupplyOverview[]
};


type TopCategory = {
   name: string,
   total: number,
   minimum?: number,
   subCategoryList?: SubCategory[]
};


type SupplyOverviewFrontendData = {
   data: TopCategory[]
};


type ProductListFrontendData = {
   data: ProductListDatabaseRecord[]
};


type ProductSupplyFrontendData = {
   data: ProductSupplyData
};


export {
   SupplyOverviewDatabaseRecord,
   ProductListDatabaseRecord,
   SupplyListDatabaseRecord,
   CategoryName,
   SupplyItem,
   ProductSupplyData,
   ProductSupplyOverview,
   SubCategory,
   TopCategory,
   SupplyOverviewFrontendData,
   ProductListFrontendData,
   ProductSupplyFrontendData
};
