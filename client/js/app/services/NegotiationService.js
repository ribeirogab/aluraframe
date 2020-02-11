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

  register(negotiation){
    return ConnectionFactory.getConnection()
      .then(connection => new NegotiationDao(connection))
        .then(dao => dao.add(negotiation))
          .then(() => 'Negotiation successfuly added!')
      .catch(() => {
        throw new Error('Error when adding negotiation')
      })
  }

  list(){
    return ConnectionFactory.getConnection()
      .then(connection => new NegotiationDao(connection))
        .then(dao => dao.listAll())
  }

  delete(){
    return ConnectionFactory.getConnection()
      .then(connection => new NegotiationDao(connection))
        .then(dao => dao.deleteAll())
          .then(() => 'Deletado com sucesso!')
      .catch(() => {
        throw new Erro('Falha ao deletar!')
      })
  }
}


