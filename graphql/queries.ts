import { gql } from 'graphql-request'

export const GET_ALL_INCOME_BY_USER_ID_QUERY = gql`
  query getAllIncomeByUserId($user_id: String!) {
    income(where: {user_id: {_eq: $user_id}}) {
      id
      amount
    }
  }
`

export const GET_AGGREGATE_TOTAL_INCOME_SUM_QUERY = gql`
  query getAggregateTotalIncomeSum($user_id: String!) {
    total_income_aggregate(where: {user_id: {_eq: $user_id}}) {
      aggregate {
        sum {
          sum
        }
      }
    }
  }
`
