<template>
  <div id="calendar-select">
    <ul class="calendar-select-box">
      <li class="calendar-select-calendar">
        <span class="calendar-select-title">弹窗类的日期选择器</span>
        <!-- 日期选择器3 -->
        <input type="text" @click="openByDrop($event)" v-model="calendar3.display" readonly>
        <!-- 弹窗 -->
        <div class="calendar-select-calendar3" :style="{'left':calendar3.left+'px','top':calendar3.top+'px'}" v-if="calendar3.isShow">
          <vue-calendar :zero="calendar3.zero" :lunar="calendar3.lunar" :value="calendar3.value" :begin="calendar3.begin"
            :end="calendar3.end" @select="calendar3.select"></vue-calendar>
        </div>
        <!-- 日期选择器5 -->
        <input type="text" @click="openMultiByDrop($event)" v-model="calendar5.display" readonly>
        <div class="calendar-select-calendar3" :style="{'left':calendar5.left+'px','top':calendar5.top+'px'}" v-if="calendar5.isShow5">
          <vue-calendar :zero="calendar5.zero" :disabled="calendar5.disabled" :lunar="calendar5.lunar" :value="calendar5.value"
            :multi="calendar5.multi" @select="calendar5.select"></vue-calendar>
        </div>
        <!-- 日期选择器4 -->
        <input type="text" @click="openByDialog($event)" :value="calendar4.display" readonly>
        <div class="calendar-select-calendar3" v-if="calendar4.show"  :style="{'left':calendar4.left+'px','top':calendar4.top+'px'}">
          <div class="calendar-dialog-mask" @click="closeByDialog"></div>
          <div class="calendar-dialog-body">
          	<vue-calendar :range="calendar4.range" :zero="calendar4.zero" :lunar="calendar4.lunar" :value="calendar4.value"
          	 @select="calendar4.select"></vue-calendar>
          </div>
        </div>
      </li>
      <!-- 日期选择器1 -->
      <li class="calendar-select-calendar">
        <span class="calendar-select-title">单选/返回选择的值/事件</span>
        <vue-calendar ref="calendar1" :events="calendar1.events" :lunar="calendar1.lunar" :value="calendar1.value"
          :begin="calendar1.begin" :end="calendar1.end" :weeks="calendar1.weeks" :months="calendar1.months" @select="calendar1.select"
          @selectMonth="calendar1.selectMonth" @selectYear="calendar1.selectYear">
        </vue-calendar>
        <div class="calendar-select-btn">
          <button @click="changeEvents">异步更新Price</button>
          <!-- <button @click="calendar1.value=[2018,1,Math.floor(Math.random()*30+1)]">动态设置日期</button> -->
          <button @click="$refs.calendar1.setToday()">返回今天</button>
        </div>
      </li>
      <!-- 日期选择器2 -->
      <li class="calendar-select-calendar">
        <span class="calendar-select-title">选择日期范围/农历</span>
        <vue-calendar :range="calendar2.range" :lunar="calendar2.lunar" :value="calendar2.value" :begin="calendar2.begin"
          :end="calendar2.end" @select="calendar2.select"></vue-calendar>
      </li>
    </ul>
  </div>
</template>

