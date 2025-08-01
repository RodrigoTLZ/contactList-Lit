import { LitElement, html, css } from "lit";

export class AddContactPopup extends LitElement {
  static properties = {
    name: { type: String },
    email: { type: String },
    phone: { type: String },
  };

  static styles = css`
    dialog {
      border: none;
      border-radius: 8px;
      padding: 2rem;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
      width: 40%;
      height: 60%;
    }
    .buttons {
      display: flex;
      justify-content: center;
      gap: 10px;

      margin-top: 20px;
    }

    h2 {
      font-size: 1.8em;
      margin-bottom: 3.5rem;
    }

    label{
        font-size: 1.1em;
        font-weight:semibold;
    }

    button {
      padding: 0.5rem 1rem;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-size: 1em;
    }

    #add {
      background-color: #261fb3;
      color: white;
    }

    input {
      border-radius: 10px;
      border: 0.5px solid #ccc;
      width: 100%;
      margin-bottom: 1rem;
      padding: 0.5rem;
      margin-top: 0.5rem;
      height: 1.5rem;
    }

    input:focus {
      outline: none;
    }

    .title{
        display: flex;
        justify-content: center;
    }
  `;

  constructor() {
    super();
    this.name = "";
    this.email = "";
    this.phone = "";
  }

  render() {
    return html`
      <dialog @close="${this._cancelContact}">
        <div class="title">
          <h2>Agregar contacto</h2>
        </div>
        <form @submit="${this._addContact}">
          <label>Nombre del contacto</label>
          <input
            type="text"
            placeholder="Ingresa el nombre del contacto:"
            .value="${this.name}"
            @input="${(e) => (this.name = e.target.value)}"
            required
          />

          <label>Correo electrónico del contacto:</label>
          <input
            type="email"
            placeholder="Ingresa el correo electrónico del contacto"
            .value="${this.email}"
            @input="${(e) => (this.email = e.target.value)}"
            required
          />

          <label>Número de teléfono del contacto:</label>
          <input
            type="tel"
            placeholder="Ingrese el número de teléfono del contacto"
            .value="${this.phone}"
            @input="${(e) => (this.phone = e.target.value)}"
            required
          />
          <div class="buttons">
            <button type="button" @click="${this._cancelContact}">
              Cancelar
            </button>
            <button id="add" type="submit">Agregar contacto</button>
          </div>
        </form>
      </dialog>
    `;
  }

  _cancelContact() {
    this.name = "";
    this.email = "";
    this.phone = "";
    this.dispatchEvent(
      new CustomEvent("cancelContact", { bubbles: true, composed: true })
    );
  }

  _addContact(e) {
    e.preventDefault();
    this.dispatchEvent(
      new CustomEvent(
        "addContact",
        {
          detail: {
            name: this.name,
            email: this.email,
            phone: this.phone,
          },
        },
        { bubbles: true, composed: true }
      )
    );
    this.name = "";
    this.email = "";
    this.phone = "";
  }
}

customElements.define("add-popup", AddContactPopup);
