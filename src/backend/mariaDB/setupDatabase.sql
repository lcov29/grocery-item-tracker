-- create database

drop database if exists grocery_item_tracker;

create database grocery_item_tracker;
use grocery_item_tracker;



-- create tables

create table Localization (
   id int auto_increment,
   language varchar(100) not null,
   currencySymbol varchar(10) not null,
   localeCode varchar(50) not null,
   primary key(id)
);


create table MeasurementUnits (
   id int auto_increment,
   unitName varchar(50),
   unitSymbol varchar(10),
   primary key(id) 
);


create table Distributor (
   id int auto_increment,
   name varchar(250) not null,
   primary key(id)
);


create table MeasurementUnitsMap (
   localizationId int not null,
   measurementUnitId int not null,
   primary key(localizationId, measurementUnitId),
   foreign key(localizationId) references Localization(id) on update cascade,
   foreign key(measurementUnitId) references MeasurementUnits(id) on update cascade
);


create table Categories (
   id int auto_increment,
   name varchar(250) not null,
   parentCategoryId int default null,
   primary key(id),
   foreign key(parentCategoryId) references Categories(id)
);


create table Products (
   id int auto_increment,
   categoryId int not null,
   measurementUnitId int,
   weight int not null,
   name varchar(250) not null,
   constraint constrWeight check(weight > 0),
   primary key(id),
   foreign key(measurementUnitId) references MeasurementUnits(id) on update cascade,
   foreign key(categoryId) references Categories(id) on update cascade
);


create table ShoppingList (
   id int auto_increment,
   productId int not null,
   amount int not null,
   constraint constrShoppingListItemAmount check(amount > 0),
   primary key(id),
   foreign key(productId) references Products(id) on update cascade
);


create table Supply (
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
);


create table MinimumSupply (
   id int auto_increment,
   productId int,
   categoryId int,
   minimumAmount int not null,
   constraint constrMinimumAmount check(minimumAmount > 0),
   primary key(id),
   foreign key(productId) references Products(id) on update cascade,
   foreign key(categoryId) references Categories(id) on update cascade
);



-- create views

create view GrocerySupplyOverview as
select c2.name as topcategory, c1.name as subcategory, p.name as product, s.amount
from (select productId, count(distinct id) as amount 
      from Supply 
      where consumptionDate is null
      group by productId) as s 
      inner join Products as p on s.productId = p.id
      inner join Categories as c1 on p.categoryId = c1.id
      inner join Categories as c2 on c1.parentCategoryId = c2.id
order by c2.id asc, c1.id asc;


create view GrocerySupplyList as 
select c2.name as topcategory,
       c1.name as subcategory,
       p.name as product,
       concat(p.weight, m.unitSymbol) as weight,
       s.id,
       d.name as distributor,
       s.buyDate,
       s.expirationDate
from (select * from Supply where consumptionDate is null) as s
      inner join Products as p on s.productId = p.id
      inner join MeasurementUnits as m on p.measurementUnitId = m.id
      inner join Distributor as d on s.distributorId = d.id
      inner join Categories as c1 on p.categoryId = c1.id
      inner join Categories as c2 on c1.parentCategoryId = c2.id
order by c2.id asc, c1.id asc, s.productId asc, s.id asc;


create view UpcomingExpirationDates as
select s.id, p.name as product, s.expirationDate
from (select id, productId, expirationDate from Supply where consumptionDate is null) as s
      inner join Products as p on s.productId = p.id
order by s.expirationDate asc, s.id asc;


create view ProductsInSupply as
select id, name
from Products
where id in (select distinct productId from Supply where consumptionDate is null);



-- insert standard data

insert into Localization (language, currencySymbol, localeCode)
values ("USA", "$", "en-US"), ("UK", "£", "en-GB" ), ("France", "€", "fr-FR"),
       ("Germany", "€", "de-DE"), ("Spain", "€", "es-ES");


insert into MeasurementUnits (unitName, unitSymbol)
values ("gallon", "gal"), ("pound", "lb"), ("liter", "L"), ("gramm", 'g');


insert into MeasurementUnitsMap
values (1, 1), (1, 2), (2, 1), (2, 2), (3, 3), (3, 4), (4, 3), (4, 4), (5, 3), (5, 4);



-- insert demo data

insert into Distributor(name)
values ("Aldi"), ("Netto"), ("Super U"), ("Walmart");


insert into Categories(name, parentCategoryid) 
values ("Food", null), ("Beverages", null), ("Canned Food", 1), ("Instant Meal", 1), 
       ("Bread", 1), ("Mineral Water", 2), ("Coffee", 2), ("Milk", 2);


insert into Products (categoryId, measurementUnitId, weight, name)
values (3, 2, 800, "Chicken Soup"),
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
       (8, 1, 1000, "Milk (standard fat)");


insert into Supply (productId, distributorId, price, buyDate, expirationDate, consumptionDate)
values (1, 1, 2.50, '2022-03-04', '2022-11-14', null),
       (1, 1, 2.50, '2022-04-10', '2022-12-03', null),
       (1, 1, 2.50, '2022-03-04', '2022-11-14', null),
       (1, 1, 2.50, '2022-04-10', '2022-12-03', null),
       (2, 2, 0.90, '2020-02-25', '2023-05-15', null),
       (2, 2, 0.90, '2020-04-25', '2023-08-07', null),
       (3, 4, 1.50, '2021-05-23', '2022-10-28', null),
       (3, 4, 1.40, '2022-10-05', '2023-05-14', null),
       (4, 3, 1.70, '2021-07-15', '2022-11-15', null),
       (5, 1, 3.75, '2022-10-13', '2022-11-30', null),
       (5, 1, 3.75, '2022-10-13', '2022-11-27', null),
       (6, 3, 2.50, '2021-11-09', '2022-04-10', null),
       (6, 3, 2.50, '2021-10-24', '2022-09-25', null),
       (7, 2, 1.95, '2022-11-17', '2023-07-14', null),
       (7, 2, 1.95, '2022-07-19', '2023-02-04', null),
       (8, 1, 9.45, '2021-10-26', '2022-02-03', null),
       (8, 2, 7.23, '2022-06-22', '2022-10-14', null),
       (9, 3, 5.89, '2021-10-25', '2022-06-17', null),
       (10, 2, 10.25, '2022-05-28', '2023-01-20', null),
       (11, 2, 06.43, '2022-05-28', '2023-01-20', null),
       (12, 3, 5.25, '2022-05-28', '2023-01-20', null),
       (13, 3, 2.60, '2022-05-28', '2023-01-20', null);



-- create role for application user and grant rights

create user 'groceryItemTrackerUser'@'localhost'
identified by 'secret'
password expire never;


create role groceryItemTrackerUserRole;


grant select 
on grocery_item_tracker.*
to groceryItemTrackerUserRole;


grant insert
on grocery_item_tracker.*
to groceryItemTrackerUserRole;


grant update
on grocery_item_tracker.Supply
to groceryItemTrackerUserRole;


grant groceryItemTrackerUserRole
to 'groceryItemTrackerUser'@'localhost';


set default role groceryItemTrackerUserRole 
for 'groceryItemTrackerUser'@'localhost';