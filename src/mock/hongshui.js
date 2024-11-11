
import Mock from'mockjs';
import qs from "querystring";
Mock.mock(/^\/api\/hongshui\/?(\?.+)?$/, "get", function(options) {
  const query = qs.parse(options.url);

  return Mock.mock({
    code: 0,
    msg: "",
    data: {
      "total|20-50": 0,
      // [`rows|${query.limit || 10}`]: [
      //   {
      //     "id": "@guid",
      //     "mp3Url|1":[require("./轨迹.mp3"),require("./在你的身边.mp3")],
      //     midImg:require("./13345.jpg"),
      //     title: "在你的身边",
      //     artist:"张碧晨",
      //     time:"03:50",
      //   },
      // ],
      rows:[
        {
          id: 1,
          mp3Url:require("./轨迹.mp3"),
          midImg:require("./13345.jpg"),
          title: "在你的身边",
          artist:"张碧晨",
          time:"03:50",
        },
        {
          id: 2,
          mp3Url:require("./在你的身边.mp3"),
          midImg:require("./13345.jpg"),
          title: "在你的身边",
          artist:"张碧晨",
          time:"03:50",
        }
      ]
    },
  });
});

