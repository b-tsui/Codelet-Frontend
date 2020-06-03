# Codelet
### Feature List

- Users
  - Implemented using Auth0
  - User Logout/Login
  - User SignUp
  - Demo User

- Home Page
  - Display popular sets
  - NavBar
    - Profile Page
      - Display all sets for a user
      - Display starred sets
    - Search

- Flashcards
  - CRUD Flash Card Sets
    - Title
    - Description
    - Contains Flash cards
    - Can be saved
    - Can be voted on (up/downvote)
    - Has a category
  - CRUD Flash Cards
    - Term (front)
    - Definition (back)
    - Needs to be part of a set

- Categories
  - Name
  - Filters sets

- Stretch Goals
  - Quizzes (Stretch)
  - Image upload for flashcards

### Models:
- Users
  - id (PKey)
  - email:(string(100), unique, allowNull:false)
  - username:(text(40), unique, allowNull:false)
  - Associations: User has many sets (many to many)

- Category
  - id (Pkey)
  - Name (String(50), unique, allowNull:false)
  - Associations: Category has many sets

- Flash Cards Sets
  - id (Pkey)
  - CategoryId (Fkey)
  - Title
  - Description
  - Associations: set has many flashcards, set has one category

- Flash Card
  - id (PKey)
  - Term (string(50), allowNull:false)
  - Definition (string(500))
  - Associations:

### Routes