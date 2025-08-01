import { LitElement, html, css } from "lit";

export class EliminarPopup extends LitElement {
  static styles = css`
    dialog {
      border: none;
      border-radius: 8px;
      padding: 2rem;
      min-width: 300px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
    }

    p{
        font-size: 1.2em;
        font-weight: bold;
        margin-bottom: 2em;
    }

    button{
        gap: 1rem;
        padding: 0.5rem 1rem;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        font-size: 1em;
    }

    .buttons {
        display: flex;
        justify-content: center;
        gap:10px;
    }

    .confirm{
        background-color: red;
        color: white;
    }
  `;

  _confirm() {
    this.dispatchEvent(
      new CustomEvent("confirm", { bubbles: true, composed: true })
    );
  }

  _cancel() {
    this.dispatchEvent(
      new CustomEvent("cancel", { bubbles: true, composed: true })
    );
  }

  render() {
    return html`
      <dialog @close="${this._cancel}">
        <p>¿Estás seguro que deseas eliminar este contacto?</p>
        <div class="buttons">
            <button class="cancel" @click="${this._cancel}">Cancelar</button>
            <button class="confirm" @click="${this._confirm}">Eliminar</button>
        </div>
      </dialog>
    `;
  }
}

customElements.define("delete-popup", EliminarPopup);
