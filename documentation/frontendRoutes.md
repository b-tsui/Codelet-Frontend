* '/' - Main Page
  * Displays NavBar
    * Home
    * Browse
    * Search
    * Profile(protected)
    * Create(protected)
  * Displays popular sets
    * Shows set title
    * Shows set votes
    * Highlits votes if voted(if logged in)
    * Highlights favorite if favorited(if logged in)
* '/create' - Create Set
  * 
* '/profile' - Profile (protected)
  * Displays user info (stretch-profile photos)
  * Displays user created + favorited sets
* '/set/:id' - Set @id
  * isOwner
    * displays flash card crud
    * displays both sides of all flash cards
    * has "study" button
  * notOwner
    * displays both sides of all flash cards
    * has "study" button
* '/set/:id/study' - Study Set
  * displays individual flash cards term side up
  * if clicked "flips" to definition side
  * has buttons to go forward/backwards between cards
  * randomize cards
  * (Stretch - go to quiz)
  * (Stretch - study session analytics)
* '/browse' - Browse
  * Displays categories
