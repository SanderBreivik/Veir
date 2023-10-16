// geoLocationComponent.ts

import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";
import YrService from "./services/yr.service";
import { Feature } from "./models/yr.model";
import moment from "moment";
import "moment/locale/nb";
import { until } from "lit/directives/until.js";
import MapsService from "./services/maps.service";
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
    .container {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 1rem;
    }
    .center::part(body) {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }
    .center::part(header) {
      font-size: 2rem;
      text-align: center;
    }
  `;

  firstUpdated() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => this.handlePosition(position),
        (error) => this.handleError(error)
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
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

  weatherToSlIcon(weather: string) {
    switch (weather) {
      case "clearsky_day":
      case "clearsky_night":
      case "clearsky_polartwilight":
        return "sun";

      case "fair_day":
      case "fair_night":
      case "fair_polartwilight":
      case "partlycloudy_day":
      case "partlycloudy_night":
      case "partlycloudy_polartwilight":
        return "cloud-sun";

      case "cloudy":
        return "cloud";

      case "rainshowers_day":
      case "rainshowers_night":
      case "rainshowers_polartwilight":
      case "lightrain":
      case "lightrainshowers_day":
      case "lightrainshowers_night":
      case "lightrainshowers_polartwilight":
      case "rain":
        return "cloud-drizzle";

      case "heavyrain":
      case "heavyrainshowers_day":
      case "heavyrainshowers_night":
      case "heavyrainshowers_polartwilight":
        return "cloud-rain-heavy";

      case "rainshowersandthunder_day":
      case "rainshowersandthunder_night":
      case "rainshowersandthunder_polartwilight":
      case "rainandthunder":
        return "cloud-lightning-rain";

      case "snow":
      case "snowshowers_day":
      case "snowshowers_night":
      case "snowshowers_polartwilight":
      case "lightsnow":
      case "lightsnowshowers_day":
      case "lightsnowshowers_night":
      case "lightsnowshowers_polartwilight":
        return "cloud-snow";

      case "fog":
        return "fog";

      case "sleet":
      case "lightsleet":
      case "heavysleet":
      case "sleetshowers_day":
      case "sleetshowers_night":
      case "sleetshowers_polartwilight":
        return "cloud-hail";

      case "snowandthunder":
      case "snowshowersandthunder_day":
      case "snowshowersandthunder_night":
      case "snowshowersandthunder_polartwilight":
        return "cloud-lightning-snow";

      default:
        console.log("No match for weather: " + weather);
        return "question"; // 'question' is a generic icon if there's no match.
    }
  }

  handleError(error: GeolocationPositionError) {
    console.error(error.code, error.message);

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
    return html`
      ${this.error ? html`<div class="error">${this.error}</div>` : ""}
      ${this.latitude && this.longitude && this.weatherData
        ? html`<div class="container">
            <sl-card class="center">
              <div slot="header" part="header">
                ${until(MapsService.getCityName(this.latitude, this.longitude))}
              </div>
              ${this.weatherData.properties.timeseries[0].data.instant.details
                .air_temperature}
              °C
              <sl-icon
                style="font-size: 5rem;"
                name="${this.weatherToSlIcon(
                  this.weatherData.properties.timeseries[0].data.next_12_hours
                    .summary.symbol_code
                )}"
              ></sl-icon>
            </sl-card>
            <sl-card>
              <sl-tree>
                ${this.weatherData.properties.timeseries.map((time) => {
                  return html`<sl-tree-item>
                    ${moment(time.time).fromNow()}:
                    <sl-tree-item>
                      ${time.data.instant.details.air_temperature}°C
                      <sl-icon
                        name="${this.weatherToSlIcon(
                          time.data.next_12_hours?.summary.symbol_code
                        )}"
                      ></sl-icon>
                    </sl-tree-item>
                  </sl-tree-item>`;
                })}
              </sl-tree>
            </sl-card>
          </div>`
        : `Kunne ikke laste inn værdata. Prøv igjen senere. this.latitude: ${this.latitude}, this.longitude: ${this.longitude}, this.weatherData: ${this.weatherData}. this.error: ${this.error}`}
    `;
  }
}
