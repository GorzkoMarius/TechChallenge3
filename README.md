# TechChallenge3

#### Objective: 

Create a chatbot that enables user to select any of 3 Stock Exchanges (LSEG, NASDAQ, NYSE) and for the selected exchange provides 5 stocks that are traded in that exchange. User can then select any one of those stocks to view the latest stock price.

#### Requirements

- Create a chatbot using any preferred language/platform
- Home Menu must consist of 3 Stock exchanges (LSEG, NASDAQ, NYSE)
- Stock Menu - Upon selecting any of them, provide 5 stock names (different for each exchange)
- Upon selection of any stock name, display its current value, and again provide Stock Menu (options to select 5 stocks)
- Provide options to go to Home Menu at any point in time

### Technologies used

#### Angular
I decided to use angular for the frontend part of the application, I used angular 18 but i decided to still used routes as in before angular 17 as i think that its still the best way to implement Angular apps

#### Node.js / Express
I used node.js as a server to send that data from the json file to the FE, I used node as the app was simpler in notion and I though that it was not worth it to implement in a more complex language and framework like Java and Spring Boot.

## How to run the app

First you have to make sure you have installed all the needed languages, frameworks that are used.

You need to install node from the [node.js](https://nodejs.org/en/download/package-manager) website.
Angular is also needed for the project so you can run the following command once you have node installed:
```cmd
npm i @angular/core
```
You can find more about how to install npm package's [here](https://www.npmjs.com/)

Now we move to the dependency's from each folder:

You open the BE folder and run a command line in said folder. After that you input the following commands:

```cmd 
npm install 
```

This command is used to install all node dependencies that are used in the project.

To run the BE server you just input the following command in the CMD of that folder:

```cmd
npm start
```

We can see all the dependencies used in the package.json file located in the folder.


Now for the FE we also have to run the ``` npm install ``` command. Afterward we can run the app by using the following command:

```cmd
ng serve
```

Once both the FE and BE are up and running we can finally use the app:
