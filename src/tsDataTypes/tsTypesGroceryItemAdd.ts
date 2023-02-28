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


export { ProductData, MeasurementData, CategoryData, ProductNameListData };
