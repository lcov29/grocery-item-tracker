/* eslint-disable no-console */
/* eslint-disable no-await-in-loop */
// eslint-disable-next-line import/no-unresolved
import * as readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';
import { join } from 'node:path';
import { URL } from 'node:url';
import { writeFile } from 'node:fs/promises';
import { createConnection } from 'mariadb';


function getRandomIntegerBetweenInclusive(minInt, maxInt) {
   return Math.floor(minInt + (maxInt - minInt + 1) * Math.random());
}


function generateBuyDate() {
   const currentDate = Date.now();
   const dateFourMonthsAgo = new Date();
   dateFourMonthsAgo.setMonth(dateFourMonthsAgo.getMonth() - 3);
   return new Date(getRandomIntegerBetweenInclusive(currentDate, dateFourMonthsAgo));
}


function generateExpirationDate(buyDate) {
   const maximumExpirationDate = new Date(buyDate.getTime());
   maximumExpirationDate.setMonth(maximumExpirationDate.getMonth() + 9);
   return new Date(getRandomIntegerBetweenInclusive(buyDate.getTime(), maximumExpirationDate));
}


function generateBuyAndExpirationData() {
   let buyDate = generateBuyDate();
   let expirationDate = generateExpirationDate(buyDate);
   buyDate = buyDate.toISOString().replaceAll(/T[0-9:.]*Z/g, '');
   expirationDate = expirationDate.toISOString().replaceAll(/T[0-9:.]*Z/g, '');
   return `"${buyDate}", "${expirationDate}"`;
}


const read = readline.createInterface({ input, output });


console.log('\n========== Grocery Item Tracker Database Setup ==========\n\n');


console.log('Setting up the database requires access to a MariaDB server with the following privileges:');
console.table([
   { privilege: 'Create Role' },
   { privilege: 'Create User' },
   { privilege: 'Create Database' },
   { privilege: 'Create Tables' },
   { privilege: 'Create Views' },
   { privilege: 'Grant Privileges' },
   { privilege: 'Grant Roles' },
   { privilege: 'Insert Data' }
]);



// Connect To Database

console.log('\n\n\n=== MariaDB Server Connection Information\n');

let isValidConnectionOptions = false;
let dbConnection = null;
let host = '';
let port = '';
let restrictedAppUser = '';
let restrictedAppUserPassword = '';
let appAdminUser = '';
let appAdminUserPassword = '';


while (!isValidConnectionOptions) {
   host = await read.question('Host:\t\t');

   const answerDefaultPort = await read.question('\nIs your server listening to the default port 3306 (y/n)?\t');
   const isDefaultPort = ['y', 'Y'].includes(answerDefaultPort);
   port = (isDefaultPort) ? 3306 : await read.question('Port:\t');

   const user = await read.question('\nAdmin User:\t\t');
   const password = await read.question('\nPassword:\t\t');

   try {
      dbConnection = await createConnection({ host, port, user, password });
      isValidConnectionOptions = true;
      console.log(`\n\nSuccessfully connected to database on ${host}:${port}`);
   } catch (error) {
      console.error(`\n\nFailed to connect to database:\n\n ${error}\n\n`);
   }
}


