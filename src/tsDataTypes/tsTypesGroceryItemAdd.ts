type AddItemToSupplyResponse = {
   ok: number,
   data?: AddedItemReceiptData[]
};


type AddedItemReceiptData = {
   id: string,
   productName: string,
   distributor: string,
   buyDate: string,
   expirationDate: string
};


type GroceryItemData = {
   id: number,
   productName: string,
   distributor: string,
   amount: number,
   pricePerUnit: number,
   buyDate: string,
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
   AddItemToSupplyResponse,
   AddedItemReceiptData,
   GroceryItemData,
   ProductData,
   MeasurementData,
   CategoryData,
   ProductNameListData,
   DistributorNameList
};
