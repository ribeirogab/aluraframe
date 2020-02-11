export class HttpService{
  async get(url){
    const res = await this._handleErrors(await fetch(url))
    return res.json()
  }

  async post(url, data){
    const res = await fetch(url, {
      headers: { 'Content-type': 'application/json' },
      method: 'post',
      body: JSON.stringify(data)
    })
    return await this._handleErrors(res)
  }

  async _handleErrors(res){
    if (!res.ok) throw new Error(res.statusText) 
    return res
  }
}