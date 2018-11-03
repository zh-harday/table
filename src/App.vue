<template>
  <div id="app">
    <el-table :data="data_" border style="width: 100%" align='center'>
      <el-table-column label="项目/机构" prop="name" align='center'></el-table-column>
      <el-table-column 
      align='center' 
      v-for="(item, index) in thead" 
      :key="index" :label="item" 
      :prop="item">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
// import ElementDatatable from './components'
import { jsonData } from 'views/data/data.js'
function formatter(row, column, cellValue, index) {
  if (cellValue === 'undefined') {
    // return ''
  }
}

export default {
  name: 'App',
  components: {
    // ElementDatatable
  },
  data() {
    return {
      theadChdren: [],
      filterObj: {
        value_4: '收入',
        value_4_1: '运费收入',
        value_5: '成本',
        value_6: '毛利'
      },

      thead: [],
      tableDatas: [
        {
          org_name: 'BW河北区',
          rpt_date: '2018071',
          value_1: 2444.0,
          value_10: -43361.0,
          value_11: -2.0,
          value_12: -42616.3,
          value_13: 748.7,
          value_14: -43365.0,
          value_2: 5444.0,
          value_3: 4444.0,
          value_4: 3322.1,
          value_5: 19537.8,
          value_6: -16215.7,
          value_7: -70.0,
          value_8: 20517.0,
          value_9: 6558.3
        },
        {
          org_name: 'BW河北省保定市植物园营业部',
          "rpt_date":"2018071",
          value_1: 2323.0,
          value_10: -22560.5,
          value_11: -1.0,
          value_12: -22188.15,
          value_13: 374.35,
          value_14: -22562.5,
          value_2: 2222.0,
          value_3: 1222.0,
          value_4: 781.05,
          value_5: 9768.9,
          value_6: -8987.85,
          value_7: -35.0,
          value_8: 10258.5,
          value_9: 3279.15
        },
        {
          org_name: 'BW河北省保定市裕华路营业部',
          rpt_date: '2018071',
          value_1: 5454.0,
          value_10: -22560.5,
          value_11: -1.0,
          value_12: -22188.15,
          value_13: 374.35,
          value_14: -22562.5,
          value_2: 2222.0,
          value_3: 1222.0,
          value_4: 781.05,
          value_5: 9768.9,
          value_6: -8987.85,
          value_7: -35.0,
          value_8: 10258.5,
          value_9: 3279.15
        },
        {
          org_name: 'BW河北省保定市集散点',
          rpt_date: '2018071',
          value_1: 1222.0,
          value_10: -22560.5,
          value_11: -1.0,
          value_12: -22188.15,
          value_13: 374.35,
          value_14: -22562.5,
          value_2: 2222.0,
          value_3: 1222.0,
          value_4: 781.05,
          value_5: 9768.9,
          value_6: -8987.85,
          value_7: -35.0,
          value_8: 10258.5,
          value_9: 3279.15
        },
        {
          org_name: 'BW河北省唐山市路北区营业部',
          rpt_date: '2018071',
          value_1: 1222.0,
          value_10: -22560.5,
          value_11: -1.0,
          value_12: -22188.15,
          value_13: 374.35,
          value_14: -22562.5,
          value_2: 2222.0,
          value_3: 1222.0,
          value_4: 781.05,
          value_5: 9768.9,
          value_6: -8987.85,
          value_7: -35.0,
          value_8: 10258.5,
          value_9: 3279.15
        },
        {
          org_name: 'BW河北省唐山市集散点',
          rpt_date: '2018071',
          value_1: 1222.0,
          value_10: -22560.5,
          value_11: -1.0,
          value_12: -22188.15,
          value_13: 374.35,
          value_14: -22562.5,
          value_2: 2222.0,
          value_3: 1222.0,
          value_4: 781.05,
          value_5: 9768.9,
          value_6: -8987.85,
          value_7: -35.0,
          value_8: 10258.5,
          value_9: 3279.15
        },
        {
          org_name: 'BW河北省廊坊市盛德花园营业部',
          rpt_date: '2018071',
          value_1: 1222.0,
          value_10: -22560.5,
          value_11: -1.0,
          value_12: -22188.15,
          value_13: 374.35,
          value_14: -22562.5,
          value_2: 2222.0,
          value_3: 1222.0,
          value_4: 781.05,
          value_5: 9768.9,
          value_6: -8987.85,
          value_7: -35.0,
          value_8: 10258.5,
          value_9: 3279.15
        },
        {
          org_name: 'BW河北省廊坊市祥泰花园营业部',
          rpt_date: '2018071',
          value_1: 1222.0,
          value_10: -22560.5,
          value_11: -1.0,
          value_12: -22188.15,
          value_13: 374.35,
          value_14: -22562.5,
          value_2: 2222.0,
          value_3: 1222.0,
          value_4: 781.05,
          value_5: 9768.9,
          value_6: -8987.85,
          value_7: -35.0,
          value_8: 10258.5,
          value_9: 3279.15
        },
        {
          org_name: 'BW河北省廊坊市科技谷营业部',
          rpt_date: '2018071',
          value_1: 1222.0,
          value_10: -22560.5,
          value_11: -1.0,
          value_12: -22188.15,
          value_13: 374.35,
          value_14: -22562.5,
          value_2: 2222.0,
          value_3: 1222.0,
          value_4: 781.05,
          value_5: 9768.9,
          value_6: -8987.85,
          value_7: -35.0,
          value_8: 10258.5,
          value_9: 3279.15
        },
        {
          org_name: 'BW河北省廊坊市集散点',
          rpt_date: '2018071',
          value_1: 1222.0,
          value_10: -22560.5,
          value_11: -1.0,
          value_12: -22188.15,
          value_13: 374.35,
          value_14: -22562.5,
          value_2: 2222.0,
          value_3: 1222.0,
          value_4: 781.05,
          value_5: 9768.9,
          value_6: -8987.85,
          value_7: -35.0,
          value_8: 10258.5,
          value_9: 3279.15
        },
        {
          org_name: 'BW河北省承德市双桥区营业部',
          rpt_date: '2018071',
          value_1: 1222.0,
          value_10: -22560.5,
          value_11: -1.0,
          value_12: -22188.15,
          value_13: 374.35,
          value_14: -22562.5,
          value_2: 2222.0,
          value_3: 1222.0,
          value_4: 781.05,
          value_5: 9768.9,
          value_6: -8987.85,
          value_7: -35.0,
          value_8: 10258.5,
          value_9: 3279.15
        },
        {
          org_name: 'BW河北省承德市双滦区营业部',
          rpt_date: '2018071',
          value_1: 1222.0,
          value_10: -22560.5,
          value_11: -1.0,
          value_12: -22188.15,
          value_13: 374.35,
          value_14: -22562.5,
          value_2: 2222.0,
          value_3: 1222.0,
          value_4: 781.05,
          value_5: 9768.9,
          value_6: -8987.85,
          value_7: -35.0,
          value_8: 10258.5,
          value_9: 3279.15
        },
        {
          org_name: 'BW河北省石家庄市友谊北街营业部',
          rpt_date: '2018071',
          value_1: 1222.0,
          value_10: -22560.5,
          value_11: -1.0,
          value_12: -22188.15,
          value_13: 374.35,
          value_14: -22562.5,
          value_2: 2222.0,
          value_3: 1222.0,
          value_4: 781.05,
          value_5: 9768.9,
          value_6: -8987.85,
          value_7: -35.0,
          value_8: 10258.5,
          value_9: 3279.15
        },
        {
          org_name: 'BW河北省石家庄市天山大街营业部',
          rpt_date: '2018071',
          value_1: 1222.0,
          value_10: -22560.5,
          value_11: -1.0,
          value_12: -22188.15,
          value_13: 374.35,
          value_14: -22562.5,
          value_2: 2222.0,
          value_3: 1222.0,
          value_4: 781.05,
          value_5: 9768.9,
          value_6: -8987.85,
          value_7: -35.0,
          value_8: 10258.5,
          value_9: 3279.15
        },
        {
          org_name: 'BW河北省石家庄市建华南街营业站',
          rpt_date: '2018071',
          value_1: 1222.0,
          value_10: -22560.5,
          value_11: -1.0,
          value_12: -22188.15,
          value_13: 374.35,
          value_14: -22562.5,
          value_2: 2222.0,
          value_3: 1222.0,
          value_4: 781.05,
          value_5: 9768.9,
          value_6: -8987.85,
          value_7: -35.0,
          value_8: 10258.5,
          value_9: 3279.15
        },
        {
          org_name: 'BW河北省石家庄市月季公园营业部',
          rpt_date: '2018071',
          value_1: 1222.0,
          value_10: -22560.5,
          value_11: -1.0,
          value_12: -22188.15,
          value_13: 374.35,
          value_14: -22562.5,
          value_2: 2222.0,
          value_3: 1222.0,
          value_4: 781.05,
          value_5: 9768.9,
          value_6: -8987.85,
          value_7: -35.0,
          value_8: 10258.5,
          value_9: 3279.15
        },
        {
          org_name: 'BW河北省石家庄市红旗大街营业部',
          rpt_date: '2018071',
          value_1: 1222.0,
          value_10: -22560.5,
          value_11: -1.0,
          value_12: -22188.15,
          value_13: 374.35,
          value_14: -22562.5,
          value_2: 2222.0,
          value_3: 1222.0,
          value_4: 781.05,
          value_5: 9768.9,
          value_6: -8987.85,
          value_7: -35.0,
          value_8: 10258.5,
          value_9: 3279.15
        },
        {
          org_name: 'BW河北省邯郸市丛台区营业部',
          rpt_date: '2018071',
          value_1: 1222.0,
          value_10: -22560.5,
          value_11: -1.0,
          value_12: -22188.15,
          value_13: 374.35,
          value_14: -22562.5,
          value_2: 2222.0,
          value_3: 1222.0,
          value_4: 781.05,
          value_5: 9768.9,
          value_6: -8987.85,
          value_7: -35.0,
          value_8: 10258.5,
          value_9: 3279.15
        },
        {
          org_name: 'BW河北省邯郸市集散点',
          rpt_date: '2018071',
          value_1: 1222.0,
          value_10: -22560.5,
          value_11: -1.0,
          value_12: -22188.15,
          value_13: 374.35,
          value_14: -22562.5,
          value_2: 2222.0,
          value_3: 1222.0,
          value_4: 781.05,
          value_5: 9768.9,
          value_6: -8987.85,
          value_7: -35.0,
          value_8: 10258.5,
          value_9: 3279.15
        },
        {
          org_name: 'BW石家庄集散中心',
          rpt_date: '2018071',
          value_1: 1222.0,
          value_10: -22560.5,
          value_11: -1.0,
          value_12: -22188.15,
          value_13: 374.35,
          value_14: -22562.5,
          value_2: 2222.0,
          value_3: 1222.0,
          value_4: 781.05,
          value_5: 9768.9,
          value_6: -8987.85,
          value_7: -35.0,
          value_8: 10258.5,
          value_9: 3279.15
        },
        {
          org_name: '石家庄',
          rpt_date: '2018071',
          value_1: 1222.0,
          value_10: -22560.5,
          value_11: -1.0,
          value_12: -22188.15,
          value_13: 374.35,
          value_14: -22562.533,
          value_2: 2222.0,
          value_3: 1222.0,
          value_4: 781.05,
          value_5: 9768.9,
          value_6: -8987.85,
          value_7: -35.0,
          value_8: 10258.5,
          value_9: 3279.15
        }
      ],
      tableData: [
        {
          org_name: 'BW河北区',
          rpt_date: '2018071',
          value_1: 2444.0,
          value_10: -43361.0,
          value_11: -2.0,
          value_12: -42616.3,
          value_13: 748.7,
          value_14: -43365.0,
          value_2: 5444.0,
          value_3: 4444.0,
          value_4: 3322.1,
          value_5: 19537.8,
          value_6: -16215.7,
          value_7: -70.0,
          value_8: 20517.0,
          value_9: 6558.3
        },
        {
          org_name: '石家庄',
          rpt_date: '2018071',
          value_1: 4343.0,
          value_10: -22560.5,
          value_11: -1.0,
          value_12: -22188.15,
          value_13: 374.35,
          value_14: -22562.5,
          value_2: 2222.0,
          value_3: 1222.0,
          value_4: 781.05,
          value_5: 9768.9,
          value_6: -8987.85,
          value_7: -35.0,
          value_8: 10258.5,
          value_9: 3279.15
        },
        {
          org_name: '石家庄',
          rpt_date: '2018071',
          value_1: 1222.0,
          value_10: -22560.5,
          value_11: -1.0,
          value_12: -22188.15,
          value_13: 374.35,
          value_14: -22562.5,
          value_2: 2222.0,
          value_3: 1222.0,
          value_4: 781.05,
          value_5: 9768.9,
          value_6: -8987.85,
          value_7: -35.0,
          value_8: 10258.5,
          value_9: 3279.15
        }
      ],
      data_: [],
      lastFilterObj: {}
    }
  },
  created() {
    this.filterObj = jsonData['PROJECT']
    let obj_ = this.tableData[0]
    for (let item of this.tableDatas) {
      if (item.org_name) {
        // this.thead.push(item.rpt_date)
        this.thead.push(item.org_name)
      }
    }
    for (let item of this.tableDatas) {
      if (item.rpt_date) {
        // this.thead.push(item.rpt_date)
        this.theadChdren.push(item.rpt_date)
      }
    }

      var arrs = []
      this.tableData.map((item, index) => {
        if (item[index] !== 'org_name' && item[index] !== 'rpt_date') {
          arrs = Object.keys(item)
        }
      })
      // console.log('返回keys', arrs)
      // console.log('过滤前', this.filterObj)
      let object_ = Object.assign({}, this.filterObj)
      for (let key in object_) {
        if (arrs.indexOf(key) === -1) {
          if (
            object_[key] == '营业部指标' ||
            object_[key] == '集散仓指标' ||
            object_[key] == '省区人员数量指标' ||
            object_[key] == '分析指标'
          ) {
          } else {
            delete object_[key]
          }
        }
      }
      this.lastFilterObj = Object.assign({}, object_)
      Object.keys(this.lastFilterObj).forEach(key => {
        var obj = {
            name: this.filter(key),
          }
          this.tableDatas.map((item, index) => {
            // obj[item.rpt_date] = item[key]
            obj[item.org_name] = item[key]
          })
        debugger
        this.data_.push(obj)
      })
    console.log(this.data_)
  },
  methods: {
    filter(key) {
      if (this.lastFilterObj[key]) {
        return this.lastFilterObj[key]
      }
    },
    formatter(row, column, cellValue, index) {
      if (cellValue === 'undefined') {
        return '123'
      }
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
