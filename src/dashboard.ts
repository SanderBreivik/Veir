import { LitElement, html, css } from "lit";
import { customElement } from "lit/decorators.js";

@customElement("veir-dashboard")
export class VeirDashboard extends LitElement {
  static styles = css`
    .container {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }
  `;

  render() {
    return html`
      <div class="container">
        <h1>Veir</h1>
        <veir-geolocation> </veir-geolocation>
      </div>
    `;
  }
}
