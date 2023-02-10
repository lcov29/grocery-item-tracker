-- BEFORE EXECUTING: replace default password in line 196


-- create database

drop database if exists GroceryItemManager;

create database GroceryItemManager;
use GroceryItemManager;



-- create tables

create table Currency (
   name varchar(100) not null,
   symbol char(1) not null
);


create table WeightUnits (
   id int auto_increment,
   unit varchar(100) not null,
   symbol varchar(10) not null,
   primary key(id)
);


create table Distributor (
   id int auto_increment,
   name varchar(250) not null,
   primary key(id)
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
   weightUnitId int,
   weight int not null,
   name varchar(250) not null,
   constraint constrWeight check(weight > 0),
   primary key(id),
   foreign key(weightUnitId) references WeightUnits(id) on update cascade,
   foreign key(categoryId) references Categories(id) on update cascade
);


create table ShoppingList (
   id int auto_increment,
   productId int not null,
   amount int not null,
   constraint constrShoppingListItemAmount check(amount > 0),
   primary key(id),
   foreign key(productId) references Products(id)
      on update cascade
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


create view UpcomingExpirationDates as
select s.id, p.name as product, s.expirationDate
from (select id, productId, expirationDate from Supply where consumptionDate is null) as s
      inner join Products as p on s.productId = p.id
order by s.expirationDate asc;



-- insert demo data

insert into Currency
values ('Euro', '€');


insert into WeightUnits (unit, symbol)
values ('milliliter', 'ml'), ('gramm', 'g');


insert into Distributor(name)
values ('Aldi Süd'), ('REWE'), ('Walmart'), ('Trader Joes');


insert into Categories(name, parentCategoryid) 
values ('Food', null), ('Beverages', null), ('Canned Food', 1), 
('Instant Meal', 1), ('Bread', 1), ('Mineral Water', 2),
('Coffee', 2), ('Milk', 2);


insert into Products (categoryId, weightUnitId, weight, name)
values (3, 2, 800, 'Chicken Soup'), (3, 1, 400, 'Tomato Soup'),
(4, 2, 250, 'Noodle In Tomato Sauce'), (4, 2, 252, 'Noodle In Cheese Sauce'),
(5, 2, 300, 'Baguette'), (5, 2, 500, 'Toast'), (5, 2, 400, 'Croissant'),
(6, 1, 9000, 'Mineral Water (6 x 1,5 Litre)'), (6, 1, 9000, 'Sparkling Mineral Water (6 x 1,5 Litre)'),
(7, 1, 1000, 'Espresso'), (7, 1, 500, 'Standard Coffee'),
(8, 1, 1000, 'Milk (fat free)'), (8, 1, 1000, 'Milk (standard fat)');


insert into Supply (productId, distributorId, price, buyDate, expirationDate, consumptionDate)
values
(1, 1, 2.50, '2022-03-04', '2022-11-14', null),
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

drop role if exists 'groceryItemManagerUserRole';

create role 'groceryItemManagerUserRole';

grant select 
on GroceryItemManager.GrocerySupplyOverview
to 'groceryItemManagerUserRole';

grant select 
on GroceryItemManager.UpcomingExpirationDates
to 'groceryItemManagerUserRole';



-- create application user and grant role

drop user if exists 'groceryItemManagerUser'@'localhost';

create user 'groceryItemManagerUser'@'localhost'
identified by 'secret'                                              -- replace with custom password
password expire never;

grant groceryItemManagerUserRole
to 'groceryItemManagerUser'@'localhost';

set default role groceryItemManagerUserRole for 'groceryItemManagerUser'@'localhost';