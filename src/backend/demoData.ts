const homeSupplyOverviewData = {
   data: [
      {
         name: 'Food',
         total: 34,
         minimum: 23,
         subCategoryList: [
            {
               name: 'Bread',
               total: 5,
               minimum: 4,
               productList: [
                  {
                     name: 'Toast',
                     total: 2,
                     minimum: 3
                  },
                  {
                     name: 'Baguette',
                     total: 3,
                     minimum: 4
                  }
               ]
            },
            {
               name: 'Noodles',
               total: 13,
               minimum: 2,
               productList: [
                  {
                     name: 'Spaghetti',
                     total: 6
                  },
                  {
                     name: 'Ravioli',
                     total: 7
                  }
               ]
            }
         ]
      },
      {
         name: 'Beverages',
         total: 5,
         minimum: 4,
         subCategoryList: [
            {
               name: 'Non Alcoholic Beverages',
               total: 2,
               productList: [
                  {
                     name: 'Mineral Water (6 x 1,5 Liter)',
                     total: 1,
                  },
                  {
                     name: 'Orange Juice',
                     total: 1
                  }
               ]
            },
            {
               name: 'Alcoholic Beverages',
               total: 4,
               productList: [
                  {
                     name: 'Beer',
                     total: 2
                  },
                  {
                     name: 'Red Wine',
                     total: 2
                  }
               ]
            }
         ]
      }
   ]
};


const expirationDateData = {
   data: [
      { id: 53, product: 'Cheese Cake', expirationDate: '2023-02-08' },
      { id: 12, product: 'Spaghetti', expirationDate: '2023-02-05' },
      { id: 45, product: 'Apples', expirationDate: '2023-02-07' },
      { id: 76, product: 'Salad', expirationDate: '2023-02-10' },
      { id: 80, product: 'Pizza', expirationDate: '2023-02-12' },
      { id: 83, product: 'Steak', expirationDate: '2023-02-24' },
      { id: 434, product: 'Salt', expirationDate: '2023-04-30' }
   ]
};


export { homeSupplyOverviewData, expirationDateData };
