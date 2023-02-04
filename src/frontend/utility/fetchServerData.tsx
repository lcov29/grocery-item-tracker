async function fetchData(route: string, handler: (value: JSON) => void) {
   const response = await fetch(route);
   if (response.ok) {
      const data = await response.json();
      handler(data);
   }
}


function getPageId(): string {
   return window.location.hash.replace('#', '');
}


export { fetchData, getPageId };
