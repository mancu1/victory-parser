import axios from "axios";
import queryString from "query-string";

export default async function (searchString: string) {
  const url: string = "https://xn---63-5cdesg4ei.xn--p1ai/catalog/search/";
  const queryUrl = queryString.stringifyUrl({
    url: url,
    query: { k: `"${searchString}"`, q: "60" },
  });
  console.log("url ", url);
  console.log("queryUrl ", queryUrl);

  return new Promise<string>((resolve, reject) => {
    axios
      .get(queryUrl)
      .then((res) => {
        resolve(res.data as string);
      })
      .catch((err) => {
        console.log("req ", err);
        reject(err);
      });
  });
}
