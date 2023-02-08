/* eslint-disable no-console */
/* eslint-disable no-await-in-loop */
// eslint-disable-next-line import/no-unresolved
import * as readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';
import { createConnection } from 'mariadb';

const read = readline.createInterface({ input, output });


console.log('\n========== Grocery Item Manager Database Setup ==========\n\n');


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
let restrictedAppUser = '';
let restrictedAppUserPassword = '';
let appAdminUser = '';
let appAdminUserPassword = '';


while (!isValidConnectionOptions) {
   host = await read.question('Host:\t');

   const answerDefaultPort = await read.question('\nIs your server listening to the default port 3306 (y/n)?\t');
   const isDefaultPort = ['y', 'Y'].includes(answerDefaultPort);
   const port = (isDefaultPort) ? 3306 : await read.question('Port:\t');

   const user = await read.question('\nUser:\t');
   const password = await read.question('\nPassword:\t');

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

   await dbConnection.query('create database GroceryItemManager;');
   console.log('\nSuccessfully created database "GroceryItemManager"');



   // Create Tables

   console.log('\n\n\n=== Create Tables \n');
   const tableList = [];

   await dbConnection.query(
      `create table GroceryItemManager.Currency (
         name varchar(100) not null,
         symbol char(1) not null
      );`
   );
   tableList.push({ table: 'Currency' });


   await dbConnection.query(
      `create table GroceryItemManager.WeightUnits (
         id int auto_increment,
         unit varchar(100) not null,
         symbol varchar(10) not null,
         primary key(id)
      );`
   );
   tableList.push({ table: 'WeightUnits' });


   await dbConnection.query(
      `create table GroceryItemManager.Distributor (
         id int auto_increment,
         name varchar(250) not null,
         primary key(id)
      );`
   );
   tableList.push({ table: 'Distributor' });


   await dbConnection.query(
      `create table GroceryItemManager.Categories (
         id int auto_increment,
         name varchar(250) not null,
         parentCategoryId int default null,
         primary key(id),
         foreign key(parentCategoryId) references Categories(id)
      );`
   );
   tableList.push({ table: 'Categories' });


   await dbConnection.query(
      `create table GroceryItemManager.Products (
         id int auto_increment,
         categoryId int not null,
         weightUnitId int,
         weight int not null,
         name varchar(250) not null,
         constraint constrWeight check(weight > 0),
         primary key(id),
         foreign key(weightUnitId) references WeightUnits(id) on update cascade,
         foreign key(categoryId) references Categories(id) on update cascade
      );`
   );
   tableList.push({ table: 'Products' });


   await dbConnection.query(
      `create table GroceryItemManager.ShoppingList (
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
      `create table GroceryItemManager.Supply (
         id int auto_increment,
         productId int not null,
         distributorId int not null,
         price decimal(8, 2),
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
      `create table GroceryItemManager.MinimumSupply (
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
      `create view GroceryItemManager.GrocerySupplyOverview as
      select c2.name as topcategory, c1.name as subcategory, p.name as product, s.amount
      from (select productId, count(distinct id) as amount 
            from GroceryItemManager.Supply 
            where consumptionDate is null
            group by productId) as s 
            inner join GroceryItemManager.Products as p on s.productId = p.id
            inner join GroceryItemManager.Categories as c1 on p.categoryId = c1.id
            inner join GroceryItemManager.Categories as c2 on c1.parentCategoryId = c2.id
      order by c2.id asc, c1.id asc;`
   );


   await dbConnection.query(
      `create view GroceryItemManager.UpcomingExpirationDates as
      select s.id, p.name as product, s.expirationDate
      from (select id, productId, expirationDate from GroceryItemManager.Supply where consumptionDate is null) as s
            inner join GroceryItemManager.Products as p on s.productId = p.id
      order by s.expirationDate asc;`
   );



   // Create Application User And Add Privileges

   console.log('\n\n\n=== Specify Application User\n');

   console.log('The application requires a separate database user with minimal privileges.\n\n');

   let isValidAppUser = false;

   while (!isValidAppUser) {
      restrictedAppUser = await read.question('Application User:\t');
      restrictedAppUserPassword = await read.question('Password:\t');

      try {
         await dbConnection.query(
            `create user ?@?
               identified by ?
               password expire never;`,
            [restrictedAppUser, host, restrictedAppUserPassword]
         );

         await dbConnection.query('create role groceryItemManagerUserRole;');

         await dbConnection.query(
            `grant select 
            on GroceryItemManager.UpcomingExpirationDates
            to groceryItemManagerUserRole;`
         );

         await dbConnection.query(
            `grant select 
            on GroceryItemManager.GrocerySupplyOverview
            to groceryItemManagerUserRole;`
         );

         await dbConnection.query(
            `grant groceryItemManagerUserRole
            to ?@?;`,
            [restrictedAppUser, host]
         );

         await dbConnection.query(
            `set default role groceryItemManagerUserRole 
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

   const answerAdminUserRequired = await read.question('\n\n\nCreate admin user with full rights to the app database (y/n)?');
   const isAppAdminUserRequired = ['Y', 'y'].includes(answerAdminUserRequired);

   if (isAppAdminUserRequired) {
      let isValidAppAdminUser = false;

      console.log('\n\n=== Specify Application Admin User\n');

      console.log('This user will be granted full access privilege to applicatio database for maintenance purposes.\n\n');

      while (!isValidAppAdminUser) {
         appAdminUser = await read.question('Application Admin User:\t');
         appAdminUserPassword = await read.question('Password:\t');

         try {

            await dbConnection.query(
               `create user ?@?
               identified by ?
               password expire never;`,
               [appAdminUser, host, appAdminUserPassword]
            );

            await dbConnection.query('create role "groceryItemManagerAdminRole";');

            await dbConnection.query('grant all on GroceryItemManager.* to "groceryItemManagerAdminRole";');

            await dbConnection.query(
               `grant groceryItemManagerAdminRole
               to ?@?;`,
               [appAdminUser, host]
            );

            await dbConnection.query(
               `set default role groceryItemManagerAdminRole 
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

   console.log('Database Setup completed');

} catch (error) {

   // Rollback All Changes

   console.log('Failed to create database:\n');
   console.log(error);
   console.log('\n\nResetting created entities...');

   try {
      await dbConnection.query('drop database GroceryItemManager');
      console.log('Dropped database GroceryItemManager');
   } catch (error2) {
      console.log(`Failed to drop database GroceryItemManager\n\n${error}`);
   }

   try {
      await dbConnection.query('drop role if exists groceryItemManagerUserRole;');
      await dbConnection.query('drop role if exists groceryItemManagerAdminRole;');

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
