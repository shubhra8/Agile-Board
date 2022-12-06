import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($email: String!,$username: String!, $password: String!) {
    addUser(email: $email,username: $username, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_MEMBER = gql`
 mutation AddMember($email: String!, $boardId: ID!) {
  addMember(email: $email, boardId: $boardId) {
    _id
    username
    email
    boards {
      _id
    }
  }
} 
`;



export const CARD_MEMBER = gql`
mutation Mutation($cardId: ID!, $email: String!) {
  cardMember(cardId: $cardId, email: $email) {
    cTitle
    _id
    users {
      _id
      email
      username
    }
  }
}
`;




export const ADD_BOARD = gql`
  mutation addBoard($bTitle: String!) {
    addBoard(bTitle: $bTitle) {
      _id
      bTitle
   }
  }
`;

export const ADD_LIST = gql`
  mutation addlist($boardId: ID!, $lTitle: String!) {
    addList(boardId: $boardId, lTitle: $lTitle) {
      _id
      lTitle
    }
  }
`;

export const DROP_CARD = gql`
mutation dropCard($listId: ID!, $cardId: ID!) {
    dropCard(listId: $listId, cardId: $cardId) {
      _id
      lTitle
    }
  }
`;

export const DRAG_CARD = gql`
mutation dragCard($listId: ID!, $cardId: ID!) {
    dragCard(listId: $listId, cardId: $cardId) {
      _id
      lTitle
    }
  }
`;

export const ADD_CARD = gql`
mutation addCard($cTitle: String!, $listId: ID!) {
  addCard(cTitle: $cTitle, listId: $listId) {
    _id
    cTitle
  }
}
`;

export const REMOVE_CARD = gql`
mutation removeCard($cardId: ID!) {
  removeCard(cardId: $cardId) {
    _id
    cTitle
  }
}
`;

export const EDIT_CARD = gql`
mutation editcard($cardId: ID!, $title: String!, $desc: String) {
  editCard(cardId: $cardId, title: $title, desc: $desc) {
    _id
    cTitle
    description
  }
}
`;

export const ADD_DATE = gql`
mutation addDue($cardId: ID!, $date: String!) {
  addDue(cardId: $cardId, date: $date) {
    _id
  duedate
  }
}
`;