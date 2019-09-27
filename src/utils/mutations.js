import gql from 'graphql-tag'

export const ADD_CATEGORY = gql`
  mutation($input: CategoryInput!) {
  createCategory(input: $input) {
    id
  }
}
`

export const GENERATE_SUBCATEGORIES = gql`
  mutation($electionId: Int!) {
  generateSubcategories(electionId: $electionId) {
    id
  }
}
`
