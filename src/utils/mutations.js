import gql from 'graphql-tag'

export const ADD_CATEGORY = gql`
  mutation($input: CategoryInput!) {
  createCategory(input: $input) {
    id
  }
}
`

export const ADD_ELECTION = gql`
  mutation($input: ElectionInput!) {
  createElection(input: $input) {
    id
  }
}
`
export const ADD_BRANCH = gql`
mutation($input: BranchInput!) {
  createBranch(input: $input) {
    id
  }
}
`

export const CREATE_SCHOOL = gql`
mutation($input: SchoolInput!) {
  createSchool(input: $input) {
    id
  }
}
`
export const REGISTER_PROGRAM = gql`
mutation($input: SchoolProgramInput!) {
  registerProgram(input: $input) {
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
