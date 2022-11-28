import { Model as BaseModel } from "vue-api-query";

export default class Model extends BaseModel {
  baseURL() {
    // return "http://localhost:3000";
    return "https://p1k75s.sse.codesandbox.io";
  }

  request(config) {
    return this.$http.request(config);
  }
}