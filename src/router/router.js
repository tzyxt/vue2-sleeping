import Home from "@/view/Home";
import Ear from "@/view/Ear";
import Asmr from "@/view/Asmr";
import Video from "@/view/Video";
import Hong from "@/view/Hong";
import Plot from "@/view/Plot";
import Hypnosis from "@/view/Hypnosis";
import Silent from "@/view/Silent";
import Chew from"@/view/Chew";
import Aloeveragel from "@/view/Aloeveragel";
import Scavenging from "@/view/Scavenging";
import Double from "@/view/Double";
import Heartbeat from "@/view/Heartbeat";
import Loly from "@/view/Loly";
import Lori from "@/view/Lori";
import Lodding from "@/view/Lodding";
import Playback from "@/components/Playback/index.vue"
export default [
  { name: "Home", path: "/home", component: Home },
  { path:'/', redirect:'/home'},
  { path:'/Lodding', component:Lodding},
  { path:"/home/lori", component:Lori},
  { name: 'Ear', path: "/ear", component: Ear },
  { name: "Asmr", path: "/asmr", component: Asmr },
  { name: "Video", path: "/video", component: Video},
  // { name: "Video", path: "/video", component: Video, meta: { auth: true }},
  {  name:"Videoback", path: "/video/:playid", component: Playback, meta: { auth: true } },
  { name: "Hong", path: "/hong", component: Hong},
  { name: "Plot", path: "/plot", component: Plot},
  { name: "Hypnosis", path: "/hypnosis", component: Hypnosis},
  { name: "Silent", path: "/silent", component: Silent},
  { name: "Chew", path: "/chew", component: Chew},
  { name: "Aloeveragel", path: "/aloeveragel", component: Aloeveragel},
  { name: "Scavenging", path: "/scavenging", component: Scavenging},
  { name: "Loly", path: "/loly", component: Loly},
  { name: "Double", path: "/double", component: Double},
  { name: "Heartbeat", path: "/heartbeat", component: Heartbeat},
];
