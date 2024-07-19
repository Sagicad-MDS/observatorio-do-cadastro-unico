import { CookiebarLabels } from './govbr-ds-core-v351-src_components_cookiebar_cookiebar-labels.js'

/** Classe que contém os templates do cookiebar */
export class CookiebarTemplates {
  /**
   * Instancia um objeto template com os dados do cookiebar
   * @param {object} data - Objeto de dados do cookiebar
   */
  constructor(data) {
    this.data = data
    this.labels = new CookiebarLabels(this.data)
  }

  /**
   * Cria um template para a área de conteúdo global
   * @returns {string} - Elemento DOM que representa a área de conteúdo global
   * @public
   */
  setGlobalContentArea() {
    return `<div class="br-modal">
              <div class="br-card" id="card0">
                <div class="container-fluid p-1 p-2xh">
                  <div class="wrapper p-2xh">
                    ${this._setIntroductoryContentArea()}
                    <div id="info-t" class="br-modal-body">
                      ${this._setInfoText()}
                      ${this._setMainContentArea()}
                      ${this._setComplementaryContentArea()}
                    </div>
                  </div>
                  ${this._setActionArea()}
                </div>
              </div>
            </div>`
  }

  /**
   * Cria um template para a área de conteúdo introdutório
   * @returns {string} - Elemento DOM que representa a área de conteúdo introdutório
   * @private
   */
  _setIntroductoryContentArea() {
    return `<div class="br-modal-header entry-content">
              ${this._setMainTitle()}
              ${this._setLastUpdate()}
              ${this._setEntryText()}
            </div>`
  }

  /**
   * Cria um template para a área de conteúdo principal
   * @returns {string} - Elemento DOM que representa a área de conteúdo principal
   * @private
   */
  _setMainContentArea() {
    return `<div class="br-list main-content">
              ${this._setMainContentHeader()}
              ${this._setCookieGroups()}
              ${
                this.data.noteList && this.data.noteList.length
                  ? this._setNotifications()
                  : ''
              }
            </div>`
  }

  /**
   * Cria um template para a área de acões
   * @returns {string} - Elemento DOM que representa a área de ações
   * @private
   */
  _setActionArea() {
    return `<div class="br-modal-footer actions justify-content-end">
              ${this._setPoliticsButton()}
              ${this._setAcceptButton()}
            </div>`
  }

  /**
   * Cria um template para o título principal
   * @returns {string} - Elemento DOM que representa o título principal
   * @private
   */
  _setMainTitle() {
    return `<div class="br-modal-title">
              <div class="row">
                <div class="col-sm">
                  <h1>${this.data.mainTitle}</h1>
                </div>
                <div class="col-sm-auto order-first order-sm-last">
                  ${this._setCloseButton()}
                </div>
              </div>
            </div>`
  }

  /**
   * Cria um template para informações sobre atualização
   * @returns {string} - Elemento DOM que representa a informação sobre atualização
   * @private
   */
  _setLastUpdate() {
    return `<p class="last-update">${this.labels.setLastUpdateLabel()}: <span>${
      this.data.lastUpdate
    }</span></p>`
  }

  /**
   * Cria um template para o texto introdutório
   * @returns {string} - Elemento DOM que representa o texto introdutório
   * @private
   */
  _setEntryText() {
    return `<p class="entry-text">${this.data.entryText}</p>`
  }

  /**
   * Cria um template para o texto descritivo
   * @returns {string} - Elemento DOM que representa o texto descritivo
   * @private
   */
  _setInfoText() {
    return `<p class="info-text">${this.data.infoText}</p>`
  }

  /**
   * Cria um template para o header da área de conteúdo principal
   * @returns {string} - Elemeto DOM que representa o header da área de conteúdo principal
   * @private
   */
  _setMainContentHeader() {
    return `<div class="header">
              <div class="row justify-content-between flex-fill">
                <div class="col-12 col-sm align-self-center mb-2">
                  <div class="title">${this.labels.setCookieGroupsLabel()}</div>
                </div>
                <div class="col-12 align-self-center">
                  ${this.data.allOptOut ? this._setCheckAll() : ''}
                </div>
                <div class="col-12 text-sm-right message mt-1">
                  ${this.setAllAlertMessage()}
                </div>
              </div>
            </div>`
  }

