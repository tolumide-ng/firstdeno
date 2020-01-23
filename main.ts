import { readJson } from "https://deno.land/std/fs/mod.ts";
import { Application, Router } from "https://deno.land/x/oak/mod.ts";

const router = new Router();

router
  .get("/", context => {
    context.response.body = "Hello World";
  })
  .get("/data", async  context => {
    const data = await readJson("./data.json");

    context.response.body = data;
  })
  .get("/poke", async context => {
    const res = await fetch("https://pokeapi.co/api/v2/pokemon/ditto/");
    const result = await res.json();
    context.response.body = JSON.stringify(result);
  });

const app = new Application();
app.use(router.routes());
app.use(router.allowedMethods());

app.listen("localhost:8000");
