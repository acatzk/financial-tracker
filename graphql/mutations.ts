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

export const CREATE_EXPENSES_MUTATION = gql`
  mutation createExpenses($user_id: String!, $date: String!, $name: String!, $cost: numeric!, $prev_balance: numeric!) {
    insert_expenses(objects: [{user_id: $user_id, date: $date, name: $name, cost: $cost, prev_balance: $prev_balance}]) {
      affected_rows
      returning {
        id
        user_id
        name
        prev_balance
        date
        cost
      }
    }
  }
`

export const ADD_TOTAL_INCOME_MUTATION = gql`
  mutation addTotalIncomeMutation($user_id: String!, $sum: numeric!) {
    insert_total_income_one(object: {user_id: $user_id, sum: $sum}) {
      id
      sum
      user_id
    }
  }
`

export const UPDATE_TOTAL_INCOME_MUTATION = gql`
  mutation updateTotalIncomeById($user_id: String!, $income: numeric!) {
    update_total_income(where: {user_id: {_eq: $user_id}}, _set: {sum: $income}) {
      returning {
        id
        sum
        user_id
      }
    }
  }
`