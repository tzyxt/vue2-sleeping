<template>
  <div>
    <!--搜索栏-->
    <el-input v-model="key" placeholder="请输入歌曲/歌手名" style="width: 40%" @keyup.enter.native="getmusic" clearable></el-input>
    <el-button type="primary" v-on:click="getmusic()">
      <i class="el-icon-search"></i>
      搜索</el-button>
    <!--歌曲列表-->
    <p>共<span style="color: #ffd04b">{{tableData.total}}</span>条数据</p>
    <el-table :data="tableData.list"
              :key="userinformationkey"
              :header-cell-style="{background:'#eaeaea'}" stripe
              v-loading="isloading"
    >
      <el-table-column prop="pic" label="图片" width="80px">
        <template slot-scope="scope">
          <el-image v-if="scope.row.pic !== '' && scope.row.pic !== null"
                    :src="scope.row.pic"
                    style="width: 50px;height: 50px;"></el-image>
          <el-image v-else
                    :src="require('../../assets/image/music.jpg')"
                    style="width: 50px;height: 50px;"></el-image>
        </template>
      </el-table-column>
      <el-table-column prop="name" label="歌曲名">
        <template slot-scope="scope">
          <div>
            <h3>{{scope.row.name}}</h3>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="artist" label="歌手">
      </el-table-column>
      <el-table-column prop="play" label="播放" width="100px">
        <template slot-scope="scope">
          <div class="list_btn" >
            <i ref="list_btn" class="el-icon-video-play" v-on:click="addplay(scope.row)"></i>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="rid" label="下载" width="100px">
        <template slot-scope="scope">
          <div class="list_btn" >
            <i class="el-icon-download" v-on:click="download(scope.row)"></i>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <!--页码-->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[10, 20, 50, 100]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      background
      style="margin-top: 10px"
      :total="tableData.total">
    </el-pagination>
    <!--音乐播放器-->
    <audio :src="nowmusic.link" ref="audio"
           @timeupdate="updateProgress"
           @ended="end"
           @loadedmetadata="loadedmetadata"
           @play="audioPlay(true)"
           @pause="audioPlay(false)"
           :autoplay="isauto"
           controls
           style="display: none"
           preload="metadata">
      您的浏览器不支持音频播放
    </audio>
    <!--自定义样式【电脑端】-->
    <div class="audioBox" v-show="JSON.stringify(nowmusic) !== '{}' & isMobile === false">
      <!--歌曲信息-->
      <div style="display: flex">
        <div style="margin-top: 20px">
          <el-image :src="nowmusic.pic" style="width: 60px;height: 60px;"></el-image>
        </div>
        <div class="audioInfo">
          <h3>{{transName(nowmusic.name)}}</h3>
          <p>{{transName(nowmusic.artist)}}</p>
        </div>
      </div>
      <!--歌曲中间控件-->
      <div class="audio_contetnt">
        <div class="music_time">
          <div class="opentime">
            <span>{{ this.transTime(current) }}</span>
          </div>
            <el-slider
              @change="progressChange"
              :format-tooltip="realFormatSecond"
              v-model="current"
              style="display: inline-block;width: 70%;height: 25px;"
              :max="duration">
            </el-slider>
          <div class="endtime">
            <span>{{ this.transTime(duration) }}</span>
          </div>
        </div>
        <div class="btn_play">
          <i class="el-icon-arrow-left" @click="switchmusic('up')"/>
          <i ref="control" v-if="!isPlay" alt="" @click="audioPlay(true)"
             class="el-icon-video-play" />
          <i ref="control" v-else alt="" @click="audioPlay(false)"
             class="el-icon-video-pause" />
          <i class="el-icon-arrow-right" @click="switchmusic('down')"/>
        </div>
      </div>
      <!--歌曲右侧控件-->
      <div class="btn_list">
        <i class="el-icon-tickets"/>
      </div>
    </div>
    <!--自定义样式【手机端】-->
    <div class="audioBox_mobile" v-show="JSON.stringify(nowmusic) !== '{}' & isMobile === true">
      <!--时间线-->
      <div class="music_time_mobile">
        <div class="opentime">
          <span>{{ this.transTime(current) }}</span>
        </div>
        <el-slider
          @change="progressChange"
          :format-tooltip="realFormatSecond"
          v-model="current"
          style="display: inline-block;width: 40%;height: 25px;"
          :max="duration">
        </el-slider>
        <div class="endtime">
          <span>{{ this.transTime(duration) }}</span>
        </div>
      </div>
      <!--按钮及歌曲信息-->
      <div class="audioBox_mobile_title">
        <!--歌曲信息-->
        <div style="display: flex">
          <div>
            <el-image :src="nowmusic.pic" style="width: 50px;height: 50px;"></el-image>
          </div>
          <div class="audioInfo_mobile">
            <h3>{{transName(nowmusic.name)}}</h3>
          </div>
        </div>
        <!--歌曲中间控件-->
        <div>
          <div class="btn_play_mobile">
            <i class="el-icon-arrow-left" @click="switchmusic('up')"/>
            <i ref="control" v-if="!isPlay" alt="" @click="audioPlay(true)"
               class="el-icon-video-play" />
            <i ref="control" v-else alt="" @click="audioPlay(false)"
               class="el-icon-video-pause" />
            <i class="el-icon-arrow-right" @click="switchmusic('down')"/>
          </div>
        </div>
        <!--歌曲右侧控件-->
        <div class="btn_list_mobile">
          <i class="el-icon-tickets"/>
        </div>
      </div>
    </div>
    <div class="foot">
      <p>音频版权来自各网站，本站只提供数据查询服务，仅供交流学习，不提供任何音频存储和贩卖服务</p>
      <p>如有侵权，请联系本人予以删除！</p>
    </div>
  </div>
