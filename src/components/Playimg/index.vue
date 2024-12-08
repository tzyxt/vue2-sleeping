<template>
    <div class="palyimg-container">
        <div class="video-container-parcel" >
            <div class="video-container-all" v-for="item in palydata" :key="item.id">
                <div class="video-bofang" @click="handleclick">
                    <Icon type="start" :data-name="item.id" />
                </div>
                <router-link :to="{
                    name:'Videoback',
                    params:{
                        playid:item.id,
                    }
                }">
                    <div class="video-img" @click="handleclick">
                    <img :src="item.midImg" class="video-img-style" :data-name="item.id">
                </div>
                </router-link>
                <div class="video-tetle">
                <span class="video-tetle-span">{{ item.title }}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

import Icon from "@/components/Icon/index.vue";
import Playback from"@/components/Playback/index.vue"
export default {
    components: {
        Icon,
        Playback,
    },
    props: {
        palydata: {
            type: Array,
            default: () => [],
        }
    },
    data() {
        return {
            id: 0,
            src:'',
            imgurl:'',
        }
    },
    methods: {
        handleclick(e) {
            // 获取点击的第几个数组id 拿到视频的id和地址
            const playvideo = e.target.dataset.name - 1;
            this.id = this.palydata[playvideo].play;
            this.src = this.palydata[playvideo].vidurl;
            this.imgurl = this.palydata[playvideo].midImg;
        },
    },

}
</script>

<style lang="less" scoped>
.palyimg-container {
    height: 100%;
    width: 100%;
}

.video-span {
    height: 100px;
    display: flex;
    align-items: center;
    font-size: 20px;
    font-weight: bold;

}

.video-container-parcel {
    display: flex;
    flex-wrap: wrap;
    min-width: 1600px;
}

.video-bofang {
    position: absolute;
    top: 50%;
    left: 50%;
    z-index: 13;
    font-size: 40px;
    transition: all 0.3s;
    transform: translate(-50%, -50%) scale(0);
}

.video-container-all {
    position: relative;
    margin-bottom: 40px;
    margin-left: 60px;
    flex: none;
    border-radius: 8px;
    min-width: 216px;
    width: 230px;
}

.video-container-all:hover {
    .video-bofang {
        transform: translate(-50%, -50%) scale(1);
    }
}

.video-img {
    width: 230px;
    height: 160px;
    min-width: 216px;
    min-height: 121.5px;
    position: relative;
    display: flex;
    border-radius: 8px 8px 0 0;
    overflow: hidden;
    z-index: 12;
}

.video-href {
    width: 100%;
    height: 100%;
}

.video-img-style {
    height: 100%;
    width: 100%;
}

.video-tetle {
    width: 230px;
    height: 22px;
}

.video-tetle-span {
    margin-top: 8px;
    font-size: 16px;
    color: black;
    letter-spacing: 0px;
    line-height: 22px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: block;
}
</style>