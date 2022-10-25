# Local Cost of Living Dashboard

A 3-Week Project for Economy, a charity with a "vision is of a flourishing and sustainable society in which there is diverse and inclusive public conversation about the economy, and economics is a tool everybody can use to make confident personal choices; articulate their needs, values and priorities; take action to shape the economy and participate in democracy." [Economy website](https://www.ecnmy.org/).

## Project Description

With a week of design and two weeks of build, we put together a website that enables the key user journey: "As a journalist who is not a specialist in economics, I'd like a way to easily access and understand data relevant to the stories I am telling so that my audience find my reporting relevant, trustworthy and helps them engage with the economy". It does so by entering data from several datasets into a database, in a way that standardises its format (up to a point). This step means that the data can be presented consistently in the website: on cards with key statistics and with a range of data visualisations that make it easier to interpret the data than working through large tables of unfiltered data. As well as following links to the full datasets, the user can download the specific data used to generate the visualisation. 


## Running Locally

- clone the repository https://github.com/fac24/ecnmy.git
- cd into the repo ``cd ecnmy``
- run ``npm install`` to install the dependencies
- run ``./scripts/create_db`` to create a local database, also creates a ``.env.development.local`` file with your database url
- run ``./scripts/populate_db`` to populate the local database with your data
- Create a datawrapper account to get an API Access Token
(https://developer.datawrapper.de/docs/getting-started)
- Add this token to the ``.env.development.local`` with the name ``API_KEY='{yourApiAccessToken}'``
- To run the server run ``npm run dev``

## Running in deployment

- The deployed site will need the same API Access Token as an environment variable
- It will also need a database url. It is probably wise not to use your local url here as this will be a live site. We have used elephantSQL for ours and will hand that url over, this will need to be saved as ``DATABASE_URL='{YOUR DATABASE URL}'``
- To easily populate the deployed database, in your repositories ``.env.development.local`` file create a vairable ``DEPLOY_DB_URL={YOUR DEPLOYED DATABASE URL}`` then run ``./scripts/populate_db -d``

## API

We have 3 POST api endpoints

- deployedURL/api/dataset-by-indicator
    - This route is a POST request to access the database from the client side
    - It takes in indicator in the body
    - Response 200 json, with the resolved database dataset
- deployedURL/api/datawrapper-proxy
    - This route is a POST request to allow us to create datawrapper charts in the client side, by running a proxy server route
    - It takes in {csv, indicator, location, chartType} in the body
    - Response 200 json, with the resolved chartId for the published chart
- deployedURL/api/location-topic-form
    - This route is a POST request to allow us to redirect to different pages of the site after submitting a form
    - It takes in location and topic in the body
    - Response redirect to a url within the site based on the location and body
    - Redirect routes
        - Location with no topic = /{location}/topic/All
        - Location with topic = /{location}/topic/{topic}
        - No location with or without topic = /

## Tech Stack

- React with Next.JS 
- TailwindCSS
- Cypress testing
- PostgreSQL


## package.json

```json
{
  "name": "ecnmy",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "test": "cypress open",
    "test-t": "cypress run"
  },
  "dependencies": {
    "next": "12.2.2",
    "pg": "^8.7.3",
    "react": "18.2.0",
    "react-dom": "18.2.0",
    "react-select": "^5.4.0"
  },
  "devDependencies": {
    "autoprefixer": "^10.4.7",
    "cypress": "^10.3.0",
    "eslint": "8.19.0",
    "eslint-config-next": "12.2.2",
    "node-fetch": "^3.2.8",
    "postcss": "^8.4.14",
    "tailwindcss": "^3.1.6"
  }
}
```

## Architecture and Design

We used Tailwind CSS for styling components. While some components are reused across the site, which means that styling in those components will affect all instances, others (e.g. the Life Stories card and, to a lesser extent, the dropdown menus on the map page) are not directly related, so changes will have to be made in more places than one if consistency is desired. 


## Datasets

- Personal wellbeing estimates by local authority (ONS) [happiness, anxiety]
- Life Expectancy by local authority (ONS) [male, female]
- Total Claimants (i.e. Jobseeker's Allowance and UC) (ONS, via Nomis) [total JSA and UC claimants]

## Backlog

### Form

As it stands, the only way to update content, style and functionality on the site is through altering the code. In some cases (especially content), this will be easy without a knowledge of code. 

### Extensive error handling

There is currently not comprehensive error handling, meaning that sometimes the user will see untailored error messages. There are known bugs on the choropleth (data is sometimes not updated in time to appear on the page). Extensive use of the site may result in a 500 error message on all pages of the site, since the free plan of the remote database used for the site limits the number of database requests. 

### Further finessing of Datawrapper

We are currently getting 3 types of 'chart' from datawrapper
- d3-lines
    - This is good and usable. There is not much to update in terms of view (though there should be the possibility to include social media links etc). When downloading the data, there may be a better way of downloading by adding further metadata to the API call to Datawrapper.
- tables
    - Gives the data in a nice table. There is a similar download issue to d3-lines, but a more major problem of the table is it is rounding fractional numbers. This means that it gives weird data: for example, if locations data is between 2.5 and 3.49 for all the years it will just say 3 for each table entry.
- d3-maps-choropleth
    - Again similar to the others in downloading data, but the major issue for the choropleth is its rendering on the page. Often datawrapper will take a couple extra seconds to publish the 'chart' so the rendered chart id will not be the correct chart id and so gives the previous chart. We tried fixing this bug in multiple ways, but the only fix we could find was to implement a delay function by a couple seconds, which we didn't include in the final product as it wasn't a proper way and wouldn't work every time.

## Maintenance

### location_scraper.mjs 

This was run once to populate the locations table with London boroughs as well as London (in general) and the UK. If you wish to change the locations, you may want to alter it. You will then need to run it using ``node location_scraper.mjs``. 

### json_to_sql.mjs

This converts the JSON files in datasets to SQL. ONS information generally comes in CSV form. We converted this to JSON with a VSCode plugin. If you want to add datasets, you may need to alter this file. You will then need to run it using ``node json_to_sql.mjs``.

### datasets_topics.sql

We wrote this file manually. Therefore, if the order of the topics or datasets is ordered in the topics table or the datasets table, this joining table will need to be updated accordingly. 
 

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