</template>
 
<script>
export default {
  data () {
    return {
      // 搜索参数
      key: '',
      currentPage: 1,
      pageSize: 10,
      // 加载开启
      isloading: false,
      // table的key
      userinformationkey: '',
      // 展示alluser数据
      tableData: {},
      // 播放列表
      musiclist: [],
      // 当前播放歌曲
      nowmusic: {},
      // 当前播放任务
      audio: null,
      contorl: null,
      // 当前播放时刻
      current: 0,
      // 播放总时长
      duration: 0,
      // 是否正在播放
      isPlay: false,
      // 是否自动播放
      isauto: false,
      // 当前进度条位置
      cacheCurrent: 0,
      // 判断是否为移动手机
      isMobile: false
    }
  },
  created () {
    // 判断是否是手机端
    if (this._isMobile()) {
      this.isMobile = true
    }
    this.init()
  },
  mounted () {
    this.audio = this.$refs.audio
    this.contorl = this.$refs.contorl
  },
  methods: {
    init () {
      let now = {}
      let type = 'convert_url3'
 
      // 初始化播放列表
      if (localStorage.getItem('musiclist') !== null) {
        this.musiclist = JSON.parse(localStorage.getItem('musiclist'))
      }
      // 初始化当前歌曲，但还需要获取歌曲链接
      if (localStorage.getItem('nowmusic') !== null) {
        now = JSON.parse(localStorage.getItem('nowmusic'))
      }
      // 判断有无当前播放歌曲，是否需要获取播放链接
      if (now !== null & now !== '') {
        // 初始化当前播放音乐链接
        this.$api.getmusiclink(now.rid, type)
          .then(res => {
            if (res.data.code === 200) {
              let link = res.data.data
              now.link = ''
              now.link = link
              this.nowmusic = now
            }
          })
      }
    },
    // 判断是否是手机端，如果是，返回true
    _isMobile () {
      let flag = navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)
      return flag
    },
    // 获取音乐列表
    getmusic () {
      // 清除空格
      let key = this.key.replace(/\s*/g, '')
      // 判断是否输入了key
      if (key === '') {
        this.$message.error('请输入歌曲/歌手名')
      } else {
        this.isloading = true
        // 执行搜索
        this.$api.getmusiclist(key, this.currentPage, this.pageSize)
          .then(res => {
            this.isloading = false
            if (res.data.code === 200) {
              this.tableData = res.data.data
              this.tableData.total = parseInt(this.tableData.total)
              this.userinformationkey = res.data.data.total
            }
          })
          .catch(error => { // 请求失败处理
            console.log(error)
          })
      }
    },
    // 播放音乐
    addplay (row) {
      let type = 'convert_url3'
      // 判断是否存在正在播放的歌曲，如有则需要比对是否为同一首歌，如是直接暂停，如否则正常添加播放列表
      if (JSON.stringify(this.nowmusic) !== '{}' ? this.nowmusic.rid === row.rid : false) {
        this.audioPlay(!this.isPlay)
      } else {
        // 是否在播放列表中
        let isinlist = false
        // 在播放列表的序号，0开始
        let n = 0
        // 判断是否在列表中
        for (let i = 0; i < this.musiclist.length; i++) {
          if (this.musiclist[i].rid === row.rid) {
            isinlist = true
            n = i
            break
          }
        }
        // 判断当前播放列表是否存在该歌曲
        if (isinlist === true) {
          // 获取音乐链接
          this.$api.getmusiclink(row.rid, type)
            .then(res => {
              if (res.data.code === 200) {
                let link = res.data.data
                // 跟新当前播放音乐
                this.nowmusic = row
                this.nowmusic.id = ''
                this.nowmusic.id = n
                localStorage.setItem('nowmusic', JSON.stringify(this.nowmusic))
                this.nowmusic.link = ''
                this.nowmusic.link = link
                this.audioPlay(false)
                this.audioPlay(true)
              }
            })
        } else {
          // 获取音乐链接
          this.$api.getmusiclink(row.rid, type)
            .then(res => {
              if (res.data.code === 200) {
                let link = res.data.data
                // 添加到播放列表
                this.musiclist.push(row)
                localStorage.setItem('musiclist', JSON.stringify(this.musiclist))
                // 跟新当前播放音乐
                this.nowmusic = row
                this.nowmusic.id = ''
                this.nowmusic.id = this.musiclist.length - 1
                localStorage.setItem('nowmusic', JSON.stringify(this.nowmusic))
                this.nowmusic.link = ''
                this.nowmusic.link = link
                this.audioPlay(false)
                this.audioPlay(true)
              }
            })
        }
      }
    },
    // 下载音乐
    download (row) {
      let type = 'convert_url3'
      // 获取音乐链接
      this.$api.getmusiclink(row.rid, type)
        .then(res => {
          if (res.data.code === 200) {
            let link = res.data.data
            // 在新窗口打开链接
            window.open(link, '_blank')
          }
        })
    },
    // @size-change页码展示数量点击事件
    handleSizeChange (val) {
      // 更新每页展示数据size
      this.pageSize = val
      this.getmusic()
    },
    // @current-change页码点击事件
    handleCurrentChange (val) {
      // 更新当前页数是第几页
      this.currentPage = val
      this.getmusic()
    },
    // 音频时间格式化显示
    transTime (value) {
      let that = this
      var time = ''
      var h = parseInt(`${value / 3600}`)
      value %= 3600
      var m = parseInt(`${value / 60}`)
      var s = parseInt(`${value % 60}`)
      if (h > 0) {
        time = that.formatTime(h + ':' + m + ':' + s)
      } else {
        time = that.formatTime(m + ':' + s)
      }
      return time
    },
    // 歌曲歌手名长度处理
    transName (name) {
      if (name !== undefined) {
        if (name.length > 12) {
          name = name.substring(0, 11) + '...'
        }
      }
      return name
    },
    // 补零
    formatTime (value) {
      var time = ''
      var s = value.split(':')
      var i = 0
      for (; i < s.length - 1; i++) {
        time += s[i].length === 1 ? '0' + s[i] : s[i]
        time += ':'
      }
      time += s[i].length === 1 ? '0' + s[i] : s[i]
 
      return time
    },
    // 音频播放暂停
    audioPlay (status) {
      if (status) {
        this.audio.play()
        this.isauto = true
      } else {
        this.audio.pause()
      }
      this.isPlay = status
    },
    // 切歌
    switchmusic (key) {
      let type = 'convert_url3'
      // 上一首
      if (key === 'up') {
        let newid = this.nowmusic.id - 1
        // 判断是否是第一首，如果不是，正常播放上一首，如果是，循环播放倒数第一首
        if (newid > -1) {
          let now = this.musiclist[newid]
          now.id = newid
          // 获取音乐链接
          this.$api.getmusiclink(now.rid, type)
            .then(res => {
              if (res.data.code === 200) {
                let link = res.data.data
                localStorage.setItem('nowmusic', JSON.stringify(now))
                this.isauto = true
                now.link = ''
                now.link = link
                this.nowmusic = now
              }
            })
        } else {
          let now = this.musiclist[this.musiclist.length - 1]
          now.id = this.musiclist.length - 1
          // 获取音乐链接
          this.$api.getmusiclink(now.rid, type)
            .then(res => {
              if (res.data.code === 200) {
                let link = res.data.data
                localStorage.setItem('nowmusic', JSON.stringify(now))
                this.isauto = true
                now.link = ''
                now.link = link
                this.nowmusic = now
              }
            })
        }
      } else {
        // 下一首
        let newid = this.nowmusic.id + 1
        // 判断是否是最后一首，如果不是，则正常播放下一首，如果是，则循环播放第一首
        if (newid + 1 <= this.musiclist.length) {
          let now = this.musiclist[newid]
          now.id = newid
          // 获取音乐链接
          this.$api.getmusiclink(now.rid, type)
            .then(res => {
              if (res.data.code === 200) {
                let link = res.data.data
                localStorage.setItem('nowmusic', JSON.stringify(now))
                this.isauto = true
                now.link = ''
                now.link = link
                this.nowmusic = now
              }
            })
        } else {
          let now = this.musiclist[0]
          now.id = 0
          // 获取音乐链接
          this.$api.getmusiclink(now.rid, type)
            .then(res => {
              if (res.data.code === 200) {
                let link = res.data.data
                localStorage.setItem('nowmusic', JSON.stringify(now))
                this.isauto = true
                now.link = ''
                now.link = link
                this.nowmusic = now
              }
            })
        }
      }
    },
    // 更新进度条与当前播放时间
    updateProgress (e) {
      this.current = e.target.currentTime
    },
    // 拖动进度滚动条
    progressChange () {
      this.$refs.audio.currentTime = this.cacheCurrent
      this.current = this.cacheCurrent
    },
    // 实时返回当前进度位置
    realFormatSecond (second) {
      this.cacheCurrent = second
      return this.transTime(second)
    },
    // 音频结束
    end (e) {
      this.isPlay = false
      this.switchmusic('down')
    },
    // 获取音频总时长
    loadedmetadata (e) {
      this.duration = e.target.duration
    }
  }
}
</script>
 
