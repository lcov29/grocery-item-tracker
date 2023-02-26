function setInputValue(inputId: string, value: string): void {
   const input = document.getElementById(inputId) as HTMLInputElement;
   input.value = value;
}


function getInputValue(inputId: string): string {
   const input = document.getElementById(inputId) as HTMLInputElement;
   return input.value;
}


export { setInputValue, getInputValue };
