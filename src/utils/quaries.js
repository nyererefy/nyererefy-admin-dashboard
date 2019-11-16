import gql from 'graphql-tag'

export const ELECTIONS_QUERY = gql`
{
  elections(strict: true) {
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

export const SUBCATEGORY_QUERY = gql`
  query($subcategoryId: Int!) {
    subcategory(id: $subcategoryId) {
      id
      title
      candidates {
        id
        avatar
        user {
          name
          regNo
        }
      }
    }
  }
`

export const BRANCHES_QUERY = gql`
  {
    branches {
      id
      title
    }
  }
`

export const SCHOOLS_QUERY = gql`
  {
    schools {
      id
      title
      schoolPrograms {
        program {
          id
          title
        }
      }
    }
  }
`

export const CLASSES_QUERY = gql`
  {
    classes {
      id
      title
    }
  }
`

export const PROGRAMS_QUERY = gql`
  {
    programs(filter: false) {
      id
      title
    }
  }
`

export const SEARCH_STUDENT_QUERY = gql`
  query($query: String) {
    users(query: $query) {
      id
      regNo
      name
    }
  }
`

export const CURRENT_MANAGER_QUERY = gql`
{
  currentManager {
    name
    university {
      abbreviation
      title
      uuid
      secret
    }
  }
}
`

export const RESIDENCES_QUERY = gql`
{
  residences {
    id
    title
  }
}
`