  /**
   * Cria um template para o grupo de cookies
   * @returns {string} - Elemento DOM que representa os grupos de cookies
   * @private
   */
  _setCookieGroups() {
    let groupTemplates = ''
    this.data.cookieGroups.forEach((groupData, groupIndex) => {
      groupTemplates += `<hr>
                          <div class="br-item group-info">
                            <div class="row mb-1">
                              <div class="col-12 col-sm align-self-center order-4 order-sm-1">
                                ${this._setGroupName(groupData)}
                              </div>
                              <div class="col align-self-center order-1 order-sm-2">
                                ${
                                  groupData.groupOptOut
                                    ? this._setCheckGroup(groupData, groupIndex)
                                    : `<span class="always-active float-sm-right">
                                      ${this.labels.setAlwaysActiveLabel()}
                                    </span>`
                                }
                              </div>
                              <div class="col col-sm-auto align-self-center order-2 order-sm-3">
                                ${this._setGroupButton(groupData.groupName)}
                              </div>
                              <div class="col-12 col-sm-12 order-3 order-sm-4 text-sm-right message mt-1 mb-1">
                                ${this.setGroupAlertMessage(groupData)}
                              </div>
                            </div>
                            <div class="row">
                              <div class="col">
                                <p class="group-description">${this._setGroupDescription(
                                  groupData
                                )}</p>
                              </div>
                            </div>
                          </div>
                          <div class="br-list cookie-info">
                            <div class="br-item">
                              <div class="row">
                                <div class="col">
                                  ${this._setCookieInfo(groupData, groupIndex)}
                                </div>
                              </div>
                            </div>
                          </div>`
    })
    return groupTemplates
  }

  /**
   * Cria um template para o nome do grupo de cookies
   * @param {object} groupData - Objeto com dados de 1 grupo de cookies
   * @returns {string} - Elemento DOM que representa o nome do grupo de cookies
   * @orivate
   */
  _setGroupName(groupData) {
    return `<span class="group-name" title="Expandir">${
      groupData.groupName
    }</span>
              <span class="cookies-checked" title="Expandir">(${
                groupData.groupOptOut
                  ? `${this.data.getCookiesCheckedAmount(groupData)} de `
                  : ''
              }</span><span class="group-size" title="Expandir">${this.data.getCookiesAmount(
      groupData
    )})</span>`
  }

  /**
   * Cria um template para a descrição do grupo de cookies
   * @param {object} groupData - Objeto com dados de 1 grupo de cookies
   * @returns {string} - Elemento DOM que representa a descrição do grupo de cookies
   * @private
   */
  _setGroupDescription(groupData) {
    return `<p class="group-description">${groupData.groupText}</p>`
  }

  /**
   * Cria um template para as informações dos cookies
   * @param {object} groupData - Objeto com dados de 1 grupo de cookies
   * @param {number} groupIndex - Índice do grupo de cookies
   * @returns {string} - Elemento DOM que representa as informações dos cookies
   * @private
   */
  _setCookieInfo(groupData, groupIndex) {
    let cookieTemplates = ''
    groupData.cookieList.forEach((cookieData, cookieIndex) => {
      cookieTemplates += `<div class="br-card">
                            <div class="card-content">
                              <div class="row mb-1">
                                <div class="col-12 text-right">
                                  ${
                                    cookieData.cookieOptOut
                                      ? this._setCheckCookie(
                                          groupIndex,
                                          cookieData,
                                          cookieIndex
                                        )
                                      : ''
                                  }
                                </div>
                                <div class="col-12 message text-right mb-1 mt-1">
                                  ${this.setCookieAlertMessage(cookieData)}
                                </div>
                              </div>
                              <div class="row">
                                <div class="fixed-width cookie-term">
                                  <span>${this.labels.setCookieNameLabel()}</span>
                                </div>
                                <div class="col-12 col-sm mb-1 cookie-data">
                                  <span>${cookieData.cookieName}</span>
                                </div>
                              </div>
                              <div class="row">
                                <div class="fixed-width cookie-term">
                                  <span>${this.labels.setCookieExpiresLabel()}</span>
                                </div>
                                <div class="col-12 col-sm mb-1 cookie-data">
                                  <span>${cookieData.expires}</span>
                                </div>
                              </div>
                              <div class="row">
                                <div class="fixed-width cookie-term">
                                  <span>${this.labels.setCookieDomainLabel()}</span>
                                </div>
                                <div class="col-12 col-sm mb-1 cookie-data">
                                  <span>${cookieData.domain}</span>
                                </div>
                              </div>
                              <div class="row">
                                <div class="fixed-width cookie-term">
                                  <span>${this.labels.setCookieEnterpriseLabel()}</span>
                                </div>
                                <div class="col-12 col-sm mb-1 cookie-data">
                                  <span>${cookieData.enterprise}</span>
                                </div>
                              </div>
                              <div class="row">
                                <div class="fixed-width cookie-term">
                                  <span>${this.labels.setCookiePurposeLabel()}</span>
                                </div>
                                <div class="col-12 col-sm mb-1 cookie-data">
                                  <span>${cookieData.purpose}</span>
                                </div>
                              </div>
                              <div class="row">
                                <div class="fixed-width cookie-term">
                                  <span>${this.labels.setCookieDescriptionLabel()}</span>
                                </div>
                                <div class="col-12 col-sm mb-1 cookie-data">
                                  <span>${cookieData.description}</span>
                                </div>
                              </div>
                            </div>
                          </div>`
    })
    return cookieTemplates
  }

