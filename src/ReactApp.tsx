import React from 'react';
import { ItemTable } from './components/itemList/ItemTable/ItemTable';
import { Category } from './components/itemList/Category/Category';


function ReactApp() {

   const headerList = ['Id', 'Product', 'Bought', 'Expires'];
   const cannedFoodRowList = [
      ['23', 'Chicken Soup', '01.01.2023', '12.04.2034'],
      ['135', 'Ravioli', '14.09.2020', '27.11.2024'],
      ['234', 'Tomato Soup', '30.03.2018', '03.07.2026']
   ];
   const breadRowList = [
      ['450', 'White Bread', '01.01.2023', '12.04.2034'],
      ['321', 'Baguette', '14.09.2020', '27.11.2024'],
   ];
   const noodleRowList = [
      ['4', 'Spaghetti', '01.01.2023', '12.04.2034'],
      ['321', 'Lasagna', '14.09.2020', '27.11.2024'],
   ];
   const waterRowList = [
      ['34', 'Mineral Water (6 x 1.5 liters)', '12.12.2022', '05.08.2023'],
      ['123', 'Sparkling Water (4 x 2 liters)', '05.06.2020', '12.11.2022']
   ];
   const softDrinkRowList = [
      ['493', 'Coca Cola (6 x 1 liters)', '03.10.2020', '14.05.2025'],
      ['2432', 'Ice Tea Lemon (1 liter) ', '05.06.2020', '12.11.2022']
   ];

   const cannedFoodTable = <ItemTable headerList={headerList} rowList={cannedFoodRowList} />;
   const breadTable = <ItemTable headerList={headerList} rowList={breadRowList} />;
   const noodleTable = <ItemTable headerList={headerList} rowList={noodleRowList} />;
   const waterTable = <ItemTable headerList={headerList} rowList={waterRowList} />;
   const softDrinkTable = <ItemTable headerList={headerList} rowList={softDrinkRowList} />;

   const subcategoryCannedFood = <Category key={1} categoryName="Canned Food" additionalText="3 Items" contentList={[cannedFoodTable]} />;
   const subcategoryBread = <Category key={2} categoryName="Bread" additionalText="2 Items" contentList={[breadTable]} />;
   const subcategoryNoodle = <Category key={3} categoryName="Noodle" additionalText="2 Items" contentList={[noodleTable]} />;
   const subcategoryInstantMeals = <Category key={4} categoryName="Instant Meals" additionalText="0 Items" />;
   const subcategoryFoodList = [
      subcategoryCannedFood,
      subcategoryBread,
      subcategoryNoodle,
      subcategoryInstantMeals
   ];

   const subcategoryWater = <Category key={1} categoryName="Water" additionalText="2 Items" contentList={[waterTable]} />;
   const subcategorySoftDrinks = <Category key={2} categoryName="Soft Drinks" additionalText="2 Items" contentList={[softDrinkTable]} />;
   const subcategoryAlcohol = <Category key={3} categoryName="Alcohol" additionalText="0 Items" />;
   const subcategoryBeverageList = [subcategoryWater, subcategorySoftDrinks, subcategoryAlcohol];

   return (
      <>
         <Category key={1} categoryName="Food" additionalText="7 Items" contentList={subcategoryFoodList} />
         <Category key={2} categoryName="Beverage" additionalText="4 Items" contentList={subcategoryBeverageList} />
         <Category key={3} categoryName="Household Items" />
      </>
   );

}


export { ReactApp };
