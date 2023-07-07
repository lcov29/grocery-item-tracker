# **Grocery Item Tracker**
<br>
<br>
<br>

## **Table Of Contents**
<br>

- [**Grocery Item Tracker**](#grocery-item-tracker)
  - [**Table Of Contents**](#table-of-contents)
  - [**About This Project**](#about-this-project)
  - [**Tech Stack**](#tech-stack)
  - [**Installation**](#installation)
    - [**Prerequisite**](#prerequisite)
    - [**Clone Repository**](#clone-repository)
    - [**Install Dependencies**](#install-dependencies)
    - [**Initialize Database**](#initialize-database)
      - [**Option 1: Run Command Line Installation Script**](#option-1-run-command-line-installation-script)
      - [**Option 2: Run SQL Script**](#option-2-run-sql-script)
    - [**Compile Source Code**](#compile-source-code)
    - [**Start Application Server**](#start-application-server)
  - [**Documentation**](#documentation)
  - [**Features To Add**](#features-to-add)
  - [**Screen Captures**](#screen-captures)
  - [**Version History**](#version-history)
    - [**Version 0.1**](#version-01)

<br>
<br>
<br>

## **About This Project**
<br>

A web application for keeping track of grocery items.

The basic idea is to register the items after purchase within the application and physically tag them with their assigned id. This later allows the user to mark individual grocery items as consumed.

<br>

The application should provide the user with the following core features:

- [x] overview of current supply
- [x] add items to supply
- [x] consume items from supply
- [ ] generate a shopping list
- [ ] generate reports about grocery purchases and consumption

<br>
<br>

<p align="center">
    <img src="./documentation/gifs/dashboard.gif" width="90%">
</p>
<p align="center"><b>Dashboard</b></p>

<br>
<br>
<br>

## **Tech Stack**


|Languages |Frontend |Backend |Databases |Testing |Bundler |
|:--------:|:-------:|:------:|:--------:|:------:|:------:|
|<a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank"><img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg" alt="javascript" width="50" height="50" title="JavaScript"/></a> |<a href="https://developer.mozilla.org/en-US/docs/Web/HTML" target="_blank"><img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/html5/html5-original-wordmark.svg" alt="html5" width="50" height="50" title="HTML"/></a> |<a href="https://nodejs.org/en/docs/" target="_blank"><img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/nodejs/nodejs-original-wordmark.svg" alt="nodejs" width="50" height="50" title="Node.js"/></a> |<a href="https://mariadb.com/kb/en/" target="_blank"><img src="https://www.vectorlogo.zone/logos/mariadb/mariadb-icon.svg" alt="mariadb" width="50" height="50" title="MariaDB"/></a> |<a href="https://eslint.org/docs/latest/" target="_blank"><img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/eslint/eslint-original.svg" alt="ESLint" width="50" height="50" title="ESLint"/></a> |<a href="https://webpack.js.org/concepts/" target="_blank"><img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/webpack/webpack-original.svg" alt="Webpack" width="50" height="50" title="Webpack"/></a> |
|<a href="https://www.typescriptlang.org/docs/" target="_blank"><img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/typescript/typescript-original.svg" alt="typescript" width="50" height="50" title="TypeScript"/></a> |<a href="https://developer.mozilla.org/en-US/docs/Web/CSS" target="_blank"><img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/css3/css3-original-wordmark.svg" alt="css3" width="50" height="50" title="CSS"/></a> |<a href="http://expressjs.com/" target="_blank"><img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/express/express-original-wordmark.svg" alt="Express" width="50" height="50" title="Express"/></a> | |<a href="https://jestjs.io/" target="_blank"><img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/jest/jest-plain.svg" alt="Jest" width="50" height="50" title="Jest"></a>| |
| |<a href="https://react.dev/" target="_blank"><img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original-wordmark.svg" alt="React" width="50" height="50" title="React"/></a> | | |<a href="https://www.cypress.io/" target="_blank"><img src="https://raw.githubusercontent.com/voss29/voss29/main/cypress_icon.svg" alt="Cypress" width="90" height="30" title="Cypress"/></a> | |

<br>
<br>
<br>

## **Installation**
<br>
<br>

### **Prerequisite**
<br>

* MariaDB with root access
* Node.js

<br>
<br>

### **Clone Repository**
<br>

```bash
git clone https://github.com/voss29/grocery-item-tracker.git
cd grocery-item-tracker
```

<br>
<br>

### **Install Dependencies**
<br>

```bash
npm install
```

<br>
<br>

### **Initialize Database** 
<br>
<br>

#### **Option 1: Run Command Line Installation Script**
<br>

```bash
node ./src/backend/mariaDB/setupDatabaseCLI.mjs
```

<br>

This script will walk you through the installation and will create the _.env_ file containing the database credentials for the application.

<br>
<br>

#### **Option 2: Run SQL Script**
<br>

File `./src/backend/mariaDB/setupDatabase.sql`:

Replace password placeholder `secret` at line 223.

<br>

Log into mariaDB with root privileges an run script:

```bash
source ./src/backend/mariaDB/setupDatabase.sql
```

<br>

Create file `./dist/.env` with the following content:

```
DB_HOST=<host>
DB_PORT=<port>
DB_USER=groceryItemTrackerUser
DB_PWD=<password>
```

<br>
<br>

### **Compile Source Code**
<br>

```bash
npm run compile
```

<br>
<br>

### **Start Application Server**
<br>

```bash
node ./dist/server.js
```

<br>
<br>
<br>

## **Documentation**
<br>

* [Requirements](./documentation/requirements-grocery-item-tracker.md)
* [Implementation](./documentation/implementation-grocery-item-tracker.md)

<br>
<br>

## **Features To Add**
<br>

- highlight items that are close or past their expiration date
- add ability to define minimums for categories and subcategories
- add ability to generate shopping list
- add ability to generate reports about item purchases and item consumption

<br>
<br>


## **Screen Captures**

<br>
<br>

<p align="center">
    <img src="./documentation/gifs/dashboard.gif" width="90%">
</p>
<p align="center"><b>Dashboard</b></p>

<br>
<br>
<br>
<br>
<br>

<p align="center">
    <img src="./documentation/gifs/supplyOverview.gif" width="90%">
</p>
<p align="center"><b>Supply Overview</b></p>

<br>
<br>
<br>
<br>
<br>

<p align="center">
    <img src="./documentation/gifs/supplyAddItem.gif" width="90%">
</p>
<p align="center"><b>Add Items To Supply</b></p>

<br>
<br>
<br>
<br>
<br>

<p align="center">
    <img src="./documentation/gifs/productAdd.gif" width="90%">
</p>
<p align="center"><b>Add New Product</b></p>

<br>
<br>
<br>
<br>
<br>

<p align="center">
    <img src="./documentation/gifs/supplyConsumeItem.gif" width="90%">
</p>
<p align="center"><b>Consume Items</b></p>

<br>
<br>

## **Version History**
<br>


### **Version 0.1**
<br>

- add supply overview
- add overview of upcoming expiration dates
- add ability to add items to supply
- add ability to add new product information
- add ability to consume items from supply

