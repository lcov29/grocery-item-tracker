function parseDatabaseDate(date: string): string {
   return new Date(date).toLocaleDateString('de-DE', { year: 'numeric', month: '2-digit', day: '2-digit' });
}


function getCurrentDateString(): string {
   const date = new Date().toISOString();
   return date.replaceAll(/T[0-9:.]*Z/g, '');
}


export { parseDatabaseDate, getCurrentDateString };
