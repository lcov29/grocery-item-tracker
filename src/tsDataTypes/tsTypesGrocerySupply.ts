type SupplyListDatabaseRecord = {
   topcategory: string,
   subcategory: string,
   product: string,
   id: number,
   distributor: string,
   buyDate: string,
   expirationDate: string
};


type PropertyName = 'topcategory' | 'subcategory' | 'product';


type ItemData = {
   id: number,
   buyDate: string,
   distributor: string,
   expirationDate: string
};


type Product = {
   name: string,
   total: number,
   minimum?: number,
   itemList: ItemData[]
};


type SubCategory = {
   name: string,
   total: number,
   minimum?: number,
   productList: Product[]
};


type TopCategory = {
   name: string,
   total: number,
   minimum?: number,
   subCategoryList: SubCategory[]
};


type SupplyListFrontendData = {
   data: TopCategory[]
};


export {
   SupplyListDatabaseRecord,
   PropertyName,
   ItemData,
   Product,
   SubCategory,
   TopCategory,
   SupplyListFrontendData
};