  /**
   * Cria um template para a lista de notificações
   * @returns {string} - Elemento DOM que representa a lista de notificações
   * @private
   */
  _setNotifications() {
    return `<hr>
            <div class="br-item">
              <div class="row">
                <div class="col align-self-center">
                  <span class="group-name" title="Expandir">
                    ${this.data.noteTitle}</span>
                </div>
                <div class="col-auto">
                  ${this._setGroupButton(this.data.noteTitle)}
                </div>
              </div>
            </div>
            <div class="br-list">
              ${this._setNotificationInfo()}
            </div>
            <hr>`
  }

  /**
   * Cria um template para as informações das notificações
   * @returns {string} - Elemento DOM que representa as informações das notificações
   * @private
   */
  _setNotificationInfo() {
    let notificationTemplates = ''
    this.data.noteList.forEach((notificationData) => {
      notificationTemplates += `<div class="br-item notes">
                                  <div class="row">
                                    <div class="col">
                                      <p>${notificationData.question}</p>
                                      <p>${notificationData.answer}</p>
                                    </div>
                                  </div>
                                </div>`
    })
    return notificationTemplates
  }

  /**
   * Cria um template para a área de conteúdo complementar
   * @returns {string} - Elemento DOM que representa a área de conteúdo complementar
   * @private
   */
  _setComplementaryContentArea() {
    return `<div class="br-list complementary-content">
              ${this._setLinkInfo()}
            </div>`
  }

  /**
   * Cria um templata para as informações dos links
   * @returns {string} - Elemento DOM que representa as informações dos links
   * @private
   */
  _setLinkInfo() {
    let linkTemplates = ''
    this.data.links.forEach((linkData) => {
      linkTemplates += `<div class="br-item text-center">
                          <div class="row">
                            <div class="col">
                              <a href="${linkData.url}">${linkData.name}<i class="fas fa-external-link-alt" aria-hidden="true"></i>
                              </a>
                            </div>
                          </div>
                        </div>`
    })
    return linkTemplates
  }

  /**
   * Cria um template pra o botão de políticas de cookies
   * @returns {string} - Elemento DOM que representa o botão de politicas de cookies
   * @private
   */
  _setPoliticsButton() {
    return `<button class="br-button secondary small" type="button" aria-label="${this.labels.setPoliticsButtonLabel()}">${this.labels.setPoliticsButtonLabel()}</button>`
  }

  /**
   * Cria um template pra o botão de aceite
   * @returns {string} - Elemento DOM que representa o botão de aceite
   * @private
   */
  _setAcceptButton() {
    return `<button class="br-button primary small" type="button" aria-label="${this.labels.setAcceptButtonLabel()}">${this.labels.setAcceptButtonLabel()}</button>`
  }
  /**
   * Cria um template para o botão de fechar
   * @returns {string} - Elemento DOM que represeta o botão de fechar
   * @private
   */
  _setCloseButton() {
    return `<button class="br-button close circle small float-right" type="button" data-dismiss="br-modal" aria-label="${
      this.data.closeLabel || 'fechar'
    }">
              <i class="fas fa-times"></i>
            </button>`
  }

  /**
   * Cria um template para botão de abrir/fechar do brupo de cookies
   * @param {object} groupData - Objeto com dados de 1 grupo de cookies
   * @returns {string} - Elemento DOM que representa o botão de abrir/fechar do grupo de cookies
   * @private
   */
  _setGroupButton(groupName) {
    return `<button class="br-button circle small float-right" type="button" aria-label="Expandir grupo de Cookies ${groupName}">
              <i class="fas fa-angle-down" aria-hidden="true"></i>
            </button>`
  }

  /**
   * Cria um template para o checkbox de seleção geral
   * @returns {string} - Elemento DOM que representa o checkbox de seleção geral
   * @private
   */
  _setCheckAll() {
    return `<div class="br-checkbox">
              <input
                id="check-all"
                name="check-all"
                type="checkbox"                
                aria-label="${this.labels.setCheckAllLabel()}"
                ${this.data.selectAll ? 'checked' : ''}
                ${this.data.allIndeterminated ? 'indeterminate' : ''}
                data-parent="check-all"
                data-checked-label="${this.labels.setSelectAllLabel()}"
                data-unchecked-label="${this.labels.setUnselectAllLabel()}"
              />
              <label for="check-all">
                ${this.labels.setCheckAllLabel()}
              </label>
            </div>`
  }

