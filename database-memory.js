import { randomUUID } from "crypto"

export class DatabaseMemory {
  #prateleiras = new Map()

  list(search) {
    return Array.from(this.#prateleiras.entries()).map((prateleiraArray) => {
      const id = prateleiraArray[0]

      const data = prateleiraArray[1]

      return {
        id,
        ...data,
      }

    })
      .filter(prateleira => {
        if (search) {
          return prateleira.cor.includes(search)
        }
        return true
      })
  }

  create(prateleira) {
    const prateleiraId = randomUUID()
    this.#prateleiras.set(prateleiraId, prateleira)
  }

  update(id, prateleira) {
    this.#prateleiras.set(id, prateleira)
  }

  delete(id, prateleira) {
    this.#prateleiras.delete(id, prateleira)
  }
}