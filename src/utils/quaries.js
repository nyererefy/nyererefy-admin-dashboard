import gql from 'graphql-tag'

export const ELECTIONS_QUERY = gql`
  {
    elections {
      id
      title
    }
  }
`

export const ELECTION_QUERY = gql`
query($id: Int!) {
  election(id: $id) {
    title
    isOpen
    isStrict
    startAt
    endAt
  }
}
`

export const CATEGORIES_QUERY = gql`
query($electionId: Int!) {
  categories(electionId: $electionId) {
    id
    title
  }
}
`

export const SUBCATEGORIES_QUERY = gql`
query($electionId: Int!) {
  subcategories(electionId: $electionId) {
    id
    title
    suffix
  }
}
`
