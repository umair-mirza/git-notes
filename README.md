# Git Notes App

Git Notes is a ReactJS based CRUD application that is based on the [Github Gists API](https://docs.github.com/en/rest/gists?apiVersion=2022-11-28).

### Github Repo URL

https://github.com/umair-mirza/git-notes

## Description

Git Notes is a ReactJS / Redux based frontend CRUD application based on the Github Gists API and Github OAuth API for authentication. The app allows you to login via Github OAuth API, view public notes (gists), create notes, edit notes and delete notes via the Github Gists API.

It has the following features:

* Github OAuth Authentication (With Proxy Server)
* View Public Notes
* Search Notes by Id or Description
* View Logged in User Notes
* Create Notes
* Update / Edit Notes
* Delete Notes

**Note:** The reason for configuring a dedicated proxy server for this project is so that the frontend does not know about or expose the Client Secret used for getting Access Token from Github OAuth API. The Proxy server will send a request to the OAuth API and send the Client Secret to get the Access Token.

### Auth Flow

![Github Login Flow](https://i.imgur.com/JynCmMp.png)

## Authors

* [Umair Mirza - @umair-mirza](https://github.com/umair-mirza)

## Tech Stack

* **Backend** - NodeJS, Express
* **Frontend** - ReactJS, Redux, SASS, Material UI, React Toastify

## Usage

### Run the backend
```
npm start
```

### Run the Frontend

```
npm start
```

## Environment Variables

* REACT_APP_CLIENT_ID
* REACT_APP_CLIENT_SECRET
* REACT_APP_REDIRECT_URI - http://localhost:3000/
* REACT_APP_PROXY_URL - http://localhost:5000/authenticate
