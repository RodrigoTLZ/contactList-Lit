import { LitElement, html, css, nothing } from "lit";
import 'https://cdn.jsdelivr.net/npm/@shoelace-style/shoelace@2.20.1/cdn/components/avatar/avatar.js';
import "./delete.js";
import "./add.js";

export class ListaContactos extends LitElement {
  static properties = {
    contacts: { type: Array },
    showDelete: { type: Boolean },
    indexToDelete: { type: Number },
  };

  static styles = css`
    :host {
      font-family: Arial, Helvetica, sans-serif
    }
    
    ul {
      list-style: none;
      padding: 0;
    }
    li {
      padding: 20px;
      border-bottom: 1px solid #ecebeb;
      background-color: #ffff;
      margin-bottom: 10px;
      border-radius: 20px;
      display: flex;
      align-items: flex-end;
      flex-direction: row;
    }

    li label{
        margin-top: 5px;
        font-size: 0.8em;
    }

    #eliminar {
      font-size: 1.2em;
      cursor: pointer;
      border: none;
      border-radius: 4px;
      padding: 5px 8px;
      border-radius: 10px;
      margin-left: auto;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    #eliminar:hover {
      background-color: red;
        color: white;
    }

    p{
        margin: 0;
    }

    sl-avatar{
        margin-right: 15px;
        --size: 65px;
    }

    .user-info {
        display: flex;
        flex-direction: column;
        justify-content: center;
    }

    .number{
        display: flex;
        align-items: center;
        text-align: center;
        gap: 0.3rem;
        margin-top: 9px;
    }

    #floating-button {
        position: fixed;
  bottom: 20px;
  right: 20px;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: #261FB3;
  color: white;
  font-size: 2em;
  border: none;
  cursor: pointer;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
  `;

  constructor() {
    super();
    this.contacts = ["pineda", "hector", "daniela"].map((name) => ({
      name: name,
      email: `${name.toLowerCase()}@example.com`,
      number: `123-456-7890`,
    }));
    this.showDelete = false;
    this.indexToDelete = -1;
  }

  render() {
    return html`
      <ul>
        ${this.contacts.map(
          (contact, index) => html`
            <li>
              <sl-avatar label="User avatar"></sl-avatar>
              <div class="user-info">
              <strong>${contact.name}</strong>
              <label>${contact.email}</label>
              <div class="number">
                <sl-icon name="telephone-fill"></sl-icon>
                <p>${contact.number}</p>
              </div>
              </div>
              

              <button id="eliminar" @click=${() => this._showDelete(index)}>
                <sl-icon name="trash"></sl-icon>
              </button>
            </li>
          `
        )}
      </ul>

      <delete-popup
        @click=${this._showDelete}
        @confirm=${this._confirmDelete}
        @cancel=${this._cancelDelete}
      ></delete-popup>
      <button id="floating-button" @click=${this._showAdd}>+</button>
      <add-popup
        @click=${this._showAdd}
        @cancelContact=${this._cancelAdd}
        @addContact=${this._confirmAdd}
      ></add-popup>
    `;
  }

  _showAdd() {
    this.findModalAdd().showModal();
  }

  _confirmAdd(e) {
    const { name, email, phone } = e.detail;
    this.contacts = [...this.contacts, { name, email, number: phone }];
    this._cancelAdd();
  }

  _cancelAdd() {
    this.findModalAdd().close();
  }

  _showDelete(index) {
    this.indexToDelete = index;
    this.findModalDelete().showModal();
  }

  _confirmDelete() {
    this.contacts.splice(this.indexToDelete, 1);
    this.findModalDelete().close();
    this.indexToDelete = -1;
  }

  _cancelDelete() {
    this.findModalDelete().close();
    this.showDelete = false;
    this.indexToDelete = -1;
  }

  findModalDelete() {
    return this.renderRoot
      .querySelector("delete-popup")
      .shadowRoot.querySelector("dialog");
  }

  findModalAdd() {
    return this.renderRoot
      .querySelector("add-popup")
      .shadowRoot.querySelector("dialog");
  }
}

customElements.define("contactlist-component", ListaContactos);
