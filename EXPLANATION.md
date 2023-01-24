# CSS Framework : TailwindCss

Tailwind CSS is best used to speed up the development process by writing less code. 
It comes with a design system that helps maintain consistency across various design requirements like padding, spacing, and so forth; with this, you do not have to worry about creating your design systems.

## Features : 
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