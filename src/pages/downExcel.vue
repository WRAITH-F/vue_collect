<template>
  <!-- 需要安装 npm install xlsx --save -->
  <div class="down-excel">
    <div class="down-excel-box">
      <input type="file" @change="importFile(this)" id="imFile" style="display: none" accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel" />
      <a id="downlink"></a>
      <div class="down-excel-button" @click="uploadFile()">导入</div>
      <div class="down-excel-button" @click="downloadFile(excelData)">导出</div>
      <!--错误信息提示-->
      <span v-if="errorDialog">{{errorMsg}}</span>
    </div>
  </div>
</template>

<script>
  var XLSX = require('xlsx')
  export default {
    name: 'downExcel',
    data() {
      return {
        fullscreenLoading: false, // 加载中
        imFile: '', // 导入文件el
        outFile: '', // 导出文件el
        errorDialog: false, // 错误信息弹窗
        errorMsg: '', // 错误信息内容
        excelData: [ // 测试数据
          {
            name: '红烧鱼',
            size: '大',
            taste: '微辣',
            price: '40',
            remain: '100'
          },
          {
            name: '麻辣小龙虾',
            size: '大',
            taste: '麻辣',
            price: '138',
            remain: '200'
          },
          {
            name: '清蒸小龙虾',
            size: '大',
            taste: '清淡',
            price: '138',
            remain: '200'
          },
          {
            name: '香辣小龙虾',
            size: '大',
            taste: '特辣',
            price: '138',
            remain: '200'
          },
          {
            name: '十三香小龙虾',
            size: '大',
            taste: '中辣',
            price: '138',
            remain: '108'
          },
          {
            name: '蒜蓉小龙虾',
            size: '大',
            taste: '中辣',
            price: '138',
            remain: '100'
          },
          {
            name: '凉拌牛肉',
            size: '中',
            taste: '中辣',
            price: '48',
            remain: '60'
          },
          {
            name: '虾仁寿司',
            size: '大',
            taste: '清淡',
            price: '29',
            remain: '无限'
          },
          {
            name: '海苔寿司',
            size: '大',
            taste: '微辣',
            price: '26',
            remain: '无限'
          },
          {
            name: '金针菇寿司',
            size: '大',
            taste: '清淡',
            price: '23',
            remain: '无限'
          },
          {
            name: '泡菜寿司',
            size: '大',
            taste: '微辣',
            price: '24',
            remain: '无限'
          },
          {
            name: '鳗鱼寿司',
            size: '大',
            taste: '清淡',
            price: '28',
            remain: '无限'
          },
          {
            name: '肉松寿司',
            size: '大',
            taste: '清淡',
            price: '22',
            remain: '无限'
          },
          {
            name: '三文鱼寿司',
            size: '大',
            taste: '清淡',
            price: '30',
            remain: '无限'
          },
          {
            name: '蛋黄寿司',
            size: '大',
            taste: '清淡',
            price: '20',
            remain: '无限'
          }
        ]
      }
    },
    mounted() {
      this.imFile = document.getElementById('imFile')
      this.outFile = document.getElementById('downlink')
      this.getInfo();
    },
    methods: {
      // 获取数据
      getInfo() {
        let _this = this
        _this.$http({
            url: "http://10.168.1.180:8088/users",
            method: "get",
            headers: {
              token: ""
            },
            params: {
              page_num: 1,
              page_size: 100,
            },
          })
          .then(res => {
            _this.excelData = res.data.data.records;
          })
          .catch(res => {

          })
      },

      uploadFile: function() { // 按钮导入
        this.imFile.click()
      },
      downloadFile: function(rs) { // 按钮导出
        let data = [{}]
        for (let k in rs[0]) {
          data[0][k] = k
        }
        data = data.concat(rs)
        this.downloadExl(data, '菜单')
      },
      importFile: function() { // 导入excel
        this.fullscreenLoading = true
        let obj = this.imFile
        if (!obj.files) {
          this.fullscreenLoading = false
          return
        }
        var f = obj.files[0]
        var reader = new FileReader()
        let $t = this
        reader.onload = function(e) {
          var data = e.target.result
          if ($t.rABS) {
            $t.wb = XLSX.read(btoa(this.fixdata(data)), { // 手动转化
              type: 'base64'
            })
          } else {
            $t.wb = XLSX.read(data, {
              type: 'binary'
            })
          }
          let json = XLSX.utils.sheet_to_json($t.wb.Sheets[$t.wb.SheetNames[0]])
          console.log(typeof json)
          $t.dealFile($t.analyzeData(json)) // analyzeData: 解析导入数据
        }
        if (this.rABS) {
          reader.readAsArrayBuffer(f)
        } else {
          reader.readAsBinaryString(f)
        }
      },
      downloadExl: function(json, downName, type) { // 导出到excel
        let keyMap = [] // 获取键
        for (let k in json[0]) {
          keyMap.push(k)
        }
        console.info('keyMap', keyMap, json)
        let tmpdata = [] // 用来保存转换好的json
        json.map((v, i) => keyMap.map((k, j) => Object.assign({}, {
          v: v[k],
          position: (j > 25 ? this.getCharCol(j) : String.fromCharCode(65 + j)) + (i + 1)
        }))).reduce((prev, next) => prev.concat(next)).forEach(function(v) {
          tmpdata[v.position] = {
            v: v.v
          }
        })
        let outputPos = Object.keys(tmpdata) // 设置区域,比如表格从A1到D10
        let tmpWB = {
          SheetNames: ['mySheet'], // 保存的表标题
          Sheets: {
            'mySheet': Object.assign({},
              tmpdata, // 内容
              {
                '!ref': outputPos[0] + ':' + outputPos[outputPos.length - 1] // 设置填充区域
              })
          }
        }
        let tmpDown = new Blob([this.s2ab(XLSX.write(tmpWB, {
            bookType: (type === undefined ? 'xlsx' : type),
            bookSST: false,
            type: 'binary'
          } // 这里的数据是用来定义导出的格式类型
        ))], {
          type: ''
        }) // 创建二进制对象写入转换好的字节流
        var href = URL.createObjectURL(tmpDown) // 创建对象超链接
        this.outFile.download = downName + '.xlsx' // 下载名称
        this.outFile.href = href // 绑定a标签
        this.outFile.click() // 模拟点击实现下载
        setTimeout(function() { // 延时释放
          URL.revokeObjectURL(tmpDown) // 用URL.revokeObjectURL()来释放这个object URL
        }, 100)
      },
      analyzeData: function(data) { // 此处可以解析导入数据
        return data
      },
      dealFile: function(data) { // 处理导入的数据
        console.log(data)
        this.imFile.value = ''
        this.fullscreenLoading = false
        if (data.length <= 0) {
          this.errorDialog = true
          this.errorMsg = '请导入正确信息'
        } else {
          this.excelData = data
        }
      },
      s2ab: function(s) { // 字符串转字符流
        var buf = new ArrayBuffer(s.length)
        var view = new Uint8Array(buf)
        for (var i = 0; i !== s.length; ++i) {
          view[i] = s.charCodeAt(i) & 0xFF
        }
        return buf
      },
      getCharCol: function(n) { // 将指定的自然数转换为26进制表示。映射关系：[0-25] -> [A-Z]。
        let s = ''
        let m = 0
        while (n > 0) {
          m = n % 26 + 1
          s = String.fromCharCode(m + 64) + s
          n = (n - m) / 26
        }
        return s
      },
      fixdata: function(data) { // 文件流转BinaryString
        var o = ''
        var l = 0
        var w = 10240
        for (; l < data.byteLength / w; ++l) {
          o += String.fromCharCode.apply(null, new Uint8Array(data.slice(l * w, l * w + w)))
        }
        o += String.fromCharCode.apply(null, new Uint8Array(data.slice(l * w)))
        return o
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
  .down-excel-box {
    float: left;
    position: relative;
    left: 50%;
    transform: translateX(-50%);
  }

  .down-excel-button {
    margin-bottom: 20px;
    display: inline-block;
    line-height: 1;
    white-space: nowrap;
    cursor: pointer;
    background: #fff;
    border: 1px solid #c4c4c4;
    color: #1f2d3d;
    margin: 0;
    padding: 10px 15px;
    border-radius: 4px;
    margin: 32px 16px;
  }

  .down-excel-button:hover {
    transition-duration: .25s;
    border: 1px solid rgb(126, 192, 238);
    color: rgb(126, 192, 238);
  }
</style>
