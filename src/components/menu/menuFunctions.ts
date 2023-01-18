function isDesktopView(windowInnerWidth: number): boolean {
   return windowInnerWidth > 700;
}


/*
function hideAllDropdowns(): void {
   const dropdownList = document.querySelectorAll<HTMLElement>('.menu-entry-dropdown');
   dropdownList.forEach((dropdown) => dropdown.classList.remove('visible'));
}
*/


export { isDesktopView };