<script>
  // import calendar from './calendar.vue'

  export default {
    name: 'calendarSelect',
    components: {
      // calendar
    },
    data() {
      return {
        // 日期选择表1
        calendar1: {
          value: [2019, 1, 1], //默认日期
          // lunar:true, //显示农历
          weeks: ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'],
          months: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月',
            '十月', '十一月', '十二月'
          ],
          events: {
            '2017-7-7': '$408',
            '2017-7-20': '$408',
            '2017-7-21': '$460',
            '2017-7-22': '$500',
          },
          select(value) { //选择日期
            console.log(value.toString());
          },
          selectMonth(month, year) { //选择月份
            console.log(year, month)
          },
          selectYear(year) { //选择年份
            console.log(year)
          },
          timestamp: Date.now()
        },
        // 日期选择2-日期范围
        calendar2: {
          range: true,
          value: [
            [2017, 12, 1],
            [2019, 2, 16]
          ], //默认日期
          lunar: true, //显示农历
          begin: [2017, 2, 16], //可选开始日期
          end: [2019, 2, 16], //可选结束日期
          select(begin, end) {
            // console.log(begin.toString(),end.toString());
          }
        },
        calendar3: {
          display: "2018/02/16",
          isShow: false,
          zero: true,
          value: [2018, 2, 16], //默认日期
          lunar: true, //显示农历
          select: (value) => {
            this.calendar3.isShow = false;
            this.calendar3.value = value;
            this.calendar3.display = value.join("/");
          }
        },
        calendar4: {
          display: "2018/02/16 ~ 2019/02/16",
          show: false,
          range: true,
          zero: true,
          value: [
            [2018, 2, 16],
            [2019, 2, 16]
          ], //默认日期
          lunar: true, //显示农历
          select: (begin, end) => {
            console.log(begin, end)
            this.calendar4.show = false;
            this.calendar4.value = [begin, end];
            this.calendar4.display = begin.join("/") + " ~ " + end.join("/");
          }
        },
        // 多选
        calendar5: {
          display: "2017/11/2,2017/12/2",
          multi: true,
          isShow5: false,
          zero: true,
          value: [
            [2017, 11, 1],
            [2017, 11, 2]
          ], //默认日期
          disabled: [
            [2017, 12, 24],
            [2017, 12, 25]
          ], //默认日期
          lunar: true, //显示农历
          select: (value) => {

            let displayValue = []
            value.forEach(v => {
              displayValue.push(v[0] + "/" + (v[1]) + "/" + v[2])
            })
            console.log(displayValue);
            this.calendar5.display = displayValue.join(",");
            // this.calendar5.show=false;
            this.calendar5.value = value;

          }
        }
      }
    },
    methods: {
      // 日期选择1事件
      changeEvents() {
        this.calendar1.events = {
          '2017-7-20': '$' + (Math.random() * 1000 >> 0),
          '2017-7-21': '$' + (Math.random() * 1000 >> 0),
          '2017-7-22': '$' + (Math.random() * 1000 >> 0),
        }
      },
      // 日期选择器3事件
      openByDrop(e) {
        this.calendar3.isShow = true;
        this.calendar3.left = e.target.offsetLeft + 0;
        this.calendar3.top = e.target.offsetTop + 54;
        e.stopPropagation();
        window.setTimeout(() => {
          document.addEventListener("click", (e) => {
            this.calendar3.isShow = false;
            document.removeEventListener("click", () => {}, false);
          }, false);
        }, 1000)
      },
      openByDialog(e) {
        this.calendar4.show = true;
        this.calendar4.left = e.target.offsetLeft + 0;
        this.calendar4.top = e.target.offsetTop + 54;
      },
      closeByDialog() {
        this.calendar4.show = false;
      },
      // 日期选择5
      openMultiByDrop(e) {
        this.calendar5.isShow5 = true;
        this.calendar5.left = e.target.offsetLeft + 0;
        this.calendar5.top = e.target.offsetTop + 54;
        e.stopPropagation();
        window.setTimeout(() => {
          document.addEventListener("click", (e) => {
            this.calendar5.isShow5 = false;
            document.removeEventListener("click", () => {}, false);
          }, false);
        }, 1000)
      },
    }
  }
</script>

