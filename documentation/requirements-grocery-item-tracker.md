# **Requirements Grocery Item Tracker**
<br>

## **Table Of Contents**
<br>

- [**Requirements Grocery Item Tracker**](#requirements-grocery-item-tracker)
  - [**Table Of Contents**](#table-of-contents)
  - [**Required Features**](#required-features)
    - [**Add Grocery Item To Supply**](#add-grocery-item-to-supply)
    - [**Add Product Information**](#add-product-information)
    - [**Add Product Category Information**](#add-product-category-information)
    - [**Add Product Subcategory Information**](#add-product-subcategory-information)
    - [**Add Distributor Information**](#add-distributor-information)
    - [**List Current Grocery Item Supply**](#list-current-grocery-item-supply)
    - [**Mark Grocery Items As Consumed**](#mark-grocery-items-as-consumed)
    - [**Define Minimum Grocery Item Supply**](#define-minimum-grocery-item-supply)
    - [**List Expiration Dates**](#list-expiration-dates)
    - [**Generate Shopping List**](#generate-shopping-list)
    - [**Generate Report About Consumption**](#generate-report-about-consumption)
    - [**Generate Report About Shopping History**](#generate-report-about-shopping-history)
    - [**Change Language**](#change-language)
    - [**Configure Database Connection**](#configure-database-connection)
      - [**MySQL Database**](#mysql-database)
      - [**indexedDB**](#indexeddb)
  - [**Use Case Diagram**](#use-case-diagram)
  - [**UI Mockup**](#ui-mockup)

<br>
<br>
<br>

## **Required Features**
<br>
<br>

### **Add Grocery Item To Supply**
<br>

* select product name
* select amount of added items
* select price of added items
* select expiration date of added items
* display added products before saving
* ability to delete added products before saving
* save added food items to database

<br>
<br>

### **Add Product Information**
<br>

* add product name
* select category
* select subcategory
* select distributor
* save product to database

<br>
<br>

### **Add Product Category Information**
<br>
<br>

### **Add Product Subcategory Information**
<br>
<br>

### **Add Distributor Information**
<br>
<br>

### **List Current Grocery Item Supply**
<br>

* list all grocery items ordered by category and subcategory
* display number of items per category and subcategory
* ability to collapse categories and subcategories
* filter list by
  * category name
  * subcategory name
  * product name
  * item id

<br>
<br>

### **Mark Grocery Items As Consumed**
<br>

* add consumed product by id
* list products marked as consumed
* ability to unmark products
* save consumed food items to database

<br>
<br>

### **Define Minimum Grocery Item Supply**
<br>

* add product to minimum supply
* select minimum product supply
* list mimimum product supply per category and subcategory
* remove product from minimum supply

<br>
<br>

### **List Expiration Dates**
<br>

<br>
<br>

### **Generate Shopping List**
<br>

* list products per category and subcategory
* filter available products by product name
* add products and amount to shopping list

<br>
<br>

### **Generate Report About Consumption**
<br>

* list consumed amount and cost of food items per
  * last week
  * last month
  * last year
  * user defined timeframe

<br>
<br>

### **Generate Report About Shopping History**
<br>

* list bought food items and cost per
  * last week
  * last month
  * last year
  * user defined time frame

<br>
<br>

### **Change Language**
<br>

* supported languages:
  * english
  * german

<br>
<br>

### **Configure Database Connection**
<br>
<br>

#### **MySQL Database**
<br>

* define hostname and port of database server
* setup database user for application
* setup database schema

<br>
<br>

#### **indexedDB**
<br>

* setup database schema

<br>
<br>
<br>

## **Use Case Diagram**
<br>
<br>

![Use Case Diagram](./use-case-diagram/use-case-diagram.jpg)

<br>
<br>
<br>

## **UI Mockup**
<br>
<br>

![Mockup](./ui-mockup/ui-mockup.jpg)