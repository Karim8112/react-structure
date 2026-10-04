type IExprience = {
  role: string
  period: string
  company: string
  description?: string
}

export default interface ITeam {
  _id?: string
  title?: string
  address?: string
  email?: string
  phoneNumberS?: string[]
  summary?: string
  imageLeft?: string
  tags?: string[]
  skills?: string[]
  education?: string[]
  languages?: string[]
  experience?: IExprience[]
}
