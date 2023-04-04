import axios from "axios"

export async function connect () {
  axios
    .get("https://raw.githubusercontent.com/claretdevigne/jsons/main/language-app-content")
    .then(res => res)
}