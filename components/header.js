import { LitElement, html, css } from "lit";
import "https://cdn.jsdelivr.net/npm/@shoelace-style/shoelace@2.20.1/cdn/components/icon/icon.js";
import 'https://cdn.jsdelivr.net/npm/@shoelace-style/shoelace@2.20.1/cdn/components/avatar/avatar.js';

export class HeaderComponent extends LitElement {
  static styles = css`
    .header {
      background: #261FB3;
      color: white;
      padding: 1rem;
      font-size: 1.1rem;
      font-weight: bold;
      letter-spacing: 1px;
      font-family: Arial, sans-serif;
      display: flex;  
      align-items: center;
      justify-content: space-between;  
    }

    .header h2 {
        color: #ffffff;
        margin: 0;
    
    }

    .user label {
        font-size: 0.6rem;
        font-weight: normal;
    }

    .user{
        display: flex;
        align-items: center;
        font-size: 0.8rem;
    }

    .user-info{
        display: flex;
        flex-direction: column;
        margin-left: 10px;
        font-size: 0.8rem;
        color: #ffffff;
    }

    .user-info h4 {
        margin:0;
        margin-bottom: 2px;
        font-weight:semibold;
        color: #ffffff;
    }



  `;

  render() {
    return html`
            <div class="header">
                <h2>Lista de Contactos</h2>
                <div class="user">
                    <sl-avatar
                        image="https://cdn2.steamgriddb.com/icon/19b650660b253761af189682e03501dd.png"
                        label="Avatar de Sonic"
                    ></sl-avatar>
                    <div class="user-info">
                        <h4>Rodrigo Elias </h4>
                        <label>rodrigo_elias@outlook.com</label>
                    </div>
                </div>
            </div>
        `;
  }
}

customElements.define("header-component", HeaderComponent);
