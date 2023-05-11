function parseDatabaseDate(date: string): string {
   return new Date(date).toLocaleDateString('de-DE', { year: 'numeric', month: '2-digit', day: '2-digit' });
}


export { parseDatabaseDate };
