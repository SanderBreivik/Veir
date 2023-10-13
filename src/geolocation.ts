// geoLocationComponent.ts

import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";
import YrService from "./services/yr.service";
import { Feature } from "./models/yr.model";
import moment from "moment";
import "moment/locale/nb";

moment.locale("nb");

@customElement("veir-geolocation")
export class VeirGeoLocation extends LitElement {
  @property({ type: Number }) latitude: number | null = null;
  @property({ type: Number }) longitude: number | null = null;
  @property({ type: String }) error: string | null = null;
  @property({ type: Object }) weatherData: Feature | null = null;

  static styles = css`
    .error {
      color: red;
    }
  `;

  firstUpdated() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        this.handlePosition.bind(this),
        this.handleError.bind(this)
      );
    } else {
      this.error = "Geolokasjon støttes ikke av denne nettleseren.";
    }
  }

  async handlePosition(position: GeolocationPosition) {
    this.latitude = position.coords.latitude;
    this.longitude = position.coords.longitude;
    this.weatherData = await YrService.getYrWeatherData(
      this.latitude.toString(),
      this.longitude.toString()
    );
  }

  handleError(error: GeolocationPositionError) {
    switch (error.code) {
      case error.PERMISSION_DENIED:
        this.error = "Brukeren nektet forespørselen om geolokasjon.";
        break;
      case error.POSITION_UNAVAILABLE:
        this.error = "Lokasjonsinformasjon er utilgjengelig.";
        break;
      case error.TIMEOUT:
        this.error =
          "Forespørselen om å få brukerens lokasjon tok for lang tid.";
        break;
      default:
        this.error = "En ukjent feil oppstod.";
        break;
    }
  }

  render() {
    moment.locale("nb");
    console.log(moment.locale());

    return html`
      ${this.error ? html`<div class="error">${this.error}</div>` : ""}
      ${this.latitude && this.longitude && this.weatherData
        ? html`<div>
            Din lokasjon: Breddegrad: ${this.latitude}, Lengdegrad:
            ${this.longitude}
            <br />
            Vær:
            ${this.weatherData.properties.timeseries.map((time) => {
              return html`<div>
                ${moment(time.time).fromNow()}:
                ${time.data.instant.details.air_temperature}
              </div>`;
            })}
          </div>`
        : ""}
    `;
  }
}