<style scoped>
.list_btn{
  font-size: 40px;
}
/*电脑版*/
.audioBox {
  padding: 8px 16px;
  backdrop-filter: blur(10px);
  background-color: rgba(193, 190, 190, 0.5);
  display: flex;
  position: fixed;
  bottom: 0;
  align-items: center;
  justify-content: space-between;
  width: 87%;
  height: 100px;
  box-sizing: border-box;
}
.audioInfo{
  margin-left: 30px;
}
.audio_contetnt{
  width: 70%;
}
.music_time{
  text-align: center;
  margin-top: 10px;
  width: 100%;
}
.btn_play {
  font-size: 40px;
  text-align: center;
}
.btn_list {
  font-size: 40px;
}
.opentime{
  height: 20px;
  margin-right: 10px;
  display: inline-block;
}
.endtime{
  height: 20px;
  margin-left: 10px;
  display: inline-block;
}
.foot{
  color: #6b6b6c;
  margin-top: 50px;
}
/*手机版*/
.audioBox_mobile {
  padding: 8px 16px;
  backdrop-filter: blur(10px);
  background-color: rgba(193, 190, 190, 0.5);
  position: fixed;
  bottom: 0;
  align-items: center;
  width: 80%;
  height: 100px;
  box-sizing: border-box;
}
.audioBox_mobile_title{
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  width: auto;
}
.audioInfo_mobile{
  margin-left: 10px;
  font-size: 1px;
  line-height: 50px;
}
.music_time_mobile{
  text-align: center;
  height: 20px;
}
.btn_play_mobile {
  font-size: 40px;
  text-align: center;
  width: 150px;
}
.btn_list_mobile {
  font-size: 30px;
  line-height: 50px;
}
</style>