const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    password: String
    boards: [Board]
  }

  type Auth {
    token: ID!
    user: User
  }

  type Board {
    _id: ID
    bTitle: String
    lists: [List]
  }

  type List {
    _id: ID
    lTitle: String
    cards: [Card]
  }

  type Card {
    _id: ID
    cTitle: String
    description: String
    duedate:String
    users: [User]
  }

  type Query {
    users: [User]
    board: [Board]
    list: [List]
    card: [Card]
    userBoards: User
    boardMember(boardId: ID!):[User]
    user(userId:ID!): User
    boards(boardId: ID!): Board
    lists(listId: ID!): List
    cards(cardId: ID!): Card
  
  }

  type Mutation {
      addUser(username: String!, email: String!, password: String!): Auth
      login(email: String!, password: String!): Auth
      addMember(email: String!,boardId: ID!): User
      cardMember(cardId: ID!,email: String!): Card
      addBoard(bTitle: String!): Board
      addList(boardId: ID!, lTitle: String!): List
      addCard(cTitle: String!, listId: ID!): Card
      removeCard(cardId: ID!): Card
      editCard(cardId: ID!, title: String!, desc: String): Card
      addDue(cardId: ID!, date: String!): Card
      dragCard(listId: ID!, cardId: ID!): List
      dropCard(listId: ID!, cardId: ID!): List    
    } 
`;

module.exports = typeDefs;
