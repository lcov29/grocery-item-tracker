type SupplyOverviewDatabaseRecord = {
   topcategory: string,
   subcategory: string,
   product: string,
   amount: string
};


type CategoryName = 'topcategory' | 'subcategory';


type ProductData = {
   name: string,
   total: number,
   minimum?: number
};


type SubCategory = {
   name: string,
   total: number,
   minimum?: number,
   productList?: ProductData[]
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


export {
   SupplyOverviewDatabaseRecord, CategoryName, ProductData, SubCategory,
   TopCategory, SupplyOverviewFrontendData
};