  /**
   * Cria um template para o checkbox de seleção do grupo de cookies
   * @param {object} groupData - Objeto com dados de 1 grupo de cookies
   * @param {number} groupIndex - Índice do grupo de cookies
   * @returns {string} - Elemento DOM que representa o checkbox de seleção do grupo de cookies
   * @private
   */
  _setCheckGroup(groupData, groupIndex) {
    return `<div class="br-checkbox">
              <input
                id="${`check-group-${groupIndex}`}"
                name="${`check-group-${groupIndex}`}"
                type="checkbox"                
                aria-label="${this.labels.setCheckGroupLabel(groupData)}"
                ${groupData.groupSelected ? 'checked' : ''}
                ${groupData.groupIndeterminated ? 'indeterminate' : ''}
                data-child="check-all"
                data-parent="${`check-group-${groupIndex}`}"
                data-checked-label="${this.labels.setSelectAllGroupLabel()}"
                data-unchecked-label="${this.labels.setUnselectAllGroupLabel()}"
              />
              <label for="${`check-group-${groupIndex}`}">
                ${this.labels.setCheckGroupLabel(groupData)}
              </label>
            </div>`
  }

  /**
   * Cria um template para checkbox(switch) de seleção do cookie
   * @param {number} groupIndex - Índice do grupo de cookies
   * @param {object} cookieData - Objeto com dados de 1 cookie
   * @param {number} cookieIndex - Índice do cookie
   * @returns {string} - Elemento DOM que representa o checkbox(switch) de seleção do cookie
   * @private
   */
  _setCheckCookie(groupIndex, cookieData, cookieIndex) {
    return `<div class="br-switch small icon">
              <input
                id="${`check-cookie-${groupIndex}-${cookieIndex}`}"
                name="${`check-cookie-${groupIndex}-${cookieIndex}`}"
                type="checkbox"
                role="switch"
                ${cookieData.cookieSelected ? 'checked' : ''}
                data-child="${`check-group-${groupIndex}`}"
              />
              <label
                for="${`check-cookie-${groupIndex}-${cookieIndex}`}"
                aria-label="${
                  cookieData.cookieSelected
                    ? this.labels.setCheckCookieEnabledLabel()
                    : this.labels.setCheckCookieDisabledLabel()
                }">
              </label>
              <div
                class="switch-data"
                data-enabled="${this.labels.setCheckCookieEnabledLabel()}"
                data-disabled="${this.labels.setCheckCookieDisabledLabel()}">
              </div>
            </div>`
  }

  /**
   * Cria um template para a mensagem de alerta geral
   * @returns {string} - Elemento DOM que representa a mensagem de alerta geral ou uma string vazia
   * @public
   */
  setAllAlertMessage() {
    return this.data.allAlertMessage
      ? `<span class="feedback warning ${
          !this.data.selectAll || this.data.allIndeterminated ? '' : 'd-none'
        }" role="alert" aria-live="polite">
                <i class="fas fa-exclamation-triangle" aria-hidden="true"></i>
                ${this.data.allAlertMessage}
              </span>`
      : ''
  }

  /**
   * Cria um template para a mensagem de alerta para o grupo de cookies
   * @param {object} groupData - Objeto com dados de 1 grupo de cookies
   * @returns {string} - Elemento DOM que representa a mensagem de alerta para o grupo de cookies
   * @public
   */
  setGroupAlertMessage(groupData) {
    return groupData.groupAlertMessage
      ? `<span class="feedback warning ${
          !groupData.groupSelected || groupData.groupIndeterminated
            ? ''
            : 'd-none'
        }" role="alert" aria-live="polite">
          <i class="fas fa-exclamation-triangle" aria-hidden="true"></i>
          ${groupData.groupAlertMessage}
        </span>`
      : ''
  }

  /**
   * Cria um template para a mensagem de alerta para o cookie
   * @param {object} cookieData - Objeto com dados de 1 cookie
   * @returns {string} - Elemento DOM que representa a mensagem de alerta para o cookie
   * @public
   */
  setCookieAlertMessage(cookieData) {
    return cookieData.alertMessage
      ? `<span class="feedback warning ${
          !cookieData.cookieSelected ? '' : 'd-none'
        }" role="alert" aria-live="polite">
          <i class="fas fa-exclamation-triangle" aria-hidden="true"></i>
          ${cookieData.alertMessage}
        </span>`
      : ''
  }
}
