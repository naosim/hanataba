import { お客様Api } from "../api/お客様Api.mjs";

const _お客様Api = new お客様Api();
await _お客様Api.load();

document.querySelector("#signupButton")?.addEventListener("click", async () => {
  console.log("click");
  /** @type {string} */
  const id = document.querySelector("#signupId")?.value?.trim();
  const name = document.querySelector("#name")?.value?.trim();
  if(id.length == 0 || name.length == 0) {
    alert("お客様ID と お客様氏名 を入力してください");
    throw new Error("お客様IDとお客様氏名を入力してください");
  }
  _お客様Api.入会する(id, name);
})

document.querySelector("#loginButton")?.addEventListener("click", async () => {
  console.log("click");
  const id = document.querySelector("#userId")?.value?.trim();
  if(id.length == 0) {
    alert("お客様ID を入力してください");
    throw new Error("お客様IDを入力してください");
  }
  _お客様Api.ログインする(id);
})