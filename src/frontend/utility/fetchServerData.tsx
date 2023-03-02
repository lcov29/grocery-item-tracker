async function fetchData<T>(route: string, handler: (value: T) => void) {
   const response = await fetch(route);
   if (response.ok) {
      const data = await response.json();
      handler(data);
   }
}


async function sendData<T, R = Response>(route: string, payload: T): Promise<R> {
   const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
   };
   let response = await fetch(route, options);
   response = await response.json();
   return response as R;
}


function getPageId(): string {
   return window.location.hash.replace('#', '');
}


export { fetchData, sendData, getPageId };
