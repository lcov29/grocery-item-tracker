function parseDatabasePrice(price: number): string {
   let formattedPrice = (price / 100).toFixed(2);
   formattedPrice = Number.parseFloat(formattedPrice).toLocaleString('de-DE');

   const hasNoFractionPart = (price % 100) === 0;
   if (hasNoFractionPart) {
      formattedPrice += ',00';
   }

   return `${formattedPrice} €`;
}


export { parseDatabasePrice };
