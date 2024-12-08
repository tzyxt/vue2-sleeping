import Mock from "mockjs";

Mock.mock("/api/video", "get", {
    code: 0,
    msg: "",
    data: [
      {
        id: "1",
        midImg: require("./13345.jpg"),
        vidurl:require("./111.mp4"),
      
        title: "血火同源",
        idplay:"234234",
      },
      {
        id: "2",
        midImg:require("./13345.jpg"),
        vidurl:require("./222.mp4"),
        title: "凛冬将至",
        idplay:"234235",
      },
      {
        id: "3",
        midImg: require("./13345.jpg"),
        title: "听我怒吼",
        idplay:"234236",
    
      },
      {
        id: "4",
        midImg: require("./13345.jpg"),
        title: "听我怒吼",
        idplay:"234237",
      },
      {
        id: "5",
        midImg: require("./13345.jpg"),
        title: "听我怒吼",
        idplay:"234238",
      },
      {
        id: "6",
        midImg: require("./13345.jpg"),
        title: "听我怒吼",
        idplay:"234239",
      },
      {
        id: "7",
        midImg: require("./13345.jpg"),
        title: "听我怒吼",
        idplay:"2342310",
      },
      {
        id: "8",
        midImg: require("./13345.jpg"),
        title: "听我怒吼",
        idplay:"2342311",
      },
    ],
  });