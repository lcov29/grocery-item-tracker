type ConsumeItemsFromSupplyResponse = {
   ok: number
};


type UnconsumedItemId = {
   id: number
};


type PreviewConsumedItem = {
   id: number,
   productName: string,
   amount: string,
   expirationDate: string
};


export { ConsumeItemsFromSupplyResponse, UnconsumedItemId, PreviewConsumedItem };