<style>
  #calendar-select {
    width: 100%;
    padding: 32px 12px;
  }

  /*demo*/
  .calendar-select-box {
    box-sizing: border-box;

    display: -webkit-box;
    -webkit-box-pack: start;
    -webkit-box-align: start;

    display: -webkit-flex;
    -webkit-justify-content: space-between;
    -webkit-align-items: top;

    display: flex;
    justify-content: space-between;
    align-items: top;
    flex-flow: row wrap
  }

  .calendar-select-calendar {
    width: 30%;
    float: left;
    padding: 20px;
    min-width: 300px;
    border: 1px solid #eee;
    box-sizing: border-box;
    border-radius: 2px;
    position: relative;
  }

  .calendar-select-title {
    float: left;
    text-align: center;
    border-radius: 4px;
    width: 100%;
    padding: 8px 10px;
    font-family: "PingFang SC", "Hiragino Sans GB", "STHeiti", "Microsoft YaHei", "WenQuanYi Micro Hei", sans-serif;
    font-size: 14px;
    border-radius: 0 0 2px 0;
    background: rgb(126, 192, 238);
    color: #fff;
    margin-bottom: 32px;
  }

  .calendar-select-calendar>input {
    cursor: pointer;
    box-sizing: border-box;
    width: 100%;
    margin-top: 20px;
    border-radius: 2px;
    border: 1px solid #dedede;
    padding: 10px;
    font-size: 16px;
    background: url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAxNiAxNiIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIj48ZGVmcz48c3R5bGUgdHlwZT0idGV4dC9jc3MiPjwhW0NEQVRBWwpAZm9udC1mYWNlIHsgZm9udC1mYW1pbHk6IGlmb250OyBzcmM6IHVybCgiLy9hdC5hbGljZG4uY29tL3QvZm9udF8xNDQyMzczODk2XzQ3NTQ0NTUuZW90PyNpZWZpeCIpIGZvcm1hdCgiZW1iZWRkZWQtb3BlbnR5cGUiKSwgdXJsKCIvL2F0LmFsaWNkbi5jb20vdC9mb250XzE0NDIzNzM4OTZfNDc1NDQ1NS53b2ZmIikgZm9ybWF0KCJ3b2ZmIiksIHVybCgiLy9hdC5hbGljZG4uY29tL3QvZm9udF8xNDQyMzczODk2XzQ3NTQ0NTUudHRmIikgZm9ybWF0KCJ0cnVldHlwZSIpLCB1cmwoIi8vYXQuYWxpY2RuLmNvbS90L2ZvbnRfMTQ0MjM3Mzg5Nl80NzU0NDU1LnN2ZyNpZm9udCIpIGZvcm1hdCgic3ZnIik7IH0KCl1dPjwvc3R5bGU+PC9kZWZzPjxnIGNsYXNzPSJ0cmFuc2Zvcm0tZ3JvdXAiPjxnIHRyYW5zZm9ybT0ic2NhbGUoMC4wMTU2MjUsIDAuMDE1NjI1KSI+PHBhdGggZD0iTTcxMS4zMDYyIDI5MC42OTcyYzI0LjI4MjEgMCA0NS4zNzY1LTE5LjcwNjkgNDUuMzc2NS00NC4wMzJWNDYuNTYwMjU1OTk5OTk5OTk1YzAtMjQuMzI1MS0yMS4wOTU0LTQ0LjA1MzUtNDUuMzc2NS00NC4wNTM1LTI0LjMwMjYgMC00My45ODggMTkuNzI4NC00My45ODggNDQuMDUzNXYyMDAuMTA0OTZDNjY3LjMxODMgMjcwLjk5MDMgNjg3LjAwMzYgMjkwLjY5NzIgNzExLjMwNjIgMjkwLjY5NzJ6TTYyMy40ODA4IDExMy40MjAzSDQwMC43NjQ5Mjh2NjYuNTEzOTJoMjIyLjcxNTkwNDAwMDAwMDAyVjExMy40MjAyODh6TTg4NC4wNTMgMTEzLjQyMDNoLTgyLjc3NDAxNnY2Ni4xNDUyOGg4NS45NDAyMjRjMjUuMjc4NSAwIDQ2LjYxMTUgMjEuMzc2IDQ2LjYxMTUgNDYuNjc3djE1My45Mjc2OEg5MC40Mzg2NTYwMDAwMDAwMXYtMTUzLjkyNzY4YzAtMjUuMyAyMS4zMzMtNDYuNjc3IDQ2LjYxMTUtNDYuNjc3aDg2LjUwMzQyNFYxMTMuNDIwMjg4aC04Mi42NDI5NDRjLTY0LjA4NiAwLTExNi41MDc2IDUyLjUwODctMTE2LjUwNzYgMTE2LjcwMzJ2Njc2LjgwMTUzNTk5OTk5OTljMCA2NC4xNzQxIDUwLjQ5MTQgMTE2LjY4MDcgMTE0LjU3NzQgMTE2LjY4MDdIODg0LjA1Mjk5MmM2NC4wNjI1IDAgMTE2LjUwNjYtNTIuNTA2NiAxMTYuNTA2Ni0xMTYuNjgwN1YyMzAuMTIzNTE5OTk5OTk5OThDMTAwMC41NTk2IDE2NS45MjkgOTQ4LjExNDQgMTEzLjQyMDMgODg0LjA1MyAxMTMuNDIwM3pNOTMzLjgyOTYgOTEwLjM1MTRjMCAyNS4zLTIxLjMzMyA0Ni42NzYtNDYuNjExNSA0Ni42NzZIMTM3LjA1MDExMTk5OTk5OTk4Yy0yNS4yNzg1IDAtNDYuNjExNS0yMS4zNzYtNDYuNjExNS00Ni42NzZWNDQ2LjQ0NTU2OEg5MzMuODI5NjMyVjkxMC4zNTEzNnpNMjY3LjEwODQgNjQ2LjE4MTljMzYuODc3MyAwIDY2Ljc1MjUtMjkuOTM5NyA2Ni43NTI1LTY2Ljg4MTUgMC0zNi45MjI0LTI5Ljg3NTItNjYuODYxMS02Ni43NTI1LTY2Ljg2MTEtMzYuODU0OCAwLTY2Ljc1MjUgMjkuOTM5Ny02Ni43NTI1IDY2Ljg2MTFDMjAwLjM1NTggNjE2LjI0MjIgMjMwLjI1MjUgNjQ2LjE4MTkgMjY3LjEwODQgNjQ2LjE4MTl6TTUxMS41NDg0IDY0Ni4xODE5YzM2Ljg1NTggMCA2Ni43NTI1LTI5LjkzOTcgNjYuNzUyNS02Ni44ODE1IDAtMzYuOTIyNC0yOS44OTU3LTY2Ljg2MTEtNjYuNzUyNS02Ni44NjExLTM2Ljg3NzMgMC02Ni43NTI1IDI5LjkzOTctNjYuNzUyNSA2Ni44NjExQzQ0NC43OTU5IDYxNi4yNDIyIDQ3NC42NzExIDY0Ni4xODE5IDUxMS41NDg0IDY0Ni4xODE5ek0yNjUuOTE2NCA4OTAuNzA5YzM2Ljg3NzMgMCA2Ni43NTE1LTI5LjkzOTcgNjYuNzUxNS02Ni44NjExIDAtMzYuOTQyOC0yOS44NzQyLTY2Ljg4MjYtNjYuNzUxNS02Ni44ODI2LTM2Ljg1NTggMC02Ni43NTI1IDI5LjkzOTctNjYuNzUyNSA2Ni44ODI2QzE5OS4xNjM5IDg2MC43NjkzIDIyOS4wNTk2IDg5MC43MDkgMjY1LjkxNjQgODkwLjcwOXpNNTExLjU0ODQgODkwLjcwOWMzNi44NTU4IDAgNjYuNzUyNS0yOS45Mzk3IDY2Ljc1MjUtNjYuODYxMSAwLTM2Ljk0MjgtMjkuODk1Ny02Ni44ODI2LTY2Ljc1MjUtNjYuODgyNi0zNi44NzczIDAtNjYuNzUyNSAyOS45Mzk3LTY2Ljc1MjUgNjYuODgyNkM0NDQuNzk1OSA4NjAuNzY5MyA0NzQuNjcxMSA4OTAuNzA5IDUxMS41NDg0IDg5MC43MDl6TTc1NS42NDEzIDY0Ni4xODE5YzM2Ljg1NjggMCA2Ni43NTM1LTI5LjkzOTcgNjYuNzUzNS02Ni44ODE1IDAtMzYuOTIyNC0yOS44OTY3LTY2Ljg2MTEtNjYuNzUzNS02Ni44NjExLTM2Ljg3NzMgMC02Ni43NTI1IDI5LjkzOTctNjYuNzUyNSA2Ni44NjExQzY4OC44ODk5IDYxNi4yNDIyIDcxOC43NjQgNjQ2LjE4MTkgNzU1LjY0MTMgNjQ2LjE4MTl6TTMxMS43MDM2IDI5MC42OTcyYzI0LjI4MTEgMCA0NS4zNzY1LTE5LjcwNjkgNDUuMzc2NS00NC4wMzJWNDYuNTYwMjU1OTk5OTk5OTk1YzAtMjQuMzI1MS0yMS4wOTQ0LTQ0LjA1MzUtNDUuMzc2NS00NC4wNTM1LTI0LjMwMTYgMC00My45ODkgMTkuNzI4NC00My45ODkgNDQuMDUzNXYyMDAuMTA0OTZDMjY3LjcxNDYgMjcwLjk5MDMgMjg3LjQwMiAyOTAuNjk3MiAzMTEuNzAzNiAyOTAuNjk3MnoiIGZpbGw9IiM1ZTdhODgiPjwvcGF0aD48L2c+PC9nPjwvc3ZnPg==) no-repeat 8px 10px;
    padding-left: 36px;
    color: #666;
  }

  .calendar-select-btn button {
    transition-duration: .25s;
    background: #F0F0F0;
    color: #888888;
    border: none;
    padding: 8px 12px;
    margin: 0 4px;
    border-radius: 4px;
  }

  .calendar-select-btn button:hover {
    transition-duration: .25s;
    background: rgb(126, 192, 238);
    color: white;
  }

  /*下拉框*/
  .calendar-select-calendar3 {
    background: #fff;
    position: absolute;
    left: 0;
    top: 0;
    padding: 20px;
    border: 1px solid #eee;
    border-radius: 2px;
  }

  .calendar-select-calendar3:before {
    position: absolute;
    left: 30px;
    top: -10px;
    content: "";
    border: 5px solid rgba(0, 0, 0, 0);
    border-bottom-color: #DEDEDE;
  }

  .calendar-select-calendar3:after {
    position: absolute;
    left: 30px;
    top: -9px;
    content: "";
    border: 5px solid rgba(0, 0, 0, 0);
    border-bottom-color: #fff;
  }
</style>
