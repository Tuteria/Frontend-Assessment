# frontend-application
The repository to house all frontend application to be built at Tuteria accross different projects.


## Description of how the project is supposed to work.

1. The login access is a unique word that supports - and _ as well as letters and numbers
2. To signup, a Screen consisting of the login username, the api-key as well as the api-secret
3. The home page consist of the list of markets that are supported or traded. Theres is a plus button to add a new market
4. In oder to create a new market, the following form fields are required.
  
    i. Name of the market (Autocomplete)
    
    ii. Checkbox for support for both margin trading as well as futures trading

    iii. For futures, wheter to use cross or isolated margin.

    iv. Button to create the market

5. The market view consist of the following 

    i. Tabs consisting of the future and the margin market for each tabs

    ii. A section consiting of any open trade as well as profit/loss.

    iii. A section consisting of all the orders summary.

        a. The number of long/short trades

        b. The next trades to trigger for both long and short

        c. The total amount to be bought and the expected entry price after all has been sold.

    iv. The settings section which consist which consist of the following.

        a. A dropdown of the current config at play.

        b. A dropdown of the time interval to update information from the server.