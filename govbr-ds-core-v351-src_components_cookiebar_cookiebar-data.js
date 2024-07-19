/** Classe que representa os dados do cookiebar */
export class CookiebarData {
  /**
   * Instancia um objeto de dados do cookiebar. Objeto contém as propriedades contidas no JSON de entrada em uma língua específica
   * @param {string} json - JSON de entrada de dados
   * @param {string} lang - Língua para filtrar o JSON de entrada
   */
  constructor(json, lang) {
    this.PRIORITY_LEVELS = 5
    Object.assign(this, this._filterByLang(json, lang))
    this._setDataCoherenceByPriority(this.PRIORITY_LEVELS)
  }

  /**
   * Filtra um JSON pela língua correspondente
   * @param {string} json - Dados no formato JSON (array de objetos)
   * @param {string} lang - Língua para filtrar o array vindo do json
   * @returns Objeto javascript contendo as propriedade vindas do JSON filtradas pela língua
   * @private
   */
  _filterByLang(json, lang) {
    const list = JSON.parse(json)
    const data = list.filter((element) => {
      return element.lang === lang
    })
    if (data.length > 0) {
      // Existe dados na lingua especificada
      return data[0] // Retorna o primeiro. Se existir mais objetos na mesma língua, os demais serão ignorados.
    } else {
      // Não existe dados na lingua especificada
      return list[0] // Retorna o primeiro que encontrar
    }
  }

  /**
   * Consolida os dados iniciais baseado em uma hierarquia de prioridades
   * @private
   */
  _setDataCoherenceByPriority() {
    this.selectAll = !this.allOptOut ? true : this.selectAll
    this.cookieGroups.forEach((groupData) => {
      groupData.groupOptOut = !this.allOptOut ? false : groupData.groupOptOut
      groupData.groupSelected =
        this.selectAll || !groupData.groupOptOut
          ? true
          : groupData.groupSelected
      groupData.cookieList.forEach((cookieData) => {
        cookieData.cookieOptOut = !groupData.groupOptOut
          ? false
          : cookieData.cookieOptOut
        cookieData.cookieSelected =
          groupData.groupSelected || !cookieData.cookieOptOut
            ? groupData.groupSelected
            : cookieData.cookieSelected
      })
    })
    this._setIndeterminateState()
  }

  /**
   * Controla a configuração do estado indeterminado dos checkboxes
   * @private
   */
  _setIndeterminateState() {
    this._setGroupIndeterminateState()
    this._setAllIndeterminateState()
  }

  /**
   * Trata a configuração do estado indeterminado dos checkboxes dos grupos de cookies
   * @private
   */
  _setGroupIndeterminateState() {
    this.cookieGroups.forEach((groupData) => {
      let allChecked = true
      let allUnchecked = true

      groupData.cookieList.forEach((cookieData) => {
        cookieData.cookieSelected
          ? (allUnchecked = false)
          : (allChecked = false)
      })

      groupData.groupSelected = allChecked ? true : allUnchecked ? false : true
      groupData.groupIndeterminated = allChecked || allUnchecked ? false : true
    })
  }

  /**
   * Trata a configuração do estado indeterminado do checkbox geral
   * @private
   */
  _setAllIndeterminateState() {
    let allChecked = true
    let allUnchecked = true
    let indeterminated = false
    this.cookieGroups.forEach((groupData) => {
      groupData.groupSelected ? (allUnchecked = false) : (allChecked = false)

      if (groupData.groupIndeterminated) {
        indeterminated = true
      }
    })

    this.selectAll = allChecked ? true : allUnchecked ? false : true
    this.allIndeterminated = indeterminated
      ? true
      : allChecked || allUnchecked
      ? false
      : true
  }

  /**
   * Calcula a quantidade de cookies selecionados em 1 grupo de cookies
   * @param {object} groupData - Objeto com dados de 1 grupo de cookies
   * @returns {number} - Quantidade de cookies selecionados em 1 grupo de cookies
   * @public
   */
  getCookiesCheckedAmount(groupData) {
    let count = 0
    groupData.cookieList.forEach((cookieData) => {
      if (cookieData.cookieSelected) count += 1
    })
    return count
  }

  /**
   * Calcula a quantidade total de cookies em 1 grupo de cookies
   * @param {object} groupData - Objeto com dados de 1 grupo de cookies
   * @returns {number} - Quantidade total de cookies em 1 grupo de cookies
   * @public
   */
  getCookiesAmount(groupData) {
    let count = 0
    groupData.cookieList.forEach(() => {
      count += 1
    })
    return count
  }

  /**
   * Ler um arquivo json local
   * @param {string} path - Caminho para o arquivo
   * @param {function} callback - Função de callback que recebe a conteúdo do arquivo
   * @public
   * @static
   */
  static loadJSON(path, callback) {
    const rawFile = new XMLHttpRequest()
    rawFile.overrideMimeType('application/json')
    rawFile.open('GET', path, true)
    rawFile.onreadystatechange = () => {
      if (rawFile.readyState === 4 && rawFile.status === 200) {
        callback(rawFile.responseText)
      }
    }
    rawFile.send(null)
  }
}
