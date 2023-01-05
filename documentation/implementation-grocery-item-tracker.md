# **Implementation Grocery Item Tracker**
<br>

## **Table Of Contents**
<br>

- [**Implementation Grocery Item Tracker**](#implementation-grocery-item-tracker)
  - [**Table Of Contents**](#table-of-contents)
  - [**Database**](#database)

<br>
<br>
<br>

## **Database**
<br>
<br>

```mermaid
erDiagram
    Categories {
        id int PK
        name string
        parentCategoryId int FK
    }
    Products {
        id int PK
        categoryId int FK
        name string
        distributor string
    }
    Items {
        id int PK
        productId int FK
        price double
        buyDate date
        expirationDate date
        consumptionDate date
    }
    ShoppingListItems {
        id int PK
        shoppingListId int FK
        productId int FK
        amount int
    }
    ShoppingList {
        id int PK
        creationDate date
    }
    MinimumSupply {
        id int PK
        productId int FK
        categoryId int FK
        minimumAmount int
    }
    Categories |o--o{ Categories : isSubcategory
    Categories ||--o{ Products : hasCategory
    Products ||--o{ Items : isProduct
    Products ||--o{ ShoppingListItems: isProduct
    ShoppingListItems }o--|| ShoppingList : containsItems
    Products }o--o| MinimumSupply : containsProduct
    Categories }o--o| MinimumSupply : containsCategory
```