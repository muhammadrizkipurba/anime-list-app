# CSS Framework : TailwindCss

Tailwind CSS is best used to speed up the development process by writing less code. 
It comes with a design system that helps maintain consistency across various design requirements like padding, spacing, and so forth; with this, you do not have to worry about creating your design systems.

## Tools and library : 
1. Next.js + Typescript 
  - Next.js provides an integrated TypeScript experience out of the box
  - Next.js supports TypeScript by default and has built-in types for pages and the API

2. Redux, Redux Thunk, Redux Persist
  - I used redux to persist or caching the authentication data and anime search results
  - Why i need to persist the anime search result on redux is because when after user search animes by title, they will get some of the anime options, in case user want to know more details about the anime, user will be direct to the anime details page, and when they go back to the home page, the latest results will keep showing. I think it would be a good UX so they don't need to re-input the title of same keywords all the time they want to find animes.

3. 

## User flow guidence : 
1. Popular animes list
  - I used CSR fetching method to get the updated animes with highest popularity. So whenever user visit the page, user will get the updated popular animes from the API source. 
  
2. Search Anime 
  - Insert the anime title you want to find on the search input and then click search button
  - Search results will be displayed right under the search input
  - I used CSR fetching method to find the animes by title

3. AnimeCard 
  - User can see more details information about the anime by clicking the details button on each card.
  - By clicking the details button, you will be direct to the anime/${id} page to see the details information about the anime
  - If you are logged in, the add to favorite button will be displayed right after the details button

4. Authentication (is under development)
  - Using firebase firestore to save the user data ( name, email, password and favorite animes )
  - After you are logged in, you can see your favorite animes list on profile page
  - You can delete the anime of your favorites on profile page