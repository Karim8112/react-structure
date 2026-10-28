export default interface IApi<Type> {
  total?: number
  status: string
  results: number
  data: Type[]
}

export enum filterOperations {
  equal = '=',
  not_equal = '!=',
  greater = '>',
  greater_equal = '>=',
  less = '<',
  less_equal = '<='
}

// type filterOperators =
//   | 'equal'
//   | 'not_equal'
//   | 'greater'
//   | 'greater_than'
//   | 'less'
//   | 'less_than'

export interface IFilter {
  name: string
  value: string
  operator: keyof typeof filterOperations
}
