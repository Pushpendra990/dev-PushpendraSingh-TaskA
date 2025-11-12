# Mini Search App

A compact full-stack search application built with **Next.js/React** and **Node.js/Express**.  
Allows users to search a local FAQ dataset and returns the top 3 relevant results with titles, snippets, and optional combined summary.

---

## Features

- **Frontend**
  - Single-page interface with a search input and button
  - Loading, empty, and error states
  - Displays top 3 search results with title and snippet

- **Backend**
  - `POST /api/search` endpoint
  - Accepts JSON body: `{ query: string }`
  - Returns top 3 matches from `data/faqs.json` based on simple keyword matching
  - Error handling for empty queries and no results
  - Optional combined summary and sources (IDs)

- **Data**
  - Local dataset: `backend/data/faqs.json`

---

### Backend
Navigate to the backend folder

cd backend
## Install dependencies
npm install

## Start the backend server

npm run dev

--------

### Frontend

Navigate to the frontend folder

cd frontend


### Install dependencies

npm install


### Start the frontend server

npm run dev



