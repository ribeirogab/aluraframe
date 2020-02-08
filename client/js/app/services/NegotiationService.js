class NegotiationService {
  constructor() {
    this._http = new HttpService()
  }

  import(week) {
    return this._http.get(`negociacoes/${week}`)
      .then(negotiations => {
        return negotiations.map(n =>
          new Negotiation(
            new Date(n.data),
            n.quantidade,
            n.valor
          )
        )
      }).catch(error => {
        console.log(error)
        throw new Error('N foi possivel obter as negociacoes da semana')
      })
  }
}
