import { LitElement, html, css } from "lit";

export class AddContactPopup extends LitElement {
  static properties = {
    name: { type: String },
    email: { type: String },
    phone: { type: String },
    message: { type: String },
  };

  static styles = css`
    dialog {
      border: none;
      border-radius: 8px;
      padding: 2rem;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
      width: 40vw;
      height: 68vh;
    }
    .buttons {
      display: flex;
      justify-content: center;
      gap: 20px;
      margin-top: 20px;
    }

    h2 {
      font-size: 1.8em;
    }

    label {
      font-size: 1em;
      font-weight: bold;
    }

    form {
      width: 100%;
      display: flex;
      flex-direction: column;
      gap: 0.8rem;
    }

    button {
      padding: 0.7rem 1.2rem;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-size: 1em;
      width: 30%;
    }

    #add {
      background-color: #261fb3;
      color: white;
    }

    input {
      border-radius: 10px;
      border: 0.5px solid #ccc;
      width: 100%;
      padding: 0.6rem;
      box-sizing: border-box;
    }

    input:focus {
      outline: none;
    }

    .title {
      display: flex;
      justify-content: center;
      margin-bottom: 2.5rem;
    }

    #phone-input {
      margin-bottom: 0.6rem;
    }

    #message {
      color: red;
      font-size: 0.9em;
    }
  `;

  constructor() {
    super();
    this.name = "";
    this.email = "";
    this.phone = "";
    this.message = "";
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
            id="phone-input"
          />

          <label id="message">${this.message}</label>
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
    this.message = "";
    this.dispatchEvent(
      new CustomEvent("cancelContact", { bubbles: true, composed: true })
    );
  }

  _addContact(e) {
    e.preventDefault();

    const telephoneValidator = /^\d+$/.test(this.phone);

    if (this.name === "" || this.email === "" || this.phone === "") {
      this.message = "Debe rellenar todos los campos.";
      return;
    }
    else if (!telephoneValidator){
      this.message = "El número de teléfono debe contener solo dígitos.";
      this.phone = "";
      return;
    }
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
    this.message = "";
  }
}

customElements.define("add-popup", AddContactPopup);
