<template>
    <img :src="src" :style="{
        width: size + 'px',
        height: size + 'px',
    }" class="avatar-container">
</template>

<script>
export default {
    // 获取父组件传递得图片地址和大小
    props: {
        src: {
            type: String,
            required: true,
        },
        size:{
            type: Number,
            default: 50,
        }
    },
}
</script>

<style scoped>
.avatar-container{
    border-radius: 50%;
    display: block;
    object-fit: cover;
}
</style>