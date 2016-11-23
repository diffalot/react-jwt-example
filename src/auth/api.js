import fetch from 'isomorphic-fetch'

const API_URL = 'http://localhost:3000'

let api = {
  /**
  * Pretends to post to a remote server
  * @param  {string}  endpoint The endpoint of the server that should be contacted
  * @param  {?object} data     The data that should be transferred to the server
  */
  post (endpoint, data) {
    return fetch(`${API_URL}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify(data)
    })
    .then(function (response) {
      return response.json()
    })

  }
}

export default api
