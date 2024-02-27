# Full-Stack Lottery Numbers Statistics App

This project allows users to view and analyze Viking Lotto and EuroJackpot Lotto results, providing insights into number frequency, consecutive number pairs, hot and cold numbers, common number ranges, and changes in the sum of numbers for each game.

<img src="./frontend/public/lottery.jpg" />

### [Try Lotto Statistics](https://65de077b9069d8008d09c2c8--frabjous-pegasus-105f19.netlify.app/)

## Texhnologies Used

Backend:
- NodeJS
- Express
- MongoDB

Frontend:
- React
- Sass
- ChartJS

## Project Overview

### Backend API
The backend uses NodeJS and Express, with MongoDB as the database of choice. The API provides robust routes for handling products, ensuring efficient data retrieval and manipulation.

### Frontend
The frontend is developed with React, offering a highly responsive and interactive user interface. ChartJS is integrated into the project to visualize data. This feature allows users to gain insights into the various statistics.

### State Management and Data Fetching
React useContext hook is used for state management, providing a efficient way to handle application state. React fetch is for asynchronous data fetching from MongoDB.


## Usage

### Backend
- Create a MongoDB database and obtain your `MongoDB URI` - [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register)
- Create `.env` file an add the following

```
PORT = 5500
MONGO_URI = your mongodb uri
```
### Install Dependencies (front&backend)

```
npm install
cd frontend
npm install
```

### Run

```

# Run frontend only
npm start

# Run backend only
npm run dev
```

## Build & Deploy

```
# Create frontend prod build
cd frontend
npm run build
```
