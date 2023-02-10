# **Implementation Grocery Item Tracker**
<br>

## **Table Of Contents**
<br>

- [**Implementation Grocery Item Tracker**](#implementation-grocery-item-tracker)
  - [**Table Of Contents**](#table-of-contents)
  - [**Database**](#database)
  - [**Backend Data Formats**](#backend-data-formats)
    - [**Supply Overview (Home)**](#supply-overview-home)
    - [**Upcoming Expiration Dates (Home)**](#upcoming-expiration-dates-home)
    - [**Supply Overview (Grocery Item Supply)**](#supply-overview-grocery-item-supply)

<br>
<br>
<br>

## **Database**
<br>
<br>

```mermaid
erDiagram
    Localization {
        id int PK
        language string
        currencySymbol string
        localeCode string
    }
    MeasurementUnits {
        id int PK
        unitName string
        unitSymbol string
    }
    MeasurementUnitsMap {
        localizationId int FK
        measurementUnitId int FK
    }
    Categories {
        id int PK
        name string
        parentCategoryId int FK
    }
    Products {
        id int PK
        categoryId int FK
        measurementUnitId int FK
        weight int
        name string
    }
    Distributor {
        id int PK
        name string
    }
    Supply {
        id int PK
        productId int FK
        distributorId int FK
        price double
        buyDate date
        expirationDate date
        consumptionDate date
    }
    ShoppingList {
        id int PK
        productId int FK
        amount int
    }
    MinimumSupply {
        id int PK
        productId int FK
        categoryId int FK
        minimumAmount int
    }
    Categories |o--o{ Categories : isSubcategory
    Categories ||--o{ Products : hasCategory
    Supply }o--|| Distributor: isDistributedBy
    Products ||--o{ Supply : isProduct
    Products ||--o{ ShoppingList: containsProduct
    Products }o--o| MinimumSupply : containsProduct
    Products }o--|| MeasurementUnits: isMeasurement
    MeasurementUnits ||--o{ MeasurementUnitsMap: isUnit
    MeasurementUnitsMap }o--|| Localization: isLocalization
    Categories }o--o| MinimumSupply : containsCategory
```

<br>
<br>
<br>

## **Backend Data Formats**
<br>
<br>

* query data from database in flattended form
* save available values with custom JS methods if necessary
* filter result set with extracted values if necessary

<br>
<br>

### **Supply Overview (Home)**
<br>

```typescript
type SupplyOverviewHome = {
   categoryList: {
      name: string,
      total: number,
      minimum?: number,
      subCategoryList?: {

         name: string,
         total: number,
         minimum?: number,
         productList?: {

            name: string,
            total: number,
            minimum?: number

         }[]

      }[]

   }[]
};
```

<br>

Example:
```json
{
    "categoryList": [
        { 
            "name": "Food",
            "total": 34,
            "minimum": 23,
            "subCategoryList": [
                {
                    "name": "Bread",
                    "total": 5,
                    "minimum": 4,
                    "productList": [
                        {
                            "name": "Toast",
                            "total": 2,
                            "minimum": 3
                        },
                        {
                            "name": "Baguette",
                            "total": 3,
                            "minimum": 4
                        },
                    ]
                },
                ...
            ]
        },
        ...
    ]
}
```

<br>
<br>

### **Upcoming Expiration Dates (Home)**
<br>

```typescript
type UpcomingExpirationDatesHome = {
   upcomingExpirationDateList: {
      id: number,
      name: string,
      expirationDate: Date
   }[];
};
```

<br>

Example:

```json
{
    "productList": [
        {
            "id": 12,
            "name": "Spaghetti",
            "expirationDate": "03.02.2023"
        },
        {
            "id": 24,
            "name": "Mineral Water (6 x 1.5 liter)",
            "expirationDate": "12.11.2025"
        },
    ]

}
```

<br>
<br>

### **Supply Overview (Grocery Item Supply)**
<br>

```typescript
type SupplyOverviewHome = {
   categoryList: {
      name: string,
      total: number,
      subCategoryList?: {

         name: string,
         total: number,
         productList?: {
            id: number,
            name: string,
            buyDate: Date,
            expirationDate: Date
         }[]

      }[]

   }[]
};
```

Example:
```json
{
    "categoryList": [
        { 
            "name": "Food",
            "total": 34,
            "subCategoryList": [
                {
                    "name": "Bread",
                    "total": 5,
                    "productList": [
                        {
                            "id": 1,
                            "name": "Toast",
                            "buyDate": "01.01.2022",
                            "expirationDate": "20.01.2022"
                        },
                        {
                            "id": 2,
                            "name": "Baguette",
                            "buyDate": "03.06.1980",
                            "expirationDate": "15.06.1980"
                        },
                    ]
                },
                ...
            ]
        },
        ...
    ]
}
```