type ExpirationDateDatabaseRecord = {
   id: number,
   product: string,
   expirationDate: string
};


type ExpirationDateFrontendData = {
   data: ExpirationDateDatabaseRecord[];
};


export { ExpirationDateDatabaseRecord, ExpirationDateFrontendData };
