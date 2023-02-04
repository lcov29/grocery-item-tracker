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


export { homeSupplyOverviewData };
