type GroceryItemData = {
   productName: string,
   distributor: string,
   amount: number,
   pricePerUnit: number,
   expirationDate: string
};


type ProductData = {
   productName: string,
   weight: number,
   categoryId: number,
   measurementUnitId: number
};


type MeasurementData = {
   id: number,
   unitName: string,
   unitSymbol: string
};


type CategoryData = {
   id: number,
   name: string,
   parentCategoryId: number
};


type ProductNameListData = {
   name: string
};


type DistributorNameList = {
   name: string
};


export {
   GroceryItemData,
   ProductData,
   MeasurementData,
   CategoryData,
   ProductNameListData,
   DistributorNameList
};
