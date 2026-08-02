import axios from "axios";
import fs from "fs";

const API = "https://stremio-next.vercel.app/api/home";

const { data } = await axios.get(API);

function addIframe(list) {
  return list.map(item => ({
    ...item,
    iframe: `https://peachify.top/embed/${item.type}/${item.id}?accent=7c5cff&dub=Hindi&quality=1080`
  }));
}

data.data.spotlight = addIframe(data.data.spotlight);
data.data.trending = addIframe(data.data.trending);

fs.writeFileSync(
  "home.json",
  JSON.stringify(data, null, 2)
);

console.log("Updated home.json");
