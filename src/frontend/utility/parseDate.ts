function parseDatabaseDate(date: string): string {
   return new Date(date).toLocaleDateString('de-DE');
}


export { parseDatabaseDate };
