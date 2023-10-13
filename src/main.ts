import { setBasePath } from "@shoelace-style/shoelace";
import "./dashboard.ts";
import "./geolocation.ts";

// This path should lead to your node_modules folder or where the Shoelace assets are located.
setBasePath("/node_modules/@shoelace-style/shoelace/dist/");
console.log(import.meta.env);
