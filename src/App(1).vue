<template>
  <div class="app-container managementAnalysis">
    <!-- 管理分析报表 -->
    <div>
      <el-collapse v-model="activeNames" @change="handleChange">
        <el-collapse-item title="搜索条件：" name="1">
          <el-row class="rowT mouth" v-show="formInline.report_type == 'MONTH'">
            <el-form :rules="rules" ref="ruleForm" :inline="true" label-position="right" :model="formInline" class="demo-form-inline">
              <el-form-item class="marR" label="开始会计时间" prop="start_date" label-width="167px">
                <el-date-picker v-if="formInline.report_type == 'MONTH'" :picker-options="pickerOptions1" :class="{startDate: formInline.report_type == 'MONTH'}" @change='changeDateStr' v-model="formInline.start_date" type="month" format="yyyyMM" value-format="yyyyMM" placeholder="选择月">
                </el-date-picker>
                <span v-if="formInline.report_type == 'WEEK'"> - </span>
                <el-select @change="checkErrorMsgStr" class="startTime" v-if="formInline.report_type == 'WEEK'" v-model="weekStrData" placeholder="请选择">
                  <el-option v-for="item in optionsWeek" :key="item.value" :label="item.label" :value="item.value">
                  </el-option>
                </el-select>
                <div v-if="showErrorMsgStr && formInline.report_type == 'WEEK'" class="el-form-item__error errorMsg">{{errorMsgStr}}</div>
              </el-form-item>
              <el-form-item class="marR" label="结束会计期间" prop="end_date" label-width="108px">
                <!-- <el-date-picker v-if="formInline.report_type == 'WEEK'" format="yyyy-MM-dd" value-format="yyyy-MM-dd" @change='changeDate' v-model="formInline.end_date" type="date" placeholder="选择日期">
                </el-date-picker> -->
                <el-date-picker :picker-options="pickerOptions1" :class="{startDate: formInline.report_type == 'WEEK'}" format="yyyyMM" value-format="yyyyMM" @change='changeDateEnd' v-model="formInline.end_date" type="month" placeholder="选择月">
                </el-date-picker>
                <span v-if="formInline.report_type == 'WEEK'"> - </span>
                <el-select @change="checkErrorMsgEnd" class="startTime" v-if="formInline.report_type == 'WEEK'" v-model="weekEndData" placeholder="请选择">
                  <el-option v-for="item in optionsWeek" :key="item.value" :label="item.label" :value="item.value">
                  </el-option>
                </el-select>
                <div v-if="showErrorMsgEnd && formInline.report_type == 'WEEK'" class="el-form-item__error errorMsg">{{errorMsgEnd}}</div>
              </el-form-item>
              <el-form-item class="marR" label="机构层级" prop="org_code" label-width="108px">
                <YtoChoiceCity style="width: 165px" ref="Ytochoicebyqt" class="Ytochoice Ytochoicebyqt" v-show="IsshowPopover" v-model="org_code_month" @tabclick="choicetabchange" :isRegion="false" :regionSelect="regionSelect" :isSend="true" placeholder="请选择单位名称" :multiple="multiple" net="netB" @getSelectData='getSelectData' type='str'>
                </YtoChoiceCity>
              </el-form-item>
              <el-form-item class="marR" label="是否需要展示下属机构" prop="show_branch" label-width="165px">
                <el-select v-model="formInline.show_branch" placeholder="">
                  <el-option v-for="item of institutions" :label="item.label" :value="item.value"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item class="marR" label="报表类型" prop="report_type" label-width="108px">
                <el-select @change="reportTypeStr" v-model="formInline.report_type" placeholder="">
                  <el-option v-for="item of affiliates" :label="item.label" :value="item.value"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item class="marR" label="项目类型" prop="project_type" label-width="111px">
                <el-select v-model="formInline.project_type" placeholder="">
                  <el-option v-for="item of projectType" :label="item.label" :value="item.value"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item class="marR" label="显示层级" prop="show_level" label-width="165px">
                <el-select v-model="formInline.show_level" placeholder="">
                  <el-option v-for="item of displayLevel" :label="item.label" :value="item.value"></el-option>
                </el-select>
              </el-form-item>
            </el-form>
          </el-row>
          <el-row v-show="formInline.report_type == 'WEEK'" class="rowT week">
            <el-form :rules="rules" ref="ruleForm" :inline="true" label-position="right" :model="formInline" class="demo-form-inline">
              <el-form-item class="marR" label="开始会计时间" prop="start_date" label-width="108px">
                <el-date-picker :picker-options="pickerOptions1" :class="{startDate: formInline.report_type == 'WEEK'}" @change='changeDateStr' v-model="formInline.start_date" type="month" format="yyyyMM" value-format="yyyyMM" placeholder="选择月">
                </el-date-picker>
                <span v-if="formInline.report_type == 'WEEK'"> - </span>
                <el-select @change="checkErrorMsgStr" class="startTime" v-if="formInline.report_type == 'WEEK'" v-model="weekStrData" placeholder="请选择">
                  <el-option v-for="item in optionsWeek" :key="item.value" :label="item.label" :value="item.value">
                  </el-option>
                </el-select>
                <div v-if="showErrorMsgStr && formInline.report_type == 'WEEK'" class="el-form-item__error errorMsg">{{errorMsgStr}}</div>
              </el-form-item>
              <el-form-item class="marR" label="结束会计时间" prop="end_date" label-width="108px">
                <el-date-picker :picker-options="pickerOptions1" :class="{startDate: formInline.report_type == 'WEEK'}" format="yyyyMM" value-format="yyyyMM" @change='changeDateEnd' v-model="formInline.end_date" type="month" placeholder="选择月">
                </el-date-picker>
                <span v-if="formInline.report_type == 'WEEK'"> - </span>
                <el-select @change="checkErrorMsgEnd" class="startTime" v-if="formInline.report_type == 'WEEK'" v-model="weekEndData" placeholder="请选择">
                  <el-option v-for="item in optionsWeek" :key="item.value" :label="item.label" :value="item.value">
                  </el-option>
                </el-select>
                <div v-if="showErrorMsgEnd && formInline.report_type == 'WEEK'" class="el-form-item__error errorMsg">{{errorMsgEnd}}</div>
              </el-form-item>
              <el-form-item class="marR" label="是否需要展示下属机构" prop="show_branch" label-width="165px">
                <el-select v-model="formInline.show_branch" placeholder="">
                  <el-option v-for="item of institutions" :label="item.label" :value="item.value"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item class="marR" label="机构层级" prop="org_code" label-width="108px">
                <YtoChoiceCity style="width: 165px" ref="Ytochoicebyqt" class="Ytochoice Ytochoicebyqt" v-if="IsshowPopover" v-model="org_code_week" @tabclick="choicetabchange" :isRegion="false" :regionSelect="regionSelect" :isSend="true" placeholder="请选择单位名称" :multiple="multiple" net="netB" @getSelectData='getSelectData' type='str'>
                </YtoChoiceCity>
              </el-form-item>
              <el-form-item class="marR project_type" label="项目类型" prop="project_type" label-width="176px">
                <el-select v-model="formInline.project_type" placeholder="">
                  <el-option v-for="item of projectType" :label="item.label" :value="item.value"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item class="marR" label="报表类型" prop="report_type" label-width="168px">
                <el-select @change="reportTypeEnd" v-model="formInline.report_type" placeholder="">
                  <el-option v-for="item of affiliates" :label="item.label" :value="item.value"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item class="marR project_type" label="显示层级" prop="show_level" label-width="108px">
                <el-select style="width: 215px" v-model="formInline.show_level" placeholder="">
                  <el-option v-for="item of displayLevel" :label="item.label" :value="item.value"></el-option>
                </el-select>
              </el-form-item>
            </el-form>
          </el-row>
          <div class="btnGroup">
            <el-button class="inquireBtn" type="primary" @click="searchSubmit('search')">查询</el-button>
            <el-button type="primary" @click="searchSubmit('export')" style="width:120px;height:28px;
                    background:#fff;border-radius:4px;
                    border:1px solid rgba(243,143,22,1);
                    color:rgba(243,143,22,1);">
              导出
            </el-button>
          </div>
        </el-collapse-item>
      </el-collapse>
    </div>
    <div class="rowB">
      <!-- <el-row> -->
      <!-- <element-datatable :data="data_" border 
        :column-attributes="thead">
          <el-table-column prop="name" slot="first">
          </el-table-column>
        </element-datatable> -->
      <!-- <el-table :data="data_"
          v-if="formInline.show_branch == 'N'" 
           border align='center'>
          <el-table-column label="项目\机构" prop="name">
          </el-table-column>
          <el-table-column v-for="(item, index1) in thead" 
          :key="index" :label="item" :prop="item"
          >
        </el-table-column>
       </el-table> -->

      <el-table v-loading='loading' align='center' :data="data_" border max-height='500'>
        <el-table-column fixed label="项目/机构" align='left' width="300">
          <template slot-scope="scope">
            <span :class="{
              leve_1: scope.row['name'] == '揽件量' ||
                      scope.row['name'] == '派件量' ||
                      scope.row['name'] == '揽件重量' ||
                      scope.row['name'] == '收入' ||
                      scope.row['name'] == '成本' ||
                      scope.row['name'] == '毛利' ||
                      scope.row['name'] == '内部补偿收益' ||
                      scope.row['name'] == '经营费用' ||
                      scope.row['name'] == '税金及附加' ||
                      scope.row['name'] == '营业利润' ||
                      scope.row['name'] == '营业外收支' ||
                      scope.row['name'] == '利润总额' ||
                      scope.row['name'] == '所得税费用' ||
                      scope.row['name'] == '净利润',
              leve_2: scope.row['name'] == '运费收入' ||
                      scope.row['name'] == '红冲金额' ||
                      scope.row['name'] == '高价值包装物收入' ||
                      scope.row['name'] == 'B网到付件收入' ||
                      scope.row['name'] == '增值服务收入' ||
                      scope.row['name'] == '折扣金额' ||
                      scope.row['name'] == 'A转B派件收入' ||
                      scope.row['name'] == '人工成本' ||
                      scope.row['name'] == '运能成本' ||
                      scope.row['name'] == '场地成本' ||
                      scope.row['name'] == '物料成本' ||
                      scope.row['name'] == '其他成本' ||
                      scope.row['name'] == '内部补偿收入合计' ||
                      scope.row['name'] == '内部补偿成本合计' ||
                      scope.row['name'] == '管理费用' ||
                      scope.row['name'] == '销售费用' ||
                      scope.row['name'] == '财务费用' ||
                      scope.row['name'] == '城市维护建设税' ||
                      scope.row['name'] == '教育费附加' ||
                      scope.row['name'] == '地方教育费附加' ||
                      scope.row['name'] == '房产税' ||
                      scope.row['name'] == '土地使用税' ||
                      scope.row['name'] == '车船使用税' ||
                      scope.row['name'] == '印花税' ||
                      scope.row['name'] == '土地增值税' ||
                      scope.row['name'] == '其他税金' ||
                      scope.row['name'] == '营业外收入' ||
                      scope.row['name'] == '营业外支出',
              leve_3: scope.row['name'] == '基本工资' ||
                      scope.row['name'] == '社会保险费' ||
                      scope.row['name'] == '住房公积金' ||
                      scope.row['name'] == '福利' ||
                      scope.row['name'] == '其他' ||
                      scope.row['name'] == '自有运能' ||
                      scope.row['name'] == '场地租金' ||
                      scope.row['name'] == '水电燃气费' ||
                      scope.row['name'] == '装修摊销' ||
                      scope.row['name'] == 'B转A的派件成本' ||
                      scope.row['name'] == '理赔成本' ||
                      scope.row['name'] == '劳保工服' ||
                      scope.row['name'] == '招聘费' ||
                      scope.row['name'] == '培训费' ||
                      scope.row['name'] == '信息化费用' ||
                      scope.row['name'] == '低值易耗品' ||
                      scope.row['name'] == '固定资产折旧费-其他资产' ||
                      scope.row['name'] == '固定资产修理费-其他资产' ||
                      scope.row['name'] == '其他' ||
                      scope.row['name'] == '内部操作收入' ||
                      scope.row['name'] == '内部派件收入' ||
                      scope.row['name'] == '内部运能成本' ||
                      scope.row['name'] == '内部运能收入' ||
                      scope.row['name'] == '内部操作成本' ||
                      scope.row['name'] == '内部派件成本' ||
                      scope.row['name'] == '人工成本' ||
                      scope.row['name'] == '办公费' ||
                      scope.row['name'] == '通讯费' ||
                      scope.row['name'] == '培训费' ||
                      scope.row['name'] == '招募费' ||
                      scope.row['name'] == '劳保工服' ||
                      scope.row['name'] == '会议费' ||
                      scope.row['name'] == '差旅费' ||
                      scope.row['name'] == '业务招待费' ||
                      scope.row['name'] == '信息化费用' ||
                      scope.row['name'] == '行政车费用(运营费用)' ||
                      scope.row['name'] == '固定资产折旧费' ||
                      scope.row['name'] == '低值易耗品' ||
                      scope.row['name'] == '聘请中介机构费用' ||
                      scope.row['name'] == '其他' ||
                      scope.row['name'] == '市场推广费' ||
                      scope.row['name'] == '营销费用' ||
                      scope.row['name'] == '利息收入' ||
                      scope.row['name'] == '利息支出' ||
                      scope.row['name'] == '汇兑损益' ||
                      scope.row['name'] == '手续费支出' ||
                      scope.row['name'] == '其他费用' ||
                      scope.row['name'] == '未确认融资费用',
              leve_4: scope.row['name'] == '驾驶员人工成本' ||
                      scope.row['name'] == '车辆折旧' ||
                      scope.row['name'] == '车辆租赁成本' ||
                      scope.row['name'] == '车辆运营成本' ||
                      scope.row['name'] == '外购航空' ||
                      scope.row['name'] == '外购汽运' ||
                      scope.row['name'] == '内部航空收入' ||
                      scope.row['name'] == '内部铁路收入' ||
                      scope.row['name'] == '内部汽运收入' ||
                      scope.row['name'] == '内部航空成本' ||
                      scope.row['name'] == '内部铁路成本' ||
                      scope.row['name'] == '内部汽运成本' ||
                      scope.row['name'] == '基本工资' ||
                      scope.row['name'] == '社会保险费' ||
                      scope.row['name'] == '住房公积金' ||
                      scope.row['name'] == '福利' ||
                      scope.row['name'] == '其他' ||
                      scope.row['name'] == '交通费' ||
                      scope.row['name'] == '住宿费' ||
                      scope.row['name'] == '餐费补助' ||
                      scope.row['name'] == '市内交通费',
              leve_5: scope.row['name'] == '基本工资' ||
                      scope.row['name'] == '社会保险费' ||
                      scope.row['name'] == '住房公积金' ||
                      scope.row['name'] == '福利' ||
                      scope.row['name'] == '其他' ||
                      scope.row['name'] == '油费' ||
                      scope.row['name'] == '保险费' ||
                      scope.row['name'] == '路桥' ||
                      scope.row['name'] == '维修保养费' ||
                      scope.row['name'] == '其他',
              leve_6: scope.row['name'] == '营业部指标' ||
                      scope.row['name'] == '集散仓指标' ||
                      scope.row['name'] == '省区人员数量指标' ||
                      scope.row['name'] == '分析指标'     
            }">
              {{scope.row['name']}}
            </span>
            <!-- <span v-else-if="scope.row.name=== 1">隐藏</span> -->
          </template>
        </el-table-column>
        <div v-if="data_.length == 0">
          <el-table-column label="" align='center'></el-table-column>
          <el-table-column label="" align='center'></el-table-column>
          <el-table-column label="" align='center'></el-table-column>
          <el-table-column label="" align='center'></el-table-column>
        </div>
        <el-table-column align='center' 
        v-for="(item, index) in thead" 
        :key="index" :label="item.label" 
        :prop="item.prop">
          <el-table-column align='center' 
          v-if="item.children" 
          :label="item.children[0].label" 
          :prop="item.prop">
          </el-table-column>
        </el-table-column>
      </el-table>
      <!-- </el-row> -->
    </div>
  </div>
