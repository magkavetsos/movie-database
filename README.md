# MOVIEFLIX

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Description

This project is about the front-end UI for a movie database management system. One should be able to browse, add, delete & edit movie entries from this database.

This project is built using Next.js 14, offering a robust framework for building modern web applications with server-side rendering (SSR) and static site generation (SSG). Our application is designed to be fast, efficient, and SEO-friendly.

## Getting Started

First, install the dependencies:

```bash
npm install
# or
yarn
```

Then, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `src/app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

### NOTE

This project is separated from the backend, completely agnostic to each other. To fully run the project you'll have to setup and run locally a server that exposes a basic RESTful Web API. Then configure the .env file with the host url (e.g 127.0.0.1) & the port that server is listening to (e.g :8000).

The API for the purposes of this project contains the following endpoints, so you'll have to create yours accordingly:

<ul>
<li><b>GET /movies:</b> Retrieves all movies</li>
<li><b>GET /movies/{id}:</b>  Retrieves a specific movie by its ID.</li>
<li><b>PUT /movies/{id}:</b> Updates a specific movie by its ID.</li>
<li><b>DELETE /movies/{id}:</b> Deletes a specific movie by its ID.</li>
<li><b>POST /movies:</b>  Creates a new movie.</li>
</ul>

## Basic Structure

```
├── public   # Static files
├── src
│   ├── app
│   │   ├── _components           # Components used inside app folder
│   │   ├── movie                 # Project Routes
│   │   │   ├── add
│   │   │   │   └── page.js       # Route for adding a movie
│   │   │   ├── [id]
│   │   │   │   └── page.js       # Dynamic route for movie details
│   │   ├── page.js               # Root page component
│   │   ├── loading.js            # Loading state component for the app
│   │   ├── error.js              # Error component for the app
│   │   ├── global-error.js       # Global error boundary component
│   ├── components       # React components
│   ├── utils            # Utility functions across the project
│   ├── actions          # Server actions
├── .gitignore           # Git ignore file
├── eslintrc.json        # ESLint configuration
├── jsconfig.json        # JavaScript configuration
├── next.config.mjs      # Next.js configuration
├── package.json         # NPM package configuration
└── README.md
```

## User Actions

This application provides several actions that users can perform related to movies. Here’s a brief overview of each action:

<b>Add a Movie</b>
Users can add a new movie to the system. To do this:
<ul>
  <li>Click Add Movie Button at homepage</li>
  <li>Fill out the required fields and submit the form to add the movie to the database</li>
</ul>

<b>Edit a Movie</b>
Users can edit the details of an existing movie. To do this:
<ul>
  <li>Click the edit icon on hover of a movie entry at homepage OR from the specific movie page details click the button "EDIT THIS MOVIE"</li>
  <li>Fill out the required fields and submit the form to make changes to this movie in the database</li>
</ul>

<b>Edit a Movie</b>
Users can delete a movie from the system. To do this:
<ul>
  <li>Click the delete icon on hover of a movie entry at homepage</li>
  <li>Homepage then revalidates with the rest of movies in the database</li>
</ul>

<b>Add to Favorites</b>
Users can add or remove movies from their favorites list. To do this:
<ul>
  <li>Click the favorite icon on hover of a movie entry at homepage</li>
  <li>The movie will either saved in your favorites list or removed from there. This information stored in a storage object using window's "localStorage" </li>
</ul>

## Configuration

### Environment Variables

This project uses environment variables to configure the application. These variables should be defined in a .env file at the root of the project.

### Usage

These environment variables can be accessed in your Next.js project using process.env

> **Warning:**
> Make sure not to expose sensitive information in your environment variables, and use .env.local for local development settings which should not be committed to version control

## Dynamic Routing with Static Generation

Our application uses dynamic routing to handle movie details. Here are the key routes:

<ul>
<li><b>/movie/add/page.js:</b> Route for adding a new movie.</li>
<li><b>/movie/[id]/page.js:</b> Dynamic route for displaying movie details.</li>
</ul>

We use <b>generateStaticParams</b> in the [id] route to statically generate routes at build time, eliminating the need for server-side rendering and ensuring optimal performance.

We use <b>generateMetadata</b> in the [id] route because it allows us to dynamically generate metadata for each page at build time. This improves SEO by providing unique and relevant meta tags for each movie detail page.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
