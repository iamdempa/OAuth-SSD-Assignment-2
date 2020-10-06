# OAuth-SSD-Assignment-2
Implemented a web application that consumes the service of an OAuth Authorization Server and an OAuth Resource Server to make use of Calender API to list and create new calendar events

## Group Members

IT Number | Name
------------ | -------------
IT 17157124 | Jayarathna K.M.J.B
IT 17134736 | Subasinghe S.M.M.K


# How to run?

### 1. Clone the repository

```
git clone https://github.com/iamdempa/OAuth-SSD-Assignment-2.git

cd OAuth-SSD-Assignment-2
```

### 2. Install the dependencies

```
npm install
```


### 3. Run the application


```
npm start
```

> a. This will run the application in your localhost environment with port `5000`

> b. Head over to your favourite browser and hit `localhost:5000`



### 4. Troubleshoot

In case you get an error, this is mostly because the token is expired. Delete the `token.json` and hit the `localhost:5000` again to genereate a new token.