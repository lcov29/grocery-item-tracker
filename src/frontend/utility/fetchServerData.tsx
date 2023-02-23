async function fetchData<T>(route: string, handler: (value: T) => void) {
   const response = await fetch(route);
   if (response.ok) {
      const data = await response.json();
      handler(data);
   }
}


async function sendData<T>(route: string, payload: T) {
   const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
   };

   const response = await fetch(route, options);
   return response;
}


function getPageId(): string {
   return window.location.hash.replace('#', '');
}


export { fetchData, sendData, getPageId };