</template>

<style lang="scss" scoped>
.managementAnalysis {
  .leve_1 {
    // font-weight: bolder;
  }
  .leve_2 {
    // font-weight: bolder;
    margin-left: 20px;
  }
  .leve_3 {
    margin-left: 40px;
  }
  .leve_4 {
    margin-left: 60px;
  }
  .leve_5 {
    margin-left: 80px;
  }
  .leve_6 {
    // margin-left: 80px;
    color: #333333;
    font-weight: bolder;
  }
  .sss {
    margin-left: 160px;
  }
  padding: 19px 28px;
  .inquireBtn {
    width: 120px;
  }
  .startDate {
    width: 110px;
  }
  .errorMsg {
    left: 125px;
  }
  .marR {
    margin-right: 28px;
  }
  .btnGroup {
    float: right;
  }
}
</style>
<script>
import NetAPI from '@/service/netBAPI'
import { iframeAutoH, FormatDate, ReadFormatDate } from '@/components/date'
import { mapGetters } from 'vuex'
import { getStore } from '@/components/date'
let userInfo = getStore('userInfo')
/////////////////////////
var lodash = require('lodash/Lang')
import moment from 'moment'
import { getDaybefore } from '@/utils/common'
import { getOptionObjectPairType, queryByPage } from '@/api/org'
import {
  getMyCascarderStartFirstAPI,
  getMyCascarderStartNextAPI
} from '@/service/index'
import { post } from '@/utils/pspfetch'
import { jsonData } from './data.js'
////////////////////////
import elementDatatable from 'element-datatable'
export default {
  name: 'managementAnalysis',
  components: {
    elementDatatable
  },
  data() {
    return {
      new_obj: {},
      lastFilterObj: {},
      leibie: '',
      loading: false,
      rules: {
        start_date: [
          { required: true, message: '请选择开始会计时间', trigger: 'blur' }
        ],
        show_branch: [
          {
            required: true,
            message: '请选择是否需要展示下属机构',
            trigger: 'change'
          }
        ],
        end_date: [
          { required: true, message: '请选择结束会计期间', trigger: 'blur' }
        ],
        report_type: [
          { required: true, message: '请选择报表类型', trigger: 'change' }
        ],
        org_code: [
          { required: false, message: '请选择机构层级', trigger: 'change' }
        ],
        project_type: [
          { required: true, message: '请选择项目类型', trigger: 'change' }
        ],
        show_level: [
          { required: true, message: '请选择显示层级', trigger: 'change' }
        ]
      },
      //////////////////////////////////////////
      IsshowPopover: true,
      mechanlist: [],
      regionmaplist: {
        '1000': ['大区', '城市', '集散中心', '营业部'],
        '1010': ['大区', '城市', '集散中心', '营业部'],
        '1020': ['城市', '集散中心', '营业部'],
        '1030': ['集散中心'],
        '1050': ['营业部']
      },
      descriptmaplist: {
        '1010': '请选择大区',
        '1020': '请选择城市',
        '1030': '请选择集散中心',
        '1050': '请选择营业部'
      },
      CastConditn: {
        startdate: '', //开始时间
        enddate: '', //结束时间
        statisdate: [moment().subtract(30, 'days'), moment()],
        // mechantype: JSON.parse(localStorage.getItem("userInfo")).typeCode.toString(), //机构类型
        mechantype: '',
        OrganizationLevel: '' //组织机构编码(不包括营业部)
      },
      organizSelect: {}, //选择的机构类型
      multiple: false,
      regionSelect: [],
      strData: {}, //始发地数据
      endData: {}, //目的地数据
      authDataStr: false,
      authDataEnd: false,
      exportBtn: false,
      //////////////////////////////////////////
      //是否需要展示下属机构
      institutions: [{ label: '是', value: 'Y' }, { label: '否', value: 'N' }],
      //是否需要展示下属机构
      affiliates: [
        { label: '周报', value: 'WEEK' },
        { label: '月报', value: 'MONTH' }
      ],
      //周期数据
      optionsWeek: [
        { label: '第一周', value: '1' },
        { label: '第二周', value: '2' },
        { label: '第三周', value: '3' }
      ],
      showErrorMsgStr: false,
      showErrorMsgEnd: false,
      errorMsgStr: '', //开始周期错误信息提示
      errorMsgEnd: '', //结束周期错误信息提示
      weekStrData: '', //开始周期
      weekEndData: '', //结束周期
      pickerOptions1: {
        disabledDate(time) {
          return time.getTime() > Date.now()
        }
      },
      //项目类型
      projectType: [
        { label: '分析类', value: 'ANALYSIS' },
        { label: '项目类', value: 'PROJECT' }
      ],
      //显示层级
      displayLevel: [
        { label: '一级', value: '1' },
        { label: '二级', value: '2' },
        { label: '三级', value: '3' },
        { label: '四级', value: '4' },
        { label: '五级', value: '5' }
      ],
      formInline: {
        start_date: '', //开始会计时间
        show_branch: 'N', //是否需要展示下属机构
        report_type: 'MONTH', //报表类型
        end_date: '', //结束会计期间
        project_type: 'PROJECT', //项目类型
        show_level: '1', //显示层级
        org_type: '', //机构类型
        org_code: '' //机构代码
      },
      filterObj: {},
      thead: [],
      thead_y: [],
      data_: [],
      tableData: [],
      targetName: {
        ANALYSIS: 'manage_analysis_report_analysis', //分析类
        PROJECT: 'manage_analysis_report_project' //项目类
      },
      searchUrl: '/manage/analysis',
      exportUrl: '/manage/export',
      type: '',
      activeNames: '1',
      org_code_month: '',
      org_code_week: ''
    }
  },
  computed: {
    ...mapGetters(['userOrgType', 'userOrgCode', 'userProvCode'])
  },
  created() {
    debugger
    console.log(this.formInline.report_type)
    /*******************************/
    // let userOrgCode = this.userOrgCode
    // this.org_code_month = this.userOrgCode
    // this.org_code_week = this.userOrgCode
    this.formInline.org_type = this.userOrgType
    this.formInline.org_code = this.userOrgCode
    this.checkOrgType()
    this.initconfig()
    this.setNowDate()
    getOptionObjectPairType({
      type: 10
    }).then(data => {
      let PairTypes = lodash.cloneDeep(data.data)
      let _PairTypes = lodash.cloneDeep(data.data)
      let PairTypearr = PairTypes.filter(item => {
        if (
          item.value == '1000' ||
          item.value == '1010' ||
          item.value == '1020' ||
          item.value == '1030' ||
          item.value == '1050'
        ) {
          if (item.value == '1010') {
            item.label = item.label + '(省区)'
          }
          if (item.value == '1000') {
            item.label = '总部'
          }
          return true
        }
      })
      let PairTypearrsec = _PairTypes.filter(item => {
        if (item.value == '1010') {
          item.label = item.label + '(省区)'
        }
        if (item.value == '1000') {
          item.label = '总部'
        }
        return true
      })
      //let userInfo=JSON.parse(localStorage.getItem("userInfo"));
      //1050
      if (
        this.userOrgType == 1010 ||
        this.userOrgType == 1020 ||
        this.userOrgType == 1030 ||
        this.userOrgType == 1050
      ) {
        let mechanlist = []
        if (this.userOrgType == 1010) {
          //regionSelect:['大区','城市','集散中心','营业部']
          mechanlist = PairTypearr.filter(item => {
            if (item.value != 1000) {
              return true
            }
          })
        } else if (this.userOrgType == 1020) {
          mechanlist = PairTypearr.filter(item => {
            if (item.value != 1000 || item.value != 1010) {
              return true
            }
          })
          //this.regionSelect=this.regionmaplist[this.userOrgType];
        } else {
          mechanlist = PairTypearr.filter(item => {
            if (item.value == this.userOrgType) {
              return true
            }
          })
          //this.regionSelect=this.regionmaplist[this.userOrgType];
        }

        this.mechanlist = mechanlist
      } else {
        this.mechanlist.push(...PairTypearr)
      }
      this.regionSelect = this.regionmaplist[this.userOrgType]
      console.log('this.regionSelect---736', this.regionSelect)
      //this.mechanlist.push(...PairTypearr);
      sessionStorage.setItem('mechantype', JSON.stringify(PairTypearrsec)) //组织机构类型
      this.loadflag = true
      this.$bus.emit('qtchartinit', true)
    })
    /*******************************/
  },
  mounted() {
    debugger
    this.searchSubmit('search')
  },
  methods: {
    /////////////////////////////////////
    setNowDate() {
      var date = new Date()
      var year = date.getFullYear()
      var month = date.getMonth() + 1
      month = month < 10 ? '0' + month : month
      // var monthStr = date.getMonth()
      // monthStr = monthStr < 10 ? '0' + monthStr : monthStr
      // var mydateStr = year.toString() + monthStr.toString()
      // this.formInline.start_date = mydateStr
      var mydate = year.toString() + month.toString()
      this.formInline.start_date = mydate
      this.formInline.end_date = mydate
    },
    getSelectData(type, data) {
      // alert(111)
      debugger
      console.log('选中的数据是=======================')
      console.log(data)
      // this.formInline.org_type = ''
      // this.formInline.org_code = ''
      if (type === 'str') {
        //始发地
        if (data) {
          if (data.value.length > 0) {
            if (this.formInline.report_type == 'MONTH') {
              this.org_code_month = data.value.join(',')
              this.org_code_week = this.userOrgCode
            } else {
              this.org_code_month = this.userOrgCode
              this.org_code_week = data.value.join(',')
            }
            this.formInline.org_type = data.type
            this.formInline.org_code = data.value.join(',')
          }
          // else {
          //   this.formInline.org_type = this.userOrgType
          //   this.formInline.org_code = this.userOrgCode
          // }
        } else {
          this.formInline.org_type = this.userOrgType
          this.formInline.org_code = this.userOrgCode
        }
      }
      console.log('PPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPP')
      console.log(this.formInline.org_code)
    },
    checkOrgType() {
      debugger
      this.formInline.org_type = String(this.formInline.org_type)
      switch (this.formInline.org_type) {
        case '1000':
          this.formInline.org_type = 'HEAD'
          break
        case '1010':
          this.formInline.org_type = 'REGION_MANAGE'
          break
        case '1020':
          this.formInline.org_type = 'CITY'
          break
        case '1030':
          this.formInline.org_type = 'TRANSFER_CENTER'
          break
        case '1040':
          this.formInline.org_type = 'BRANCH'
          break
        case '1050':
          this.formInline.org_type = 'BRANCH'
          break
        case '1060':
          this.formInline.org_type = 'BRANCH'
          break
      }
      return
    },
    choicetabchange(typecode) {
      if (
        typecode == 1010 ||
        typecode == 1020 ||
        typecode == 1030 ||
        typecode == 1050
      ) {
        this.CastConditn.mechantype = typecode
      }
    },
    initconfig() {
      let userInfo = JSON.parse(localStorage.getItem('userInfo'))
      this.condition = {}
      if (userInfo != null) {
        this.userOrgType = userInfo.typeCode
        this.userOrgCode = userInfo.unitCode
        this.typeCode = userInfo.typeCode
        if (this.typeCode == 1050) {
          this.SummaryvRecordflag = true
        }
      }
      this.condition['startDate'] = getDaybefore()
      this.condition['endDate'] = moment().format('YYYY-MM-DD')
    },
    setAuthCode(postData) {
      switch (this.userOrgType) {
        case 1000: //总部
          postData.head_code = this.userOrgCode
          break
        case 1010: //大区
          postData.region_code = this.userOrgCode
          break
        case 1020: //城市
          postData.city_code = this.userOrgCode
          break
        case 1030: //集散中心
          postData.trans_ctr_code = this.userOrgCode
          break
        case 1050: //营业部
          postData.branch_code = this.userOrgCode
          break
        default:
          break
      }
    },
    ////////////////////////////////////////////////
    filter(key) {
      if (this.lastFilterObj[key]) {
        return this.lastFilterObj[key]
      }
    },
    formatter(row, column, cellValue, index) {
      if (cellValue === null) {
        return ''
      }
    },
    setTableData() {
      debugger
      let obj_ = this.tableData[0]
      for (let item of this.tableData) {
        if (this.formInline.show_branch == 'N') {
          this.thead.push({
            label: item.rpt_date,
            prop: item.rpt_date,
            children: [
              {
                label: item.org_name,
                prop: item.rpt_date
              }
            ]
          })
          // this.thead.push(item.org_name)
        } else if (this.formInline.show_branch == 'Y') {
          this.thead.push({
            label: item.org_name,
            prop: item.org_name,
            children: [
              {
                label: ''
                // prop: ''
              }
            ]
          })
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
      console.log('过滤后 filterObject', object_)
      this.lastFilterObj = Object.assign({}, object_)
      debugger

      Object.keys(this.lastFilterObj).forEach(key => {
        var obj = {
          name: this.filter(key)
        }
        this.tableData.forEach((item, index) => {
          console.log('item==================', item)
          console.log('Key==================', key)
          if (this.formInline.show_branch == 'N') {
            obj[item.rpt_date] = item[key]
          } else {
            obj[item.org_name] = item[key]
          }
        })
        this.data_.push(obj)
      })
      console.log('data--------', this.data_)
    },
    //改变日期选择回调方法
    changeDateStr(val) {
      console.log(val)
    },
    changeDateEnd(val) {
      let strDate = this.formInline.start_date
      let endDate = this.formInline.end_date
    },
    //开始会计日期
    checkErrorMsgStr() {
      debugger
      if (this.weekStrData && this.formInline.report_type == 'WEEK') {
        // console.log(this.weekStrData)
        this.errorMsgStr = ''
        this.showErrorMsgStr = false
      } else {
        this.errorMsgStr = '请选择开始周期'
        this.showErrorMsgStr = true
      }
    },
    //结束会计日期
    checkErrorMsgEnd() {
      debugger
      if (this.weekEndData && this.formInline.report_type == 'WEEK') {
        this.errorMsgEnd = ''
        this.showErrorMsgEnd = false
      } else {
        this.errorMsgEnd = '请选择结束周期'
        this.showErrorMsgEnd = true
      }
    },
    //查询提交
    searchSubmit(type) {
      debugger
      console.log('EEEEEEEEEEEEEEEEEEEEEEEEEEEE')
      console.log(this.formInline.org_code)
      console.log(this.formInline.org_type)
      let strDate = ''
      let endDate = ''
      if (this.formInline.report_type == 'MONTH') {
        strDate = this.formInline.start_date
        endDate = this.formInline.end_date
      } else {
        strDate = this.formInline.start_date + this.weekStrData
        endDate = this.formInline.end_date + this.weekEndData
      }
      this.type = type
      this.$refs['ruleForm'].validate(valid => {
        debugger
        if (this.formInline.report_type == 'WEEK') {
          this.checkErrorMsgStr()
          this.checkErrorMsgEnd()
        }
        this.checkOrgType()
        if (
          strDate > endDate &&
          !this.showErrorMsgStr &&
          !this.showErrorMsgEnd
        ) {
          return this.$message.warning('结束会计时间不能小于开始会计时间')
        }
        console.log('??????????????????????????????????')
        console.log(this.formInline.org_code)
        if (valid && !this.showErrorMsgStr && !this.showErrorMsgEnd) {
          this.getManagementAnalysisData()
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    //查询数据接口
    async getManagementAnalysisData() {
      debugger
      console.log(this.formInline.org_code)
      console.log(this.formInline.org_type)
      let target_name = ''
      let url = ''
      let postData = {}
      if (this.formInline.project_type == 'PROJECT') {
        target_name = this.targetName.PROJECT
      } else {
        target_name = this.targetName.ANALYSIS
      }
      let data = JSON.stringify(data)
      if (
        !this.formInline.org_code ||
        JSON.stringify(this.formInline.org_code) == '{}'
      ) {
        this.formInline.org_code = this.userOrgCode
      }
      if (this.formInline.report_type == 'MONTH') {
        this.weekStrData = ''
        this.weekEndData = ''
      } else {
      }
      console.log('LLLLLLLLLLLLLLLLLLLLLLLL')
      console.log(this.formInline.org_code)
      postData.org_code = this.formInline.org_code
      postData.org_type = this.formInline.org_type
      postData.show_branch = this.formInline.show_branch
      postData.project_type = this.formInline.project_type
      postData.report_type = this.formInline.report_type
      postData.start_date = this.formInline.start_date + this.weekStrData
      postData.end_date = this.formInline.end_date + this.weekEndData
      postData.show_level = this.formInline.show_level
      if (this.type == 'search') {
        this.loading = true
        url = this.searchUrl
        await NetAPI.searchManagementAnalysis(url, target_name, postData)
          .then(res => {
            debugger
            console.log(res)
            this.tableData = []
            this.data_ = []
            this.thead = []
            this.thead_y = []
            this.filterObj = {}
            this.loading = false
            if (res.tbody.length > 0) {
              this.leibie = '项目/机构'
              this.tableData = res.tbody
              this.filterObj = jsonData[this.formInline.project_type]
              this.setTableData()
            } else {
              this.leibie = ''
              return
            }
          })
          .catch(error => {
            this.loading = false
          })
      } else {
        url = this.exportUrl
        await NetAPI.searchManagementAnalysis_export(url, target_name, postData)
      }
    },
    //报表类型
    reportTypeStr(val) {
      debugger
      console.log(val)

      // if (val == 'MONTH' && this.org_code_month !== this.userOrgCode) {
      //   this.formInline.org_code = this.org_code_month
      // } else if (val == 'WEEK' && this.org_code_week !== this.userOrgCode) {
      //   this.formInline.org_code = this.org_code_week
      // }
    },
    reportTypeEnd() {
      this.showErrorMsgStr = false
      this.showErrorMsgEnd = false
    },
    //重置表单数据
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    countProperties(obj) {
      var count = 0
      for (var property in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, property)) {
          count++
        }
      }
      return count
    }
  }
}
</script>
