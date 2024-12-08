export default function(){
return{
    created() {
        this.$bus.$on("mainScroll", this.handleScroll);
      },
      destroyed() {
        this.$bus.$off("mainScroll", this.handleScroll);
      },
      
}
}