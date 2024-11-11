<!-- 女朋友哄睡，小奴仆哄睡，御姐音哄睡，双人哄睡，3D哄睡 -->
<template>
  <div class="hongshui-container"> 
    <div class="synopsis-container">
      <div class="img-container">
        <img src="./13345.jpg" />
      </div>
      <div class="hongshui-title">
        <p>
          1. 女朋友哄睡，小奴仆哄睡，御姐音哄睡，双人哄睡，3D哄睡
        </p>
      </div>
    </div>
    <Musick :list="data.rows"  v-loading="isLoading"  @datamusick="datalist"/>
  </div>
</template>

<script>
import Musick from "@/components/Musick/index.vue";
import fetchData from "@/mixins/fetchData.js";
import { getHongshui } from "@/api/hongshui.js";
export default {
  mixins: [fetchData({ total: 0, rows: [] })],
  components:{
    Musick,
  },
  data() {
    return {
      page: 1,
      limit: 10,
    };
  },
  created() {
    this.$bus.$on("mainScroll", this.handleScroll);
  },
  destroyed() {
    this.$bus.$off("mainScroll", this.handleScroll);
  },
  computed: {
    hasMore() {
      return this.data.rows.length < this.data.total;
    },
  },
  methods: {
    handleScroll(dom) {
      if (this.isLoading || !dom) {
        // 目前正在加载更多
        return;
      }
      const range = 100; // 顶一个可接受的范围，在这个范围内都算达到了底部
      const dec = Math.abs(dom.scrollTop + dom.clientHeight - dom.scrollHeight);
      if (dec <= range) {
        this.loadMore();
      }
    },
    // 歌曲列表
    datalist(e){
      this.$emit("songlist", e);
    },
    async fetchData() {
      return await getHongshui( this.page, this.limit);
    },
    // 下滑加载
    async loadMore() {
      if (!this.hasMore) {
        // 没有更多啦
        return;
      }
      this.isLoading = true;
      this.page++;
      const resp = await this.fetchData();
      this.data.total = resp.total;
      this.data.rows = this.data.rows.concat(resp.rows);
      this.isLoading = false;
    },
}
}
</script>

<style lang="less" scoped>
.hongshui-container {
  height: 100%;
  margin: 0 auto;

  min-width: 857px;
  max-width: 1300px;

}

.hongshui-title{
  position:absolute;
  top: 30%;
  right:70%;
  transform: translate(50%,-50%);
  
}



.synopsis-container {
  width: 1300px;
  height: 200px;
  position: relative;
  border-bottom:1px solid black ;

}

.img-container {
  top: 10%;
  left: 20px;
  position: absolute;
}

img {
  width: 150px;
  height: 150px;
}

// li动态设置
.hongshui {
  width: 100%;
  height: 100%;
  color:black;
  opacity: 0.5;
  margin-top: 15px;
}

</style>