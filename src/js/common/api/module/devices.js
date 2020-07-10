import { HTTP } from "Utils"

export const getWithGraphQL = query => {
  return HTTP.get("graphql?", query)
}
