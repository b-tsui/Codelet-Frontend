# Codelet Data Schema

## **User**

| attribute name | data type  |               details |
| -------------- | :--------: | --------------------: |
| id             |  integer   | not null, primary key |
| email          |   string   |      not null, unique |
| username       | string(50) |      not null, unique |
| createdAt      | timestamp  |              not null |
| updatedAt      | timestamp  |              not null |

-Associations: User has many sets (one-to-many)

## **Category**

| attribute name | data type  |               details |
| -------------- | :--------: | --------------------: |
| id             |  integer   | not null, primary key |
| name           | string(50) |      not null, unique |
| createdAt      | timestamp  |              not null |
| updatedAt      | timestamp  |              not null |

-Associations: Category belongs to many sets (one-to-many)

## **Flashcard Set**

| attribute name | data type  |               details |
| -------------- | :--------: | --------------------: |
| id             |  integer   | not null, primary key |
| categoryId     | string(50) | not null, foreign key |
| title          |   string   |              not null |
| description    |    text    |              not null |
| createdAt      | timestamp  |              not null |
| updatedAt      | timestamp  |              not null |

-Associations: Set has many flashcards (one-to-many) & set has one category (one-to-many)

## **Flashcard**

| attribute name | data type  |               details |
| -------------- | :--------: | --------------------: |
| id             |  integer   | not null, primary key |
| term           | string(50) |              not null |
| definition     |    text    |              not null |
| createdAt      | timestamp  |              not null |
| updatedAt      | timestamp  |              not null |

-Associations: Flashcard belongs to one set (one-to-many)

## **Favorite**

| attribute name | data type |               details |
| -------------- | :-------: | --------------------: |
| id             |  integer  | not null, primary key |
| setId          |  integer  | not null, foreign key |
| userId         |  integer  | not null, foreign key |
| createdAt      | timestamp |              not null |
| updatedAt      | timestamp |              not null |

## **Vote**

| attribute name | data type |               details |
| -------------- | :-------: | --------------------: |
| id             |  integer  | not null, primary key |
| setId          |  integer  | not null, foreign key |
| userId         |  integer  | not null, foreign key |
| isUpvote       |  boolean  |                       |
| createdAt      | timestamp |              not null |
| updatedAt      | timestamp |              not null |