try {

   // Create Database

   console.log('\n\n\n=== Create Database \n');
   await dbConnection.query('create database grocery_item_tracker;');
   console.log('\nSuccessfully created database "grocery_item_tracker"');



   // Create Tables

   console.log('\n\n\n=== Create Tables \n');
   const tableList = [];


   await dbConnection.query(
      `create table grocery_item_tracker.Localization (
         id int auto_increment,
         language varchar(100) not null,
         currencySymbol varchar(10) not null,
         localeCode varchar(50) not null,
         primary key(id)
      );`
   );
   tableList.push({ table: 'Localization' });


   await dbConnection.query(
      `create table grocery_item_tracker.MeasurementUnits (
         id int auto_increment,
         unitName varchar(50),
         unitSymbol varchar(10),
         primary key(id) 
      );`
   );
   tableList.push({ table: 'MeasurementUnits' });


   await dbConnection.query(
      `create table grocery_item_tracker.Distributor (
         id int auto_increment,
         name varchar(250) not null,
         primary key(id)
      );`
   );
   tableList.push({ table: 'Distributor' });


   await dbConnection.query(
      `create table grocery_item_tracker.MeasurementUnitsMap (
         localizationId int not null,
         measurementUnitId int not null,
         primary key(localizationId, measurementUnitId),
         foreign key(localizationId) references Localization(id) on update cascade,
         foreign key(measurementUnitId) references MeasurementUnits(id) on update cascade
      );`
   );
   tableList.push({ table: 'MeasurementUnitsMap' });


   await dbConnection.query(
      `create table grocery_item_tracker.Categories (
         id int auto_increment,
         name varchar(250) not null,
         parentCategoryId int default null,
         primary key(id),
         foreign key(parentCategoryId) references Categories(id)
      );`
   );
   tableList.push({ table: 'Categories' });


   await dbConnection.query(
      `create table grocery_item_tracker.Products (
         id int auto_increment,
         categoryId int not null,
         measurementUnitId int,
         weight int not null,
         name varchar(250) not null,
         constraint constrWeight check(weight > 0),
         primary key(id),
         foreign key(measurementUnitId) references MeasurementUnits(id) on update cascade,
         foreign key(categoryId) references Categories(id) on update cascade
      );`
   );
   tableList.push({ table: 'Products' });


   await dbConnection.query(
      `create table grocery_item_tracker.ShoppingList (
         id int auto_increment,
         productId int not null,
         amount int not null,
         constraint constrShoppingListItemAmount check(amount > 0),
         primary key(id),
         foreign key(productId) references Products(id)
            on update cascade
      );`
   );
   tableList.push({ table: 'ShoppingList' });


   await dbConnection.query(
      `create table grocery_item_tracker.Supply (
         id int auto_increment,
         productId int not null,
         distributorId int not null,
         price int,
         buyDate Date not null,
         expirationDate Date not null,
         consumptionDate Date,
         constraint constrSupplyItemPrice check(price >= 0),
         primary key(id),
         foreign key(productId) references Products(id) on update cascade,
         foreign key(distributorId) references Distributor(id) on update cascade
      );`
   );
   tableList.push({ table: 'Supply' });


   await dbConnection.query(
      `create table grocery_item_tracker.MinimumSupply (
         id int auto_increment,
         productId int,
         categoryId int,
         minimumAmount int not null,
         constraint constrMinimumAmount check(minimumAmount > 0),
         primary key(id),
         foreign key(productId) references Products(id) on update cascade,
         foreign key(categoryId) references Categories(id) on update cascade
      );`
   );
   tableList.push({ table: 'MinimumSupply' });

   console.log('Successfully created the following tables: ');
   console.table(tableList);



   // Create Views

   await dbConnection.query(
      `create view grocery_item_tracker.GrocerySupplyOverview as
      select c2.name as topcategory, c1.name as subcategory, p.name as product, s.amount
      from (select productId, count(distinct id) as amount 
            from grocery_item_tracker.Supply 
            where consumptionDate is null
            group by productId) as s 
            inner join grocery_item_tracker.Products as p on s.productId = p.id
            inner join grocery_item_tracker.Categories as c1 on p.categoryId = c1.id
            inner join grocery_item_tracker.Categories as c2 on c1.parentCategoryId = c2.id
      order by c2.id asc, c1.id asc;`
   );


   await dbConnection.query(
      `create view grocery_item_tracker.GrocerySupplyList as 
      select c2.name as topcategory,
             c1.name as subcategory,
             p.name as product,
             concat(p.weight, m.unitSymbol) as weight,
             s.id,
             d.name as distributor,
             s.buyDate,
             s.expirationDate
      from (select * from grocery_item_tracker.Supply where consumptionDate is null) as s
            inner join grocery_item_tracker.Products as p on s.productId = p.id
            inner join grocery_item_tracker.MeasurementUnits as m on p.measurementUnitId = m.id
            inner join grocery_item_tracker.Distributor as d on s.distributorId = d.id
            inner join grocery_item_tracker.Categories as c1 on p.categoryId = c1.id
            inner join grocery_item_tracker.Categories as c2 on c1.parentCategoryId = c2.id
      order by c2.id asc, c1.id asc, s.productId asc, s.id asc;`
   );


   await dbConnection.query(
      `create view grocery_item_tracker.UpcomingExpirationDates as
      select s.id, p.name as product, s.expirationDate
      from (select id, productId, expirationDate from grocery_item_tracker.Supply where consumptionDate is null) as s
            inner join grocery_item_tracker.Products as p on s.productId = p.id
      order by s.expirationDate asc, s.id asc;`
   );


   await dbConnection.query(
      `create view grocery_item_tracker.ProductsInSupply as
      select id, name
      from grocery_item_tracker.Products
      where id in (select distinct productId from grocery_item_tracker.Supply where consumptionDate is null);`
   );



   // Insert Standard Data

   await dbConnection.query(
      `insert into grocery_item_tracker.Localization (language, currencySymbol, localeCode)
      values ("USA", "$", "en-US"), ("UK", "£", "en-GB" ), ("France", "€", "fr-FR"),
             ("Germany", "€", "de-DE"), ("Spain", "€", "es-ES");`
   );


   await dbConnection.query(
      `insert into grocery_item_tracker.MeasurementUnits (unitName, unitSymbol)
      values ("gramm", 'g'), ("liter", "L");`
   );


   await dbConnection.query(
      `insert into grocery_item_tracker.MeasurementUnitsMap
      values (3, 1), (3, 2), (4, 1), (4, 2), (5, 1), (5, 2);`
   );



   // Insert Demo Data If Requested

   const answerCreateDemoData = await read.question('\n\n\nInsert demo data in the app database (y/n)?\t');
   const isDemoDataRequired = ['Y', 'y'].includes(answerCreateDemoData);

   if (isDemoDataRequired) {
      try {

         await dbConnection.query(
            `insert into grocery_item_tracker.Distributor(name)
            values ("Aldi"), ("Netto"), ("Super U");`
         );


         await dbConnection.query(
            `insert into grocery_item_tracker.Categories(name, parentCategoryid) 
            values ("Food", null), ("Beverages", null), ("Canned Food", 1), 
            ("Instant Meal", 1), ("Bread", 1), ("Mineral Water", 2),
            ("Coffee", 2), ("Milk", 2);`
         );


         await dbConnection.query(
            `insert into grocery_item_tracker.Products (categoryId, measurementUnitId, weight, name)
            values 
            (3, 2, 800, "Chicken Soup"),
            (3, 1, 400, "Tomato Soup"),
            (4, 2, 250, "Noodle In Tomato Sauce"),
            (4, 2, 252, "Noodle In Cheese Sauce"),
            (5, 2, 300, "Baguette"),
            (5, 2, 500, "Toast"),
            (5, 2, 400, "Croissant"),
            (6, 1, 9000, "Mineral Water (6 x 1,5 Liter)"), 
            (6, 1, 9000, "Sparkling Mineral Water (6 x 1,5 Liter)"),
            (7, 1, 1000, "Espresso"),
            (7, 1, 500, "Standard Coffee"),
            (8, 1, 1000, "Milk (fat free)"),
            (8, 1, 1000, "Milk (standard fat)");`
         );


         await dbConnection.query(
            `insert into grocery_item_tracker.Supply (productId, distributorId, price, buyDate, expirationDate, consumptionDate)
            values
            (1, 1, 2.50, ${generateBuyAndExpirationData()}, null),
            (1, 1, 2.24, ${generateBuyAndExpirationData()}, null),
            (1, 1, 2.65, ${generateBuyAndExpirationData()}, null),
            (1, 1, 2.50, ${generateBuyAndExpirationData()}, null),
            (2, 2, 0.90, ${generateBuyAndExpirationData()}, null),
            (2, 2, 0.56, ${generateBuyAndExpirationData()}, null),
            (3, 3, 1.50, ${generateBuyAndExpirationData()}, null),
            (3, 2, 1.40, ${generateBuyAndExpirationData()}, null),
            (4, 3, 1.70, ${generateBuyAndExpirationData()}, null),
            (5, 1, 3.75, ${generateBuyAndExpirationData()}, null),
            (5, 1, 3.36, ${generateBuyAndExpirationData()}, null),
            (6, 3, 2.50, ${generateBuyAndExpirationData()}, null),
            (6, 3, 2.22, ${generateBuyAndExpirationData()}, null),
            (7, 2, 1.95, ${generateBuyAndExpirationData()}, null),
            (7, 2, 1.75, ${generateBuyAndExpirationData()}, null),
            (8, 1, 9.45, ${generateBuyAndExpirationData()}, null),
            (8, 2, 7.23, ${generateBuyAndExpirationData()}, null),
            (9, 3, 5.89, ${generateBuyAndExpirationData()}, null),
            (10, 2, 10.25, ${generateBuyAndExpirationData()}, null),
            (11, 2, 06.43, ${generateBuyAndExpirationData()}, null),
            (12, 3, 5.25, ${generateBuyAndExpirationData()}, null),
            (13, 3, 2.60, ${generateBuyAndExpirationData()}, null);`
         );

      } catch (error) {
         console.log(`Failed to insert demo data:\n${error}`);
      }
   }



   // Create Application User And Add Privileges

   console.log('\n\n\n=== Specify Application User\n');

   console.log('The application requires a separate database user with minimal privileges.\n\n');

   let isValidAppUser = false;

   while (!isValidAppUser) {
      restrictedAppUser = await read.question('Application User:\t');
      restrictedAppUserPassword = await read.question('Password:\t\t');

      try {

         await dbConnection.query(
            `create user ?@?
               identified by ?
               password expire never;`,
            [restrictedAppUser, host, restrictedAppUserPassword]
         );


         await dbConnection.query('create role groceryItemTrackerUserRole;');


         await dbConnection.query(
            `grant select 
            on grocery_item_tracker.*
            to groceryItemTrackerUserRole;`
         );


         await dbConnection.query(
            `grant insert
            on grocery_item_tracker.*
            to groceryItemTrackerUserRole;`
         );


         await dbConnection.query(
            `grant update
            on grocery_item_tracker.Supply
            to groceryItemTrackerUserRole;`
         );


         await dbConnection.query(
            `grant groceryItemTrackerUserRole
            to ?@?;`,
            [restrictedAppUser, host]
         );


         await dbConnection.query(
            `set default role groceryItemTrackerUserRole 
            for ?@?;`,
            [restrictedAppUser, host]
         );

         isValidAppUser = true;
         console.log(`\nSuccessfully created application user "${restrictedAppUser}"`);
      } catch (error) {
         console.log('\nFailed to create application user. User may already be defined.');
         console.log(error);
      }

   }



   // Create Optional Admin User And Add Privileges

   const answerAdminUserRequired = await read.question('\n\n\nCreate admin user with full rights to the app database (y/n)?\t');
   const isAppAdminUserRequired = ['Y', 'y'].includes(answerAdminUserRequired);

   if (isAppAdminUserRequired) {
      let isValidAppAdminUser = false;

      console.log('\n\n=== Specify Application Admin User\n');

      console.log('This user will be granted full access privilege to applicatio database for maintenance purposes.\n\n');

      while (!isValidAppAdminUser) {
         appAdminUser = await read.question('Application Admin User:\t');
         appAdminUserPassword = await read.question('Password:\t\t');

         try {

            await dbConnection.query(
               `create user ?@?
               identified by ?
               password expire never;`,
               [appAdminUser, host, appAdminUserPassword]
            );


            await dbConnection.query('create role "groceryItemTrackerAdminRole";');


            await dbConnection.query('grant all on grocery_item_tracker.* to "groceryItemTrackerAdminRole";');


            await dbConnection.query(
               `grant groceryItemManagerTrackerRole
               to ?@?;`,
               [appAdminUser, host]
            );


            await dbConnection.query(
               `set default role groceryItemTrackerAdminRole 
               for ?@?;`,
               [appAdminUser, host]
            );

            isValidAppAdminUser = true;
            console.log(`\nSuccessfully created application admin user "${appAdminUser}"`);
         } catch (error) {
            console.log('\nFailed to create application user. User may already be defined.');
            console.log(error);
         }
      }
   }

   read.close();

   console.log('\n\n\nDatabase Setup completed');

   const dirname = new URL('.', import.meta.url).pathname;
   const filePath = join(dirname, '../../../dist/.env');
   const fileContent = `DB_HOST=${host}\nDB_PORT=${port}\nDB_USER=${restrictedAppUser}\nDB_PWD=${restrictedAppUserPassword}`;

   await writeFile(filePath, fileContent);

   console.log('\n\n\nDatabase credentials saved to dist/.env');

} catch (error) {

   // Rollback All Changes

   console.log('Failed to create database:\n');
   console.log(error);
   console.log('\n\nResetting created entities...');

   try {
      await dbConnection.query('drop database grocery_item_tracker');
      console.log('Dropped database grocery_item_tracker');
   } catch (error2) {
      console.log(`Failed to drop database grocery_item_tracker\n\n${error}`);
   }

   try {
      await dbConnection.query('drop role if exists groceryItemTrackerUserRole;');
      await dbConnection.query('drop role if exists groceryItemTrackerAdminRole;');

      if (restrictedAppUser) {
         await dbConnection.query('drop user ?@?;', [restrictedAppUser, host]);
      }

      if (appAdminUser) {
         await dbConnection.query('drop user ?@?;', [appAdminUser, host]);
      }

      console.log('Dropped created users and roles');
   } catch (error2) {
      console.log(`Failed to drop created users or roles\n\n${error2}`);
   }
}


dbConnection?.end();
