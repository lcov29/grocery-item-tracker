import { expirationDateData } from '../demoData';


function calculateDayDifference(dateString: string): number {
   const millisecondsDifference = new Date(dateString).getTime() - Date.now();
   const millisecondsPerDay = 1000 * 60 * 60 * 24;
   return Math.round(millisecondsDifference / millisecondsPerDay);
}


function compareDates(dateString1: string, dateString2: string): number {
   return new Date(dateString1).getTime() - new Date(dateString2).getTime();
}


function formatDate(dateString: string): string {
   return new Date(dateString).toLocaleDateString('de-DE');
}


function handleExpirationDataRequest(dayLimit: number) {

   let result;

   result = expirationDateData.data.filter(
      (element) => calculateDayDifference(element.expirationDate) < dayLimit
   );

   result.sort((entry1, entry2) => compareDates(entry1.expirationDate, entry2.expirationDate));

   result = result.map(
      (element) => ({ ...element, expirationDate: formatDate(element.expirationDate) })
   );

   result = { data: result };

   return result;
}


export { handleExpirationDataRequest };
