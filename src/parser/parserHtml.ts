import { parse } from "node-html-parser";
import fetchSearchPage from "../api/fetchSearchPage";
import HTMLElement from "node-html-parser/dist/nodes/html";
import { ProductType } from "./ProductType";

export default async function (searchString: string) {
  try {
    const searchRes = await fetchSearchPage(searchString);
    // console.log("searchRes", searchRes);
    const root = parse(searchRes) as HTMLElement & {
      valid: boolean;
    };
    root.removeChild(root.firstChild);
    const box = root.querySelector('[am-cards="normal"]');
    let arrDiv: ProductType[] = [];
    box.querySelectorAll("[am-card]").forEach((el) => {
      let item = (el as HTMLElement).querySelector("div");
      let productObject = {
        url: item.querySelector("a").rawAttributes["href"],
        title: item.querySelector("[am-item-bottom]").querySelector("a").text,
        img:
          "https://xn---63-5cdesg4ei.xn--p1ai" +
          item.querySelector("[src]").rawAttributes["src"],
        price: item
          .querySelector("[am-item-bottom]")
          .querySelector("[am-item-price-block]")
          .querySelector("span")
          .text.replace("a", "₽"),
      };
      arrDiv.push(productObject);
    });

    return arrDiv;
  } catch (e) {
    console.log("parse", e);
    return "";
  }
}
