# Backend Routes

1. Users:
   - POST "/users"
     - This endpoint will create a new user
   - PUT "/users/:user_id"
     - This endpoint will update user information
 
2. Categories
    - GET "/categories"
      - This endpoint will be used to get all of the categories
    - GET "/categories/:category_id"
      - This endpoint will be used to get a single category and its sets
    - PUT@requires_auth
    -  "/categories/:category_id"

3. Flash Cards:
   - GET "/flashcard/:id"
     - This endpoint returns all info for a single flashcard @id
   - POST@requires_auth "/flashcard"
     - This endpoint created a new flashcard
     - updates flashcardset
   - PUT@requires_auth "/flashcard/:id"
     - This endpoint updates an existing flashcard @id
     - updates flashcardset
   - DELETE@requires_auth "/flashcard/:id"
     - This endpoint deletes an existing flashcard @id
     - updates flashcardset to remove from set

4. Flash Card Sets:
   - GET "/sets"
     - This endpoint returns all sets with category, vote, and favorite info
   - GET "/sets/:id"
     - This endpoint returns all flashcards in a set @id
   - POST@requires_auth "/sets"
     - This endpoint creates a new set
   - PUT@requires_auth "/sets/:id"
     - This endpoint updates an existing set @id
   - DELETE@requires_auth "/sets/:id"
     - This endpoint deletes an existing set @id
     - deletes all flashcards, votes, comments, favorites on that set @id

5. Favorites:
   - POST@requires_auth "/sets/:id/favorite"
     - This endpoint adds a favorite to set @id for logged in user
   - DELETE@requires_auth "/sets/:id/favorite/delete
     - This endpoint removes a favorite to set @id for logged in user

6. Votes:
   - POST@requires_auth "/sets/:id/vote"
     - This endpoint adds an vote(True=upvote, False=downvote) to set @id for user
   - PUT@requires_auth "/sets/:id/vote/:vote_id"
     - This endpoint updates true to false and vice versa if a vote exists on set @id for user
   - DELETE@requires_auth "/sets/:id/vote/:vote_id"
     - This endpoint removes a vote on set @id for user

