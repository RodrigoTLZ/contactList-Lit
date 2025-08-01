import { LitElement, html, css } from "lit";
import "https://cdn.jsdelivr.net/npm/@shoelace-style/shoelace@2.20.1/cdn/components/icon/icon.js";

export class BarraHerramientas extends LitElement {
  static styles = css`
    :host {
      display: block;
      background: #ffffff;
      padding: 8px 16px;
      border-bottom: 1px solid #ddd;
      font-family: Arial, sans-serif;
    }
    .toolbar {
      display: flex;
      align-items: left;
      flex-direction: column;
      gap: 12px;
      text-decoration: default;
    }
    a{
      color: black;
      padding: 12px;
      border-radius: 4px;
      cursor: pointer;
      font-size: 1em;
      text-decoration: none;
      display: flex;
      align-items: center;

    }
    a:hover {
      background: #261FB3;
      transition: background 0.2s ease;
      color: white;
    }

    sl-icon {
        font-size: 1.5em;
        margin-right: 8px;
    }
  `;

  render() {
    return html`
      <div class="toolbar">
        <a href="#">
            <sl-icon name="house"></sl-icon>
            <label>Inicio</label>
        </a>

        <a href="#">
          <sl-icon name="telephone"></sl-icon>
          <label>Teléfono</label>
        </a>

         <a href="#">
          <sl-icon name="box-arrow-up"></sl-icon>
          <label>Exportar contactos</label>
        </a>

        <a href="#">
          <sl-icon name="gear"></sl-icon>
          <label>Opciones</label>
        </a>

      </div>
    `;
  }
}

customElements.define("toolbar-component", BarraHerramientas);
