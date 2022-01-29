import { gql } from 'graphql-request'

export const CREATE_INCOME_MUTATION = gql`
  mutation createIncomeMutation($user_id: String!, $income_from: String!, $amount: numeric!, $date_earned: String!) {
    insert_income_one(object: {user_id: $user_id, income_from: $income_from, amount: $amount, date_earned: $date_earned}) {
      id
      income_from
      user_id
      amount
    }
  }
`