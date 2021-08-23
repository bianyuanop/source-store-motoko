import { store } from "../../declarations/store";

document.getElementById("clickMeBtn").addEventListener("click", async () => {
  const name = document.getElementById("name").value.toString();
  // Interact with store actor, calling the greet method
  const greeting = await store.greet(name);

  document.getElementById("greeting").innerText = greeting;
});
