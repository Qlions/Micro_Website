<template>
  <div class="container">
    <header class="container-header">
        <b :class='true' @click="backBtn">
          <img src="../../assets/image/head-back.png" alt="返回图标">
        </b>
        <h2>慢性病评估</h2>
        <div class="home_mian_1" @click="clientUpdate"></div>
    </header>
    <div class="container_content">
      <!-- Q1 -->
      <div class="container_list" ref="Q1">
        <div class="container_list_subject">
          <span class="question_num">{{ msgMale[0].num }}：</span>
          {{ msgMale[0].title }}
        </div>
        <div class="container_list_answer_radio" id="container_list_answer_a_5">
          <ul class="">
            <li v-for="(item, index) in msgMale[0].answer" @click="getDataQ1(item.answerType,item.answerKey)" :class="{ active : Q1 == item.answerType }">
              <label :for="item.id">
                <span>
                  <input type="radio" :name="item.answerKey" :value="item.answerType" :id="item.id" v-model="Q1">
                </span>
                {{ item.answerName }}
              </label> 
            </li>
          </ul>
        </div>
      </div>

      <!-- Q2 -->
      <div class="container_list" ref="Q2">
        <div class="container_list_subject">
          <span class="question_num">{{ msgMale[1].num }}：</span>
          {{ msgMale[1].title }}
        </div>
        <div class="container_list_answer_radio" id="container_list_answer_b">
          <ul class="">
            <li v-for="item in msgMale[1].answer"  @click="getDataQ2(item.answerType,item.answerKey)" :class="{ active : Q2 == item.answerType }">
              <label :for="item.id">
                <span>
                  <input type="radio" :name="item.answerKey" :id="item.id" :value="item.answerType" v-model="Q2">
                </span>
                {{ item.answerName }}
              </label> 
            </li>
          </ul>
        </div>
      </div>

      <!-- Q3 -->
      <div class="container_list" ref="Q3">
        <div class="container_list_subject">
          <span class="question_num">{{ msgMale[2].num }}：</span>
          {{ msgMale[2].title }}
        </div>
        <div class="container_list_answer_radio" id="container_list_answer_c">
          <ul class="">
            <li v-for="item in msgMale[2].answer"  @click="getDataQ3(item.answerType,item.answerKey)" :class="{ active : Q3 == item.answerType }">
              <label :for="item.id">
                <span>
                  <input type="radio" :name="item.answerKey" :id="item.id" :value="item.answerType" v-model="Q3">
                </span>   
                {{ item.answerName }}
              </label> 
            </li>
          </ul>
        </div>
      </div>

      <!-- Q4 -->
      <div class="container_list" ref="Q4">
        <div class="container_list_subject">
          <span class="question_num">{{ msgMale[3].num }}：</span>
          {{ msgMale[3].title }}
        </div>
        <div class="container_list_answer_check" id="container_list_answer_c">
          <ul class="">
            <li v-for="(item,index) in msgMale[3].answer" @click="getDataQ4(item.answerType,item.answerKey)" :class="{ active : isInArray(checkArr,item.answerKey) }" v-if="gender != item.type">
              <label :for="item.id">
                <span>
                  <input type="checkbox" :name="item.answerKey" :id="item.id" :value="item.answerKey" :count="item.count" v-model="checkArr">
                </span>  
                {{ item.answerName }}
              </label> 
            </li>
          </ul>
        </div>
      </div>

      <!-- Q5 -->
      <div class="container_list" ref="Q5">
        <div class="container_list_subject">
          <span class="question_num">{{ msgMale[4].num }}：</span>
          {{ msgMale[4].title }}
        </div>
        <div class="container_list_answer_radio" id="container_list_answer_a_2">
          <ul class="">
            <li v-for="(item,index) in msgMale[4].answer" @click="getDataQ5(item.answerType,item.answerKey)" :class="{ active : Q5 == item.answerType }">
              <label :for="item.id">
                <span>
                  <input type="radio" :name="item.answerKey" :id="item.id" :value="item.answerType" :count="item.count" v-model="Q5">
                </span>  
                {{ item.answerName }}
              </label> 
            </li>
          </ul>
        </div>
      </div>

      <!-- Q6 -->
      <div class="container_list" ref="Q6">
        <div class="container_list_subject">
          <span class="question_num">{{ msgMale[5].num }}：</span>
          {{ msgMale[5].title }}
        </div>
        <div class="container_list_answer_radio" id="container_list_answer_a_2">
          <ul class="">
            <li v-for="item in msgMale[5].answer" @click="getDataQ6(item.answerType,item.answerKey)" :class="{ active : Q6 == item.answerType }">
              <label :for="item.id">
                <span>
                  <input type="radio" :name="item.answerKey" :id="item.id" :value="item.answerType" :count="item.count" v-model="Q6">
                </span> 
                {{ item.answerName }}
              </label> 
            </li>
          </ul>
        </div>
      </div>

      <!-- Q7 -->
      <div class="container_list" ref="Q7">
        <div class="container_list_subject">
          <span class="question_num">{{ msgMale[6].num }}：</span>
          {{ msgMale[6].title }}
        </div>
        <div class="container_list_answer_check" id="container_list_answer_c">
          <ul class="">
            <li v-for="(item, index) in msgMale[6].answer" @click="getDataQ7(item.answerType,item.answerKey)" :class="{ active : isInArray(checkArr,item.answerKey) }">
              <label :for="item.id">
                <span>
                  <input type="checkbox" :name="item.answerKey" :id="item.id" :value="item.answerKey" v-model="checkArr">
                </span> 
                {{ item.answerName }}
              </label>
            </li>
          </ul>
        </div>
      </div>

      <!-- Q8 -->
      <div class="container_list" ref="Q8">
        <div class="container_list_subject">
          <span class="question_num">{{ msgMale[7].num }}：</span>
          {{ msgMale[7].title }}
        </div>
        <div class="container_list_answer_check" id="container_list_answer_c">
          <ul class="">
            <li v-for="(item, index) in msgMale[7].labels">
              <label :for="item.id" :class="{ active : isInArrayTitle(checkTitleArr,item.classType) }" >
                <span>
                  <input type="checkbox" :name="item.answerKey" :id="item.id" :value="item.classType">
                </span>
                {{ item.title }}
              </label>
              <div v-for="labels in item.answer" class="second_level_q8" :id="item.class">
                <label :for="labels.id" @click="getDataQ8(labels.answerType,labels.answerKey)" :class="{ active : isInArray(checkArr,labels.answerKey) }">
                  <span>
                    <input type="checkbox" :name="labels.answerKey" :id="labels.id" :value="labels.answerKey" v-model="checkArr">
                  </span>    
                  {{ labels.answerName }}
                </label>
              </div>  
            </li>
          </ul>
        </div>
      </div>
      
       <!-- Q9-->
      <div class="container_list" ref="Q9" v-show="isInArray(checkArr,'chd_f')">
        <div class="container_list_subject">
          <span class="question_num">{{ msgMale[8].num }}：</span>
          {{ msgMale[8].title }}
        </div>
        <div class="container_list_answer_radio" id="container_list_answer_a_2">
          <ul class="">
            <li v-for="item in msgMale[8].answer" @click="getDataQ9(item.answerType,item.answerKey)" :class="{ active : Q9 == item.answerType }">
              <label :for="item.id">
                <span>
                  <input type="radio" :name="item.answerKey" :id="item.id" :value="item.answerType" :count="item.count" v-model="Q9">
                </span> 
                {{ item.answerName }}
              </label> 
            </li>
          </ul>
        </div>
      </div>
      
      <!-- 10-->
      <div class="container_list" ref="Q10" v-show="isInArray(checkArr,'chd_m')">
        <div class="container_list_subject">
          <span class="question_num">{{ msgMale[9].num }}：</span>
          {{ msgMale[9].title }}
        </div>
        <div class="container_list_answer_radio" id="container_list_answer_a_2">
          <ul class="">
            <li v-for="item in msgMale[9].answer" @click="getDataQ10(item.answerType,item.answerKey)" :class="{ active : Q10 == item.answerType }">
              <label :for="item.id">
                <span>
                  <input type="radio" :name="item.answerKey" :id="item.id" :value="item.answerType" :count="item.count" v-model="Q10">
                </span> 
                {{ item.answerName }}
              </label> 
            </li>
          </ul>
        </div>
      </div> 

      <!-- Q11 -->
      <div class="container_list" ref="Q11">
        <div class="container_list_subject">
          <span class="question_num">{{ msgMale[10].num }}：</span>
          {{ msgMale[10].title }}
        </div>
        <div class="container_list_answer_radio" id="container_list_answer_c">
          <ul class="">
            <li v-for="item in msgMale[10].answer" @click="getDataQ11(item.answerType,item.answerKey)" :class="{ active : Q11 == item.answerType }">
              <label :for="item.id">
                <span>
                  <input type="radio" :name="item.answerKey" :id="item.id" :value="item.answerType" :count="item.count" v-model="Q11">
                </span>   
                {{ item.answerName }}
              </label> 
            </li>
          </ul>
        </div>
      </div>
      
      <!-- Q12 -->
      <div class="container_list" ref="Q12" v-show="judge_11">
        <div class="container_list_subject_completion">
          <span class="question_num">{{ msgMale[11].num }}：</span>
          <span>{{ msgMale[11].title }}</span>
          <input type="text" :id="msgMale[11].id" :name="msgMale[11].answerKey" :data="msgMale[11].answerKey" :count="msgMale[11].count" @blur="getDataQ12(Q12,msgMale[11].answerKey)" v-model="Q12">
          <span>分钟</span>
        </div>
      </div>

      <!-- Q13 -->
      <div class="container_list" ref="Q13" v-show="judge_11">
        <div class="container_list_subject">
          <span class="question_num">{{ msgMale[12].num }}：</span>
          {{ msgMale[12].title }}
        </div>
        <div class="container_list_answer_radio" id="container_list_answer_a_2">
          <ul class="">
            <li v-for="item in msgMale[12].answer" @click="getDataQ13(item.answerType,item.answerKey)" :class="{ active : Q13 == item.answerType }">
              <label :for="item.id">
                <span>
                  <input type="radio" :name="item.answerKey" :id="item.id" :value="item.answerType" :count="item.count" v-model="Q13">
                </span>   
                {{ item.answerName }}
              </label> 
            </li>
          </ul>
        </div>
      </div>

      <!-- Q14 -->
      <div class="container_list" ref="Q14" v-show="judge_11">
        <div class="container_list_subject">
          <span class="question_num">{{ msgMale[13].num }}：</span>
          {{ msgMale[13].title }}
        </div>
        <div class="container_list_answer_radio" id="container_list_answer_a_2">
          <ul class="">
            <li v-for="item in msgMale[13].answer" @click="getDataQ14(item.answerType,item.answerKey)" :class="{ active : Q14 == item.answerType }">
              <label :for="item.id">
                <span>
                  <input type="radio" :name="item.answerKey" :id="item.id" :value="item.answerType" :count="item.count" v-model="Q14">
                </span> 
                {{ item.answerName }}
              </label> 
            </li>
          </ul>
        </div>
      </div>

      <!-- Q15 -->
      <div class="container_list" ref="Q15" v-show="judge_11">
        <div class="container_list_subject">
          <span class="question_num">{{ msgMale[14].num }}：</span>
          {{ msgMale[14].title }}
        </div>
        <div class="container_list_answer_radio" id="container_list_answer_a_2">
          <ul class="">
            <li v-for="item in msgMale[14].answer" @click="getDataQ15(item.answerType,item.answerKey)" :class="{ active : Q15 == item.answerType }">
              <label :for="item.id">
                <span>
                  <input type="radio" :name="item.answerKey" :id="item.id" :count="item.count" :value="item.answerType" v-model="Q15">
                </span>
                {{ item.answerName }}
              </label> 
            </li>
          </ul>
        </div>
      </div>

      <!-- Q16 -->
      <div class="container_list" ref="Q16" v-show="judge_11">
        <div class="container_list_subject">
          <span class="question_num">{{ msgMale[15].num }}：</span>
          {{ msgMale[15].title }}
        </div>
        <div class="container_list_answer_radio" id="container_list_answer_a_2">
          <ul class="">
            <li v-for="item in msgMale[15].answer" @click="getDataQ16(item.answerType,item.answerKey)" :class="{ active : Q16 == item.answerType }">
              <label :for="item.id">
                <span>
                  <input type="radio" :name="item.answerKey" :id="item.id" :value="item.answerType" :count="item.count" v-model="Q16">
                </span> 
                {{ item.answerName }}
              </label> 
            </li>
          </ul>
        </div>
      </div>

      <!-- Q17 -->
      <div class="container_list" ref="Q17" v-show="judge_11">
        <div class="container_list_subject">
          <span class="question_num">{{ msgMale[16].num }}：</span>
          {{ msgMale[16].title }}
        </div>
        <div class="container_list_answer_radio" id="container_list_answer_c">
          <ul class="">
            <li v-for="item in msgMale[16].answer" @click="getDataQ17(item.answerType,item.answerKey)" :class="{ active : Q17 == item.answerType }">
              <label :for="item.id">
                <span>
                  <input type="radio" :name="item.answerKey" :id="item.id" :value="item.answerType" :count="item.count" v-model="Q17">
                </span>
                {{ item.answerName }}
              </label> 
            </li>
          </ul>
        </div>
      </div>

      <!-- Q18 -->
      <div class="container_list" ref="Q18" v-show="judge_11">
        <div class="container_list_subject">
          <span class="question_num">{{ msgMale[17].num }}：</span>
          {{ msgMale[17].title }}
        </div>
        <div class="container_list_answer_radio" id="container_list_answer_a_2">
          <ul class="">
            <li v-for="item in msgMale[17].answer" @click="getDataQ18(item.answerType,item.answerKey)" :class="{ active : Q18 == item.answerType }">
              <label :for="item.id">
                <span>
                  <input type="radio" :name="item.answerKey" :id="item.id" :value="item.answerType" :count="item.count" v-model="Q18">
                </span> 
                {{ item.answerName }}
              </label> 
            </li>
          </ul>
        </div>
      </div>

      <!-- Q19 -->
      <div class="container_list" ref="Q19" v-show="judge_11">
        <div class="container_list_subject">
          <span class="question_num">{{ msgMale[18].num }}：</span>
          {{ msgMale[18].title }}
        </div>
        <div class="container_list_answer_radio" id="container_list_answer_c">
          <ul class="">
            <li v-for="item in msgMale[18].answer" @click="getDataQ19(item.answerType,item.answerKey)" :class="{ active : Q19 == item.answerType }">
              <label :for="item.id">
                <span>
                  <input type="radio" :name="item.answerKey" :id="item.id" :value="item.answerType" :count="item.count" v-model="Q19">
                </span>
                {{ item.answerName }}
              </label> 
            </li>
          </ul>
        </div>
      </div>

      <!-- Q20 -->
      <div class="container_list" ref="Q20" v-show="judge_11">
        <div class="container_list_subject_completion">
          <span class="question_num">{{ msgMale[19].num }}：</span>
          <span>{{ msgMale[19].title }}</span>
          <input type="text" :id="msgMale[19].id" :name="msgMale[19].answerKey" :data="msgMale[19].answerKey" :count="msgMale[19].count" @click="getDataQ20(Q20,msgMale[19].answerKey)"  readonly v-model="Q20">
          <span>岁</span>
        </div>
      </div>

      <!-- Q21 -->
      <div class="container_list" ref="Q21" v-show="judge_11s">
        <div class="container_list_subject_completion">
          <span class="question_num">{{ msgMale[20].num }}：</span>
          <span>{{ msgMale[20].title }}</span>
          <input type="text" :id="msgMale[20].id" :name="msgMale[20].answerKey" :data="msgMale[20].answerKey" :count="msgMale[20].count" @click="getDataQ21(Q21,msgMale[20].answerKey)" readonly v-model="Q21">
          <span>岁</span>
        </div>
      </div>

      <!-- Q22 -->
      <div class="container_list" ref="Q22" v-show="judge_11s">
        <div class="container_list_subject_completion">
          <span class="question_num">{{ msgMale[21].num }}：</span>
          <span>{{ msgMale[21].title }}</span>
          <input type="text" :id="msgMale[21].id" :name="msgMale[21].answerKey" :data="msgMale[21].answerKey" :count="msgMale[21].count" @click="getDataQ22(Q22,msgMale[21].answerKey)" readonly v-model="Q22">
          <span>岁</span>
        </div>
      </div>

      <!-- Q23 -->
      <div class="container_list" ref="Q23" v-show="judge_11s">
        <div class="container_list_subject">
          <span class="question_num">{{ msgMale[22].num }}：</span>
          {{ msgMale[22].title }}
        </div>
        <div class="container_list_answer_radio" id="container_list_answer_b">
          <ul class="">
            <li v-for="item in msgMale[22].answer" @click="getDataQ23(item.answerType,item.answerKey)" :class="{ active : Q23 == item.answerType }">
              <label :for="item.id">
                <span>
                  <input type="radio" :name="item.answerKey" :id="item.id" :value="item.answerType" :count="item.count" v-model="Q23">
                </span> 
                {{ item.answerName }}
              </label> 
            </li>
          </ul>
        </div>
      </div>

      <!-- Q24 -->
      <div class="container_list" ref="Q24" v-if="judge_11as">
        <div class="container_list_subject">
          <span class="question_num">{{ msgMale[23].num }}：</span>
          {{ msgMale[23].title }}
        </div>
        <div class="container_list_answer_radio" id="container_list_answer_a_2">
          <ul class="">
            <li v-for="item in msgMale[23].answer" @click="getDataQ24(item.answerType,item.answerKey)" :class="{ active : Q24 == item.answerType }">
              <label :for="item.id">
                <span>
                  <input type="radio" :name="item.answerKey" :id="item.id" :value="item.answerType" :count="item.count" v-model="Q24">
                </span> 
                {{ item.answerName }}
              </label> 
            </li>
          </ul>
        </div>
      </div>

      <!-- Q25 -->
      <div class="container_list" ref="Q25" v-if="judge_24">
        <div class="container_list_subject">
          <span class="question_num">{{ msgMale[24].num }}：</span>
          {{ msgMale[24].title }}
        </div>
        <div class="container_list_answer_radio" id="container_list_answer_b">
          <ul class="">
            <li v-for="item in msgMale[24].answer" @click="getDataQ25(item.answerType,item.answerKey)" :class="{ active : Q25 == item.answerType }">
              <label :for="item.id">
                <span>
                  <input type="radio" :name="item.answerKey" :id="item.id" :value="item.answerType" :count="item.count" v-model="Q25">
                </span>
                {{ item.answerName }}
              </label> 
            </li>
          </ul>
        </div>
      </div>

      <!-- Q26 -->
      <div class="container_list" ref="Q26">
        <div class="container_list_subject">
          <span class="question_num">{{ msgMale[25].num }}：</span>
          {{ msgMale[25].title }}
        </div>
        <div class="container_list_answer_radio" id="container_list_answer_a_2">
          <ul class="">
            <li v-for="item in msgMale[25].answer" @click="getDataQ26(item.answerType,item.answerKey)" :class="{ active : Q26 == item.answerType }">
              <label :for="item.id">
                <span>
                  <input type="radio" :name="item.answerKey" :id="item.id" :value="item.answerType" :count="item.count" v-model="Q26">
                </span>
                {{ item.answerName }}
              </label> 
            </li>
          </ul>
        </div>
      </div>

      <!-- Q27 -->
      <div class="question_Q27" ref="Q27">{{ msgMale[26].title }}</div>
      <div class="container_list" ref="Q27A">
        <div class="container_list_subject">
          <span class="question_num">{{ msgMale[26].labels[0].num }}：</span>
          {{ msgMale[26].labels[0].title }}
        </div>
        <div class="container_list_answer_radio" id="container_list_answer_Columns">
          <div class="container_list_answer_Columns_week">
            <div class="container_list_answer_Columns_title">
              <p>{{ msgMale[26].labels[0].labels_er[0].method }}</p>
            </div>
            <ul>
              <li v-for="answer in msgMale[26].labels[0].labels_er[0].answer" :class="{ active : Q27A == answer.answerType }" @click="getDataQ27A(answer.answerType,answer.answerKey)">
                <label :for="answer.id">
                  <span>
                    <input type="radio" :name="answer.answerKey" :id="answer.id" :count="answer.count" :value="answer.answerType" v-model="Q27A">
                  </span>
                  {{ answer.answerName }}
                </label> 
              </li>
            </ul>
          </div> 
        </div>
        <div class="container_list_answer_radio" id="container_list_answer_Columns">
          <div class="container_list_answer_Columns_week">
            <div class="container_list_answer_Columns_title">
              <p>{{ msgMale[26].labels[0].labels_er[1].method }}</p>
            </div>
            <ul>
              <li v-for="answer in msgMale[26].labels[0].labels_er[1].answer" :class="{ active : Q27As == answer.answerType }" @click="getDataQ27As(answer.answerType,answer.answerKey)">
                <label :for="answer.id">
                  <span>
                    <input type="radio" :name="answer.answerKey" :id="answer.id" :count="answer.count" :value="answer.answerType" v-model="Q27As">
                  </span>
                  {{ answer.answerName }}
                </label> 
              </li>
            </ul>
          </div> 
        </div>
      </div>
      <!-- Q27-2 -->
      <div class="container_list" ref="Q27B">
        <div class="container_list_subject">
          <span class="question_num">{{ msgMale[26].labels[1].num }}：</span>
          {{ msgMale[26].labels[1].title }}
        </div>
        <div class="container_list_answer_radio" id="container_list_answer_Columns">
          <div class="container_list_answer_Columns_week">
            <div class="container_list_answer_Columns_title">
              <p>{{ msgMale[26].labels[1].labels_er[0].method }}</p>
            </div>
            <ul>
              <li v-for="answer in msgMale[26].labels[1].labels_er[0].answer" :class="{ active : Q27B == answer.answerType }" @click="getDataQ27B(answer.answerType,answer.answerKey)">
                <label :for="answer.id">
                  <span>
                    <input type="radio" :name="answer.answerKey" :id="answer.id" :count="answer.count" :value="answer.answerType" v-model="Q27B">
                  </span>
                  {{ answer.answerName }}
                </label> 
              </li>
            </ul>
          </div> 
        </div>
        <div class="container_list_answer_radio" id="container_list_answer_Columns">
          <div class="container_list_answer_Columns_week">
            <div class="container_list_answer_Columns_title">
              <p>{{ msgMale[26].labels[1].labels_er[1].method }}</p>
            </div>
            <ul>
              <li v-for="answer in msgMale[26].labels[1].labels_er[1].answer" :class="{ active : Q27Bs == answer.answerType }" @click="getDataQ27Bs(answer.answerType,answer.answerKey)">
                <label :for="answer.id">
                  <span>
                    <input type="radio" :name="answer.answerKey" :id="answer.id" :count="answer.count" :value="answer.answerType" v-model="Q27Bs">
                  </span>
                  {{ answer.answerName }}
                </label> 
              </li>
            </ul>
          </div> 
        </div>
      </div>
      <!-- Q27-3 -->
      <div class="container_list" ref="Q27C">
        <div class="container_list_subject">
          <span class="question_num">{{ msgMale[26].labels[2].num }}：</span>
          {{ msgMale[26].labels[2].title }}
        </div>
        <div class="container_list_answer_radio" id="container_list_answer_Columns">
          <div class="container_list_answer_Columns_week">
            <div class="container_list_answer_Columns_title">
              <p>{{ msgMale[26].labels[2].labels_er[0].method }}</p>
            </div>
            <ul>
              <li v-for="answer in msgMale[26].labels[2].labels_er[0].answer" :class="{ active : Q27C == answer.answerType }" @click="getDataQ27C(answer.answerType,answer.answerKey)">
                <label :for="answer.id">
                  <span>
                    <input type="radio" :name="answer.answerKey" :id="answer.id" :count="answer.count" :value="answer.answerType"v-model="Q27C">
                  </span>
                  {{ answer.answerName }}
                </label> 
              </li>
            </ul>
          </div> 
        </div>
        <div class="container_list_answer_radio" id="container_list_answer_Columns">
          <div class="container_list_answer_Columns_week">
            <div class="container_list_answer_Columns_title">
              <p>{{ msgMale[26].labels[2].labels_er[1].method }}</p>
            </div>
            <ul>
              <li v-for="answer in msgMale[26].labels[2].labels_er[1].answer" :class="{ active : Q27Cs == answer.answerType }" @click="getDataQ27Cs(answer.answerType,answer.answerKey)">
                <label :for="answer.id">
                  <span>
                    <input type="radio" :name="answer.answerKey" :id="answer.id" :count="answer.count" :value="answer.answerType"v-model="Q27Cs">
                  </span>
                  {{ answer.answerName }}
                </label> 
              </li>
            </ul>
          </div> 
        </div>
      </div>
      <!-- Q27-4 -->
      <div class="container_list" ref="Q27D">
        <div class="container_list_subject">
          <span class="question_num">{{ msgMale[26].labels[3].num }}：</span>
          {{ msgMale[26].labels[3].title }}
        </div>
        <div class="container_list_answer_radio" id="container_list_answer_Columns">
          <div class="container_list_answer_Columns_week">
            <div class="container_list_answer_Columns_title">
              <p>{{ msgMale[26].labels[3].labels_er[0].method }}</p>
            </div>
            <ul>
              <li v-for="answer in msgMale[26].labels[3].labels_er[0].answer" :class="{ active : Q27D == answer.answerType  }" @click="getDataQ27D(answer.answerType,answer.answerKey)">
                <label :for="answer.id">
                  <span>
                    <input type="radio" :name="answer.answerKey" :id="answer.id" :count="answer.count" :value="answer.answerType"v-model="Q27D">
                  </span>
                  {{ answer.answerName }}
                </label> 
              </li>
            </ul>
          </div> 
        </div>
        <div class="container_list_answer_radio" id="container_list_answer_Columns">
          <div class="container_list_answer_Columns_week">
            <div class="container_list_answer_Columns_title">
              <p>{{ msgMale[26].labels[3].labels_er[1].method }}</p>
            </div>
            <ul>
              <li v-for="answer in msgMale[26].labels[3].labels_er[1].answer" :class="{ active : Q27Ds == answer.answerType }" @click="getDataQ27Ds(answer.answerType,answer.answerKey)">
                <label :for="answer.id">
                  <span>
                    <input type="radio" :name="answer.answerKey" :id="answer.id" :count="answer.count" :value="answer.answerType"v-model="Q27Ds">
                  </span>
                  {{ answer.answerName }}
                </label> 
              </li>
            </ul>
          </div> 
        </div>
      </div>
      <!-- Q27-5 -->
      <div class="container_list" ref="Q27E">
        <div class="container_list_subject">
          <span class="question_num">{{ msgMale[26].labels[4].num }}：</span>
          {{ msgMale[26].labels[4].title }}
        </div>
        <div class="container_list_answer_radio" id="container_list_answer_Columns">
          <div class="container_list_answer_Columns_week">
            <div class="container_list_answer_Columns_title">
              <p>{{ msgMale[26].labels[4].labels_er[0].method }}</p>
            </div>
            <ul>
              <li v-for="answer in msgMale[26].labels[4].labels_er[0].answer" :class="{ active : Q27E == answer.answerType }" @click="getDataQ27E(answer.answerType,answer.answerKey)">
                <label :for="answer.id">
                  <span>
                    <input type="radio" :name="answer.answerKey" :id="answer.id" :count="answer.count" :value="answer.answerType"v-model="Q27E">
                  </span>
                  {{ answer.answerName }}
                </label> 
              </li>
            </ul>
          </div> 
        </div>
        <div class="container_list_answer_radio" id="container_list_answer_Columns">
          <div class="container_list_answer_Columns_week">
            <div class="container_list_answer_Columns_title">
              <p>{{ msgMale[26].labels[4].labels_er[1].method }}</p>
            </div>
            <ul>
              <li v-for="answer in msgMale[26].labels[4].labels_er[1].answer" :class="{ active : Q27Es == answer.answerType }" @click="getDataQ27Es(answer.answerType,answer.answerKey)">
                <label :for="answer.id">
                  <span>
                    <input type="radio" :name="answer.answerKey" :id="answer.id" :count="answer.count" :value="answer.answerType"v-model="Q27Es">
                  </span>
                  {{ answer.answerName }}
                </label> 
              </li>
            </ul>
          </div> 
        </div>
      </div>
      <!-- Q27-6 -->
      <div class="container_list" ref="Q27F">
        <div class="container_list_subject">
          <span class="question_num">{{ msgMale[26].labels[5].num }}：</span>
          {{ msgMale[26].labels[5].title }}
        </div>
        <div class="container_list_answer_radio" id="container_list_answer_Columns">
          <div class="container_list_answer_Columns_week">
            <div class="container_list_answer_Columns_title">
              <p>{{ msgMale[26].labels[5].labels_er[0].method }}</p>
            </div>
            <ul>
              <li v-for="answer in msgMale[26].labels[5].labels_er[0].answer" :class="{ active : Q27F == answer.answerType }" @click="getDataQ27F(answer.answerType,answer.answerKey)">
                <label :for="answer.id">
                  <span>
                    <input type="radio" :name="answer.answerKey" :id="answer.id" :count="answer.count" :value="answer.answerType"v-model="Q27F">
                  </span>
                  {{ answer.answerName }}
                </label> 
              </li>
            </ul>
          </div> 
        </div>
        <div class="container_list_answer_radio" id="container_list_answer_Columns">
          <div class="container_list_answer_Columns_week">
            <div class="container_list_answer_Columns_title">
              <p>{{ msgMale[26].labels[5].labels_er[1].method }}</p>
            </div>
            <ul>
              <li v-for="answer in msgMale[26].labels[5].labels_er[1].answer" :class="{ active : Q27Fs == answer.answerType }" @click="getDataQ27Fs(answer.answerType,answer.answerKey)">
                <label :for="answer.id">
                  <span>
                    <input type="radio" :name="answer.answerKey" :id="answer.id" :count="answer.count" :value="answer.answerType" v-model="Q27Fs">
                  </span>
                  {{ answer.answerName }}
                </label> 
              </li>
            </ul>
          </div> 
        </div>
      </div>
      <!-- Q27-7 -->
      <div class="container_list" ref="Q27G">
        <div class="container_list_subject">
          <span class="question_num">{{ msgMale[26].labels[6].num }}：</span>
          {{ msgMale[26].labels[6].title }}
        </div>
        <div class="container_list_answer_radio" id="container_list_answer_Columns">
          <div class="container_list_answer_Columns_week">
            <div class="container_list_answer_Columns_title">
              <p>{{ msgMale[26].labels[6].labels_er[0].method }}</p>
            </div>
            <ul>
              <li v-for="answer in msgMale[26].labels[6].labels_er[0].answer" :class="{ active : Q27G == answer.answerType }" @click="getDataQ27G(answer.answerType,answer.answerKey)">
                <label :for="answer.id">
                  <span>
                    <input type="radio" :name="answer.answerKey" :id="answer.id" :count="answer.count" :value="answer.answerType"v-model="Q27G">
                  </span>
                  {{ answer.answerName }}
                </label> 
              </li>
            </ul>
          </div> 
        </div>
        <div class="container_list_answer_radio" id="container_list_answer_Columns">
          <div class="container_list_answer_Columns_week">
            <div class="container_list_answer_Columns_title">
              <p>{{ msgMale[26].labels[6].labels_er[1].method }}</p>
            </div>
            <ul>
              <li v-for="answer in msgMale[26].labels[6].labels_er[1].answer" :class="{ active : Q27Gs == answer.answerType }" @click="getDataQ27Gs(answer.answerType,answer.answerKey)">
                <label :for="answer.id">
                  <span>
                    <input type="radio" :name="answer.answerKey" :id="answer.id" :count="answer.count" :value="answer.answerType"v-model="Q27Gs">
                  </span>
                  {{ answer.answerName }}
                </label> 
              </li>
            </ul>
          </div> 
        </div>
      </div>
      <!-- Q27-8 -->
      <div class="container_list" ref="Q27H">
        <div class="container_list_subject">
          <span class="question_num">{{ msgMale[26].labels[7].num }}：</span>
          {{ msgMale[26].labels[7].title }}
        </div>
        <div class="container_list_answer_radio" id="container_list_answer_Columns">
          <div class="container_list_answer_Columns_week">
            <div class="container_list_answer_Columns_title">
              <p>{{ msgMale[26].labels[7].labels_er[0].method }}</p>
            </div>
            <ul>
              <li v-for="answer in msgMale[26].labels[7].labels_er[0].answer" :class="{ active : Q27H == answer.answerType }" @click="getDataQ27H(answer.answerType,answer.answerKey)">
                <label :for="answer.id">
                  <span>
                    <input type="radio" :name="answer.answerKey" :id="answer.id" :count="answer.count" :value="answer.answerType"v-model="Q27H">
                  </span>
                  {{ answer.answerName }}
                </label> 
              </li>
            </ul>
          </div> 
        </div>
        <div class="container_list_answer_radio" id="container_list_answer_Columns">
          <div class="container_list_answer_Columns_week">
            <div class="container_list_answer_Columns_title">
              <p>{{ msgMale[26].labels[7].labels_er[1].method }}</p>
            </div>
            <ul>
              <li v-for="answer in msgMale[26].labels[7].labels_er[1].answer" :class="{ active : Q27Hs == answer.answerType }" @click="getDataQ27Hs(answer.answerType,answer.answerKey)">
                <label :for="answer.id">
                  <span>
                    <input type="radio" :name="answer.answerKey" :id="answer.id" :count="answer.count" :value="answer.answerType"v-model="Q27Hs">
                  </span>
                  {{ answer.answerName }}
                </label> 
              </li>
            </ul>
          </div> 
        </div>
      </div>
      <!-- Q27-9 -->
      <div class="container_list" ref="Q27I">
        <div class="container_list_subject">
          <span class="question_num">{{ msgMale[26].labels[8].num }}：</span>
          {{ msgMale[26].labels[8].title }}
        </div>
        <div class="container_list_answer_radio" id="container_list_answer_Columns">
          <div class="container_list_answer_Columns_week" v-for="labelsData in msgMale[26].labels[8].labels_er">
            <div class="container_list_answer_Columns_title">
              <p>{{ labelsData.method }}</p>
            </div>
            <ul>
              <li v-for="answer in labelsData.answer" :class="{ active : Q27I == answer.answerType }" @click="getDataQ27I(answer.answerType,answer.answerKey)">
                <label :for="answer.id">
                  <span>
                    <input type="radio" :name="answer.answerKey" :id="answer.id" :count="answer.count" :value="answer.answerType"v-model="Q27I">
                  </span>
                  {{ answer.answerName }}
                </label> 
              </li>
            </ul>
          </div> 
        </div>
      </div>
      <!-- Q27-10 -->
      <div class="container_list" ref="Q27J">
        <div class="container_list_subject">
          <span class="question_num">{{ msgMale[26].labels[9].num }}：</span>
          {{ msgMale[26].labels[9].title }}
        </div>
        <div class="container_list_answer_radio" id="container_list_answer_Columns">
          <div class="container_list_answer_Columns_week" v-for="labelsData in msgMale[26].labels[9].labels_er">
            <div class="container_list_answer_Columns_title">
              <p>{{ labelsData.method }}</p>
            </div>
            <ul>
              <li v-for="answer in labelsData.answer" :class="{ active : Q27J == answer.answerType  }" @click="getDataQ27J(answer.answerType,answer.answerKey)">
                <label :for="answer.id">
                  <span>
                    <input type="radio" :name="answer.answerKey" :id="answer.id" :count="answer.count" :value="answer.answerType"v-model="Q27J">
                  </span>
                  {{ answer.answerName }}
                </label> 
              </li>
            </ul>
          </div> 
        </div>
      </div>
      <!-- Q27-11 -->
      <div class="container_list" ref="Q27K">
        <div class="container_list_subject">
          <span class="question_num">{{ msgMale[26].labels[10].num }}：</span>
          {{ msgMale[26].labels[10].title }}
        </div>
        <div class="container_list_answer_radio" id="container_list_answer_Columns">
          <div class="container_list_answer_Columns_week" v-for="labelsData in msgMale[26].labels[10].labels_er">
            <div class="container_list_answer_Columns_title">
              <p>{{ labelsData.method }}</p>
            </div>
            <ul>
              <li v-for="answer in labelsData.answer" :class="{ active : Q27K == answer.answerType }" @click="getDataQ27K(answer.answerType,answer.answerKey)">
                <label :for="answer.id">
                  <span>
                    <input type="radio" :name="answer.answerKey" :id="answer.id" :count="answer.count" :value="answer.answerType" v-model="Q27K">
                  </span>
                  {{ answer.answerName }}
                </label> 
              </li>
            </ul>
          </div> 
        </div>
      </div>

      <!-- Q28 -->
      <div class="container_list" ref="Q28">
        <div class="container_list_subject">
          <span class="question_num">{{ msgMale[27].num }}：</span>
          {{ msgMale[27].title }}
        </div>
        <div class="container_list_answer_radio" id="container_list_answer_c">
          <ul class="">
            <li v-for="item in msgMale[27].answer" @click="getDataQ28(item.answerType,item.answerKey)" :class="{ active : Q28 == item.answerType }">
              <label :for="item.id">
                <span>
                  <input type="radio" :name="item.answerKey" :id="item.id" :value="item.answerType" :count="item.count" v-model="Q28">
                </span>
                {{ item.answerName }}
              </label> 
            </li>
          </ul>
        </div>
      </div>

      <!-- Q29 -->
     <div class="container_list" ref="Q29">
        <div class="container_list_subject">
          <span class="question_num">{{ msgMale[28].num }}：</span>
          {{ msgMale[28].title }}
        </div>
        <div class="container_list_answer_check" id="container_list_answer_c">
          <ul class="">
            <li v-for="(item,index) in msgMale[28].answer" @click="getDataQ29(item.answerType,item.answerKey)" :class="{ active : isInArray(checkArr,item.answerKey) }">
              <label :for="item.id">
                <span>
                  <input type="checkbox" :name="item.answerKey" :id="item.id" :value="item.answerKey" :count="item.count" v-model="checkArr">
                </span>  
                {{ item.answerName }}
              </label> 
            </li>
          </ul>
        </div>
      </div>

      <!-- Q30 -->
      <div class="container_list" ref="Q30">
        <div class="container_list_subject">
          <span class="question_num">{{ msgMale[29].num }}：</span>
          {{ msgMale[29].title }}
        </div>
        <div class="container_list_answer_radio" id="container_list_answer_a_5">
          <ul class="">
            <li v-for="item in msgMale[29].answer" @click="getDataQ30(item.answerType,item.answerKey)" :class="{ active : Q30 == item.answerType }">
              <label :for="item.id">
                <span>
                  <input type="radio" :name="item.answerKey" :id="item.id" :value="item.answerType" :count="item.count" v-model="Q30">
                </span>
                {{ item.answerName }}
              </label> 
            </li>
          </ul>
        </div>
      </div>

      <!-- Q31 -->
      <div class="container_list" ref="Q31">
        <div class="container_list_subject">
          <span class="question_num">{{ msgMale[30].num }}：</span>
          {{ msgMale[30].title }}
        </div>
        <div class="container_list_answer_radio" id="container_list_answer_b">
          <ul class="">
            <li v-for="item in msgMale[30].answer" @click="getDataQ31(item.answerType,item.answerKey)" :class="{ active : Q31 == item.answerType }">
              <label :for="item.id">
                <span>
                  <input type="radio" :name="item.answerKey" :id="item.id" :value="item.answerType" :count="item.count" v-model="Q31">
                </span>
                {{ item.answerName }}
              </label> 
            </li>
          </ul>
        </div>
      </div>

      <!-- Q32 -->
      <div class="container_list" ref="Q32">
        <div class="container_list_subject">
          <span class="question_num">{{ msgMale[31].num }}：</span>
          {{ msgMale[31].title }}
        </div>
        <div class="container_list_answer_radio" id="container_list_answer_b">
          <ul class="">
            <li v-for="item in msgMale[31].answer" @click="getDataQ32(item.answerType,item.answerKey)" :class="{ active : Q32 == item.answerType }">
              <label :for="item.id">
                <span>
                  <input type="radio" :name="item.answerKey" :id="item.id" :value="item.answerType" :count="item.count" v-model="Q32">
                </span>  
                {{ item.answerName }}
              </label> 
            </li>
          </ul>
        </div>
      </div>

      <!-- Q33 -->
      <div class="container_list" ref="Q33">
        <div class="container_list_subject">
          <span class="question_num">{{ msgMale[32].num }}：</span>
          {{ msgMale[32].title }}
        </div>
        <div class="container_list_answer_radio" id="container_list_answer_c">
          <ul class="">
            <li v-for="item in msgMale[32].answer" @click="getDataQ33(item.answerType,item.answerKey)" :class="{ active : Q33 == item.answerType }">
              <label :for="item.id">
                <span>
                  <input type="radio" :name="item.answerKey" :id="item.id" :value="item.answerType" :count="item.count" v-model="Q33">
                </span>
                {{ item.answerName }}
              </label> 
            </li>
          </ul>
        </div>
      </div>

      <!-- Q34 -->
      <div class="container_list" ref="Q34" v-show="judge_33">
        <div class="container_list_subject">
          <span class="question_num">{{ msgMale[33].num }}：</span>
          {{ msgMale[33].title }}
        </div>
        <div class="container_list_answer_radio" id="container_list_answer_a_2">
          <ul class="">
            <li v-for="item in msgMale[33].answer" @click="getDataQ34(item.answerType,item.answerKey)" :class="{ active : Q34 == item.answerType }">
              <label :for="item.id">
                <span>
                  <input type="radio" :name="item.answerKey" :id="item.id" :value="item.answerType" :count="item.count" v-model="Q34">
                </span>
                {{ item.answerName }}
              </label> 
            </li>
          </ul>
        </div>
      </div>

      <!-- Q35 -->
      <div class="container_list" ref="Q35" v-show="judge_33">
        <div class="container_list_subject">
          <span class="question_num">{{ msgMale[34].num }}：</span>
          {{ msgMale[34].title }}
        </div>
        <div class="container_list_answer_radio" id="container_list_answer_b">
          <ul class="">
            <li v-for="item in msgMale[34].answer" @click="getDataQ35(item.answerType,item.answerKey)" :class="{ active : Q35 == item.answerType }">
              <label :for="item.id">
                <span>
                  <input type="radio" :name="item.answerKey" :id="item.id" :value="item.answerType" :count="item.count" v-model="Q35">
                </span>
                {{ item.answerName }}
              </label> 
            </li>
          </ul>
        </div>
      </div>

      <!-- Q36 -->
      <!-- <div class="container_list" ref="Q36" v-show="judge_33">
        <div class="container_list_subject">
          <span class="question_num">{{ msgMale[35].num }}：</span>
          {{ msgMale[35].title }}
        </div>
        <div class="container_list_answer_radio" id="container_list_answer_c">
          <ul class="">
            <li v-for="item in msgMale[35].answer" @click="getDataQ36(item.answerType,item.answerKey)" :class="{ active : Q36 == item.answerType }">
              <label :for="item.id">
                <span>
                  <input type="radio" :name="item.answerKey" :id="item.id" :value="item.answerType" :count="item.count" v-model="Q36">
                </span>
                {{ item.answerName }}
              </label> 
            </li>
          </ul>
        </div>
      </div> -->

      <div class="container_list" ref="Q36" v-show="judge_33">
        <div class="container_list_subject_completion">
          <span class="question_num">{{ msgMale[35].num }}：</span>
          <span>{{ msgMale[35].title }}</span>
          <input type="text" :id="msgMale[35].id" :name="msgMale[35].answerKey" :data="msgMale[35].answerKey" :count="msgMale[35].count" readonly @click="getDataQ36(Q36,msgMale[35].answerKey)" v-model="Q36">
          <span>岁</span>
        </div>
      </div>
      
      <!-- Q37 -->
      <div class="question_Q27" ref="Q371" v-show="judge_33">{{ msgMale[36].title }}</div>
      <div class="container_list" v-show="judge_33">
        <div class="container_list_subject">
          <span class="question_num">{{ msgMale[36].labels[0].num }}：</span>
          {{ msgMale[36].labels[0].title }}
        </div>
        <div class="container_list_subject_completion_2 container_list_answer_radio" id="container_list_answer_c">
          <ul class="">
            <li :class="{ active : Q371A != '' }">
              <div :for="msgMale[36].labels[0].labels_er[0].id" class="label_radio">
                <span class="question_Q27_ipt">
                 <input type="radio" class="container_iut" :name="msgMale[36].labels[0].labels_er[0].answerKey" :id="msgMale[36].labels[0].labels_er[0].id" :value="msgMale[36].labels[0].labels_er[0].answerKey" :title="msgMale[36].labels[0].labels_er[0].title" v-model="Q371">
                </span>
                <div class="container_box">
                  <b class="container_answerName">{{ msgMale[36].labels[0].labels_er[0].answerName }}</b> 
                  <input type="text" class="container_37" :id="msgMale[36].labels[0].labels_er[0].id" :name="msgMale[36].labels[0].labels_er[0].answerKey" :data="msgMale[36].labels[0].labels_er[0].answerKey" :count="msgMale[36].labels[0].labels_er[0].count" @blur="getDataQ371A(Q371A,msgMale[36].labels[0].labels_er[0].answerKey,Q371)" v-model="Q371A">
                  <b class="container_l">{{ msgMale[36].labels[0].labels_er[0].company }}</b>
                </div> 
              </div>    
            </li>
            <li :class="{ active : Q371B != '' }">
              <div :for="msgMale[36].labels[0].labels_er[1].id" class="label_radio">
                <span class="question_Q27_ipt">
                  <input type="radio" class="container_iut" :name="msgMale[36].labels[0].labels_er[1].answerKey" :id="msgMale[36].labels[0].labels_er[1].id" :value="msgMale[36].labels[0].labels_er[1].answerKey" :title="msgMale[36].labels[0].labels_er[1].title" v-model="Q371">
                </span>
                <div class="container_box">
                  <b class="container_answerName">{{ msgMale[36].labels[0].labels_er[1].answerName }}</b> 
                  <input type="text" class="container_37" :id="msgMale[36].labels[0].labels_er[1].id" :name="msgMale[36].labels[0].labels_er[1].answerKey" :data="msgMale[36].labels[0].labels_er[1].answerKey" :count="msgMale[36].labels[0].labels_er[1].count" @blur="getDataQ371B(Q371B,msgMale[36].labels[0].labels_er[1].answerKey,Q371)" v-model="Q371B">
                  <b class="container_l">{{ msgMale[36].labels[0].labels_er[1].company }}</b>
                </div>   
              </div>
               
            </li>
            <li :class="{ active : Q371C != '' }">
              <div :for="msgMale[36].labels[0].labels_er[2].id" class="label_radio">
                <span class="question_Q27_ipt">
                  <input type="radio" class="container_iut" :name="msgMale[36].labels[0].labels_er[2].answerKey" :id="msgMale[36].labels[0].labels_er[2].id" :value="msgMale[36].labels[0].labels_er[2].answerKey" :title="msgMale[36].labels[0].labels_er[2].title" v-model="Q371">
                </span>
                <div class="container_box">
                  <b class="container_answerName">{{ msgMale[36].labels[0].labels_er[2].answerName }}</b> 
                  <input type="text" class="container_37" :id="msgMale[36].labels[0].labels_er[2].id" :name="msgMale[36].labels[0].labels_er[2].answerKey" :data="msgMale[36].labels[0].labels_er[2].answerKey" :count="msgMale[36].labels[0].labels_er[2].count" @blur="getDataQ371C(Q371C,msgMale[36].labels[0].labels_er[2].answerKey,Q371)" v-model="Q371C">
                  <b class="container_l">{{ msgMale[36].labels[0].labels_er[2].company }}</b>
                </div> 
              </div>
              
            </li>
            <li :class="{ active : Q371D != '' }">
              <div :for="msgMale[36].labels[0].labels_er[3].id" class="label_radio">
                <span class="question_Q27_ipt">
                  <input type="radio" class="container_iut" :name="msgMale[36].labels[0].labels_er[3].answerKey" :id="msgMale[36].labels[0].labels_er[3].id" :value="msgMale[36].labels[0].labels_er[3].answerKey" :title="msgMale[36].labels[0].labels_er[3].title" v-model="Q371">
                </span>
                <div class="container_box">
                  <b class="container_answerName">{{ msgMale[36].labels[0].labels_er[3].answerName }}</b> 
                  <input type="text" class="container_37" :id="msgMale[36].labels[0].labels_er[3].id" :name="msgMale[36].labels[0].labels_er[3].answerKey" :data="msgMale[36].labels[0].labels_er[3].answerKey" :count="msgMale[36].labels[0].labels_er[3].count" @blur="getDataQ371D(Q371D,msgMale[36].labels[0].labels_er[3].answerKey,Q371)" v-model="Q371D">
                  <b class="container_l">{{ msgMale[36].labels[0].labels_er[3].company }}</b> 
                </div>  
              </div>
               
            </li>
            <li :class="{ active : Q371E != '' }">
              <div :for="msgMale[36].labels[0].labels_er[4].id" class="label_radio">
                <span class="question_Q27_ipt">
                  <input type="radio" class="container_iut" :name="msgMale[36].labels[0].labels_er[4].answerKey" :id="msgMale[36].labels[0].labels_er[4].id" :value="msgMale[36].labels[0].labels_er[4].answerKey" :title="msgMale[36].labels[0].labels_er[4].title" v-model="Q371">
                </span>
                <div class="container_box">
                  <b class="container_answerName">{{ msgMale[36].labels[0].labels_er[4].answerName }}</b> 
                  <input type="text" class="container_37" :id="msgMale[36].labels[0].labels_er[4].id" :name="msgMale[36].labels[0].labels_er[4].answerKey" :data="msgMale[36].labels[0].labels_er[4].answerKey" :count="msgMale[36].labels[0].labels_er[4].count" @blur="getDataQ371E(Q371E,msgMale[36].labels[0].labels_er[3].answerKey,Q371)" v-model="Q371E">
                  <b class="container_l">{{ msgMale[36].labels[0].labels_er[4].company }}</b>
                </div>   
              </div>
              
            </li>
          </ul>
        </div>
      </div>

      <div class="container_list container_list_373" ref="Q372" v-show="judge_33">
        <div class="container_list_subject">
          <span class="question_num">{{ msgMale[36].labels[1].num }}：</span>
          {{ msgMale[36].labels[1].title }}
        </div>
        <div class="container_list_subject_completion_2 container_list_answer_check" id="container_list_answer_c">
          <ul class="">
            <li :class="{ active : Q372A != '' }">
              <div :for="msgMale[36].labels[1].labels_er[0].id" class="label_check">
                <span class="question_Q27_ipt">
                  <input type="checkbox" :name="msgMale[36].labels[1].labels_er[0].answerKey" :id="msgMale[36].labels[1].labels_er[0].id" :value="msgMale[36].labels[1].labels_er[0].answerKey" :count="msgMale[36].labels[1].labels_er[0].count" v-model="checkArr">
                </span>
                <div class="container_box">
                  <b class="container_answerName">{{ msgMale[36].labels[1].labels_er[0].answerName }}</b> 
                  <input type="text" class="container_37" :id="msgMale[36].labels[1].labels_er[0].id" :name="msgMale[36].labels[1].labels_er[0].answerKey" :data="msgMale[36].labels[1].labels_er[0].answerKey" :count="msgMale[36].labels[1].labels_er[0].count" @blur="getDataQ372A(Q372A,msgMale[36].labels[1].labels_er[0].answerKey)" v-model="Q372A">
                  <b class="container_l">{{ msgMale[36].labels[1].labels_er[0].company }}</b> 
                </div>    
              </div>
              
            </li>
            <li :class="{ active : Q372B != '' }">
              <div :for="msgMale[36].labels[1].labels_er[1].id" class="label_check">
                <span class="question_Q27_ipt">
                  <input type="checkbox" :name="msgMale[36].labels[1].labels_er[1].answerKey" :id="msgMale[36].labels[1].labels_er[1].id" :value="msgMale[36].labels[1].labels_er[1].answerKey" :count="msgMale[36].labels[1].labels_er[1].count" v-model="checkArr">
                </span>
                <div class="container_box">
                  <b class="container_answerName">{{ msgMale[36].labels[1].labels_er[1].answerName }}</b> 
                  <input type="text" class="container_37" :id="msgMale[36].labels[1].labels_er[1].id" :name="msgMale[36].labels[1].labels_er[1].answerKey" :data="msgMale[36].labels[1].labels_er[1].answerKey" :count="msgMale[36].labels[1].labels_er[1].count" @blur="getDataQ372B(Q372B,msgMale[36].labels[1].labels_er[1].answerKey)" v-model="Q372B">
                  <b class="container_l">{{ msgMale[36].labels[1].labels_er[1].company }}</b>
                </div> 
              </div>
               
            </li>
            <li :class="{ active : Q372C != '' }">
              <div :for="msgMale[36].labels[1].labels_er[2].id" class="label_check">
                <span class="question_Q27_ipt">
                  <input type="checkbox" class="container_iut" :name="msgMale[36].labels[1].labels_er[2].answerKey" :id="msgMale[36].labels[1].labels_er[2].id" :value="msgMale[36].labels[1].labels_er[2].answerKey" :title="msgMale[36].labels[1].labels_er[2].title" v-model="checkArr">
                </span>
                <div class="container_box">
                  <b class="container_answerName">{{ msgMale[36].labels[1].labels_er[2].answerName }}</b> 
                  <input type="text" class="container_37" :id="msgMale[36].labels[1].labels_er[2].id" :name="msgMale[36].labels[1].labels_er[2].answerKey" :data="msgMale[36].labels[1].labels_er[2].answerKey" :count="msgMale[36].labels[1].labels_er[2].count" @blur="getDataQ372C(Q372C,msgMale[36].labels[1].labels_er[2].answerKey)" v-model="Q372C">
                  <b class="container_l">{{ msgMale[36].labels[1].labels_er[2].company }}</b>
                </div>  
              </div>
              
            </li>
            <li :class="{ active : Q372D != '' }">
              <div :for="msgMale[36].labels[1].labels_er[3].id" class="label_check">
                <span class="question_Q27_ipt">
                  <input type="checkbox" class="container_iut" :name="msgMale[36].labels[1].labels_er[3].answerKey" :id="msgMale[36].labels[1].labels_er[3].id" :value="msgMale[36].labels[1].labels_er[3].answerKey" :title="msgMale[36].labels[1].labels_er[3].title" v-model="checkArr">
                </span>
                <div class="container_box">
                  <b class="container_answerName">{{ msgMale[36].labels[1].labels_er[3].answerName }}</b> 
                  <input type="text" class="container_37" :id="msgMale[36].labels[1].labels_er[3].id" :name="msgMale[36].labels[1].labels_er[3].answerKey" :data="msgMale[36].labels[1].labels_er[3].answerKey" :count="msgMale[36].labels[1].labels_er[3].count" @blur="getDataQ372D(Q372D,msgMale[36].labels[1].labels_er[3].answerKey)" v-model="Q372D">
                  <b class="container_l">{{ msgMale[36].labels[1].labels_er[3].company }}</b> 
                </div>       
              </div>
              
            </li>
            <li :class="{ active : Q372E != '' }">
              <div :for="msgMale[36].labels[1].labels_er[4].id" class="label_check">
                <span class="question_Q27_ipt">
                  <input type="checkbox" class="container_iut" :name="msgMale[36].labels[1].labels_er[4].answerKey" :id="msgMale[36].labels[1].labels_er[4].id" :value="msgMale[36].labels[1].labels_er[4].answerKey" :title="msgMale[36].labels[1].labels_er[4].title" v-model="checkArr">
                </span>
                <div class="container_box">
                  <b class="container_answerName">{{ msgMale[36].labels[1].labels_er[4].answerName }}</b> 
                  <input type="text" class="container_37" :id="msgMale[36].labels[1].labels_er[4].id" :name="msgMale[36].labels[1].labels_er[4].answerKey" :data="msgMale[36].labels[1].labels_er[4].answerKey" :count="msgMale[36].labels[1].labels_er[4].count" @blur="getDataQ372E(Q372E,msgMale[36].labels[1].labels_er[4].answerKey)" v-model="Q372E">
                  <b class="container_l">{{ msgMale[36].labels[1].labels_er[4].company }}</b> 
                </div>  
              </div> 
            </li>
          </ul>
        </div>
      </div>

      <div class="container_list container_list_373" ref="Q373" v-show="judge_33">
        <div class="container_list_subject">
          <span class="question_num">{{ msgMale[36].labels[2].num }}：</span>
          {{ msgMale[36].labels[2].title }}
        </div>
        <div class="container_list_subject_completion_2 container_list_answer_check" id="container_list_answer_c">
          <ul class="">
            <li :class="{ active : Q373A != '' }">
              <div :for="msgMale[36].labels[2].labels_er[0].id" class="label_check">
                <span class="question_Q27_ipt">
                  <input type="checkbox" class="container_iut" :name="msgMale[36].labels[2].labels_er[0].answerKey" :id="msgMale[36].labels[2].labels_er[0].id" :value="msgMale[36].labels[2].labels_er[0].answerKey" :title="msgMale[36].labels[2].labels_er[0].title" v-model="checkArr">
                </span>
                <div class="container_box">
                  <b class="container_answerName">{{ msgMale[36].labels[2].labels_er[0].answerName }}</b> 
                  <input type="text" class="container_37" :id="msgMale[36].labels[2].labels_er[0].id" :name="msgMale[36].labels[2].labels_er[0].answerKey" :data="msgMale[36].labels[2].labels_er[0].answerKey" :count="msgMale[36].labels[2].labels_er[0].count" @blur="getDataQ373A(Q373A,msgMale[36].labels[2].labels_er[0].answerKey)" v-model="Q373A">
                  <b class="container_l">{{ msgMale[36].labels[2].labels_er[0].company }}</b> 
                </div>  
              </div>
            </li>
            <li :class="{ active : Q373B != '' }">
              <div :for="msgMale[36].labels[2].labels_er[1].id" class="label_check">
                <span class="question_Q27_ipt">
                  <input type="checkbox" class="container_iut" :name="msgMale[36].labels[2].labels_er[1].answerKey" :id="msgMale[36].labels[2].labels_er[2].id" :value="msgMale[36].labels[2].labels_er[1].answerKey" :title="msgMale[36].labels[2].labels_er[1].title" v-model="checkArr">
                </span>
                <div class="container_box">
                  <b class="container_answerName">{{ msgMale[36].labels[2].labels_er[1].answerName }}</b> 
                  <input type="text" class="container_37" :id="msgMale[36].labels[2].labels_er[1].id" :name="msgMale[36].labels[2].labels_er[1].answerKey" :data="msgMale[36].labels[2].labels_er[1].answerKey" :count="msgMale[36].labels[2].labels_er[1].count" @blur="getDataQ373B(Q373B,msgMale[36].labels[2].labels_er[1].answerKey)" v-model="Q373B">
                  <b class="container_l">{{ msgMale[36].labels[2].labels_er[1].company }}</b> 
                </div>  
              </div>
              
            </li>
            <li :class="{ active :  Q373C != '' }">
              <div :for="msgMale[36].labels[2].labels_er[2].id" class="label_check">
                <span class="question_Q27_ipt">
                  <input type="checkbox" class="container_iut" :name="msgMale[36].labels[2].labels_er[2].answerKey" :id="msgMale[36].labels[2].labels_er[2].id" :value="msgMale[36].labels[2].labels_er[2].answerKey" :title="msgMale[36].labels[2].labels_er[2].title" v-model="checkArr">
                </span>
                <div class="container_box">
                  <b class="container_answerName">{{ msgMale[36].labels[2].labels_er[2].answerName }}</b> 
                  <input type="text" class="container_37" :id="msgMale[36].labels[2].labels_er[2].id" :name="msgMale[36].labels[2].labels_er[2].answerKey" :data="msgMale[36].labels[2].labels_er[2].answerKey" :count="msgMale[36].labels[2].labels_er[2].count" @blur="getDataQ373C(Q373C,msgMale[36].labels[2].labels_er[2].answerKey)" v-model="Q373C">
                  <b class="container_l">{{ msgMale[36].labels[2].labels_er[2].company }}</b> 
                </div>  
              </div>
              
            </li>
            <li :class="{ active : Q373D != '' }">
              <div :for="msgMale[36].labels[2].labels_er[3].id" class="label_check">
                <span class="question_Q27_ipt">
                  <input type="checkbox" class="container_iut" :name="msgMale[36].labels[2].labels_er[3].answerKey" :id="msgMale[36].labels[2].labels_er[3].id" :value="msgMale[36].labels[2].labels_er[3].answerKey" :title="msgMale[36].labels[2].labels_er[3].title" v-model="checkArr">
                </span>
                <div class="container_box">
                  <b class="container_answerName">{{ msgMale[36].labels[2].labels_er[3].answerName }}</b> 
                  <input type="text" class="container_37" :id="msgMale[36].labels[2].labels_er[3].id" :name="msgMale[36].labels[2].labels_er[3].answerKey" :data="msgMale[36].labels[2].labels_er[3].answerKey" :count="msgMale[36].labels[2].labels_er[3].count" @blur="getDataQ373D(Q373D,msgMale[36].labels[2].labels_er[3].answerKey)" v-model="Q373D">
                  <b class="container_l">{{ msgMale[36].labels[2].labels_er[3].company }}</b> 
                </div> 
              </div>
               
            </li>
            <li :class="{ active : Q373E != '' }">
              <div class="label_check">
                <span class="question_Q27_ipt">
                  <input type="checkbox" class="container_iut" :name="msgMale[36].labels[2].labels_er[4].answerKey" :id="msgMale[36].labels[2].labels_er[4].id" :value="msgMale[36].labels[2].labels_er[4].answerKey" :title="msgMale[36].labels[2].labels_er[4].title" v-model="checkArr">
                </span>
                <div class="container_box">
                  <b class="container_answerName">{{ msgMale[36].labels[2].labels_er[4].answerName }}</b> 
                  <input type="text" class="container_37" :id="msgMale[36].labels[2].labels_er[4].id" :name="msgMale[36].labels[2].labels_er[4].answerKey" :data="msgMale[36].labels[2].labels_er[4].answerKey" :count="msgMale[36].labels[2].labels_er[4].count" @blur="getDataQ373E(Q373E,msgMale[36].labels[2].labels_er[4].answerKey)" v-model="Q373E">
                  <b class="container_l">{{ msgMale[36].labels[2].labels_er[4].company }}</b> 
                </div>   
              </div>
               
            </li>
          </ul>
        </div>
      </div>

      <!-- Q38 -->
      <div class="container_list" ref="Q38" v-show="judge_33">
        <div class="container_list_subject">
          <span class="question_num">{{ msgMale[37].num }}：</span>
          {{ msgMale[37].title }}
        </div>
        <div class="container_list_answer_radio" id="container_list_answer_b">
          <ul class="">
            <li v-for="item in msgMale[37].answer" @click="getDataQ38(item.answerType,item.answerKey)" :class="{ active : Q38 == item.answerType }">
              <label :for="item.id">
                <span>
                  <input type="radio" :name="item.answerKey" :id="item.id" :value="item.answerType" :count="item.count" v-model="Q38">
                </span>
                {{ item.answerName }}
              </label> 
            </li>
          </ul>
        </div>
      </div>

      <!-- Q39 -->
      <div class="container_list" ref="Q39" v-show="judge_33">
        <div class="container_list_subject">
          <span class="question_num">{{ msgMale[38].num }}：</span>
          {{ msgMale[38].title }}
        </div>
        <div class="container_list_answer_radio" id="container_list_answer_b">
          <ul class="">
            <li v-for="item in msgMale[38].answer" @click="getDataQ39(item.answerType,item.answerKey)" :class="{ active : Q39 == item.answerType }">
              <label :for="item.id">
                <span>
                  <input type="radio" :name="item.answerKey" :id="item.id" :value="item.answerType" :count="item.count" v-model="Q39">
                </span>
                {{ item.answerName }}
              </label> 
            </li>
          </ul>
        </div>
      </div>

      <!-- Q40 -->
      <!-- <div class="question_Q27" ref="Q40" v-show="judge_33">{{ msgMale[39].title }}</div>
      <div class="container_list" ref="Q40A" v-show="judge_33">
        <div class="container_list_subject">
          <span class="question_num">{{ msgMale[39].labels[0].num }}：</span>
          {{ msgMale[39].labels[0].title }}
        </div>
        <div class="container_list_answer_radio" id="container_list_answer_a_2">
          <ul class="">
            <li v-for="answer in msgMale[39].labels[0].answer" @click="getDataQ40A(answer.answerType,answer.answerKey)" :class="{ active : Q40A == answer.answerType }">
              <label :for="answer.id">
                <span>
                  <input type="radio" :name="answer.answerKey" :id="answer.id" :value="answer.answerType" :count="answer.count" v-model="Q40A">
                </span>
                {{ answer.answerName }}
              </label> 
            </li>
          </ul>
        </div>
      </div>
      
      Q40-B
      <div class="container_list" ref="Q40B" v-show="judge_33">
        <div class="container_list_subject">
          <span class="question_num">{{ msgMale[39].labels[1].num }}：</span>
          {{ msgMale[39].labels[1].title }}
        </div>
        <div class="container_list_answer_radio" id="container_list_answer_a_2">
          <ul class="">
            <li v-for="answer in msgMale[39].labels[1].answer" @click="getDataQ40B(answer.answerType,answer.answerKey)" :class="{ active : Q40B == answer.answerType }">
              <label :for="answer.id">
                <span>
                  <input type="radio" :name="answer.answerKey" :id="answer.id" :value="answer.answerType" :count="answer.count" v-model="Q40B">
                </span>
                {{ answer.answerName }}
              </label> 
            </li>
          </ul>
        </div>
      </div>
      <div class="container_list" ref="Q40C" v-show="judge_33">
        <div class="container_list_subject">
          <span class="question_num">{{ msgMale[39].labels[2].num }}：</span>
          {{ msgMale[39].labels[2].title }}
        </div>
        <div class="container_list_answer_radio" id="container_list_answer_a_2">
          <ul class="">
            <li v-for="answer in msgMale[39].labels[2].answer"  @click="getDataQ40C(answer.answerType,answer.answerKey)"  :class="{ active : Q40C == answer.answerType }">
              <label :for="answer.id">
                <span>
                  <input type="radio" :name="answer.answerKey" :id="answer.id" :value="answer.answerType" :count="answer.count" v-model="Q40C">
                </span>
                {{ answer.answerName }}
              </label> 
            </li>
          </ul>
        </div>
      </div>
      <div class="container_list" ref="Q40D" v-show="judge_33">
        <div class="container_list_subject">
          <span class="question_num">{{ msgMale[39].labels[3].num }}：</span>
          {{ msgMale[39].labels[3].title }}
        </div>
        <div class="container_list_answer_radio" id="container_list_answer_a_2">
          <ul class="">
            <li v-for="answer in msgMale[39].labels[3].answer" @click="getDataQ40D(answer.answerType,answer.answerKey)"  :class="{ active : Q40D == answer.answerType }">
              <label :for="answer.id">
                <span>
                  <input type="radio" :name="answer.answerKey" :id="answer.id" :value="answer.answerType" :count="answer.count" v-model="Q40D">
                </span>
                {{ answer.answerName }}
              </label> 
            </li>
          </ul>
        </div>
      </div>
      <div class="container_list" ref="Q41" v-show="judge_33">
        <div class="container_list_subject">
          <span class="question_num">{{ msgMale[40].num }}：</span>
          {{ msgMale[40].title }}
        </div>
        <div class="container_list_answer_radio" id="container_list_answer_c">
          <ul class="">
            <li v-for="item in msgMale[40].answer" @click="getDataQ41(item.answerType,item.answerKey)" :class="{ active : Q41 == item.answerType }">
              <label :for="item.id">
                <span>
                  <input type="radio" :name="item.answerKey" :id="item.id" :value="item.answerType" :count="item.count" v-model="Q41">
                </span>
                {{ item.answerName }}
              </label> 
            </li>
          </ul>
        </div>
      </div>
      <div class="container_list" ref="Q42" v-show="judge_33">
        <div class="container_list_subject">
          <span class="question_num">{{ msgMale[41].num }}：</span>
          {{ msgMale[41].title }}
        </div>
        <div class="container_list_answer_radio" id="container_list_answer_c">
          <ul class="">
            <li v-for="item in msgMale[41].answer" @click="getDataQ42(item.answerType,item.answerKey)" :class="{ active : Q42 == item.answerType }">
              <label :for="item.id">
                <span>
                  <input type="radio" :name="item.answerKey" :id="item.id" :value="item.answerType" :count="item.count" v-model="Q42">
                </span>
                {{ item.answerName }}
              </label> 
            </li>
          </ul>
        </div>
      </div> -->

      <!-- Q43 -->
      <div class="question_Q27" ref="Q43">{{ msgMale[42].title }}</div>
      <div class="container_list" ref="Q431">
        <div class="container_list_subject">
          <span class="question_num">{{ msgMale[42].labels[0].num }}.</span>
          {{ msgMale[42].labels[0].title }}
        </div>
        <div class="container_list_subject_completion_2" id="container_list_answer_a_2">
          <ul class="">
            <li>
              <span>每周</span> 
              <input type="text" class="container" :id="msgMale[42].labels[0].answer[0].id" :name="msgMale[42].labels[0].answer[0].answerKey" :data="msgMale[42].labels[0].answer[0].answerKey" :count="msgMale[42].labels[0].answer[0].count" @click="getDataQ431(Q431,msgMale[42].labels[0].answer[0].answerKey)" readonly v-model="Q431">
              <span>天</span> 
            </li>
            <li>
              <span>每天</span> 
              <input type="text" class="container" :id="msgMale[42].labels[0].answer[1].id" :name="msgMale[42].labels[0].answer[1].answerKey" :data="msgMale[42].labels[0].answer[1].answerKey" :count="msgMale[42].labels[0].answer[1].count" @blur="getDataQ432(Q432,msgMale[42].labels[0].answer[1].answerKey)" v-model="Q432">
              <span>分钟</span> 
            </li>
          </ul>
        </div>
      </div>

      <div class="container_list" ref="Q432">
        <div class="container_list_subject">
          <span class="question_num">{{ msgMale[42].labels[1].num }}.</span>
          {{ msgMale[42].labels[1].title }}
        </div>
        <div class="container_list_subject_completion_2" id="container_list_answer_a_2">
          <ul class="">
            <li>
              <span>每周</span> 
              <input type="text" class="container" :id="msgMale[42].labels[1].answer[0].id" :name="msgMale[42].labels[1].answer[0].answerKey" :data="msgMale[42].labels[1].answer[0].answerKey" :count="msgMale[42].labels[1].answer[0].count" @click="getDataQ433(Q433,msgMale[42].labels[1].answer[0].answerKey)" readonly v-model="Q433">
              <span>天</span> 
            </li>
            <li>
              <span>每天</span> 
              <input type="text" class="container" :id="msgMale[42].labels[1].answer[1].id" :name="msgMale[42].labels[1].answer[1].answerKey" :data="msgMale[42].labels[1].answer[1].answerKey" :count="msgMale[42].labels[1].answer[1].count" @blur="getDataQ434(Q434,msgMale[42].labels[1].answer[1].answerKey)" v-model="Q434">
              <span>分钟</span> 
            </li>
          </ul>
        </div>
      </div>

      <div class="container_list" ref="Q433">
        <div class="container_list_subject">
          <span class="question_num">{{ msgMale[42].labels[2].num }}.</span>
          {{ msgMale[42].labels[2].title }}
        </div>
        <div class="container_list_subject_completion_2" id="container_list_answer_a_2">
          <ul class="">
            <li>
              <span>每周</span> 
              <input type="text" class="container" :id="msgMale[42].labels[2].answer[0].id" :name="msgMale[42].labels[2].answer[0].answerKey" :data="msgMale[42].labels[2].answer[0].answerKey" :count="msgMale[42].labels[2].answer[0].count" @click="getDataQ435(Q435,msgMale[42].labels[2].answer[0].answerKey)" readonly v-model="Q435">
              <span>天</span> 
            </li>
            <li>
              <span>每天</span> 
              <input type="text" class="container" :id="msgMale[42].labels[2].answer[1].id" :name="msgMale[42].labels[2].answer[1].answerKey" :data="msgMale[42].labels[2].answer[1].answerKey" :count="msgMale[42].labels[2].answer[1].count" @blur="getDataQ436(Q436,msgMale[42].labels[2].answer[1].answerKey)" v-model="Q436">
              <span>分钟</span> 
            </li>
          </ul>
        </div>
      </div>

      <div class="container_list" ref="Q434">
        <div class="container_list_subject">
          <span class="question_num">{{ msgMale[42].labels[3].num }}.</span>
          {{ msgMale[42].labels[3].title }}
        </div>
        <div class="container_list_subject_completion_2" id="container_list_answer_a_2">
          <ul class="">
            <li>
              <span>每周</span> 
              <input type="text" class="container" :id="msgMale[42].labels[3].answer[0].id" :name="msgMale[42].labels[3].answer[0].answerKey" :data="msgMale[42].labels[3].answer[0].answerKey" :count="msgMale[42].labels[3].answer[0].count" @click="getDataQ437(Q437,msgMale[42].labels[3].answer[0].answerKey)" v-model="Q437">
              <span>小时</span> 
            </li>
            <li>
              <span>每天</span> 
              <input type="text" class="container" :id="msgMale[42].labels[3].answer[1].id" :name="msgMale[42].labels[3].answer[1].answerKey" :data="msgMale[42].labels[3].answer[1].answerKey" :count="msgMale[42].labels[3].answer[1].count" @click="getDataQ438(Q438,msgMale[42].labels[3].answer[1].answerKey)" readonly v-model="Q438">
              <span>分钟</span> 
            </li>
          </ul>
        </div>
      </div>

      <!-- Q44 -->
      <div class="container_list" ref="Q44">
        <div class="container_list_subject">
          <span class="question_num">{{ msgMale[43].num }}：</span>
          {{ msgMale[43].title }}
        </div>
        <div class="container_list_answer_radio" id="container_list_answer_b">
          <ul class="">
            <li v-for="item in msgMale[43].answer" @click="getDataQ44(item.answerType,item.answerKey)" :class="{ active : Q44 == item.answerType }">
              <label :for="item.id">
                <span>
                  <input type="radio" :name="item.answerKey" :id="item.id" :value="item.answerType" :count="item.count" v-model="Q44">
                </span>
                {{ item.answerName }}
              </label> 
            </li>
          </ul>
        </div>
      </div>

      <!-- Q45 -->
      <div class="container_list" ref="Q45">
        <div class="container_list_subject_completion">
          <span class="question_num">{{ msgMale[44].num }}：</span>
          <span>{{ msgMale[44].title }}</span>
          <input type="text" :id="msgMale[11].id" :name="msgMale[44].answerKey" :data="msgMale[44].answerKey" :count="msgMale[44].count" @click="getDataQ45(Q45,msgMale[44].answerKey)" v-model="Q45" readonly="readonly">
          <span>小时</span>
        </div>
      </div>

      <!-- Q46 -->
      <div class="container_list" ref="Q46">
        <div class="container_list_subject">
          <span class="question_num">{{ msgMale[45].num }}：</span>
          {{ msgMale[45].title }}
        </div>
        <div class="container_list_answer_radio" id="container_list_answer_c">
          <ul class="">
            <li v-for="item in msgMale[45].answer" @click="getDataQ46(item.answerType,item.answerKey)" :class="{ active : Q46 == item.answerType }">
              <label :for="item.id">
                <span>
                  <input type="radio" :name="item.answerKey" :id="item.id" :value="item.answerType" :count="item.count" v-model="Q46">
                </span>
                {{ item.answerName }}
              </label> 
            </li>
          </ul>
        </div>
      </div>

      <!-- Q47 -->
      <div class="container_list" ref="Q47">
        <div class="container_list_subject">
          <span class="question_num">{{ msgMale[46].num }}：</span>
          {{ msgMale[46].title }}
        </div>
        <div class="container_list_answer_radio" id="container_list_answer_a_2">
          <ul class="">
            <li v-for="item in msgMale[46].answer" @click="getDataQ47(item.answerType,item.answerKey)" :class="{ active : Q47 == item.answerType }">
              <label :for="item.id">
                <span>
                  <input type="radio" :name="item.answerKey" :id="item.id" :value="item.answerType" :count="item.count" v-model="Q47">
                </span>
                {{ item.answerName }}
              </label> 
            </li>
          </ul>
        </div>
      </div>

      <!-- Q48 -->
      <div class="container_list" ref="Q48">
        <div class="container_list_subject">
          <span class="question_num">{{ msgMale[47].num }}：</span>
          {{ msgMale[47].title }}
        </div>
        <div class="container_list_answer_radio" id="container_list_answer_c">
          <ul class="">
            <li v-for="item in msgMale[47].answer" @click="getDataQ48(item.answerType,item.answerKey)" :class="{ active : Q48 == item.answerType }">
              <label :for="item.id">
                <span>
                  <input type="radio" :name="item.answerKey" :id="item.id" :value="item.answerType" :count="item.count" v-model="Q48">
                </span>
                {{ item.answerName }}
              </label> 
            </li>
          </ul>
        </div>
      </div>

      <!-- Q49 -->
      <div class="container_list" ref="Q49">
        <div class="container_list_subject">
          <span class="question_num">{{ msgMale[48].num }}：</span>
          {{ msgMale[48].title }}
        </div>
        <div class="container_list_answer_radio" id="container_list_answer_c">
          <ul class="">
            <li v-for="item in msgMale[48].answer" @click="getDataQ49(item.answerType,item.answerKey)" :class="{ active : Q49 == item.answerType }">
              <label :for="item.id">
                <span>
                  <input type="radio" :name="item.answerKey" :id="item.id" :value="item.answerType" :count="item.count" v-model="Q49">
                </span> 
                {{ item.answerName }}
              </label> 
            </li>
          </ul>
        </div>
      </div>

      <!-- Q50 -->
      <div class="container_list" ref="Q50">
        <div class="container_list_subject">
          <span class="question_num">{{ msgMale[49].num }}：</span>
          {{ msgMale[49].title }}
        </div>
        <div class="container_list_answer_radio" id="container_list_answer_c">
          <ul class="">
            <li v-for="item in msgMale[49].answer" @click="getDataQ50(item.answerType,item.answerKey)" :class="{ active : Q50 == item.answerType }">
              <label :for="item.id">
                <span>
                  <input type="radio" :name="item.answerKey" :id="item.id" :value="item.answerType" :count="item.count" v-model="Q50">
                </span>
                {{ item.answerName }}
              </label> 
            </li>
          </ul>
        </div>
      </div>

      <!-- Q51 -->
      <div class="container_list" ref="Q51">
        <div class="container_list_subject">
          <span class="question_num">{{ msgMale[50].num }}：</span>
          {{ msgMale[50].title }}
        </div>
        <div class="container_list_answer_radio" id="container_list_answer_c">
          <ul class="">
            <li v-for="item in msgMale[50].answer" @click="getDataQ51(item.answerType,item.answerKey)" :class="{ active : Q51 == item.answerType }">
              <label :for="item.id">
                <span>
                  <input type="radio" :name="item.answerKey" :id="item.id" :value="item.answerType" :count="item.count" v-model="Q51">
                </span>
                {{ item.answerName }}
              </label> 
            </li>
          </ul>
        </div>
      </div>

      <!-- Q52 -->
      <div class="container_list" ref="Q52">
        <div class="container_list_subject">
          <span class="question_num">{{ msgMale[51].num }}：</span>
          {{ msgMale[51].title }}
        </div>
        <div class="container_list_answer_radio" id="container_list_answer_c">
          <ul class="">
            <li v-for="item in msgMale[51].answer" @click="getDataQ52(item.answerType,item.answerKey)" :class="{ active : Q52 == item.answerType }">
              <label :for="item.id">
                <span>
                  <input type="radio" :name="item.answerKey" :id="item.id" :value="item.answerType" :count="item.count" v-model="Q52">
                </span>
                {{ item.answerName }}
              </label> 
            </li>
          </ul>
        </div>
      </div>

      <!-- Q53 -->
      <div class="container_list" ref="Q53">
        <div class="container_list_subject">
          <span class="question_num">{{ msgMale[52].num }}：</span>
          {{ msgMale[52].title }}
        </div>
        <div class="container_list_answer_radio" id="container_list_answer_c">
          <ul class="">
            <li v-for="item in msgMale[52].answer" @click="getDataQ53(item.answerType,item.answerKey)" :class="{ active : Q53 == item.answerType }">
              <label :for="item.id">
                <span>
                  <input type="radio" :name="item.answerKey" :id="item.id" :value="item.answerType" :count="item.count" v-model="Q53">
                </span>
                {{ item.answerName }}
              </label> 
            </li>
          </ul>
        </div>
      </div>

      <!-- Q54 -->
      <div class="container_list" ref="Q54">
        <div class="container_list_subject">
          <span class="question_num">{{ msgMale[53].num }}：</span>
          {{ msgMale[53].title }}
        </div>
        <div class="container_list_answer_radio" id="container_list_answer_c">
          <ul class="">
            <li v-for="item in msgMale[53].answer" @click="getDataQ54(item.answerType,item.answerKey)" :class="{ active : Q54 == item.answerType }">
              <label :for="item.id">
                <span>
                  <input type="radio" :name="item.answerKey" :id="item.id" :value="item.answerType" :count="item.count" v-model="Q54">
                </span>
                {{ item.answerName }}
              </label> 
            </li>
          </ul>
        </div>
      </div>

      <!-- Q55 -->
      <div class="container_list" ref="Q55">
        <div class="container_list_subject">
          <span class="question_num">{{ msgMale[54].num }}：</span>
          {{ msgMale[54].title }}
        </div>
        <div class="container_list_answer_radio" id="container_list_answer_b">
          <ul class="">
            <li v-for="item in msgMale[54].answer" @click="getDataQ55(item.answerType,item.answerKey)" :class="{ active : Q55 == item.answerType }">
              <label :for="item.id">
                <span>
                  <input type="radio" :name="item.answerKey" :id="item.id" :value="item.answerType" :count="item.count" v-model="Q55">
                </span>
                {{ item.answerName }}
              </label> 
            </li>
          </ul>
        </div>
      </div>

      <!-- Q56 -->
      <div class="container_list" ref="Q56">
        <div class="container_list_subject">
          <span class="question_num">{{ msgMale[55].num }}：</span>
          {{ msgMale[55].title }}
        </div>
        <div class="container_list_answer_radio" id="container_list_answer_c">
          <ul class="">
            <li v-for="item in msgMale[55].answer" @click="getDataQ56(item.answerType,item.answerKey)" :class="{ active : Q56 == item.answerType }">
              <label :for="item.id">
                <span>
                  <input type="radio" :name="item.answerKey" :id="item.id" :value="item.answerType" :count="item.count" v-model="Q56">
                </span>
                {{ item.answerName }}
              </label> 
            </li>
          </ul>
        </div>
      </div>

      <!-- Q57 -->
      <div class="container_list" ref="Q57">
        <div class="container_list_subject">
          <span class="question_num">{{ msgMale[56].num }}：</span>
          {{ msgMale[56].title }}
        </div>
        <div class="container_list_answer_radio" id="container_list_answer_c">
          <ul class="">
            <li v-for="item in msgMale[56].answer" @click="getDataQ57(item.answerType,item.answerKey)" :class="{ active : Q57 == item.answerType }">
              <label :for="item.id">
                <span>
                  <input type="radio" :name="item.answerKey" :id="item.id" :value="item.answerType" :count="item.count" v-model="Q57">
                </span>
                {{ item.answerName }}
              </label> 
            </li>
          </ul>
        </div>
      </div>

      <!-- Q58 -->
      <div class="container_list" ref="Q58">
        <div class="container_list_subject">
          <span class="question_num">{{ msgMale[57].num }}：</span>
          {{ msgMale[57].title }}
        </div>
        <div class="container_list_answer_radio" id="container_list_answer_c">
          <ul class="">
            <li v-for="item in msgMale[57].answer" @click="getDataQ58(item.answerType,item.answerKey)" :class="{ active : Q58 == item.answerType }">
              <label :for="item.id">
                <span>
                  <input type="radio" :name="item.answerKey" :id="item.id" :value="item.answerType" :count="item.count" v-model="Q58">
                </span>
                {{ item.answerName }}
              </label> 
            </li>
          </ul>
        </div>
      </div>

      <!-- Q59 -->
      <div class="container_list" ref="Q59">
        <div class="container_list_subject">
          <span class="question_num">{{ msgMale[58].num }}：</span>
          {{ msgMale[58].title }}
        </div>
        <div class="container_list_answer_radio" id="container_list_answer_a_2">
          <ul class="">
            <li v-for="item in msgMale[58].answer" @click="getDataQ59(item.answerType,item.answerKey)" :class="{ active : Q59 == item.answerType }">
              <label :for="item.id">
                <span>
                  <input type="radio" :name="item.answerKey" :id="item.id" :value="item.answerType" :count="item.count" v-model="Q59">
                </span>
                {{ item.answerName }}
              </label> 
            </li>
          </ul>
        </div>
      </div>

      <!-- Q60 -->
      <div class="container_list" ref="Q60">
        <div class="container_list_subject">
          <span class="question_num">{{ msgMale[59].num }}：</span>
          {{ msgMale[59].title }}
        </div>
        <div class="container_list_answer_radio" id="container_list_answer_b">
          <ul class="">
            <li v-for="item in msgMale[59].answer" @click="getDataQ60(item.answerType,item.answerKey)" :class="{ active : Q60 == item.answerType }">
              <label :for="item.id">
                <span>
                 <input type="radio" :name="item.answerKey" :id="item.id" :value="item.answerType" :count="item.count" v-model="Q60"> 
                </span>
                {{ item.answerName }}
              </label> 
            </li>
          </ul>
        </div>
      </div>

      <!-- Q61 -->
      <div class="container_list" ref="Q61">
        <div class="container_list_subject">
          <span class="question_num">{{ msgMale[60].num }}：</span>
          {{ msgMale[60].title }}
        </div>
        <div class="container_list_answer_radio" id="container_list_answer_a_2">
          <ul class="">
            <li v-for="item in msgMale[60].answer" @click="getDataQ61(item.answerType,item.answerKey)" :class="{ active : Q61 == item.answerType }">
              <label :for="item.id">
                <span>
                  <input type="radio" :name="item.answerKey" :id="item.id" :value="item.answerType" :count="item.count" v-model="Q61">
                </span>
                {{ item.answerName }}
              </label> 
            </li>
          </ul>
        </div>
      </div>

      <!-- Q62 -->
      <div class="container_list" ref="Q62">
        <div class="container_list_subject">
          <span class="question_num">{{ msgMale[61].num }}：</span>
          {{ msgMale[61].title }}
        </div>
        <div class="container_list_answer_radio" id="container_list_answer_c">
          <ul class="">
            <li v-for="item in msgMale[61].answer" @click="getDataQ62(item.answerType,item.answerKey)" :class="{ active : Q62 == item.answerType }">
              <label :for="item.id">
                <span>
                  <input type="radio" :name="item.answerKey" :id="item.id" :value="item.answerType" :count="item.count" v-model="Q62">
                </span>
                {{ item.answerName }}
              </label> 
            </li>
          </ul>
        </div>
      </div>

      <!-- Q63 -->
      <div class="container_list" ref="Q63">
        <div class="container_list_subject">
          <span class="question_num">{{ msgMale[62].num }}：</span>
          {{ msgMale[62].title }}
        </div>
        <div class="container_list_answer_radio" id="container_list_answer_a_2">
          <ul class="">
            <li v-for="item in msgMale[62].answer" @click="getDataQ63(item.answerType,item.answerKey)" :class="{ active : Q63 == item.answerType }">
              <label :for="item.id">
                <span>
                  <input type="radio" :name="item.answerKey" :id="item.id" :value="item.answerType" :count="item.count" v-model="Q63">
                </span>
                {{ item.answerName }}
              </label> 
            </li>
          </ul>
        </div>
      </div>

      <!-- Q64 -->
      <div class="container_list" ref="Q64">
        <div class="container_list_subject">
          <span class="question_num">{{ msgMale[63].num }}：</span>
          {{ msgMale[63].title }}
        </div>
        <div class="container_list_answer_radio" id="container_list_answer_b">
          <ul class="">
            <li v-for="item in msgMale[63].answer" @click="getDataQ64(item.answerType,item.answerKey)" :class="{ active : Q64 == item.answerType }">
              <label :for="item.id">
                <span>
                  <input type="radio" :name="item.answerKey" :id="item.id" :value="item.answerType" :count="item.count" v-model="Q64">
                </span>
                {{ item.answerName }}
              </label> 
            </li>
          </ul>
        </div>
      </div>

      <!-- Q65 -->
      <div class="container_list" ref="Q65">
        <div class="container_list_subject">
          <span class="question_num">{{ msgMale[64].num }}：</span>
          {{ msgMale[64].title }}
        </div>
        <div class="container_list_answer_radio" id="container_list_answer_a_2">
          <ul class="">
            <li v-for="item in msgMale[64].answer" @click="getDataQ65(item.answerType,item.answerKey)" :class="{ active : Q65 == item.answerType }">
              <label :for="item.id">
                <span>
                  <input type="radio" :name="item.answerKey" :id="item.id" :value="item.answerType" :count="item.count" v-model="Q65">
                </span>
                {{ item.answerName }}
              </label> 
            </li>
          </ul>
        </div>
      </div>
      
      <!-- Q66 -->
      <div class="container_list level" ref="Q66">
        <div class="container_list_subject">
          <span class="question_num">{{ msgMale[65].num }}：</span>
          {{ msgMale[65].title }}
        </div>
        <div class="container_list_answer_check" id="container_list_answer_c">
          <ul class="">
            <li v-for="(item,index) in msgMale[65].answer">
              <label :for="item.id" @click="getDataQ66(item.answerType,item.answerKey)" :class="{ active : isInArray(checkArr,item.answerKey) }">
                <span>
                  <input type="checkbox" :name="item.answerKey" :id="item.id" :value="item.answerKey" v-model="checkArr">
                </span>  
                {{ item.answerName }}
              </label>
              <div v-for="labels in item.labels" class="second_level">
                <label :for="labels.id"  @click="getDataQ66s(labels.answerType,labels.answerKey)" :class="{ active : isInArray(checkArr,labels.answerKey) }">
                  <span>
                    <input type="checkbox" :name="labels.answerKey" :id="labels.id" :value="labels.answerKey" v-model="checkArr">
                  </span>
                  
                  {{ labels.answerName }}
                </label>
              </div> 
            </li>
          </ul>
        </div>
      </div>
      
      <!-- Q67 -->
      <div class="container_list" ref="Q67">
        <div class="container_list_subject">
          <span class="question_num">{{ msgMale[66].num }}:</span>
          {{ msgMale[66].title }}
        </div>

        <div class="container_list_subject_completion_2 center" id="container_list_answer_b">
          <ul class="oul">
            <li>
              <span>{{ msgMale[66].answer[0].answerName }}</span> 
              <input type="text" class="container" :id="msgMale[66].answer[0].id" :name="msgMale[66].answer[0].answerKey" :data="msgMale[66].answer[0].answerKey" @blur="getDataQ67A(Q67A,msgMale[66].answer[0].answerKey)" :count="msgMale[66].answer[0].count" v-model="Q67A">
              <span>{{ msgMale[66].answer[0].company }}</span> 
            </li>
            <li>
              <span>{{ msgMale[66].answer[1].answerName }}</span> 
              <input type="text" class="container" :id="msgMale[66].answer[1].id" :name="msgMale[66].answer[1].answerKey" :data="msgMale[66].answer[1].answerKey" @blur="getDataQ67B(Q67B,msgMale[66].answer[1].answerKey)" :count="msgMale[66].answer[1].count" v-model="Q67B">
              <span>{{ msgMale[66].answer[1].company }}</span> 
            </li>
            <li>
              <span>{{ msgMale[66].answer[2].answerName }}</span> 
              <input type="text" class="container" :id="msgMale[66].answer[2].id" :name="msgMale[66].answer[2].answerKey" :data="msgMale[66].answer[2].answerKey" @blur="getDataQ67C(Q67C,msgMale[66].answer[2].answerKey)" :count="msgMale[66].answer[2].count" v-model="Q67C">
              <span>{{ msgMale[66].answer[2].company }}</span> 
            </li>
            <li>
              <span>{{ msgMale[66].answer[3].answerName }}</span> 
              <input type="text" class="container" :id="msgMale[66].answer[3].id" :name="msgMale[66].answer[3].answerKey" :data="msgMale[66].answer[3].answerKey" @blur="getDataQ67D(Q67D,msgMale[66].answer[3].answerKey)" :count="msgMale[66].answer[3].count" v-model="Q67D">
              <span>{{ msgMale[66].answer[3].company }}</span> 
            </li>
            <li class="container_list_answer_a_2_bottom">
              <span>血压</span> 
              <input type="text" class="container" :id="msgMale[66].answer[4].id" :name="msgMale[66].answer[4].answerKey" :data="msgMale[66].answer[4].answerKey" @blur="getDataQ67E(Q67E,msgMale[66].answer[4].answerKey)" :count="msgMale[66].answer[4].count" v-model="Q67E">
              <b>/</b>
              <input type="text" class="container" :id="msgMale[66].answer[5].id" :name="msgMale[66].answer[5].answerKey" :data="msgMale[66].answer[5].answerKey" @blur="getDataQ67F(Q67F,msgMale[66].answer[5].answerKey)" :count="msgMale[66].answer[5].count" v-model="Q67F">
              <span>mmol/L</span>
            </li>
          </ul>
        </div>
      </div>
      
      <!-- Q68 -->
      <div class="question_Q27" ref="Q68">{{ msgMale[67].title }}</div>
      <div class="container_list" ref="Q68A">
        <div class="container_list_subject">
          <span class="question_num">{{ msgMale[67].labels[0].num }}：</span>
          {{ msgMale[67].labels[0].title }}
        </div>
        <div class="container_list_answer_radio" id="container_list_answer_c">
          <ul class="">
            <li v-for="item in msgMale[67].labels[0].answer" @click="getDataQ68A(item.answerType,item.answerKey)" :class="{ active : Q68A == item.answerType }">
              <label :for="item.id">
                <span>
                  <input type="radio" :name="item.answerKey" :id="item.id" :value="item.answerType" :count="item.count" v-model="Q68A">
                </span>
                {{ item.answerName }}
              </label> 
            </li>
          </ul>
        </div>
      </div>

      <div class="container_list" ref="Q68B">
        <div class="container_list_subject">
          <span class="question_num">{{ msgMale[67].labels[1].num }}：</span>
          {{ msgMale[67].labels[1].title }}
        </div>
        <div class="container_list_answer_radio" id="container_list_answer_c">
          <ul class="">
            <li v-for="item in msgMale[67].labels[1].answer" @click="getDataQ68B(item.answerType,item.answerKey)" :class="{ active : Q68B == item.answerType }">
              <label :for="item.id">
                <span>
                  <input type="radio" :name="item.answerKey" :id="item.id" :value="item.answerType" :count="item.count" v-model="Q68B">
                </span>
                {{ item.answerName }}
              </label> 
            </li>
          </ul>
        </div>
      </div>

      <div class="container_list" ref="Q68C">
        <div class="container_list_subject">
          <span class="question_num">{{ msgMale[67].labels[2].num }}：</span>
          {{ msgMale[67].labels[2].title }}
        </div>
        <div class="container_list_answer_radio" id="container_list_answer_c">
          <ul class="">
            <li v-for="item in msgMale[67].labels[2].answer" @click="getDataQ68C(item.answerType,item.answerKey)" :class="{ active : Q68C == item.answerType }">
              <label :for="item.id">
                <span>
                  <input type="radio" :name="item.answerKey" :id="item.id" :value="item.answerType" :count="item.count" v-model="Q68C">
                </span>
                {{ item.answerName }}
              </label> 
            </li>
          </ul>
        </div>
      </div>

      <div class="container_list" ref="Q68D">
        <div class="container_list_subject">
          <span class="question_num">{{ msgMale[67].labels[3].num }}：</span>
          {{ msgMale[67].labels[3].title }}
        </div>
        <div class="container_list_answer_radio" id="container_list_answer_c">
          <ul class="">
            <li v-for="item in msgMale[67].labels[3].answer" @click="getDataQ68D(item.answerType,item.answerKey)" :class="{ active : Q68D == item.answerType }">
              <label :for="item.id">
                <span>
                  <input type="radio" :name="item.answerKey" :id="item.id" :value="item.answerType" :count="item.count" v-model="Q68D">
                </span>
                {{ item.answerName }}
              </label> 
            </li>
          </ul>
        </div>
      </div>

      <!-- Q69 -->
      <div class="question_Q27" ref="Q69">{{ msgMale[68].title }}</div>

      <div class="container_list" ref="Q69E">
        <div class="container_list_subject">
          <span class="question_num">{{ msgMale[68].labels[4].num }}：</span>
          {{ msgMale[68].labels[4].title }}
        </div>
        <div class="container_list_answer_radio" id="container_list_answer_c">
          <ul class="">
            <li v-for="item in msgMale[68].labels[4].answer" @click="getDataQ69E(item.answerType,item.answerKey)" :class="{ active : Q69E == item.answerType }">
              <label :for="item.id">
                <span>
                  <input type="radio" :name="item.answerKey" :id="item.id" :value="item.answerType" :count="item.count" v-model="Q69E">
                </span>
                {{ item.answerName }}
              </label> 
            </li>
          </ul>
        </div>
      </div>

      <div class="container_list" ref="Q69F">
        <div class="container_list_subject">
          <span class="question_num">{{ msgMale[68].labels[5].num }}：</span>
          {{ msgMale[68].labels[5].title }}
        </div>
        <div class="container_list_answer_radio" id="container_list_answer_c">
          <ul class="">
            <li v-for="item in msgMale[68].labels[5].answer" @click="getDataQ69F(item.answerType,item.answerKey)" :class="{ active : Q69F == item.answerType }">
              <label :for="item.id">
                <span>
                  <input type="radio" :name="item.answerKey" :id="item.id" :value="item.answerType" :count="item.count" v-model="Q69F">
                </span>
                {{ item.answerName }}
              </label> 
            </li>
          </ul>
        </div>
      </div>

      <div class="container_list" ref="Q69G">
        <div class="container_list_subject">
          <span class="question_num">{{ msgMale[68].labels[6].num }}：</span>
          {{ msgMale[68].labels[6].title }}
        </div>
        <div class="container_list_answer_radio" id="container_list_answer_c">
          <ul class="">
            <li v-for="item in msgMale[68].labels[6].answer" @click="getDataQ69G(item.answerType,item.answerKey)" :class="{ active : Q69G == item.answerType }">
              <label :for="item.id">
                <span>
                  <input type="radio" :name="item.answerKey" :id="item.id" :value="item.answerType" :count="item.count" v-model="Q69G">
                </span>
                {{ item.answerName }}
              </label> 
            </li>
          </ul>
        </div>
      </div>

      <div class="container_list" ref="Q69H">
        <div class="container_list_subject">
          <span class="question_num">{{ msgMale[68].labels[7].num }}：</span>
          {{ msgMale[68].labels[7].title }}
        </div>
        <div class="container_list_answer_radio" id="container_list_answer_c">
          <ul class="">
            <li v-for="item in msgMale[68].labels[7].answer" @click="getDataQ69H(item.answerType,item.answerKey)" :class="{ active : Q69H == item.answerType }">
              <label :for="item.id">
                <span>
                  <input type="radio" :name="item.answerKey" :id="item.id" :value="item.answerType" :count="item.count" v-model="Q69H">
                </span>
                {{ item.answerName }}
              </label> 
            </li>
          </ul>
        </div>
      </div>
      
      <!--  Q70 -->
      <div class="container_list" ref="Q70">
        <div class="container_list_subject">
          <span class="question_num">{{ msgMale[69].num }}：</span>
          {{ msgMale[69].title }}
        </div>
        <div class="container_list_content">
          <ul>
            <li class="container_list_content_title">{{ msgMale[69].answer[0].answerName }}</li>
            <li class="container_list_content_txt">
              <input type="text" :id="msgMale[69].answer[0].id" :name="msgMale[69].answer[0].answerKey" :data="msgMale[69].answer[0].answerKey" :count="msgMale[69].answer[0].count" @blur="getDataQ701(Q701,msgMale[69].answer[0].answerKey)" v-model="Q701">
              <span @click="pickeCompany70">{{ company70 == 1 ? 'mmol/L':'mg/dl' }}</span>
            </li>
          </ul>
          <ul>
            <li class="container_list_content_title">{{ msgMale[69].answer[1].answerName }}</li>
            <li class="container_list_content_txt">
              <input type="text" :id="msgMale[69].answer[1].id" :name="msgMale[69].answer[1].answerKey" :data="msgMale[69].answer[1].answerKey" :count="msgMale[69].answer[1].count" @blur="getDataQ702(Q702,msgMale[69].answer[1].answerKey)" v-model="Q702">
              <span @click="pickeCompany71">{{ company71 == 1 ? 'mmol/L':'mg/dl' }}</span>
            </li>
          </ul>
          <ul>
            <li class="container_list_content_title">{{ msgMale[69].answer[2].answerName }}</li>
            <li class="container_list_content_txt">
              <input type="text" :id="msgMale[69].answer[2].id" :name="msgMale[69].answer[2].answerKey" :data="msgMale[69].answer[2].answerKey" :count="msgMale[69].answer[2].count" @blur="getDataQ703(Q703,msgMale[69].answer[2].answerKey)" v-model="Q703">
              <span @click="pickeCompany72">{{ company72 == 1 ? 'mmol/L':'mg/dl' }}</span>
            </li>
          </ul>
          <ul>
            <li class="container_list_content_title">{{ msgMale[69].answer[3].answerName }}</li>
            <li class="container_list_content_txt">
              <input type="text" :id="msgMale[69].answer[3].id" :name="msgMale[69].answer[3].answerKey" :data="msgMale[69].answer[3].answerKey" :count="msgMale[69].answer[3].count" @blur="getDataQ704(Q704,msgMale[69].answer[3].answerKey)" v-model="Q704">
              <span @click="pickeCompany73">{{ company73 == 1 ? 'mmol/L':'mg/dl' }}</span>
            </li>
          </ul>
          <ul>
            <li class="container_list_content_title">{{ msgMale[69].answer[4].answerName }}</li>
            <li class="container_list_content_txt">
              <input type="text" :id="msgMale[69].answer[4].id" :name="msgMale[69].answer[4].answerKey" :data="msgMale[69].answer[4].answerKey" :count="msgMale[69].answer[4].count" @blur="getDataQ705(Q705,msgMale[69].answer[4].answerKey)" v-model="Q705">
              <span @click="pickeCompany74">{{ company74 == 1 ? 'mmol/L':'mg/dl' }}</span>
            </li>
          </ul>
<!--           <ul>
  <li class="container_list_content_title">{{ msgMale[69].answer[5].answerName }}</li>
  <li class="container_list_content_txt">
    <input type="text" :id="msgMale[69].answer[5].id" :name="msgMale[69].answer[5].answerKey" :data="msgMale[69].answer[5].answerKey" :count="msgMale[69].answer[5].count" @blur="getDataQ706(Q706,msgMale[69].answer[5].answerKey)" v-model="Q706">
    <span @click="pickeCompany75">{{ company75 == 1 ? 'mmol/L':'mg/dl' }}</span>
  </li>
</ul>
<ul>
  <li class="container_list_content_title">{{ msgMale[69].answer[6].answerName }}</li>
  <li class="container_list_content_txt">
    <input type="text" :id="msgMale[69].answer[6].id" :name="msgMale[69].answer[6].answerKey" :data="msgMale[69].answer[6].answerKey" :count="msgMale[69].answer[6].count" @blur="getDataQ707(Q707,msgMale[69].answer[6].answerKey)" v-model="Q707">
    <span>{{ msgMale[69].answer[6].company }}</span>>
  </li>
</ul>
<ul>
  <li class="container_list_content_title">{{ msgMale[69].answer[7].answerName }}</li>
  <li class="container_list_content_txt">
    <input type="text" :id="msgMale[69].answer[7].id" :name="msgMale[69].answer[7].answerKey" :data="msgMale[69].answer[7].answerKey" :count="msgMale[69].answer[7].count" @blur="getDataQ708(Q708,msgMale[69].answer[7].answerKey)" v-model="Q708">
    <span>{{ msgMale[69].answer[7].company }}</span>
  </li>
</ul>
<ul>
  <li class="container_list_content_title">{{ msgMale[69].answer[8].answerName }}</li>
  <li class="container_list_content_txt">
    <input type="text" :id="msgMale[69].answer[8].id" :name="msgMale[69].answer[8].answerKey" :data="msgMale[69].answer[8].answerKey" :count="msgMale[69].answer[8].count" @blur="getDataQ709(Q709,msgMale[69].answer[8].answerKey)" v-model="Q709">
    <span>{{ msgMale[69].answer[8].company }}</span>
  </li>
</ul>
<ul>
  <li class="container_list_content_title">{{ msgMale[69].answer[9].answerName }}</li>
  <li class="container_list_content_txt">
    <input type="text" :id="msgMale[69].answer[9].id" :name="msgMale[69].answer[9].answerKey" :data="msgMale[69].answer[9].answerKey" :count="msgMale[69].answer[9].count" @click="getDataQ7010(Q7010,msgMale[69].answer[9].answerKey)" readonly v-model="Q7010">
    <span>{{ msgMale[69].answer[9].company }}</span>
  </li>
</ul>
<ul>
  <li class="container_list_content_title">{{ msgMale[69].answer[10].answerName }}</li>
  <li class="container_list_content_txt">
    <input type="text" :id="msgMale[69].answer[10].id" :name="msgMale[69].answer[10].answerKey" :data="msgMale[69].answer[10].answerKey" :count="msgMale[69].answer[10].count" @blur="getDataQ7011(Q7011,msgMale[69].answer[10].answerKey)" v-model="Q7011">
    <span>{{ msgMale[69].answer[10].company }}</span>
  </li>
</ul>
<ul>
  <li class="container_list_content_title">{{ msgMale[69].answer[11].answerName }}</li>
  <li class="container_list_content_txt">
    <input type="text" :id="msgMale[69].answer[11].id" :name="msgMale[69].answer[11].answerKey" :data="msgMale[69].answer[11].answerKey" :count="msgMale[69].answer[11].count" @click="getDataQ7012(Q7012,msgMale[69].answer[11].answerKey)" readonly v-model="Q7012">
    <span>{{ msgMale[69].answer[11].company }}</span>
  </li>
</ul>
<ul>
  <li class="container_list_content_title">{{ msgMale[69].answer[12].answerName }}</li>
  <li class="container_list_content_txt">
    <input type="text" :id="msgMale[69].answer[12].id" :name="msgMale[69].answer[12].answerKey" :data="msgMale[69].answer[12].answerKey" :count="msgMale[69].answer[12].count" @click="getDataQ7013(Q7013,msgMale[69].answer[12].answerKey)" readonly v-model="Q7013">
    <span>{{ msgMale[69].answer[12].company }}</span>
  </li>
</ul>
<ul>
  <li class="container_list_content_title">{{ msgMale[69].answer[13].answerName }}</li>
  <li class="container_list_content_txt">
    <input type="text" :id="msgMale[69].answer[13].id" :name="msgMale[69].answer[13].answerKey" :data="msgMale[69].answer[13].answerKey" :count="msgMale[69].answer[13].count" @click="getDataQ7014(Q7014,msgMale[69].answer[13].answerKey)" readonly v-model="Q7014">
    <span>{{ msgMale[69].answer[13].company }}</span>
  </li>
</ul>
<ul>
  <li class="container_list_content_title">{{ msgMale[69].answer[14].answerName }}</li>
  <li class="container_list_content_txt">
    <input type="text" :id="msgMale[69].answer[14].id" :name="msgMale[69].answer[14].answerKey" :data="msgMale[69].answer[14].answerKey" :count="msgMale[69].answer[14].count" @click="getDataQ7015(Q7015,msgMale[69].answer[14].answerKey)" readonly v-model="Q7015">
    <span>{{ msgMale[69].answer[14].company }}</span>
  </li>
</ul>
<ul>
  <li class="container_list_content_title">{{ msgMale[69].answer[15].answerName }}</li>
  <li class="container_list_content_txt">
    <input type="text" :id="msgMale[69].answer[15].id" :name="msgMale[69].answer[15].answerKey" :data="msgMale[69].answer[15].answerKey" :count="msgMale[69].answer[15].count" @blur="getDataQ7016(Q7016,msgMale[69].answer[15].answerKey)" v-model="Q7016">
    <span>{{ msgMale[69].answer[15].company }}</span>
  </li>
</ul>
<ul>
  <li class="container_list_content_title">{{ msgMale[69].answer[16].answerName }}</li>
  <li class="container_list_content_txt">
    <input type="text" :id="msgMale[69].answer[16].id" :name="msgMale[69].answer[16].answerKey" :data="msgMale[69].answer[16].answerKey" :count="msgMale[69].answer[16].count" @blur="getDataQ7017(Q7017,msgMale[69].answer[16].answerKey)" v-model="Q7017">
    <span>{{ msgMale[69].answer[16].company }}</span>
  </li>
</ul>
<ul>
  <li class="container_list_content_title">{{ msgMale[69].answer[17].answerName }}</li>
  <li class="container_list_content_txt">
    <input type="text" :id="msgMale[69].answer[17].id" :name="msgMale[69].answer[17].answerKey" :data="msgMale[69].answer[17].answerKey" :count="msgMale[69].answer[17].count" @blur="getDataQ7018(Q7018,msgMale[69].answer[17].answerKey)" v-model="Q7018">
    <span>{{ msgMale[69].answer[17].company }}</span>
  </li>
</ul>
<ul>
  <li class="container_list_content_title">{{ msgMale[69].answer[18].answerName }}</li>
  <li class="container_list_content_txt">
    <input type="text" :id="msgMale[69].answer[18].id" :name="msgMale[69].answer[18].answerKey" :data="msgMale[69].answer[18].answerKey" :count="msgMale[69].answer[18].count" @blur="getDataQ7019(Q7019,msgMale[69].answer[18].answerKey)" v-model="Q7019">
    <span>{{ msgMale[69].answer[18].company }}</span>
  </li>
</ul> -->
          <ul>
            <li class="container_list_content_title">{{ msgMale[69].answer[19].answerName }}</li>
            <li class="container_list_content_txt">
              <input type="text" :id="msgMale[69].answer[19].id" :name="msgMale[69].answer[19].answerKey" :data="msgMale[69].answer[19].answerKey" :count="msgMale[69].answer[19].count" @blur="getDataQ7020(Q7020,msgMale[69].answer[19].answerKey)" v-model="Q7020">
              <span>{{ msgMale[69].answer[19].company }}</span>
            </li>
          </ul>
        </div>
      </div>

      <!--  Q71 -->
      <div class="container_list" ref="Q71">
        <div class="container_list_subject">
          <span class="question_num">{{ msgMale[70].num }}：</span>
          {{ msgMale[70].title }}
        </div>
        <div  class="container_list_answer_radio" id="container_list_answer_a_4">
          <ul>
            <li v-for="item in msgMale[70].answer" @click="getDataQ71(item.answerType,item.answerKey)" :class="{ active : Q71 == item.answerType }">
              <label :for="item.id">
                <span>
                  <input type="radio" :name="item.answerKey" :id="item.id" :value="item.answerType" :count="item.count" v-model="Q71">
                </span>
                {{ item.answerName }}
              </label> 
            </li>
          </ul>
        </div>
      </div>
       <!--  Q72 -->
        <div class="container_list" ref="Q72">
          <div class="container_list_subject">
            <span class="question_num">{{ msgMale[71].num }}：</span>
            {{ msgMale[71].title }}
          </div>
          <div  class="container_list_answer_radio" id="container_list_answer_a_4">
            <ul>
              <li v-for="item in msgMale[71].answer" @click="getDataQ72(item.answerType,item.answerKey)" :class="{ active : Q72 == item.answerType }">
                <label :for="item.id">
                  <span>
                    <input type="radio" :name="item.answerKey" :id="item.id" :value="item.answerType" :count="item.count" v-model="Q72">
                  </span>
                  {{ item.answerName }}
                </label> 
              </li>
            </ul>
          </div>
        </div>
        <!-- 女性 -->
      <div v-if="gender == 2">
        <!--  Q73 -->
        <div class="container_list" ref="Q73">
          <div class="container_list_subject">
            <span class="question_num">{{ msgMale[72].num }}：</span>
            {{ msgMale[72].title }}
          </div>
          <div  class="container_list_answer_radio" id="container_list_answer_c">
            <ul>
              <li v-for="item in msgMale[72].answer" @click="getDataQ73(item.answerType,item.answerKey)" :class="{ active : Q73 == item.answerType }">
                <label :for="item.id">
                  <span>
                    <input type="radio" :name="item.answerKey" :id="item.id" :value="item.answerType" :count="item.count" v-model="Q73">
                  </span>
                  {{ item.answerName }}
                </label> 
              </li>
            </ul>
          </div>
        </div>

        <!--  Q74 -->
        <div class="container_list" ref="Q74">
          <div class="container_list_subject">
            <span class="question_num">{{ msgMale[73].num }}：</span>
            {{ msgMale[73].title }}
          </div>
          <div  class="container_list_answer_radio" id="container_list_answer_c">
            <ul>
              <li v-for="item in msgMale[73].answer" @click="getDataQ74(item.answerType,item.answerKey)" :class="{ active : Q74 == item.answerType }">
                <label :for="item.id">
                  <span>
                    <input type="radio" :name="item.answerKey" :id="item.id" :value="item.answerType" :count="item.count" v-model="Q74">
                  </span>
                  {{ item.answerName }}
                </label> 
              </li>
            </ul>
          </div>
        </div>

        <!--  Q75 -->
        <div class="container_list" ref="Q75">
          <div class="container_list_subject_completion">
            <span class="question_num">{{ msgMale[74].num }}：</span>
            <span>{{ msgMale[74].title }}</span>
            <input type="text" :id="msgMale[74].id" :name="msgMale[74].answerKey" :data="msgMale[74].answerKey" :count="msgMale[74].count" @click="getDataQ75(Q75,msgMale[74].answerKey)" readonly="readonly" v-model="Q75">
            <span>岁</span>
          </div>
        </div>

        <!--  Q76 -->
        <div class="container_list" ref="Q76">
          <div class="container_list_subject">
            <span class="question_num">{{ msgMale[75].num }}：</span>
            {{ msgMale[75].title }}
          </div>
          <div  class="container_list_answer_radio" id="container_list_answer_a_2">
            <ul>
              <li v-for="item in msgMale[75].answer" @click="getDataQ76(item.answerType,item.answerKey)" :class="{ active : Q76 == item.answerType }">
                <label :for="item.id">
                  <span>
                    <input type="radio" :name="item.answerKey" :id="item.id" :value="item.answerType" :count="item.count" v-model="Q76">
                  </span>
                  {{ item.answerName }}
                </label> 
              </li>
            </ul>
          </div>
        </div>

        <!--  Q77 -->
        <div class="container_list" ref="Q77">
          <div class="container_list_subject">
            <span class="question_num">{{ msgMale[76].num }}：</span>
            {{ msgMale[76].title }}
          </div>
          <div  class="container_list_answer_radio" id="container_list_answer_a_2">
            <ul>
              <li v-for="item in msgMale[76].answer" @click="getDataQ77(item.answerType,item.answerKey)" :class="{ active : Q77 == item.answerType }">
                <label :for="item.id">
                  <span>
                    <input type="radio" :name="item.answerKey" :id="item.id" :value="item.answerType" :count="item.count" v-model="Q77">
                  </span>
                  {{ item.answerName }}
                </label> 
              </li>
            </ul>
          </div>
        </div>

        <!--  Q78 -->
        <div class="container_list" ref="Q78">
          <div class="container_list_subject_completion" v-show="judge_77">
            <span class="question_num">{{ msgMale[77].num }}：</span>
            <span>{{ msgMale[77].title }}</span>
            <input type="text" :id="msgMale[77].id" :name="msgMale[77].answerKey" :data="msgMale[77].answerKey" :count="msgMale[77].count" @click="getDataQ78(Q78,msgMale[77].answerKey)" readonly="readonly" v-model="Q78">
            <span>岁</span>
          </div>
        </div>

        <!--  Q79 -->
        <div class="container_list" ref="Q79">
          <div class="container_list_subject_completion" v-show="judge_77">
            <span class="question_num">{{ msgMale[78].num }}：</span>
            <span>{{ msgMale[78].title }}</span>
            <input type="text" :id="msgMale[78].id" :name="msgMale[78].answerKey" :data="msgMale[78].answerKey" :count="msgMale[78].count" @click="getDataQ79(Q79,msgMale[78].answerKey)" readonly="readonly" v-model="Q79">
            <span>个孩子</span>
          </div>
        </div>

        <!--  Q80 -->
        <div class="container_list" ref="Q80" v-show="judge_77">
          <div class="container_list_subject">
            <span class="question_num">{{ msgMale[79].num }}：</span>
            {{ msgMale[79].title }}
          </div>
          <div class="container_list_answer_check" id="container_list_answer_c">
            <ul class="">
              <li v-for="(item,index) in msgMale[79].answer" @click="getDataQ80(item.answerType,item.answerKey)" :class="{ active : isInArray(checkArr,item.answerKey) }">
                <label :for="item.id">
                  <span>
                    <input type="checkbox" :name="item.answerKey" :id="item.id" :value="item.answerKey" :count="item.count" v-model="checkArr">
                  </span>  
                  {{ item.answerName }}
                </label> 
              </li>
            </ul>
          </div>
        </div>

        <!--  Q81 -->
        <div class="container_list" ref="Q81" v-show="judge_77">
          <div class="container_list_subject_completion">
            <span class="question_num">{{ msgMale[80].num }}：</span>
            <span>{{ msgMale[80].title }}</span>
            <input type="text" :id="msgMale[80].id" :name="msgMale[80].answerKey" :data="msgMale[80].answerKey" :count="msgMale[80].count" @click="getDataQ81(Q81,msgMale[80].answerKey)" readonly="readonly" v-model="Q81">
            <span>年</span>
          </div>
        </div>
        
        <!--  Q82 -->
        <div class="container_list" ref="Q82">
          <div class="container_list_subject">
            <span class="question_num">{{ msgMale[81].num }}：</span>
            {{ msgMale[81].title }}
          </div>
          <div  class="container_list_answer_radio" id="container_list_answer_c">
            <ul>
              <li v-for="item in msgMale[81].answer" @click="getDataQ82(item.answerType,item.answerKey)" :class="{ active : Q82 == item.answerType }">
                <label :for="item.id">
                  <span>
                    <input type="radio" :name="item.answerKey" :id="item.id" :value="item.answerType" :count="item.count" v-model="Q82">
                  </span>
                  {{ item.answerName }}
                </label> 
              </li>
            </ul>
          </div>
        </div>

        <!--  Q83 -->
        <div class="container_list" ref="Q83">
          <div class="container_list_subject">
            <span class="question_num">{{ msgMale[82].num }}：</span>
            {{ msgMale[82].title }}
          </div>
          <div  class="container_list_answer_radio" id="container_list_answer_a_2"> 
            <ul>
              <li v-for="item in msgMale[82].answer" @click="getDataQ83(item.answerType,item.answerKey)" :class="{ active : Q83 == item.answerType }">
                <label :for="item.id">
                  <span>
                    <input type="radio" :name="item.answerKey" :id="item.id" :value="item.answerType" :count="item.count" v-model="Q83">
                  </span>
                  {{ item.answerName }}
                </label> 
              </li>
            </ul>
          </div>
        </div>
        
        <!--  Q84 -->
        <div class="container_list" ref="Q84" v-show="judge_83">
          <div class="container_list_subject_completion">
            <span class="question_num">{{ msgMale[83].num }}：</span>
            <span>{{ msgMale[83].title }}</span>
            <input type="text" :id="msgMale[83].id" :name="msgMale[83].answerKey" :data="msgMale[83].answerKey" :count="msgMale[83].count" @click="getDataQ84(Q84,msgMale[83].answerKey)" readonly="readonly" v-model="Q84">
            <span>岁</span>
          </div>
        </div>

        <!--  Q85 -->
        <div class="container_list" ref="Q85" v-show="judge_83">
          <div class="container_list_subject">
            <span class="question_num">{{ msgMale[84].num }}：</span>
            {{ msgMale[84].title }}
          </div>
          <div  class="container_list_answer_radio" id="container_list_answer_a_2">
            <ul>
              <li v-for="item in msgMale[84].answer" @click="getDataQ85(item.answerType,item.answerKey)" :class="{ active : Q85 == item.answerType }">
                <label :for="item.id">
                  <span>
                    <input type="radio" :name="item.answerKey" :id="item.id" :value="item.answerType" :count="item.count" v-model="Q85">
                  </span>
                  {{ item.answerName }}
                </label> 
              </li>
            </ul>
          </div>
        </div>

        <!--  Q86 -->
        <div class="container_list" ref="Q86" v-show="judge_85">
          <div class="container_list_subject_completion">
            <span class="question_num">{{ msgMale[85].num }}：</span>
            <span>{{ msgMale[85].title }}</span>
            <input type="text" :id="msgMale[85].id" :name="msgMale[85].answerKey" :data="msgMale[85].answerKey" :count="msgMale[85].count" @click="getDataQ86(Q86,msgMale[85].answerKey)" readonly="readonly" v-model="Q86">
            <span>年</span>
          </div>
        </div>
      </div>
      <awesome-picker
        ref="picker431"
        :textTitle="pickerDay.textTitle"
        :data="pickerDay.data"
        :anchor="pickerDay.anchor"
        @confirm="handlePicker0Confirm431">
      </awesome-picker>
      <awesome-picker
        ref="picker432"
        :textTitle="pickerTime.textTitle"
        :data="pickerTime.data"
        :anchor="pickerTime.anchor"
        @confirm="handlePicker0Confirm432">
      </awesome-picker>
      <awesome-picker
        ref="picker433"
        :textTitle="pickerDay.textTitle"
        :data="pickerDay.data"
        :anchor="pickerDay.anchor"
        @confirm="handlePicker0Confirm433">
      </awesome-picker>
      <awesome-picker
        ref="picker434"
        :textTitle="pickerTime.textTitle"
        :data="pickerTime.data"
        :anchor="pickerTime.anchor"
        @confirm="handlePicker0Confirm434">
      </awesome-picker>
      <awesome-picker
        ref="picker435"
        :textTitle="pickerDay.textTitle"
        :data="pickerDay.data"
        :anchor="pickerDay.anchor"
        @confirm="handlePicker0Confirm435">
      </awesome-picker>
      <awesome-picker
        ref="picker436"
        :textTitle="pickerTime.textTitle"
        :data="pickerTime.data"
        :anchor="pickerTime.anchor"
        @confirm="handlePicker0Confirm436">
      </awesome-picker>
      <awesome-picker
        ref="picker437"
        :textTitle="picker1.textTitle"
        :data="picker1.data"
        :anchor="picker1.anchor"
        @confirm="handlePicker0Confirm437">
      </awesome-picker>
      <awesome-picker
        ref="picker438"
        :textTitle="pickerTime.textTitle"
        :data="pickerTime.data"
        :anchor="pickerTime.anchor"
        @confirm="handlePicker0Confirm438">
      </awesome-picker>
      <awesome-picker
        ref="picker20"
        :textTitle="picker0.textTitle"
        :data="picker0.data"
        :anchor="picker0.anchor"
        @confirm="handlePicker0Confirm20">
      </awesome-picker>
      <awesome-picker
        ref="picker21"
        :textTitle="picker0.textTitle"
        :data="picker0.data"
        :anchor="picker0.anchor"
        @confirm="handlePicker0Confirm21">
      </awesome-picker>
      <awesome-picker
        ref="picker22"
        :textTitle="picker0.textTitle"
        :data="picker0.data"
        :anchor="picker0.anchor"
        @confirm="handlePicker0Confirm22">
      </awesome-picker>
      <awesome-picker
        ref="picker45"  
        :textTitle="picker1.textTitle"
        :data="picker1.data"
        :anchor="picker1.anchor"
        @confirm="handlePicker0Confirm45">
      </awesome-picker>
      <awesome-picker
        ref="picker7010"  
        :textTitle="picker2.textTitle"
        :data="picker2.data"
        :anchor="picker2.anchor"
        @confirm="handlePicker0Confirm7010">
      </awesome-picker>
      <awesome-picker
        ref="picker7012"  
        :textTitle="picker2.textTitle"
        :data="picker2.data"
        :anchor="picker2.anchor"
        @confirm="handlePicker0Confirm7012">
      </awesome-picker>
      <awesome-picker
        ref="picker7013"  
        :textTitle="picker2.textTitle"
        :data="picker2.data"
        :anchor="picker2.anchor"
        @confirm="handlePicker0Confirm7013">
      </awesome-picker>
      <awesome-picker
        ref="picker7014"  
        :textTitle="picker2.textTitle"
        :data="picker2.data"
        :anchor="picker2.anchor"
        @confirm="handlePicker0Confirm7014">
      </awesome-picker>
      <awesome-picker
        ref="pickeCompanys70"
        :textTitle="pickeCompanys.textTitle"
        :data="pickeCompanys.data"
        :anchor="pickeCompanys.anchor"
        @confirm="handlePickerCompany70">
      </awesome-picker>
      <awesome-picker
        ref="pickeCompanys71"
        :textTitle="pickeCompanys.textTitle"
        :data="pickeCompanys.data"
        :anchor="pickeCompanys.anchor"
        @confirm="handlePickerCompany71">
      </awesome-picker>
      <awesome-picker
        ref="pickeCompanys72"
        :textTitle="pickeCompanys.textTitle"
        :data="pickeCompanys.data"
        :anchor="pickeCompanys.anchor"
        @confirm="handlePickerCompany72">
      </awesome-picker>
      <awesome-picker
        ref="pickeCompanys73"
        :textTitle="pickeCompanys.textTitle"
        :data="pickeCompanys.data"
        :anchor="pickeCompanys.anchor"
        @confirm="handlePickerCompany73">
      </awesome-picker>
      <awesome-picker
        ref="pickeCompanys74"
        :textTitle="pickeCompanys.textTitle"
        :data="pickeCompanys.data"
        :anchor="pickeCompanys.anchor"
        @confirm="handlePickerCompany74">
      </awesome-picker>
      <awesome-picker
        ref="pickeCompanys75"
        :textTitle="pickeCompanys.textTitle"
        :data="pickeCompanys.data"
        :anchor="pickeCompanys.anchor"
        @confirm="handlePickerCompany75">
      </awesome-picker>
      <awesome-picker
        ref="picker36"
        :textTitle="picker36.textTitle"
        :data="picker36.data"
        :anchor="picker36.anchor"
        @confirm="handlePickerCompany36">
      </awesome-picker>

      <awesome-picker
        ref="picker75"
        :textTitle="picker75.textTitle"
        :data="picker75.data"
        :anchor="picker75.anchor"
        @confirm="handlePickerCompany75t">
      </awesome-picker>

      <awesome-picker
        ref="picker78"
        :textTitle="picker78.textTitle"
        :data="picker78.data"
        :anchor="picker78.anchor"
        @confirm="handlePickerCompany78t">
      </awesome-picker>

      <awesome-picker
        ref="picker79"
        :textTitle="picker79.textTitle"
        :data="picker79.data"
        :anchor="picker79.anchor"
        @confirm="handlePickerCompany79t">
      </awesome-picker>

      <awesome-picker
        ref="picker81"
        :textTitle="picker81.textTitle"
        :data="picker81.data"
        :anchor="picker81.anchor"
        @confirm="handlePickerCompany81t">
      </awesome-picker>

      <awesome-picker
        ref="picker84"
        :textTitle="picker84.textTitle"
        :data="picker84.data"
        :anchor="picker84.anchor"
        @confirm="handlePickerCompany84t">
      </awesome-picker>

      <awesome-picker
        ref="picker86"
        :textTitle="pickeryear86.textTitle"
        :data="pickeryear86.data"
        :anchor="pickeryear86.anchor"
        @confirm="handlePickerCompany86t">
      </awesome-picker>



    </div>  
    <!-- 提交按钮 -->
    <div class="question_sublimt">
      <a href="javascript:void(0)" @click="clientSubmit">确定提交</a>
    </div>
    <div class="info_tips" v-if="isSuccess">{{ isSuccess ? '提交成功':'提交失败'  }}</div>
    <div class="info_tips" v-if="isShow">{{ isSuccess ? '暂存成功':'暂存失败'  }}</div>
    <popup :message="message" v-if="popup"></popup>
  </div>
</template>

<script>
import popup from '../common/error-min-popup.vue'
import Heads from '../common/head.vue'
export default {

  name: 'HelloWorld',
  data () {
    return{
      Q371Arr:{},
      titleName:"慢性病问卷",
      picker0: {
        anchor: [],
        textTitle: '请选择',
        data: [['6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31', '32', '33', '34', '35', '36', '37', '38', '39', '40', '41', '42', '43', '44', '45', '46', '47', '48', '49', '50', '51', '52', '53', '54', '55']]
      },
      picker36: {
        anchor: [],
        textTitle: '请选择',
        data: [['6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24']]
      },
      picker1: {
        anchor: [],
        textTitle: '请选择小时',
        data: [['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23']]
      },
      picker2: {
        anchor: [],
        textTitle: '请选择',
        data: [['阳性', '阴性']]
      },
      picker75: {
        anchor: [],
        textTitle: '请选择',
        data: [['8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18']]
      },
      picker78: {
        anchor: [],
        textTitle: '请选择',
        data: [['6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31', '32', '33', '34', '35', '36', '37']]
      },
      picker79: {
        anchor: [],
        textTitle: '请选择',
        data: [['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10']]
      },
      picker81: {
        anchor: [],
        textTitle: '请选择',
        data: [
          ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
          ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
        ]
      },
      picker84: {
        anchor: [],
        textTitle: '请选择',
        data: [['40', '41', '42', '43', '44', '45', '46', '47', '48', '49', '50', '51', '52', '53', '54', '55', '56', '57', '58', '59', '60']]
      },
      pickeryear86:{
        anchor: [],
        textTitle: '请选择年份',
        data: [['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31', '32', '33', '34', '35', '36', '37', '38', '39', '40', '41', '42', '43', '44', '45', '46', '47', '48', '49', '50']]
      },
      pickeCompanys: {
        anchor: [],
        textTitle: '请选择',
        data: [['mmol/L', 'mg/dl']]
      },
      pickerDay:{
        anchor: [],
        textTitle: '请选择天数',
        data: [['0', '1', '2', '3', '4', '5', '6', '7']]
      },
      pickerTime:{
        anchor: [],
        textTitle: '请选择分钟',
        data: [['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31', '32', '33', '34', '35', '36', '37', '38', '39', '40', '41', '42', '43', '44', '45', '46', '47', '48', '49', '50', '51', '52', '53', '54', '55', '56', '57', '58', '59']]
      },
      company70 : '1',
      company71 : '1',
      company72 : '1',
      company73 : '1',
      company74 : '1',
      company75 : '1',
      gender:2, //问卷男女
      isShow: false,
      isSuccess: false,
      isRequired: false,
      token:"", //token
      userId:"", //用户ID
      datas : {}, // 储存数据
      popup:false,
      message:"",
      Q1 : "",
      Q2 : "",
      Q3 : "",
      Q4 : [],
      Q5 : "",
      Q6 : "",
      Q7 : [],
      Q8 : [],
      Q9 : "",
      Q10 : "",
      Q11 : "",
      Q12 : "",
      Q13 : "",
      Q14 : "",
      Q15 : "",
      Q16 : "",
      Q17 : "",
      Q18 : "",
      Q19 : "",
      Q20 : "",
      Q21 : "",
      Q22 : "",
      Q23 : "",
      Q24 : "",
      Q25 : "",
      Q26 : "",
      Q27 : "",
      Q27A : "",
      Q27B : "",
      Q27C : "",
      Q27D : "",
      Q27E : "",
      Q27F : "",
      Q27G : "",
      Q27H : "",
      Q27I : "",
      Q27J : "",
      Q27K : "",
      Q27As : "",
      Q27Bs : "",
      Q27Cs : "",
      Q27Ds : "",
      Q27Es : "",
      Q27Fs : "",
      Q27Gs : "",
      Q27Hs : "",
      Q28 : "",
      Q29 : [],
      Q30 : "",
      Q31 : "",
      Q32 : "",
      Q33 : "",
      Q34 : "",
      Q35 : "",
      Q36 : "",
      Q371 : "",
      Q372 : "",
      Q373 : "",
      Q371A : "",
      Q371B : "",
      Q371C : "",
      Q371D : "",
      Q371E : "",
      Q372A : "",
      Q372B : "",
      Q372C : "",
      Q372D : "",
      Q372E : "",
      Q373A : "",
      Q373B : "",
      Q373C : "",
      Q373D : "",
      Q373E : "",
      Q38 : "",
      Q39 : "",
      Q40A : "",
      Q40B : "",
      Q40C : "",
      Q40D : "",
      Q41 : "",
      Q42 : "",
      Q431 : "",
      Q432 : "",
      Q433 : "",
      Q434 : "",
      Q435 : "",
      Q436 : "",
      Q437 : "",
      Q438 : "",
      Q44 : "",
      Q45 : "",
      Q46 : "",
      Q47 : "",
      Q48 : "",
      Q49 : "",
      Q50 : "",
      Q51 : "",
      Q52 : "",
      Q53 : "",
      Q54 : "",
      Q55 : "",
      Q56 : "",
      Q57 : "",
      Q58 : "",
      Q59 : "",
      Q60 : "",
      Q61 : "",
      Q62 : "",
      Q63 : "",
      Q64 : "",
      Q65 : "",
      Q66 : "",
      Q67A : "",
      Q67B : "",
      Q67C : "",
      Q67D : "",
      Q67E : "",
      Q67F : "",
      Q68A : "",
      Q68B : "",
      Q68C : "",
      Q68D : "",
      Q69A : "",
      Q69B : "",
      Q69C : "",
      Q69D : "",
      Q69E : "",
      Q69F : "",
      Q69G : "",
      Q69H : "",
      Q701 : "",
      Q702 : "",
      Q703 : "",
      Q704 : "",
      Q705 : "",
      Q706 : "",
      Q707 : "",
      Q708 : "",
      Q709 : "",
      Q7010 : "",
      Q7011 : "",
      Q7012 : "",
      Q7013 : "",
      Q7014 : "",
      Q7015 : "",
      Q7016 : "",
      Q7017 : "",
      Q7018 : "",
      Q7019 : "",
      Q7020 : "",
      Q7021 : "",
      Q71 : "",
      Q72 : "",
      Q73 : "",
      Q74 : "",
      Q75 : "",
      Q76 : "",
      Q77 : "",
      Q78 : "",
      Q79 : "",
      Q80 : "",
      Q81 : "",
      Q82 : "",
      Q83 : "",
      Q84 : "",
      Q85 : "",
      Q86 : "",
      judge_11 : true, // 11题目判断跳题隐藏题
      judge_11s : true,  // 11题目判断跳题隐藏题
      judge_11as : true,  // 11题目判断跳题隐藏题
      judge_24 : true, // 11题目判断跳题隐藏题
      judge_33 : true,  // 11题目判断跳题隐藏题
      judge_77 : true,  // 77题目判断跳题隐藏题
      judge_83  : true,  // 77题目判断跳题隐藏题
      judge_85  : true,  // 77题目判断跳题隐藏题
      checkArr:[], // 存放暂存数据多选题
      checkTitleArr:[], // 存放暂存数据多选题标题
      checkArrPush:[], // 判断多选题
      msgMale:[
        {
          num : "Q1",
          title : "您目前的婚姻状况？",
          classType : '',
          answer : [
            { 
              id:"unmarried",
              answerName : "未婚", 
              answerType : 10, 
              answerKey : 'maritalCode' 
            },
            { 
              id:"married",
              answerName : "已婚", 
              answerType : 20, 
              answerKey : 'maritalCode' 
            },
            { 
              id:"lose",
              answerName : "丧偶", 
              answerType : 30, 
              answerKey : 'maritalCode' 
            },
            { 
              id:"divorce",
              answerName : "离异", 
              answerType : 40, 
              answerKey : 'maritalCode' 
            },
            { 
              id:"other",
              answerName : "其他", 
              answerType : 90, 
              answerKey : 'maritalCode' 
            },
          ]
        },
        {
          num : "Q2",
          title : "您目前的文化程度？",
          classType : '',
          answer : [
            { 
              id : "graduate", 
              answerName : "研究生教育", 
              answerType : 10, 
              answerKey : 'edBackgroundCode' 
            },
            { 
              id : "under", 
              answerName : "大学本科教育", 
              answerType : 20, 
              answerKey : 'edBackgroundCode' 
            },
            { 
              id : "specialty", 
              answerName : "大学专科教育", 
              answerType : 30, 
              answerKey : 'edBackgroundCode' 
            },
            { 
              id : "secondary", 
              answerName : "中等职业教育", 
              answerType : 40,
              answerKey : 'edBackgroundCode' 
            },
            { 
              id : "high", 
              answerName : "普通高级中学教育", 
              answerType : 60, 
              answerKey : 'edBackgroundCode' 
            },
            { 
              id : "junior", 
              answerName : "初级中学教育", 
              answerType : 70, 
              answerKey : 'edBackgroundCode' 
            },
            { 
              id : "primary", 
              answerName : "小学教育", 
              answerType : 80, 
              answerKey : 'edBackgroundCode' 
            },
            { 
              id : "others", 
              answerName : "其他", 
              answerType : 90, 
              answerKey : 'edBackgroundCode' 
            },
          ]
        },
        {
          num : "Q3",
          title : "您目前的职业？",
          classType : '0',
          answer : [
            { 
              id : "civil",
              answerName : "国家机关、党群组织、企业、事业单位负责人", 
              answerType : 1100, 
              answerKey : 'occupationCode' 
            },
            { 
              id : "technology", 
              answerName : "专业技术人员", 
              answerType : 1200, 
              answerKey : 'occupationCode' 
            },
            { 
              id : "work", 
              answerName : "办事人员和有关人员", 
              answerType : 1300, 
              answerKey : 'occupationCode' 
            },
            { 
              id : "service", 
              answerName : "商业、服务业人员", 
              answerType : 1400, 
              answerKey : 'occupationCode' 
            },
            { 
              id : "production", 
              answerName : "农/林/牧/渔/水利业生产人员", 
              answerType : 1500, 
              answerKey : 'occupationCode' 
            },
            { 
              id : "productiona", 
              answerName : "生产、运输设备操作人员及有关人员", 
              answerType : 1600, 
              answerKey : 'occupationCode' 
            },
            { 
              id : "soldier", 
              answerName : "军人", 
              answerType : 1700, 
              answerKey : 'occupationCode' 
            },
            { 
              id : "children", 
              answerName : "婴幼儿、学龄前儿童", 
              answerType : 1900, 
              answerKey : 'occupationCode' 
            },
            { 
              id : "student", 
              answerName : "学生", 
              answerType : 2000, 
              answerKey : 'occupationCode' 
            },
            { 
              id : "otherq", 
              answerName : "不便分类的其他从业人员", 
              answerType : 1800, 
              answerKey : 'occupationCode' 
            },
            { 
              id : "housework", 
              answerName : "家务", 
              answerType : 2100, 
              answerKey : 'occupationCode' 
            },
            { 
              id : "unemployed", 
              answerName : "无业或待业", 
              answerType : 2200, 
              answerKey : 'occupationCode' 
            }
          ]
        },
        {
          num : "Q4",
          title : "您目前或曾经是否被医生诊断过患有下列疾病？[多选题]",
          classType : '',
          answer : [
            { id : "diab_1", answerName : "１型糖尿病", answerType : "", answerKey : 'diab_1', count: 'Q4'},
            { id : "diab_2", answerName : "２型糖尿病", answerType : "", answerKey : 'diab_2', count: 'Q4' },
            { id : "hbp", answerName : "高血压", answerType : "", answerKey : 'hbp', count: 'Q4' },
            { id : "hpl", answerName : "血脂异常", answerType : "", answerKey : 'hpl', count: 'Q4' },
            { id : "fracture", answerName : "骨折", answerType : "", answerKey : 'fracture', count: 'Q4' },
            { id : "gout", answerName : "痛风/高尿酸血症", answerType : "", answerKey : 'gout', count: 'Q4' },
            { id : "asthma", answerName : "哮喘", answerType : "", answerKey : 'asthma', count: 'Q4' },
            { id : "chd", answerName : "冠心病/心肌梗死", answerType : "", answerKey : 'chd', count: 'Q4' },
            { id : "ra", answerName : "类风湿性关节炎", answerType : "", answerKey : 'ra', count: 'Q4' },
            { id : "stroke", answerName : "脑卒中/脑中风", answerType : "", answerKey : 'stroke', count: 'Q4' },
            { id : "ch", answerName : "脑出血", answerType : "", answerKey : 'ch', count: 'ch' },
            { id : "metabolism_syn", answerName : "代谢综合征", answerType : "", answerKey : 'metabolism_syn', count: 'Q4' },
            { id : "cd", answerName : "慢性腹泻", answerType : "", answerKey : 'cd', count: 'Q4' },
            { id : "constipation", answerName : "慢性便秘", answerType : "", answerKey : 'constipation', count: 'Q4' },
            { id : "duodenal_ulcer", answerName : "胃\十二指肠溃疡病", answerType : "", answerKey : 'duodenal_ulcer', count: 'Q4' },
            { id : "op", answerName : "骨质疏松症", answerType : "", answerKey : 'op', count: 'Q4' },
            { id : "hbv", answerName : "乙肝", answerType : "", answerKey : 'hbv', count: 'Q4' },
            { id : "lp", answerName : "胃、肠息肉", answerType : "", answerKey : 'lp', count: 'Q4'  },
            { id : "chronic_nephritis", answerName : "慢性肾炎", answerType : "", answerKey : 'chronic_nephritis', count: 'Q4'  },
            { id : "cholecystitis", answerName : "慢性胆囊炎/胆石症", answerType : "", answerKey : 'cholecystitis', count: 'Q4'  },
            { id : "pneum", answerName : "肺炎", answerType : "", answerKey : 'pneum', count: 'Q4'  },
            { id : "tb", answerName : "肺结核", answerType : "", answerKey : 'tb', count: 'Q4'  },
            { id : "fatty_liver_his", answerName : "脂肪肝", answerType : "", answerKey : 'fatty_liver_his', count: 'Q4'  },
            { id : "cirrhosis", answerName : "肝硬化", answerType : "", answerKey : 'cirrhosis', count: 'Q4'  },
            { id : "hcv", answerName : "丙肝", answerType : "", answerKey : 'hcv', count: 'Q4'  },
            { id : "hyperthyroidism", answerName : "甲亢", answerType : "", answerKey : 'hyperthyroidism', count: 'Q4'  },
            { id : "hypothyroidism", answerName : "甲减", answerType : "", answerKey : 'hypothyroidism', count: 'Q4'  },
            { id : "thyroid_nodules", answerName : "甲状腺结节", answerType : "", answerKey : 'thyroid_nodules', count: 'Q4'  },
            { id : "thyroid_cancer", answerName : "甲状腺癌", answerType : "", answerKey : 'thyroid_cancer', count: 'Q4'  },
            { id : "esophageal_cancer", answerName : "食管癌", answerType : "", answerKey : 'esophageal_cancer', count: 'Q4'  },
            { id : "lung", answerName : "肺癌", answerType : "", answerKey : 'lung', count: 'Q4'  },
            { id : "live_cancer", answerName : "肝癌", answerType : "", answerKey : 'live_cancer', count: 'Q4'  },
            { id : "ovarian_cancer", answerName : "卵巢癌", answerType : "", answerKey : 'ovarian_cancer', isFemale : true, count: 'Q4',type:1  },
            { id : "bc", answerName : "乳腺癌", answerType : "", answerKey : 'bc', count: 'Q4',type:1   },
            { id : "endometrial_cancer", answerName : "子宫内膜癌", answerType : "", answerKey : 'endometrial_cancer', isFemale : true, count: 'Q4',type:1  },
            { id : "gastric_cancer", answerName : "胃癌", answerType : "", answerKey : 'gastric_cancer', count: 'Q4'  },
            { id : "colorectal_cancer", answerName : "结直肠癌", answerType : "", answerKey : 'colorectal_cancer', count: 'Q4'  },
            { id : "pca", answerName : "前列腺癌", answerType : "", answerKey : 'pca', count: 'Q4',type:2  },
            { id : "cervical_carcinoma", answerName : "宫颈癌", answerType : "", answerKey : 'cervical_carcinoma', isFemale : true, count: 'Q4',type:1  },
            { id : "copd", answerName : "慢阻肺(慢性支气管炎/肺气肿)", answerType : "", answerKey : 'copd', count: 'Q4'  },
            { id : "prostate_disease", answerName : "前列腺疾病(前列腺增生/肥大/前列腺炎)", answerType : "", answerKey : 'prostate_disease', count: 'Q4',type:2  },
            { id : "chronic_kidney_disease", answerName : "慢性肾病（肾炎/肾病综合症/慢性肾功能不全）", answerType : "", answerKey : 'chronic_kidney_disease', count: 'Q4'  },
            { id : "bnign_breast_disease", answerName : "慢性乳腺疾病（乳腺增生/结节/腺病/囊肿等）", answerType : "", answerKey : 'bnign_breast_disease', isFemale : true, count: 'Q4',type:1  },
            { id : "chronic_gynecological", answerName : "慢性妇科相关疾病（子宫肌瘤/卵巢囊肿/炎症等）", answerType : "", answerKey : 'chronic_gynecological', isFemale : true, count: 'Q4',type:1  },
          ]
        },
        {
          num : "Q5",
          title : "您是否患有与骨质疏松紧密相关的疾病，包括成年成骨不全症、未治疗的长期甲状腺机能亢进、性腺机能减退、慢性营养不良等？",
          classType : '',
          answer : [
            { id : "Q5A", count: 'Q5', answerName : "是", answerType : 1, answerKey : 'secondary_op' },
            { id : "Q5B", count: 'Q5', answerName : "否", answerType : 2, answerKey : 'secondary_op' }
          ]
        },
        {
          num : "Q6",
          title : "您是否目前正在服用或曾经服用过肾上腺皮质激素（如强的松、地塞米松等）超过3个月？",
          classType : '',
          answer : [
            { id : "Q6A", count: 'Q6', answerName : "是", answerType : 1, answerKey : 'ach' },
            { id : "Q6B", count: 'Q6', answerName : "否", answerType : 2, answerKey : 'ach' }
          ]
        },
        {
          num : "Q7",
          title : "您是否长期服用（连续服用3个月以上，平均每日服用一次以上）下列药物？（若有，请在“□”处打√，否则不用填写）",
          classType : '',
          answer : [
            { id : "med_reduce_bp", answerName : "降压药", answerType : "", answerKey : 'med_reduce_bp',count: 'med_reduce_bp' },
            { id : "med_bg", answerName : "降糖药", answerType : "", answerKey : 'med_bg',count: 'med_bg' },
            { id : "med_fat", answerName : "调脂药（降脂药）", answerType : "", answerKey : 'med_fat',count: 'med_fat' },
            { id : "med_ua", answerName : "降尿酸药", answerType : "", answerKey : 'med_ua',count: 'med_ua' },
            { id : "med_aad", answerName : "抗心律失常药", answerType : "", answerKey : 'med_aad',count: 'med_aad' },
            { id : "med_asthma", answerName : "缓解哮喘药物", answerType : "", answerKey : 'med_asthma',count: 'med_asthma' },
            { id : "med_sleep", answerName : "镇静剂或安眠药", answerType : "", answerKey : 'med_sleep',count: 'med_sleep' },
            { id : "med_chm", answerName : "中草药", answerType : "", answerKey : 'med_chm',count: 'med_chm' },
            { id : "med_hormone", answerName : "激素类药物", answerType : "", answerKey : 'med_hormone',count: 'med_hormone' },
            { id : "med_analgesia", answerName : "解热镇痛药", answerType : "", answerKey : 'med_analgesia',count: 'med_analgesia' },
            { id : "med_mental", answerName : "精神类药物", answerType : "", answerKey : 'med_mental',count: 'med_mental' },
            { id : "med_antiplatelet", answerName : "抗血小板类药物(如阿司匹林等)", answerType : "", answerKey : 'med_antiplatelet',count: 'med_antiplatelet' },
            { id : "med_other", answerName : "其它", answerType : "", answerKey : 'med_other',count: 'med_other' },
          ]
        },
        {
          num : "Q8",
          title : "您的亲属目前或曾经是否被医生诊断过患有下列疾病（若有，请打√，否则不用填写）",
          classType : '',
          labels : [
            {
              num : "Q8-1",
              title : "糖尿病",
              classType : 'diabs',
              answer : [
                {
                  id : "Q8-1A",
                  answerName : "父亲", 
                  answerType : "", 
                  answerKey : 'diab_f',
                  count: 'diab_f'
                },
                {
                  id : "Q8-1B",
                  answerName : "母亲", 
                  answerType : "", 
                  answerKey : 'diab_m'
                },
                {
                  id : "Q8-1C",
                  answerName : "兄弟", 
                  answerType : "", 
                  answerKey : 'diab_bro'
                },
                {
                  id : "Q8-1D",
                  answerName : "姐妹", 
                  answerType : "", 
                  answerKey : 'diab_sis'
                }
              ]
            },
            {
              num : "Q8-2",
              title : "慢阻肺(慢性支气管炎/肺气肿)",
              classType : 'chronics',
              answer : [
                {
                  id : "Q8-2A",
                  answerName : "父亲", 
                  answerType : "", 
                  answerKey : 'chronic_f'
                },
                {
                  id : "Q8-2B",
                  answerName : "母亲", 
                  answerType : "", 
                  answerKey : 'chronic_m'
                },
                {
                  id : "Q8-2C",
                  answerName : "兄弟", 
                  answerType : "", 
                  answerKey : 'chronic_bro'
                },
                {
                  id : "Q8-2D",
                  answerName : "姐妹", 
                  answerType : "", 
                  answerKey : 'chronic_sis'
                }
              ]
            },
            {
              num : "Q8-3",
              title : "高血压",
              classType : 'hbps',
              answer : [
                {
                  id : "Q8-3A",
                  answerName : "父亲", 
                  answerType : "", 
                  answerKey : 'hbp_f'
                },
                {
                  id : "Q8-3B",
                  answerName : "母亲", 
                  answerType : "", 
                  answerKey : 'hbp_m'
                },
                {
                  id : "Q8-3C",
                  answerName : "兄弟", 
                  answerType : "", 
                  answerKey : 'hbp_bro'
                },
                {
                  id : "Q8-3D",
                  answerName : "姐妹", 
                  answerType : "", 
                  answerKey : 'hbp_sis'
                }
              ]
            },
            {
              num : "Q8-4",
              title : "痛风(高尿酸血症)",
              classType : 'gouts',
              answer : [
                {
                  id : "Q8-4A",
                  answerName : "父亲", 
                  answerType : "", 
                  answerKey : 'gout_f'
                },
                {
                  id : "Q8-4B",
                  answerName : "母亲", 
                  answerType : "", 
                  answerKey : 'gout_m'
                },
                {
                  id : "Q8-4C",
                  answerName : "兄弟", 
                  answerType : "", 
                  answerKey : 'gout_bro'
                },
                {
                  id : "Q8-4D",
                  answerName : "姐妹", 
                  answerType : "", 
                  answerKey : 'gout_sis'
                }
              ]
            },
            {
              num : "Q8-5",
              title : "高脂血症",
              classType : 'hyperlipemias',
              answer : [
                {
                  id : "Q8-5A",
                  answerName : "父亲", 
                  answerType : "", 
                  answerKey : 'hyperlipemia_f'
                },
                {
                  id : "Q8-5B",
                  answerName : "母亲", 
                  answerType : "", 
                  answerKey : 'hyperlipemia_m'
                },
                {
                  id : "Q8-5C",
                  answerName : "兄弟", 
                  answerType : "", 
                  answerKey : 'hyperlipemia_bro'
                },
                {
                  id : "Q8-5D",
                  answerName : "姐妹", 
                  answerType : "", 
                  answerKey : 'hyperlipemia_sis'
                }
              ]
            },
            {
              num : "Q8-6",
              title : "脑卒中（脑中风）",
              classType : 'trokes',
              class : 'item_2',
              answer : [
                {
                  id : "Q8-6A",
                  answerName : "父亲", 
                  answerType : "", 
                  answerKey : 'stroke_f'
                },
                {
                  id : "Q8-6B",
                  answerName : "母亲", 
                  answerType : "", 
                  answerKey : 'stroke_m'
                }
              ]
            },
            {
              num : "Q8-7",
              title : "哮喘",
              classType : 'asthmas',
              answer : [
                {
                  id : "Q8-7A",
                  answerName : "父亲", 
                  answerType : "", 
                  answerKey : 'asthma_f'
                },
                {
                  id : "Q8-7B",
                  answerName : "母亲", 
                  answerType : "", 
                  answerKey : 'asthma_m'
                },
                {
                  id : "Q8-7C",
                  answerName : "兄弟", 
                  answerType : "", 
                  answerKey : 'asthma_bro'
                },
                {
                  id : "Q8-7D",
                  answerName : "姐妹", 
                  answerType : "", 
                  answerKey : 'asthma_sis'
                }
              ]
            },
            {
              num : "Q8-8",
              title : "冠心病或心肌梗死",
              classType : 'chds',
              class : 'item_2',
              answer : [
                {
                  id : "Q8-8A",
                  answerName : "父亲", 
                  answerType : "", 
                  answerKey : 'chd_f'
                },
                {
                  id : "Q8-8B",
                  answerName : "母亲", 
                  answerType : "", 
                  answerKey : 'chd_m'
                }
              ]
            },
            {
              num : "Q8-9",
              title : "甲状腺癌",
              classType : 'thyroids',
              answer : [
                {
                  id : "Q8-9A",
                  answerName : "父亲", 
                  answerType : "", 
                  answerKey : 'thyroid_f'
                },
                {
                  id : "Q8-9B",
                  answerName : "母亲", 
                  answerType : "", 
                  answerKey : 'thyroid_m'
                },
                {
                  id : "Q8-9C",
                  answerName : "兄弟", 
                  answerType : "", 
                  answerKey : 'thyroid_bro'
                },
                {
                  id : "Q8-9D",
                  answerName : "姐妹", 
                  answerType : "", 
                  answerKey : 'thyroid_sis'
                }
              ]
            },
            {
              num : "Q8-10",
              title : "结直肠癌",
              classType : 'colorectals',
              answer : [
                {
                  id : "Q8-10A",
                  answerName : "父亲", 
                  answerType : "", 
                  answerKey : 'colorectal_f'
                },
                {
                  id : "Q8-10B",
                  answerName : "母亲", 
                  answerType : "", 
                  answerKey : 'colorectal_m'
                },
                {
                  id : "Q8-10C",
                  answerName : "兄弟", 
                  answerType : "", 
                  answerKey : 'colorectal_bro'
                },
                {
                  id : "Q8-10D",
                  answerName : "姐妹", 
                  answerType : "", 
                  answerKey : 'colorectal_sis'
                }
              ]
            },
            {
              num : "Q8-11",
              title : "肺癌",
              classType : 'lungs',
              answer : [
                {
                  id : "Q8-11A",
                  answerName : "父亲", 
                  answerType : "", 
                  answerKey : 'lung_f'
                },
                {
                  id : "Q8-11B",
                  answerName : "母亲", 
                  answerType : "", 
                  answerKey : 'lung_m'
                },
                {
                  id : "Q8-11C",
                  answerName : "兄弟", 
                  answerType : "", 
                  answerKey : 'lung_bro'
                },
                {
                  id : "Q8-11D",
                  answerName : "姐妹", 
                  answerType : "", 
                  answerKey : 'lung_sis'
                }
              ]
            },
            {
              num : "Q8-12",
              title : "前列腺癌",
              classType : 'prostatics',
              class : 'item_2',
              answer : [
                {
                  id : "Q8-12A",
                  answerName : "父亲", 
                  answerType : "", 
                  answerKey : 'prostatic_f'
                },
                {
                  id : "Q8-12B",
                  answerName : "兄弟", 
                  answerType : "", 
                  answerKey : 'prostatic_bro'
                }
              ]
            },
            {
              num : "Q8-13",
              title : "肝癌",
              classType : 'livers',
              answer : [
                {
                  id : "Q8-13A",
                  answerName : "父亲", 
                  answerType : "", 
                  answerKey : 'liver_f'
                },
                {
                  id : "Q8-13B",
                  answerName : "母亲", 
                  answerType : "", 
                  answerKey : 'liver_m'
                },
                {
                  id : "Q8-13C",
                  answerName : "兄弟", 
                  answerType : "", 
                  answerKey : 'liver_bro'
                },
                {
                  id : "Q8-13D",
                  answerName : "姐妹", 
                  answerType : "", 
                  answerKey : 'liver_sis'
                }
              ]
            },
            {
              num : "Q8-14",
              title : "大肠癌",
              classType : 'ccs',
              answer : [
                {
                  id : "Q8-14A",
                  answerName : "父亲", 
                  answerType : "", 
                  answerKey : 'cc_f'
                },
                {
                  id : "Q8-14B",
                  answerName : "母亲", 
                  answerType : "", 
                  answerKey : 'cc_m'
                },
                {
                  id : "Q8-14C",
                  answerName : "兄弟", 
                  answerType : "", 
                  answerKey : 'cc_bro'
                },
                {
                  id : "Q8-14D",
                  answerName : "姐妹", 
                  answerType : "", 
                  answerKey : 'cc_sis'
                }
              ]
            },
            {
              num : "Q8-15",
              title : "大肠癌",
              classType : 'esophageals',
              answer : [
                {
                  id : "Q8-15A",
                  answerName : "父亲", 
                  answerType : "", 
                  answerKey : 'esophageal_f'
                },
                {
                  id : "Q8-15B",
                  answerName : "母亲", 
                  answerType : "", 
                  answerKey : 'esophageal_m'
                },
                {
                  id : "Q8-15C",
                  answerName : "兄弟", 
                  answerType : "", 
                  answerKey : 'esophageal_bro'
                },
                {
                  id : "Q8-15D",
                  answerName : "姐妹", 
                  answerType : "", 
                  answerKey : 'esophageal_sis'
                }
              ]
            },
            {
              num : "Q8-16",
              title : "鼻咽癌",
              classType : 'nds',
              answer : [
                {
                  id : "Q8-16A",
                  answerName : "父亲", 
                  answerType : "", 
                  answerKey : 'nd_f'
                },
                {
                  id : "Q8-16B",
                  answerName : "母亲", 
                  answerType : "", 
                  answerKey : 'nd_m'
                },
                {
                  id : "Q8-16C",
                  answerName : "兄弟", 
                  answerType : "", 
                  answerKey : 'nd_bro'
                },
                {
                  id : "Q8-16D",
                  answerName : "姐妹", 
                  answerType : "", 
                  answerKey : 'nd_sis'
                }
              ]
            },
            {
              num : "Q8-17",
              title : "宫颈癌",
              classType : 'cervicals',
              class : 'item_2',
              answer : [
                {
                  id : "Q8-17A",
                  answerName : "母亲", 
                  answerType : "", 
                  answerKey : 'cervical_m'
                },
                {
                  id : "Q8-17B",
                  answerName : "姐妹", 
                  answerType : "", 
                  answerKey : 'cervical_sis'
                },
              ]
            },
            {
              num : "Q8-18",
              title : "乳腺癌",
              classType : 'bcs',
              class : 'item_2',
              answer : [
                {
                  id : "Q8-18A",
                  answerName : "母亲", 
                  answerType : "", 
                  answerKey : 'bc_m'
                },
                {
                  id : "Q8-18B",
                  answerName : "姐妹", 
                  answerType : "", 
                  answerKey : 'bc_sis'
                },
              ]
            },
            {
              num : "Q8-19",
              title : "卵巢癌",
              classType : 'ovarians',
              class : 'item_2',
              answer : [
                {
                  id : "Q8-19A",
                  answerName : "母亲", 
                  answerType : "", 
                  answerKey : 'ovarian_m'
                },
                {
                  id : "Q8-19B",
                  answerName : "姐妹", 
                  answerType : "", 
                  answerKey : 'ovarian_sis'
                },
              ]
            },
            {
              num : "Q8-20",
              title : "子宫内膜",
              classType : 'endometriums',
              class : 'item_2',
              answer : [
                {
                  id : "Q8-20A",
                  answerName : "母亲", 
                  answerType : "", 
                  answerKey : 'endometrium_m'
                },
                {
                  id : "Q8-20B",
                  answerName : "姐妹", 
                  answerType : "", 
                  answerKey : 'endometrium_sis'
                },
              ]
            },
            {
              num : "Q8-21",
              title : "其他疾病",
              classType : 'others',
              answer : [
                {
                  id : "Q8-21A",
                  answerName : "父亲", 
                  answerType : "", 
                  answerKey : 'other_f'
                },
                {
                  id : "Q8-21B",
                  answerName : "母亲", 
                  answerType : "", 
                  answerKey : 'other_m'
                },
                {
                  id : "Q8-21C",
                  answerName : "兄弟", 
                  answerType : "", 
                  answerKey : 'other_bro'
                },
                {
                  id : "Q8-21D",
                  answerName : "姐妹", 
                  answerType : "", 
                  answerKey : 'other_sis'
                }
              ]
            },
            {
              num : "Q8-22",
              title : "髋部骨折",
              classType : 'pfs',
              answer : [
                {
                  id : "Q8-22A",
                  answerName : "父亲", 
                  answerType : "", 
                  answerKey : 'pf_f'
                },
                {
                  id : "Q8-22B",
                  answerName : "母亲", 
                  answerType : "", 
                  answerKey : 'pf_m'
                },
                {
                  id : "Q8-22C",
                  answerName : "兄弟", 
                  answerType : "", 
                  answerKey : 'pf_bro'
                },
                {
                  id : "Q8-22D",
                  answerName : "姐妹", 
                  answerType : "", 
                  answerKey : 'pf_sis'
                }
              ]
            }
          ]
        },
        {
          num : "Q9",
          title : "如果您的父亲患有冠心病/脑卒中，是否在55岁以前？",
          classType : '',
          answer : [
            { 
              id : "Q9A",
              count: 'Q9',
              answerName : "是", 
              answerType : 1, 
              answerKey : 'chd_f_55' 
            },
            { 
              id : "Q9B",
              count: 'Q9',
              answerName : "否", 
              answerType : 2, 
              answerKey : 'chd_f_55' 
            }
          ]
        },
        {
          num : "Q10",
          title : "如果您的母亲患有冠心病/脑卒中，是否在65岁以前？",
          classType : '',
          answer : [
            { 
              id : "Q10A",
              count: 'Q10',
              answerName : "是", 
              answerType : 1, 
              answerKey : 'chd_m_55' 
            },
            { 
              id : "Q10B",
              count: 'Q10',
              answerName : "否", 
              answerType : 2, 
              answerKey : 'chd_m_55' 
            }
          ]
        },
        {
          num : "Q11",
          title : "您吸烟吗？",
          classType : '',
          answer : [
            { 
              id : "Q11A",
              count: 'Q11',
              answerName : "是", 
              answerType : 1, 
              answerKey : 'smoking_status' 
            },
            { 
              id : "Q11B",
              count: 'Q11',
              answerName : "戒烟", 
              answerType : 2, 
              answerKey : 'smoking_status' 
            },
            { 
              id : "Q11C",
              count: 'Q11',
              answerName : "否", 
              answerType : 3, 
              answerKey : 'smoking_status' 
            }
          ]
        },
        {
          num : "Q12",
          title : "您早晨醒来后多长时间吸第一支烟？",
          classType : '',
          id : "Q12", 
          answerName : "", 
          answerType : '', 
          answerKey : 'first_smoke', 
          count:"Q12"
        },
        {
          num : "Q13",
          title : "您认为哪支烟您最不愿意放弃？",
          classType : '',
          answer : [
            { 
              id : "Q13A",
              count: 'Q13',
              answerName : "其他时间", 
              answerType : 1, 
              answerKey : 'give_up_smoke' 
            },
            { 
              id : "Q13B",
              count: 'Q13',
              answerName : "早上第一支烟", 
              answerType : 2, 
              answerKey : 'give_up_smoke' 
            }
          ]
        },
        {
          num : "Q14",
          title : "您早上醒来后第一个小时是否比其他时间吸烟多？",
          classType : '',
          answer : [
            { 
              id : "Q14A",
              count: 'Q14',
              answerName : "是", 
              answerType : 1, 
              answerKey : 'smoke_more' },
            { 
              id : "Q14B",
              count: 'Q14',
              answerName : "否",
              answerType : 2, 
              answerKey : 'smoke_more' 
            }
          ]
        },
        {
          num : "Q15",
          title : "您卧病在床是仍旧吸烟吗？",
          classType : '',
          answer : [
            { 
              id : "Q15A",
              count: 'Q15',
              answerName : "是", 
              answerType : 1, 
              answerKey : 'smoke_bed' 
            },
            { 
              id : "Q15B",
              count: 'Q15',
              answerName : "否", 
              answerType : 2, 
              answerKey : 'smoke_bed' 
            }
          ]
        },
        {
          num : "Q16",
          title : "您是否在许多不准吸烟的场所很难控制吸烟的需求？",
          classType : '',
          answer : [
            { 
              id : "Q16A",
              count: 'Q16',
              answerName : "是", 
              answerType : 1, 
              answerKey : 'smoke_places' 
            },
            { 
              id : "Q16B",
              count: 'Q16',
              answerName : "否", 
              answerType : 2, 
              answerKey : 'smoke_places' 
            },
          ]
        },
        {
          num : "Q17",
          title : "您吸烟的频率是？",
          classType : '',
          answer : [
            { 
              id : "smoke_A",
              count: 'Q17',
              answerName : "每天", 
              answerType : 1, 
              answerKey : 'smoke_frequency' 
            },
            { 
              id : "smoke_B",
              count: 'Q17',
              answerName : "经常洗", 
              answerType : 2, 
              answerKey : 'smoke_frequency' 
            },
            { 
              id : "smoke_C",
              count: 'Q17',
              answerName : "偶尔吸", 
              answerType : 3, 
              answerKey : 'smoke_frequency' 
            },
          ]
        },
        {
          num : "Q18",
          title : "当目前为止，您是否已经吸足了100支烟？",
          classType : '',
          answer : [
            { 
              id : "Q18A",
              count: 'Q18',
              answerName : "是", 
              count: 'Q18',
              answerType : 1, 
              answerKey : 'smoke_More_100' 
            },
            { 
              id : "Q18B",
              count: 'Q18',
              answerName : "否", 
              answerType : 2, 
               count: 'Q18',
              answerKey : 'smoke_More_100' 
            },
          ]
        },
        {
          num : "Q19",
          title : "您通常吸烟的深度是？",
          classType : '',
          answer : [
            { 
              id : "smoke_depth_a",
              count: 'Q19',
              answerName : "吸到嘴里后吐出", 
              answerType : 1, 
              answerKey : 'smoke_depth' },
            { 
              id : "smoke_depth_b",
              count: 'Q19',
              answerName : "经过喉咙后吐出", 
              answerType : 2, 
              answerKey : 'smoke_depth' 
            },
            { 
              id : "smoke_depth_c",
              count: 'Q19',
              answerName : "吸入肺部后吐出", 
              answerType : 3, 
              answerKey : 'smoke_depth' 
            },
          ]
        },
        {
          num : "Q20",
          title : "您开始经常吸烟的年龄为？",
          classType : '',
          answerName : "smoke_start_age", 
          answerType : 'smoke_start_age', 
          answerKey : 'smoke_start_age',
          count: 'Q20',
        },
        {
          num : "Q21",
          title : "您开始戒烟的年龄为？",
          classType : '',
          answerName : "smoke_end_age", 
          answerType : '', 
          answerKey : 'smoke_end_age',
          count: 'Q21', 
        },
        {
          num : "Q22",
          title : "您最终成功戒烟（戒烟2年及以上）的年龄为？",
          classType : '',
          answerName : "smoke_end_age_suc", 
          answerType : 'smoke_end_age_suc', 
          answerKey : 'smoke_end_age_suc',
          count: 'Q22', 
        },
        {
          num : "Q23",
          title : "您戒烟的最主要原因是？",
          classType : '',
          answer : [
            { 
              id : "jihuan",
              count: 'Q23',
              answerName : "身有疾患", 
              answerType : 1, 
              answerKey : 'smoke_end_cause' 
            },
            { 
              id : "jiankang",
              count: 'Q23',
              answerName : "未来健康考虑", 
              answerType : 2, 
              answerKey : 'smoke_end_cause' 
            },
            { 
              id : "fandui",
              count: 'Q23',
              answerName : "家人反对", 
              answerType : 3, 
              answerKey : 'smoke_end_cause' 
            },
            { 
              id : "jianyi",
              count: 'Q23',
              answerName : "医生建议", 
              answerType : 4, 
              answerKey : 'smoke_end_cause' 
            },
            { 
              id : "somke_ohter",
              count: 'Q23',
              answerName : "其它", 
              answerType : 5, 
              answerKey : 'smoke_end_cause' 
            },
          ]
        },
        {
          num : "Q24",
          title : "和您一起生活或工作的人中是否有人吸烟？",
          classType : '',
          answer : [
            { 
              id : "Q24A",
              count: 'Q24',
              answerName : "是", 
              answerType : 1, 
              answerKey : 'passive_freq' 
            },
            { 
              id : "Q24B",
              count: 'Q24',
              answerName : "否", 
              answerType : 2, 
              answerKey : 'passive_freq' 
            },
          ]
        },
        {
          num : "Q25",
          title : "您是否经常吸入吸烟者呼出的烟雾(被动吸烟)超过15分钟/天？？",
          classType : '',
          answer : [
            { 
              id : "Q25A",
              count: 'Q25',
              answerName : "几乎每天", 
              answerType : 1, 
              answerKey : 'passive_length' 
            },
            { 
              id : "Q25B",
              count: 'Q25',
              answerName : "平均每周4～5天", 
              answerType : 2, 
              answerKey : 'passive_length' 
            },
            { 
              id : "Q25C",
              count: 'Q25',
              answerName : "平均每周1～3天", 
              answerType : 3, 
              answerKey : 'passive_length' 
            },
            { 
              id : "Q25D",
              count: 'Q25',
              answerName : "平均每周<1天", 
              answerType : 4, 
              answerKey : 'passive_length' 
            },
            { 
              id : "Q25E",
              count: 'Q25',
              answerName : "否", 
              answerType : 5, 
              answerKey : 'passive_length' 
            },
          ]
        },
        {
          num : "Q26",
          title : "您听说过电子烟吗？",
          classType : '',
          answer : [
            { 
              id : "Q26A",
              count: 'Q26',
              answerName : "是", 
              answerType : 1, 
              answerKey : 'somke_electronic_hear' 
            },
            { 
              id : "Q26B",
              count: 'Q26',
              answerName : "否", 
              answerType : 2, 
              answerKey : 'somke_electronic_hear' 
            },
          ]
        },
        {
          num : "Q27",
          title : "请回忆您过去一周内所吃的食物 ？",
          classType : '',
          labels: [
            {
              num : "Q27-1",
              title : '大米、面粉类、杂粮类(1碗米饭≈2两)',
              labels_er: [
                {
                  method : "每周",
                  answer : [
                    {
                      id : "every27-1A",
                      answerName : "5-7天", 
                      answerType : 1,
                      methodKey : '', 
                      answerKey : 'cr_d',
                      count: 'Q27A',
                    },
                    {
                      id : "every27-1B",
                      answerName : "3-4天", 
                      answerType : 2, 
                      methodKey : '', 
                      answerKey : 'cr_d',
                      count: 'Q27A',
                    },
                    {
                      id : "every27-1C",
                      answerName : "1-2天", 
                      answerType : 3, 
                      methodKey : '', 
                      answerKey : 'cr_d',
                      count: 'Q27A',
                    },
                    {
                      id : "every27-1D",
                      answerName : "<1天或不吃", 
                      answerType : 4, 
                      methodKey : '', 
                      answerKey : 'cr_d',
                      count: 'Q27A',
                    }
                  ]
                },
                {
                  method : "每天",
                  answer : [
                    {
                      id : "weekly27-1A",
                      answerName : ">8两", 
                      answerType : 1, 
                      methodKey : '', 
                      answerKey : 'cr_w',
                      count: 'Q27As',
                    },
                    {
                      id : "weekly27-1B",
                      answerName : "5-8两", 
                      answerType : 2, 
                      methodKey : '', 
                      answerKey : 'cr_w',
                      count: 'Q27As',
                    },
                    {
                      id : "weekly27-1C",
                      answerName : "2-4两", 
                      answerType : 3, 
                      methodKey : '', 
                      answerKey : 'cr_w',
                      count: 'Q27As',
                    },
                    {
                      id : "weekly27-1D",
                      answerName : "≦1两", 
                      answerType : 4, 
                      methodKey : '', 
                      answerKey : 'cr_w',
                      count: 'Q27As',
                    }
                  ]
                }
              ]
            },

            {
              num : "Q27-2",
              title : '肉类（猪，牛，羊，禽）（1副扑克牌大小≈2两）',
              labels_er: [
                {
                  method : "每周",
                  answer : [
                    {
                      id : "everyQ27-2A",
                      answerName : "5-7天", 
                      answerType : 1,
                      methodKey : '', 
                      answerKey : 'meat_w',
                      count: 'Q27B',
                    },
                    {
                      id : "everyQ27-2B",
                      answerName : "3-4天", 
                      answerType : 2, 
                      methodKey : '', 
                      answerKey : 'meat_w',
                      count: 'Q27B',
                    },
                    {
                      id : "everyQ27-2C",
                      answerName : "1-2天", 
                      answerType : 3, 
                      methodKey : '', 
                      answerKey : 'meat_w',
                      count: 'Q27B',
                    },
                    {
                      id : "everyQ27-2D",
                      answerName : "<1天或不吃", 
                      answerType : 4, 
                      methodKey : '', 
                      answerKey : 'meat_w',
                      count: 'Q27B',
                    }
                  ]
                },
                {
                  method : "每天",
                  answer : [
                    {
                      id : "weeklyQ27-2A",
                      answerName : ">1.5两", 
                      answerType : 1, 
                      methodKey : '', 
                      answerKey : 'meat_d',
                      count: 'Q27Bs',
                    },
                    {
                      id : "weeklyQ27-2B",
                      answerName : "1-1.5两", 
                      answerType : 2, 
                      methodKey : '', 
                      answerKey : 'meat_d',
                      count: 'Q27Bs',
                    },
                    {
                      id : "weeklyQ27-2C",
                      answerName : "<1两", 
                      answerType : 3, 
                      methodKey : '', 
                      answerKey : 'meat_d',
                      count: 'Q27Bs',
                    },
                    {
                      id : "weeklyQ27-2D",
                      answerName : "从来不吃", 
                      answerType : 4, 
                      methodKey : '', 
                      answerKey : 'meat_d',
                      count: 'Q27Bs',
                    }
                  ]
                }
              ]
            },

            {
              num : "Q27-3",
              title : '鱼类或其他水产品：虾、蟹',
              labels_er: [
                {
                  method : "每周",
                  answer : [
                    {
                      id : "everyQ27-3A",
                      answerName : "5-7天", 
                      answerType : 1,
                      methodKey : '', 
                      answerKey : 'fish_w',
                      count: 'Q27C',
                    },
                    {
                      id : "everyQ27-3B",
                      answerName : "3-4天", 
                      answerType : 2, 
                      methodKey : '', 
                      answerKey : 'fish_w',
                      count: 'Q27C',
                    },
                    {
                      id : "everyQ27-3C",
                      answerName : "1-2天", 
                      answerType : 3, 
                      methodKey : '', 
                      answerKey : 'fish_w',
                      count: 'Q27C',
                    },
                    {
                      id : "everyQ27-3D",
                      answerName : "<1天或不吃", 
                      answerType : 4, 
                      methodKey : '', 
                      answerKey : 'fish_w',
                      count: 'Q27C',
                    }
                  ]
                },
                {
                  method : "每天",
                  answer : [
                    {
                      id : "weeklyQ27-3A",
                      answerName : ">2两", 
                      answerType : 1, 
                      methodKey : '', 
                      answerKey : 'fish_d',
                      count: 'Q27Cs',
                    },
                    {
                      id : "weeklyQ27-3B",
                      answerName : "1-2两", 
                      answerType : 2, 
                      methodKey : '', 
                      answerKey : 'fish_d',
                      count: 'Q27Cs',
                    },
                    {
                      id : "weeklyQ27-3C",
                      answerName : "<1两", 
                      answerType : 3, 
                      methodKey : '', 
                      answerKey : 'fish_d',
                      count: 'Q27Cs',
                    },
                    {
                      id : "weeklyQ27-3D",
                      answerName : "从来不吃", 
                      answerType : 4, 
                      methodKey : '', 
                      answerKey : 'fish_d',
                      count: 'Q27Cs',
                    }
                  ]
                }
              ]
            },

            {
              num : "Q27-4",
              title : '蛋类及其制品',
              labels_er: [
                {
                  method : "每周",
                  answer : [
                    {
                      id : "everyQ27-4A",
                      answerName : "5-7天", 
                      answerType : 1,
                      methodKey : '', 
                      answerKey : 'egg_w',
                      count: 'Q27D',
                    },
                    {
                      id : "everyQ27-4B",
                      answerName : "3-4天", 
                      answerType : 2, 
                      methodKey : '', 
                      answerKey : 'egg_w',
                      count: 'Q27D',
                    },
                    {
                      id : "everyQ27-4C",
                      answerName : "1-2天", 
                      answerType : 3, 
                      methodKey : '', 
                      answerKey : 'egg_w',
                      count: 'Q27D',
                    },
                    {
                      id : "everyQ27-4D",
                      answerName : "<1天或不吃", 
                      answerType : 4, 
                      methodKey : '', 
                      answerKey : 'egg_w',
                      count: 'Q27D',
                    }
                  ]
                },
                {
                  method : "每天",
                  answer : [
                    {
                      id : "weeklyQ27-4A",
                      answerName : ">2个", 
                      answerType : 1, 
                      methodKey : '', 
                      answerKey : 'egg_d',
                      count: 'Q27Ds',
                    },
                    {
                      id : "weeklyQ27-4B",
                      answerName : "1-2个", 
                      answerType : 2, 
                      methodKey : '', 
                      answerKey : 'egg_d',
                      count: 'Q27Ds',
                    },
                    {
                      id : "weeklyQ27-4C",
                      answerName : "半个左右", 
                      answerType : 3, 
                      methodKey : '', 
                      answerKey : 'egg_d',
                      count: 'Q27Ds',
                    },
                    {
                      id : "weeklyQ27-4D",
                      answerName : "从来不吃", 
                      answerType : 4, 
                      methodKey : '', 
                      answerKey : 'egg_d',
                      count: 'Q27Ds',
                    }
                  ]
                }
              ]
            },
            {
              num : "Q27-5",
              title : '牛奶及奶制品',
              labels_er: [
                {
                  method : "每周",
                  answer : [
                    {
                      id : "everyQ27-5A",
                      answerName : "5-7天", 
                      answerType : 1,
                      methodKey : '', 
                      answerKey : 'milk_w',
                      count: 'Q27E',
                    },
                    {
                      id : "everyQ27-5B",
                      answerName : "3-4天", 
                      answerType : 2, 
                      methodKey : '', 
                      answerKey : 'milk_w',
                      count: 'Q27E',
                    },
                    {
                      id : "everyQ27-5C",
                      answerName : "1-2天", 
                      answerType : 3, 
                      methodKey : '', 
                      answerKey : 'milk_w',
                      count: 'Q27E',
                    },
                    {
                      id : "everyQ27-5D",
                      answerName : "<1天或不吃", 
                      answerType : 4, 
                      methodKey : '', 
                      answerKey : 'milk_w',
                      count: 'Q27E',
                    }
                  ]
                },
                {
                  method : "每天",
                  answer : [
                    {
                      id : "weeklyQ27-5A",
                      answerName : ">300毫升", 
                      answerType : 1, 
                      methodKey : '', 
                      answerKey : 'milk_d',
                      count: 'Q27Es',
                    },
                    {
                      id : "weeklyQ27-5B",
                      answerName : "200-300毫升", 
                      answerType : 2, 
                      methodKey : '', 
                      answerKey : 'milk_d',
                      count: 'Q27Es',
                    },
                    {
                      id : "weeklyQ27-5C",
                      answerName : "100-200毫升", 
                      answerType : 3, 
                      methodKey : '', 
                      answerKey : 'milk_d',
                      count: 'Q27Es',
                    },
                    {
                      id : "weeklyQ27-5D",
                      answerName : "从来不吃", 
                      answerType : 4, 
                      methodKey : '', 
                      answerKey : 'milk_d',
                      count: 'Q27Es',
                    }
                  ]
                }
              ]
            },
            {
              num : "Q27-6",
              title : '豆类及豆制品',
              labels_er: [
                {
                  method : "每周",
                  answer : [
                    {
                      id : "everyQ27-6A",
                      answerName : "5-7天", 
                      answerType : 1,
                      methodKey : '', 
                      answerKey : 'bean_w',
                      count: 'Q27F',
                    },
                    {
                      id : "everyQ27-6B",
                      answerName : "3-4天", 
                      answerType : 2, 
                      methodKey : '', 
                      answerKey : 'bean_w',
                      count: 'Q27F',
                    },
                    {
                      id : "everyQ27-6C",
                      answerName : "1-2天", 
                      answerType : 3, 
                      methodKey : '', 
                      answerKey : 'bean_w',
                      count: 'Q27F',
                    },
                    {
                      id : "everyQ27-6D",
                      answerName : "<1天或不吃", 
                      answerType : 4, 
                      methodKey : '', 
                      answerKey : 'bean_w',
                      count: 'Q27F',
                    }
                  ]
                },
                {
                  method : "每天",
                  answer : [
                    {
                      id : "weeklyQ27-6A",
                      answerName : ">1两", 
                      answerType : 1, 
                      methodKey : '', 
                      answerKey : 'bean_d',
                      count: 'Q27Fs',
                    },
                    {
                      id : "weeklyQ27-6B",
                      answerName : "0.5-1两", 
                      answerType : 2, 
                      methodKey : '', 
                      answerKey : 'bean_d',
                      count: 'Q27Fs',
                    },
                    {
                      id : "weeklyQ27-6C",
                      answerName : "0.1-0.4两", 
                      answerType : 3, 
                      methodKey : '', 
                      answerKey : 'bean_d',
                      count: 'Q27Fs',
                    },
                    {
                      id : "weeklyQ27-6D",
                      answerName : "从来不吃", 
                      answerType : 4, 
                      methodKey : '', 
                      answerKey : 'bean_d',
                      count: 'Q27Fs',
                    }
                  ]
                }
              ]
            },
            {
              num : "Q27-7",
              title : '新鲜蔬菜',
              labels_er: [
                {
                  method : "每周",
                  answer : [
                    {
                      id : "everyQ27-7A",
                      answerName : "5-7天", 
                      answerType : 1,
                      methodKey : '', 
                      answerKey : 'vegetable_w',
                      count: 'Q27G',
                    },
                    {
                      id : "everyQ27-7B",
                      answerName : "3-4天", 
                      answerType : 2, 
                      methodKey : '', 
                      answerKey : 'vegetable_w',
                      count: 'Q27G',
                    },
                    {
                      id : "everyQ27-7C",
                      answerName : "1-2天", 
                      answerType : 3, 
                      methodKey : '', 
                      answerKey : 'vegetable_w',
                      count: 'Q27G',
                    },
                    {
                      id : "everyQ27-7D",
                      answerName : "<1天或不吃", 
                      answerType : 4, 
                      methodKey : '', 
                      answerKey : 'vegetable_w',
                      count: 'Q27G',
                    }
                  ]
                },
                {
                  method : "每天",
                  answer : [
                    {
                      id : "weeklyQ27-7A",
                      answerName : ">10两", 
                      answerType : 1, 
                      methodKey : '', 
                      answerKey : 'vegetable_d',
                      count: 'Q27Gs',
                    },
                    {
                      id : "weeklyQ27-7B",
                      answerName : "6-10两", 
                      answerType : 2, 
                      methodKey : '', 
                      answerKey : 'vegetable_d',
                      count: 'Q27Gs',
                    },
                    {
                      id : "weeklyQ27-7C",
                      answerName : "1-5两", 
                      answerType : 3, 
                      methodKey : '', 
                      answerKey : 'vegetable_d',
                      count: 'Q27Gs',
                    },
                    {
                      id : "weeklyQ27-7D",
                      answerName : "从来不吃", 
                      answerType : 4, 
                      methodKey : '', 
                      answerKey : 'vegetable_d',
                      count: 'Q27Gs',
                    }
                  ]
                }
              ]
            },
            {
              num : "Q27-8",
              title : '新鲜水果',
              labels_er: [
                {
                  method : "每周",
                  answer : [
                    {
                      id : "everyQ27-8A",
                      answerName : "5-7天", 
                      answerType : 1,
                      methodKey : '', 
                      answerKey : 'ffru_w',
                      count: 'Q27H',
                    },
                    {
                      id : "everyQ27-8B",
                      answerName : "3-4天", 
                      answerType : 2, 
                      methodKey : '', 
                      answerKey : 'ffru_w',
                      count: 'Q27H',
                    },
                    {
                      id : "everyQ27-8C",
                      answerName : "1-2天", 
                      answerType : 3, 
                      methodKey : '', 
                      answerKey : 'ffru_w',
                      count: 'Q27H',
                    },
                    {
                      id : "everyQ27-8D",
                      answerName : "<1天或不吃", 
                      answerType : 4, 
                      methodKey : '', 
                      answerKey : 'ffru_w',
                      count: 'Q27H',
                    }
                  ]
                },
                {
                  method : "每天",
                  answer : [
                    {
                      id : "weeklyQ27-8A",
                      answerName : ">8两", 
                      answerType : 1, 
                      methodKey : '', 
                      answerKey : 'ffru_d',
                      count: 'Q27Hs',
                    },
                    {
                      id : "weeklyQ27-8B",
                      answerName : "4-8两", 
                      answerType : 2, 
                      methodKey : '', 
                      answerKey : 'ffru_d',
                      count: 'Q27Hs',
                    },
                    {
                      id : "weeklyQ27-8C",
                      answerName : "1-3两", 
                      answerType : 3, 
                      methodKey : '', 
                      answerKey : 'ffru_d',
                      count: 'Q27Hs',
                    },
                    {
                      id : "weeklyQ27-8D",
                      answerName : "<1两", 
                      answerType : 4, 
                      methodKey : '', 
                      answerKey : 'ffru_d',
                      count: 'Q27Hs',
                    }
                  ]
                }
              ]
            },
            {
              num : "Q27-9",
              title : '甜食（甜点、糖果等）',
              labels_er: [
                {
                  method : "每周",
                  answer : [
                    {
                      id : "everyQ27-9A",
                      answerName : "5-7天", 
                      answerType : 1,
                      methodKey : '', 
                      answerKey : 'sweet_food',
                      count: 'Q27I',
                    },
                    {
                      id : "everyQ27-9B",
                      answerName : "3-4天", 
                      answerType : 2, 
                      methodKey : '', 
                      answerKey : 'sweet_food',
                      count: 'Q27I',
                    },
                    {
                      id : "everyQ27-9C",
                      answerName : "1-2天", 
                      answerType : 3, 
                      methodKey : '', 
                      answerKey : 'sweet_food',
                      count: 'Q27I',
                    },
                    {
                      id : "everyQ27-9D",
                      answerName : "<1天或不吃", 
                      answerType : 4, 
                      methodKey : '', 
                      answerKey : 'sweet_food',
                      count: 'Q27I',
                    }
                  ]
                }
              ]
            },
            {
              num : "Q27-10",
              title : '油炸食品',
              labels_er: [
                {
                  method : "每周",
                  answer : [
                    {
                      id : "everyQ27-10A",
                      answerName : "5-7天", 
                      answerType : 1,
                      methodKey : '', 
                      answerKey : 'fried_food',
                      count: 'Q27J',
                    },
                    {
                      id : "everyQ27-10B",
                      answerName : "3-4天", 
                      answerType : 2, 
                      methodKey : '', 
                      answerKey : 'fried_food',
                      count: 'Q27J',
                    },
                    {
                      id : "everyQ27-10C",
                      answerName : "1-2天", 
                      answerType : 3, 
                      methodKey : '', 
                      answerKey : 'fried_food',
                      count: 'Q27J',
                    },
                    {
                      id : "everyQ27-10D",
                      answerName : "<1天或不吃", 
                      answerType : 4, 
                      methodKey : '', 
                      answerKey : 'fried_food',
                      count: 'Q27J',
                    }
                  ]
                }
              ]
            },
            {
              num : "Q27-11",
              title : '腌、熏类食物',
              labels_er: [
                {
                  method : "每周",
                  answer : [
                    {
                      id : "everyQ27-11A",
                      answerName : "5-7天", 
                      answerType : 1,
                      methodKey : '', 
                      answerKey : 'smoked_food',
                      count: 'Q27K',
                    },
                    {
                      id : "everyQ27-11B",
                      answerName : "3-4天", 
                      answerType : 2, 
                      methodKey : '', 
                      answerKey : 'smoked_food',
                      count: 'Q27K',
                    },
                    {
                      id : "everyQ27-11C",
                      answerName : "1-2天", 
                      answerType : 3, 
                      methodKey : '', 
                      answerKey : 'smoked_food',
                      count: 'Q27K',
                    },
                    {
                      id : "everyQ27-11D",
                      answerName : "<1天或不吃", 
                      answerType : 4, 
                      methodKey : '', 
                      answerKey : 'smoked_food',
                      count: 'Q27K',
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          num : "Q28",
          title : "您的饮食习惯属于以下哪种类型？",
          classType : '',
          answer : [
            { 
              id : "Q28A",
              count: 'Q28',
              answerName : "素食为主", 
              answerType : 1, 
              answerKey : 'eating_habits' 
            },
            { 
              id : "Q28B",
              count: 'Q28',
              answerName : "荤素均衡", 
              answerType : 2, 
              answerKey : 'eating_habits' 
            },
            { 
              id : "Q28C",
              count: 'Q28',
              answerName : "荤食为主", 
              answerType : 3, 
              answerKey : 'eating_habits' 
            },
          ]
        },
        {
          num : "Q29",
          title : "您的饮食嗜好是(多选题)？",
          classType : '',
          answer : [
            { 
              id : "Q29A",
              count: 'eating_habits_hal',
              answerName : "喜欢偏咸的食品", 
              answerType : 1, 
              answerKey : 'eating_habits_hal' 
            },
            { 
              id : "Q29B",
              count: 'eating_habits_oil',
              answerName : "喜欢多油的食品", 
              answerType : 1, 
              answerKey : 'eating_habits_oil' 
            },
            { 
              id : "Q29C",
              count: 'eating_habits_sugar',
              answerName : "喜欢甜的食品", 
              answerType : 1, 
              answerKey : 'eating_habits_sugar' 
            },
          ]
        },
        {
          num : "Q30",
          title : "您的口味与周围的人相比如何？",
          classType : '',
          answer : [
            { 
              id : "Q30A",
              count: 'Q30',
              answerName : "很淡", 
              answerType : 1, 
              answerKey : 'flavor_how' 
            },
            { 
              id : "Q30B",
              count: 'Q30',
              answerName : "略淡", 
              answerType : 2, 
              answerKey : 'flavor_how' 
            },
            { 
              id : "Q30C",
              count: 'Q30',
              answerName : "相同", 
              answerType : 3, 
              answerKey : 'flavor_how' 
            },
            { 
              id : "Q30D",
              count: 'Q30',
              answerName : "略咸", 
              answerType : 4, 
              answerKey : 'flavor_how' 
            },
            { 
              id : "Q30E",
              count: 'Q30',
              answerName : "很咸", 
              answerType : 5, 
              answerKey : 'flavor_how' 
            },
          ]
        },
        {
          num : "Q31",
          title : "您目前的饮水来源是？",
          classType : '',
          answer : [
            { 
              id : "Q31A",
              count: 'Q31',
              answerName : "沟潭水", 
              answerType : 1, 
              answerKey : 'water_source' 
            },
            { 
              id : "Q31B",
              count: 'Q31',
              answerName : "河水", 
              answerType : 2, 
              answerKey : 'water_source' 
            },
            { 
              id : "Q31C",
              count: 'Q31',
              answerName : "井水", 
              answerType : 3, 
              answerKey : 'water_source' 
            },
            { 
              id : "Q31D",
              count: 'Q31',
              answerName : "自来水", 
              answerType : 4, 
              answerKey : 'water_source' 
            },
            { 
              id : "Q31E",
              count: 'Q31',
              answerName : "矿泉水", 
              answerType : 5, 
              answerKey : 'water_source' 
            },
            { 
              id : "Q31F",
              count: 'Q31',
              answerName : "纯净水", 
              answerType : 6, 
              answerKey : 'water_source' 
            },
            { 
              id : "Q31G",
              count: 'Q31',
              answerName : "其他", 
              answerType : 7, 
              answerKey : 'water_source' 
            },
          ]
        },
        {
          num : "Q32",
          title : "您会经常食用变质或过期的食物吗（如玉米、花生等）？",
          classType : '',
          answer : [
            { 
              id : "Q32A",
              count: 'Q32',
              answerName : "不会", 
              answerType : 1, 
              answerKey : 'edible_expired_food' 
            },
            { 
              id : "Q32B",
              count: 'Q32',
              answerName : "偶尔会", 
              answerType : 2, 
              answerKey : 'edible_expired_food' 
            },
            { 
              id : "Q32C",
              count: 'Q32',
              answerName : "经常会", 
              answerType : 3, 
              answerKey : 'edible_expired_food' 
            },
            { 
              id : "Q32D",
              count: 'Q32',
              answerName : "不知道", 
              answerType : 4, 
              answerKey : 'edible_expired_food' 
            },
          ]
        },
        {
          num : "Q33",
          title : "您喝酒吗？",
          classType : '',
          answer : [
            { 
              id : "Q33A",
              count: 'Q33',
              answerName : "喝酒", 
              answerType : 2, 
              answerKey : 'drinking_status' 
            },
            { 
              id : "Q33B",
              count: 'Q33',
              answerName : "从不喝酒", 
              answerType : 1, 
              answerKey : 'drinking_status' 
            },
          ]
        },
        {
          num : "Q34",
          title : "近1个月是否喝酒？",
          classType : '',
          answer : [
            { 
              id : "Q34A",
              count: 'Q34',
              answerName : "是", 
              answerType : 1, 
              answerKey : 'drink_month' 
            },
            { 
              id : "Q34B",
              count: 'Q34',
              answerName : "否", 
              answerType : 2, 
              answerKey : 'drink_month' 
            },
          ]
        },
        {
          num : "Q35",
          title : "在过去的1年，您一般多长时间喝一次酒？",
          classType : '',
          answer : [
            { 
              id : "Q35A",
              count: 'Q35',
              answerName : "几乎每天喝2次", 
              answerType : 1, 
              answerKey : 'how_long_drink' 
            },
            { 
              id : "Q35B",
              count: 'Q35',
              answerName : "几乎每天喝1次", 
              answerType : 2, 
              answerKey : 'how_long_drink' 
            },
            { 
              id : "Q35C",
              count: 'Q35',
              answerName : "每周喝3-4次", 
              answerType : 3, 
              answerKey : 'how_long_drink' 
            },
            { 
              id : "Q35D",
              count: 'Q35',
              answerName : "每周喝1-2次", 
              answerType : 4, 
              answerKey : 'how_long_drink' 
            },
            { 
              id : "Q35E",
              count: 'Q35',
              answerName : "每周少于1次", 
              answerType : 5, 
              answerKey : 'how_long_drink' 
            },
          ]
        },
        {
          num : "Q36",
          title : "您从多大年龄开始，每周都饮酒？",
          classType : '',
          id : "Q36", 
          answerName : "", 
          answerType : '', 
          answerKey : 'drink_how_old', 
          count:"Q36"
        }
        /*{
          num : "Q36",
          title : "通常您的饮酒方式是？",
          classType : '',
          answer : [
            { 
              id : "Q36A",
              count: 'Q36',
              answerName : "吃饭时饮酒", 
              answerType : 1, 
              answerKey : 'drink_ways' 
            },
            { 
              id : "Q36B",
              count: 'Q36',
              answerName : "饭间或饭后饮酒", 
              answerType : 2, 
              answerKey : 'drink_ways' 
            },
            { 
              id : "Q36C",
              count: 'Q36',
              answerName : "没有规律", 
              answerType : 3, 
              answerKey : 'drink_ways' 
            },
          ]
        }*/

        ,

        /* 饮酒开始 */
        {
          num : "Q37",
          title : "您饮酒时的饮酒种类和次饮酒量是？",
          classType : '',
          labels : [
            {
              num : "Q37-1",
              title : "通常情况",
              classType : '',
              labels_er : [
                { 
                  id : "Q37-1A",
                  count : "Q371A",
                  title : "Q371",
                  answerName : "啤酒（1大瓶=2小瓶）", 
                  answerType : 1, 
                  company : "大瓶",
                  answerKey : 'drink_beer_normal' 
                },
                { 
                  id : "Q37-1B",
                  count : "Q371B",
                  title : "Q371",
                  answerName : "米酒或黄酒", 
                  answerType : 2,
                  company : "两", 
                  answerKey : 'drink_rice_normal' 
                },
                { 
                  id : "Q37-1C",
                  count : "Q371C",
                  title : "Q371",
                  answerName : "葡萄酒", 
                  answerType : 3, 
                  company : "两", 
                  answerKey : 'drink_grape_normal' 
                },
                { 
                  id : "Q37-1D",
                  count : "Q371D",
                  title : "Q371",
                  answerName : "白酒（≥50度）", 
                  answerType : 3,
                  company : "两", 
                  answerKey : 'drink_wbig_normal' 
                },
                { 
                  id : "Q37-1E",
                  count : "Q371E",
                  title : "Q371",
                  answerName : "白酒（＜50度）", 
                  answerType : 3,
                  company : "两", 
                  answerKey : 'drink_wsmall_normal' 
                },
              ]
            },
            {
              num : "Q37-2",
              title : "特殊日子",
              classType : '',
              labels_er : [
                { 
                  id : "Q37-2A",
                  count : "Q372A",
                  title : "Q372",
                  answerName : "啤酒（1大瓶=2小瓶）", 
                  answerType : 1,
                  company : "大瓶", 
                  answerKey : 'drink_beer_special' 
                },
                { 
                  id : "Q37-2B",
                  count : "Q372B",
                  title : "Q372",
                  answerName : "米酒或黄酒", 
                  answerType : 2,
                  company : "两", 
                  answerKey : 'drink_rice_special' 
                },
                { 
                  id : "Q37-2C",
                  count : "Q372C",
                  title : "Q372",
                  answerName : "葡萄酒", 
                  answerType : 3,
                  company : "两", 
                  answerKey : 'drink_grape_special' 
                },
                { 
                  id : "Q37-2D",
                  count : "Q372D",
                  title : "Q372",
                  answerName : "白酒（≥50度）", 
                  answerType : 3,
                  company : "两", 
                  answerKey : 'drink_wbig_special' 
                },
                { 
                  id : "Q37-2E",
                  count : "Q372E",
                  title : "Q372",
                  answerName : "白酒（＜50度）", 
                  answerType : 3,
                  company : "两", 
                  answerKey : 'drink_wsmall_special' 
                },
              ]
            },
            {
              num : "Q37-3",
              title : "最近一次",
              classType : '',
              labels_er : [
                { 
                  id : "Q37-3A",
                  count : "Q373A",
                  title : "Q373",
                  answerName : "啤酒（1大瓶=2小瓶）", 
                  answerType : 1,
                  company : "大瓶", 
                  answerKey : 'drink_beer_near' 
                },
                { 
                  id : "Q37-3B",
                  count : "Q373B",
                  title : "Q373",
                  answerName : "米酒或黄酒", 
                  answerType : 2,
                  company : "两", 
                  answerKey : 'drink_rice_near' 
                },
                { 
                  id : "Q37-3C",
                  count : "Q373C",
                  title : "Q373",
                  answerName : "葡萄酒", 
                  answerType : 3,
                  company : "两", 
                  answerKey : 'drink_grape_near' 
                },
                { 
                  id : "Q37-3D",
                  count : "Q373D",
                  title : "Q373",
                  answerName : "白酒（≥50度）", 
                  answerType : 3,
                  company : "两", 
                  answerKey : 'drink_wbig_near' 
                },
                { 
                  id : "Q37-3E",
                  count : "Q373E",
                  title : "Q373",
                  answerName : "白酒（＜50度）", 
                  answerType : 3,
                  company : "两", 
                  answerKey : 'drink_wsmall_near' 
                },
              ]
            }
          ]
        },

        {
          num : "Q38",
          title : "您饮酒后是否感觉浑身发热或头晕？",
          classType : '',
          answer : [
            { 
              id : "Q38A",
              count: 'Q38',
              answerName : "是，喝第一口酒就开始", 
              answerType : 1, 
              answerKey : 'drink_fever_dizzy' 
            },
            { 
              id : "Q38B",
              count: 'Q38',
              answerName : "是，喝少量酒后开始", 
              answerType : 2, 
              answerKey : 'drink_fever_dizzy' 
            },
            { 
              id : "Q38C",
              count: 'Q38',
              answerName : "是，喝大量酒才开始", 
              answerType : 3, 
              answerKey : 'drink_fever_dizzy' 
            },
            { 
              id : "Q38D",
              count: 'Q38',
              answerName : "否", 
              answerType : 4, 
              answerKey : 'drink_fever_dizzy'
            },
          ]
        },
        {
          num : "Q39",
          title : "近1个月，您在早晨饮酒的频率是？",
          classType : '',
          answer : [
            { 
              id : "Q39A",
              count: 'Q39',
              answerName : "从不", 
              answerType : 1, 
              answerKey : 'drink_freq_month' 
            },
            { 
              id : "Q39B",
              count: 'Q39',
              answerName : "每周少于1天", 
              answerType : 2, 
              answerKey : 'drink_freq_month' 
            },
            { 
              id : "Q39C",
              count: 'Q39',
              answerName : "每周有几天", 
              answerType : 3, 
              answerKey : 'drink_freq_month' 
            },
            { 
              id : "Q39E",
              count: 'Q39',
              answerName : "每天或几乎每天", 
              answerType : 4, 
              answerKey : 'drink_freq_month' 
            },
          ]
        },
        {
          num : "Q40",
          title : "近1个月，您是否有以下经历？",
          classType : '',
          labels : [
            {
              num : "Q40-1",
              title : "因为饮酒无法工作，或无法做任何事情？",
              classType : '',
              question : 'Q40A',
              answer : [
                {
                  id : "Q40-1A",
                  count: 'Q40A',
                  answerName : "是", 
                  answerType : 1, 
                  answerKey : 'drink_experience_a'
                },
                {
                  id : "Q40-1B",
                  count: 'Q40A',
                  answerName : "否", 
                  answerType : 2, 
                  answerKey : 'drink_experience_a'
                }  
              ]
            },
            {
              num : "Q40-2",
              title : "饮酒后感觉沮丧、愤怒而无法控制自己？",
              classType : '',
              question : 'Q40B',
              answer : [
                {
                  id : "Q40-2A",
                  count: 'Q40B',
                  answerName : "是", 
                  answerType : 1, 
                  answerKey : 'drink_experience_b'
                },
                {
                  id : "Q40-2B",
                  count: 'Q40B',
                  answerName : "否", 
                  answerType : 2, 
                  answerKey : 'drink_experience_b'
                }  
              ]
            },
            {
              num : "Q40-1",
              title : "无法停止饮酒？",
              classType : '',
              question : 'Q40C',
              answer : [
                {
                  id : "Q40-3A",
                  count: 'Q40C',
                  answerName : "是", 
                  answerType : 1, 
                  answerKey : 'drink_experience_c'
                },
                {
                  id : "Q40-3B",
                  count: 'Q40C',
                  answerName : "否", 
                  answerType : 2, 
                  answerKey : 'drink_experience_c'
                }  
              ]
            },
            {
              num : "Q40-2",
              title : "停止饮酒后会震颤？",
              classType : '',
              question : 'Q40D',
              answer : [
                {
                  id : "Q40-4A",
                  count: 'Q40D',
                  answerName : "是", 
                  answerType : 1, 
                  answerKey : 'drink_experience_d'
                },
                {
                  id : "Q40-4B",
                  count: 'Q40D',
                  answerName : "否", 
                  answerType : 2, 
                  answerKey : 'drink_experience_d'
                }  
              ]
            }
          ]
        },
        {
          num : "Q41",
          title : "您经常喝醉吗？",
          classType : '',
          answer : [
            { 
              id : "Q41A",
              count: 'Q41',
              answerName : "几乎每天1次", 
              answerType : 1, 
              answerKey : 'drunk' 
            },
            { 
              id : "Q41B",
              count: 'Q41',
              answerName : "每周1次", 
              answerType : 2, 
              answerKey : 'drunk' 
            },
            { 
              id : "Q41C",
              count: 'Q41',
              answerName : "每月1次", 
              answerType : 3, 
              answerKey : 'drunk' 
            },
            { 
              id : "Q41D",
              count: 'Q41',
              answerName : "每年少于10次", 
              answerType : 4, 
              nswerKey : 'drunk' 
            },
            { 
              id : "Q41E",
              count: 'Q41',
              answerName : "从来没醉过", 
              answerType : 5, 
              answerKey : 'drunk' 
            },
          ]
        },
        {
          num : "Q42",
          title : "与几年前比，您的饮酒量的变化？",
          classType : '',
          answer : [
            { 
              id : "Q42A",
              count: 'Q42',
              answerName : "几乎没有变化", 
              answerType : 1, 
              answerKey : 'drink_drink_change' 
            },
            { 
              id : "Q42B",
              count: 'Q42',
              answerName : "大大增加", 
              answerType : 2, 
              answerKey : 'drink_drink_change' 
            },
            { 
              id : "Q42C",
              count: 'Q42',
              answerName : "大大减少", 
              answerType : 3, 
              answerKey : 'drink_drink_change' 
            },
          ]
        },
        {
          num : "Q43",
          title : "请回忆您过去一周的身体活动时间（只计算每次持续10分钟以上的活动）？",
          classType : '',
          labels: [
            {
              num : "Q43-1",
              title : '重体力活动(如搬运重物、赛跑、游泳或长时间健身操等)',
              answer : [
                {
                  id : "Q431",
                  count: 'Q431',
                  answerKey : 'h_activity_freq' //重体力活（天）
                },
                {
                  id : "Q432",
                  count: 'Q432',
                  answerKey : 'h_act_tim_length' //重体力活（分）
                }
              ]
            },
            {
              num : "Q43-2",
              title : '中等强度体力活动(如骑自行车、乒乓球、羽毛球、交谊舞等)',
              answer : [
                {
                  id : "Q433",
                  count: 'Q433',
                  answerKey : 'm_activity_freq' //中等强度（天）
                },
                {
                  id : "Q434",
                  count: 'Q434',
                  answerKey : 'm_act_tim_length' //中等强度（分）
                }
              ]
            },
            {
              num : "Q43-3",
              title : '步行运动(包括散步、您工作和出行时的步行等)',
              answer : [
                {
                  id : "Q435",
                  count: 'Q435',
                  answerKey : 'walking_day' //步行运动（天）
                },
                {
                  id : "Q436",
                  count: 'Q436',
                  answerKey : 'walking_minutes' //步行运动（分）
                }
              ]
            },
            {
              num : "Q43-4",
              title : '您每天坐着、靠着或躺着（如看电视、用电脑、阅读、写字、吃饭、打麻将、打牌、下棋等，请减去睡眠时间）的累计时间是',
              answer : [
                {
                  id : "Q437",
                  count: 'Q437',
                  answerKey : 'sedentary_hours' // 每天小时数
                },
                {
                  id : "Q438",
                  count: 'Q438',
                  answerKey : 'sedentary_minutes' //每天分钟数
                }
              ]
            }
          ]
        },
        {
          num : "Q44",
          title : "过去一个月，您的总体睡眠质量如何？",
          classType : '',
          answer : [
            { 
              id : "Q44A",
              count: 'Q44',
              answerName : "非常好", 
              answerType : 1, 
              answerKey : 'sleep_status' 
            },
            { 
              id : "Q44B",
              count: 'Q44',
              answerName : "尚好", 
              answerType : 2, 
              answerKey : 'sleep_status' 
            },
            { 
              id : "Q44C",
              count: 'Q44',
              answerName : "不好", 
              answerType : 3, 
              answerKey : 'sleep_status' 
            },
            { 
              id : "Q44D",
              count: 'Q44',
              answerName : "非常差", 
              answerType : 4, 
              answerKey : 'sleep_status' 
            },
          ]
        },
        {
          num : "Q45",
          title : "过去一个月您每天平均的实际睡眠时间",
          classType : '',
          id : "Q45", 
          answerName : "", 
          answerType : '', 
          answerKey : 'sleep_time', 
          count:"Q45"
        },
        {
          num : "Q46",
          title : "过去一个月，您是否要服药（包括医生开的处方和自购药物）才能入睡？",
          classType : '',
          answer : [
            {
              id : 'Q46A',
              count: 'Q46',
              answerName : "不用服用", 
              answerType : 1, 
              answerKey : 'sleep_medi' 
            },
            {
              id : 'Q46B',
              count: 'Q46',
              answerName : "平均每周不足1次", 
              answerType : 2, 
              answerKey : 'sleep_medi' 
            },
            {
              id : 'Q46C',
              count: 'Q46',
              answerName : "平均每周1或2次", 
              answerType : 3, 
              answerKey : 'sleep_medi' 
            },
            {
              id : 'Q46D',
              count: 'Q46',
              answerName : "平均每周3次或更多", 
              answerType : 4, 
              answerKey : 'sleep_medi' 
            }
          ]
        },
        {
          num : "Q47",
          title : "过去一个月，您是否有过多梦或易惊醒？",
          classType : '',
          answer : [
            {
              id : 'Q47A',
              count: 'Q47',
              answerName : "是", 
              answerType : 1, 
              answerKey : 'sleep_dream' 
            },
            {
              id : 'Q47B',
              count: 'Q47',
              answerName : "否", 
              answerType : 2, 
              answerKey : 'sleep_dream' 
            }
          ]
        },
        {
          num : 'Q48',
          title : '我很快乐',
          classType : '',
          answer : [
            {
              id : 'Q48A',
              count: 'Q48',
              answerName : "完全不符合", 
              answerType : 1, 
              answerKey : 'spirit01' 
            },
            {
              id : 'Q48B',
              count: 'Q48',
              answerName : "比较不符合", 
              answerType : 2, 
              answerKey : 'spirit01' 
            },
            {
              id : 'Q48C',
              count: 'Q48',
              answerName : "一般", 
              answerType : 3, 
              answerKey : 'spirit01', 
            },
            {
              id : 'Q48D',
              count: 'Q48',
              answerName : "比较符合", 
              answerType : 4, 
              answerKey : 'spirit01' 
            },
            {
              id : 'Q48E',
              count: 'Q48',
              answerName : "完全符合", 
              answerType : 5, 
              answerKey : 'spirit01' 
            }
          ]
        },
        {
          num : 'Q49',
          title : '我对未来充满希望',
          classType : '',
          answer : [
            {
              id : 'Q49A',
              count: 'Q49',
              answerName : "完全不符合", 
              answerType : 1, 
              answerKey : 'spirit02' 
            },
            {
              id : 'Q49B',
              count: 'Q49',
              answerName : "比较不符合", 
              answerType : 2, 
              answerKey : 'spirit02' 
            },
            {
              id : 'Q49C',
              count: 'Q49',
              answerName : "一般", 
              answerType : 3, 
              answerKey : 'spirit02', 
            },
            {
              id : 'Q49D',
              count: 'Q49',
              answerName : "比较符合", 
              answerType : 4, 
              answerKey : 'spirit02' 
            },
            {
              id : 'Q49E',
              count: 'Q49',
              answerName : "完全符合", 
              answerType : 5, 
              answerKey : 'spirit02' 
            }
          ]
        },
        {
          num : 'Q50',
          title : '即使家人或朋友帮助，我也不能摆脱忧伤',
          classType : '',
          answer : [
            {
              id : 'Q50A',
              count: 'Q50',
              answerName : "完全不符合", 
              answerType : 1, 
              answerKey : 'spirit03' 
            },
            {
              id : 'Q50B',
              count: 'Q50',
              answerName : "比较不符合", 
              answerType : 2, 
              answerKey : 'spirit03' 
            },
            {
              id : 'Q50C',
              count: 'Q50',
              answerName : "一般", 
              answerType : 3, 
              answerKey : 'spirit03', 
            },
            {
              id : 'Q50D',
              count: 'Q50',
              answerName : "比较符合", 
              answerType : 4, 
              answerKey : 'spirit03' 
            },
            {
              id : 'Q50E',
              count: 'Q49',
              answerName : "完全符合", 
              answerType : 5, 
              answerKey : 'spirit03' 
            }
          ]
        },
        {
          num : 'Q51',
          title : '我感觉孤独',
          classType : '',
          answer : [
            {
              id : 'Q51A',
              count: 'Q51',
              answerName : "完全不符合", 
              answerType : 1, 
              answerKey : 'spirit04' 
            },
            {
              id : 'Q51B',
              count: 'Q51',
              answerName : "比较不符合", 
              answerType : 2, 
              answerKey : 'spirit04' 
            },
            {
              id : 'Q51C',
              count: 'Q51',
              answerName : "一般", 
              answerType : 3, 
              answerKey : 'spirit04', 
            },
            {
              id : 'Q51D',
              count: 'Q51',
              answerName : "比较符合", 
              answerType : 4, 
              answerKey : 'spirit04' 
            },
            {
              id : 'Q51E',
              count: 'Q51',
              answerName : "完全符合", 
              answerType : 5, 
              answerKey : 'spirit04' 
            }
          ]
        },
        {
          num : 'Q52',
          title : '我经常感觉压抑或沮丧',
          classType : '',
          answer : [
            {
              id : 'Q52A',
              count: 'Q52',
              answerName : "完全不符合", 
              answerType : 1, 
              answerKey : 'spirit05' 
            },
            {
              id : 'Q52B',
              count: 'Q52',
              answerName : "比较不符合", 
              answerType : 2, 
              answerKey : 'spirit05' 
            },
            {
              id : 'Q52C',
              count: 'Q52',
              answerName : "一般", 
              answerType : 3, 
              answerKey : 'spirit05', 
            },
            {
              id : 'Q52D',
              count: 'Q52',
              answerName : "比较符合", 
              answerType : 4, 
              answerKey : 'spirit05' 
            },
            {
              id : 'Q52E',
              count: 'Q52',
              answerName : "完全符合", 
              answerType : 5, 
              answerKey : 'spirit05' 
            }
          ]
        },
        {
          num : 'Q53',
          title : '我容易情绪激动',
          classType : '',
          answer : [
            {
              id : 'Q53A',
              count: 'Q53',
              answerName : "完全不符合", 
              answerType : 1, 
              answerKey : 'spirit06' 
            },
            {
              id : 'Q53B',
              count: 'Q53',
              answerName : "比较不符合", 
              answerType : 2, 
              answerKey : 'spirit06' 
            },
            {
              id : 'Q53C',
              count: 'Q53',
              answerName : "一般", 
              answerType : 3, 
              answerKey : 'spirit06', 
            },
            {
              id : 'Q53D',
              count: 'Q53',
              answerName : "比较符合", 
              answerType : 4, 
              answerKey : 'spirit06' 
            },
            {
              id : 'Q53E',
              count: 'Q53',
              answerName : "完全符合", 
              answerType : 5, 
              answerKey : 'spirit06' 
            }
          ]
        },
        {
          num : 'Q54',
          title : '我生活很紧张',
          classType : '',
          answer : [
            {
              id : 'Q54A',
              count: 'Q54',
              answerName : "完全不符合", 
              answerType : 1, 
              answerKey : 'spirit07' 
            },
            {
              id : 'Q54B',
              count: 'Q54',
              answerName : "比较不符合", 
              answerType : 2, 
              answerKey : 'spirit07' 
            },
            {
              id : 'Q54C',
              count: 'Q54',
              answerName : "一般", 
              answerType : 3, 
              answerKey : 'spirit07', 
            },
            {
              id : 'Q54D',
              count: 'Q54',
              answerName : "比较符合", 
              answerType : 4, 
              answerKey : 'spirit07' 
            },
            {
              id : 'Q54E',
              count: 'Q54',
              answerName : "完全符合", 
              answerType : 5, 
              answerKey : 'spirit07' 
            }
          ]
        },
        {
          num : 'Q55',
          title : '最近一年，您感觉压力对健康的影响程度有多大？',
          classType : '',
          answer : [
            {
              id : 'Q55A',
              count: 'Q55',
              answerName : "很大", 
              answerType : 1, 
              answerKey : 'spirit08' 
            },
            {
              id : 'Q55B',
              count: 'Q55',
              answerName : "有些", 
              answerType : 2, 
              answerKey : 'spirit08' 
            },
            {
              id : 'Q55C',
              count: 'Q55',
              answerName : "几乎没有", 
              answerType : 3, 
              answerKey : 'spirit08', 
            },
            {
              id : 'Q55D',
              count: 'Q55',
              answerName : "没有", 
              answerType : 4, 
              answerKey : 'spirit08' 
            }
          ]
        },
        {
          num : 'Q56',
          title : '与同龄人相比，您认您整体的身体健康状况如何？',
          classType : '',
          answer : [
            {
              id : 'Q56A',
              count: 'Q56',
              answerName : "非常好", 
              answerType : 1, 
              answerKey : 'spirit09' 
            },
            {
              id : 'Q56B',
              count: 'Q56',
              answerName : "很好", 
              answerType : 2, 
              answerKey : 'spirit09' 
            },
            {
              id : 'Q56C',
              count: 'Q56',
              answerName : "好", 
              answerType : 3, 
              answerKey : 'spirit09', 
            },
            {
              id : 'Q56D',
              count: 'Q56',
              answerName : "一般", 
              answerType : 4, 
              answerKey : 'spirit09' 
            },
            {
              id : 'Q56E',
              count: 'Q56',
              answerName : "差", 
              answerType : 5, 
              answerKey : 'spirit09' 
            }
          ]
        },
        {
          num : 'Q57',
          title : '在过去的一年中，您认为您工作和生活中的精神压力大吗？',
          classType : '',
          answer : [
            {
              id : 'Q57A',
              count: 'Q57',
              answerName : "没有压力", 
              answerType : 1, 
              answerKey : 'spirit10' 
            },
            {
              id : 'Q57B',
              count: 'Q57',
              answerName : "压力较少", 
              answerType : 2, 
              answerKey : 'spirit10' 
            },
            {
              id : 'Q57C',
              count: 'Q57',
              answerName : "一般", 
              answerType : 3, 
              answerKey : 'spirit10', 
            },
            {
              id : 'Q57D',
              count: 'Q57',
              answerName : "压力较大", 
              answerType : 4, 
              answerKey : 'spirit10' 
            },
            {
              id : 'Q57E',
              count: 'Q57',
              answerName : "压力极大", 
              answerType : 5, 
              answerKey : 'spirit10' 
            }
          ]
        },
        {
          num : 'Q58',
          title : '您目前是否从事以下职业1年或以上？',
          classType : '',
          answer : [
            {
              id : 'Q58A',
              count: 'Q58',
              answerName : "金属冶炼", 
              answerType : 1, 
              answerKey : 'spirit11' 
            },
            {
              id : 'Q58B',
              count: 'Q58',
              answerName : "煤矿开采", 
              answerType : 2, 
              answerKey : 'spirit11' 
            },
            {
              id : 'Q58C',
              count: 'Q58',
              answerName : "隧道开挖", 
              answerType : 3, 
              answerKey : 'spirit11', 
            },
            {
              id : 'Q58D',
              count: 'Q58',
              answerName : "石化", 
              answerType : 4, 
              answerKey : 'spirit11' 
            },
            {
              id : 'Q58E',
              count: 'Q58',
              answerName : "石棉生产", 
              answerType : 5, 
              answerKey : 'spirit11' 
            },
            {
              id : 'Q58F',
              count: 'Q58',
              answerName : "中餐厨师", 
              answerType : 6, 
              answerKey : 'spirit11' 
            },
            {
              id : 'Q58G',
              count: 'Q58',
              answerName : "无", 
              answerType : 7, 
              answerKey : 'spirit11' 
            }
          ]
        },
        {
          num : 'Q59',
          title : '您认为您的居住环境存在空气污染情况吗(如居住在大城市、工业区、交通干线附近)？',
          classType : '',
          answer : [
            {
              id : 'Q59A',
              count: 'Q59',
              answerName : "是", 
              answerType : 1, 
              answerKey : 'pollut' 
            },
            {
              id : 'Q59B',
              count: 'Q59',
              answerName : "否", 
              answerType : 2, 
              answerKey : 'pollut' 
            },
          ]
        },
        {
          num : 'Q60',
          title : '您经常自己炒菜做饭吗？',
          classType : '',
          answer : [
            {
              id : 'Q60A',
              count: 'Q60',
              answerName : "每周少于1次", 
              answerType : 1, 
              answerKey : 'cook' 
            },
            {
              id : 'Q60B',
              count: 'Q60',
              answerName : "每周1-3次", 
              answerType : 2, 
              answerKey : 'cook' 
            },
            {
              id : 'Q60C',
              count: 'Q60',
              answerName : "每周4-7次", 
              answerType : 3, 
              answerKey : 'cook' 
            },
            {
              id : 'Q60D',
              count: 'Q60',
              answerName : "每周多于7次", 
              answerType : 4, 
              answerKey : 'cook' 
            },
          ]
        },
        {
          num : 'Q61',
          title : '您炒菜时经常把油烧得很热后(如已冒烟)才开始烹调吗？',
          classType : '',
          answer : [
            {
              id : 'Q61A',
              count: 'Q61',
              answerName : "是", 
              answerType : 1, 
              answerKey : 'hot' 
            },
            {
              id : 'Q61B',
              count: 'Q61',
              answerName : "否", 
              answerType : 2, 
              answerKey : 'hot' 
            }
          ]
        },
        {
          num : 'Q62',
          title : '您炒菜时主要使用哪种燃料？',
          classType : '',
          answer : [
            {
              id : 'Q62A',
              count: 'Q62',
              answerName : "天然气", 
              answerType : 1, 
              answerKey : 'cook_fuel' 
            },
            {
              id : 'Q62B',
              count: 'Q62',
              answerName : "煤", 
              answerType : 2, 
              answerKey : 'cook_fuel' 
            },
            {
              id : 'Q62C',
              count: 'Q62',
              answerName : "木柴", 
              answerType : 3, 
              answerKey : 'cook_fuel' 
            },
            {
              id : 'Q62D',
              count: 'Q62',
              answerName : "电", 
              answerType : 4, 
              answerKey : 'cook_fuel' 
            },
            {
              id : 'Q62E',
              count: 'Q62',
              answerName : "其他", 
              answerType : 5, 
              answerKey : 'cook_fuel' 
            }
          ]
        },
        {
          num : 'Q63',
          title : '您家中是否安装了烟囱或抽油烟机(排烟良好)？',
          classType : '',
          answer : [
            {
              id : 'Q63A',
              count: 'Q63',
              answerName : "是", 
              answerType : 1, 
              answerKey : 'equip' 
            },
            {
              id : 'Q63B',
              count: 'Q63',
              answerName : "否", 
              answerType : 2, 
              answerKey : 'equip' 
            }
          ]
        },
        {
          num : 'Q64',
          title : '您家中的冬季取暖方式是？',
          classType : '',
          answer : [
            {
              id : 'Q64A',
              count: 'Q64',
              answerName : "集中供暖", 
              answerType : 1, 
              answerKey : 'heat' 
            },
            {
              id : 'Q64B',
              count: 'Q64',
              answerName : "燃煤炉", 
              answerType : 2, 
              answerKey : 'heat' 
            },
            {
              id : 'Q64D',
              count: 'Q64',
              answerName : "其他", 
              answerType : 3, 
              answerKey : 'heat' 
            }
          ]
        },
        {
          num : 'Q65',
          title : '您认为家中室内的空气存在污染情况吗(如装修、新家具等)？',
          classType : '',
          answer : [
            {
              id : 'Q65A',
              count: 'Q65',
              answerName : "是", 
              answerType : 1, 
              answerKey : 'heat_other' 
            },
            {
              id : 'Q65B',
              count: 'Q65',
              answerName : "否", 
              answerType : 2, 
              answerKey : 'heat_other' 
            }
          ]
        },
        {
          num : 'Q66',
          title : '最近3个月，您是否有以下躯体症状（多选题）？',
          classType : '',
          answer : [
            {
              id : 'dhhhch',
              answerName : "头晕、头痛、头胀、头部压迫紧箍感", 
              answerType : "", 
              answerKey : 'dhhhch',
              labels : ''
            },
            {
              id : 'cpctf',
              answerName : "胸痛、胸闷、心慌", 
              answerType : "", 
              answerKey : 'cpctf',
              labels : ''
            },
            {
              id : 'cough_hemoptysis',
              answerName : "咳嗽、咳痰、咯血", 
              answerType : "", 
              answerKey : 'cough_hemoptysis',
              labels : ''
            },
            {
              id : 'activity_disorder',
              answerName : "颈肩不适、活动障碍、上下肢麻木", 
              answerType : "", 
              answerKey : 'activity_disorder',
              labels : ''
            },
            {
              id : 'dysphagia_acid_reflux',
              answerName : "吞咽困难、反酸", 
              answerType : "", 
              answerKey : 'dysphagia_acid_reflux',
              labels : ''
            },
            {
              id : 'gas_ight',
              answerName : "气紧、气促、呼吸困难", 
              answerType : "", 
              answerKey : 'gas_ight',
              labels : ''
            },
            {
              id : 'activity_limited',
              answerName : "腰椎久坐疼痛酸胀、活动受限、腿脚麻木", 
              answerType : "", 
              answerKey : 'activity_limited',
              labels : ''
            },
            {
              id : 'abnormal_urine',
              answerName : "小便异常(尿频、尿急、尿痛、排尿困难、尿血)", 
              answerType : "", 
              answerKey : 'abnormal_urine',
              labels : ''
            },
            {
              id : 'body_weight_loss',
              answerName : "身体消瘦或体重减轻（3个月内体重减轻超过原体重的10%）", 
              answerType : "", 
              answerKey : 'body_weight_loss',
              labels : ''
            },
            {
              id : 'abdominal_pain',
              answerName : "腹痛、腹胀、腹部不适", 
              answerType : "", 
              answerKey : 'abdominal_pain',
              labels : [
                {
                  id : 'abdominal_pain_up',
                  answerName : "肚脐以上", 
                  answerType : "", 
                  answerKey : 'abdominal_pain_up'
                },
                {
                  id : 'abdominal_pain_middle',
                  answerName : "肚脐周围", 
                  answerType : "", 
                  answerKey : 'abdominal_pain_middle'
                },
                {
                  id : 'abdominal_pain_down',
                  answerName : "肚脐以下", 
                  answerType : "", 
                  answerKey : 'abdominal_pain_down'
                }
              ]
            },
            {
              id : 'abnormal_stool',
              answerName : "大便异常", 
              answerType : "", 
              answerKey : 'abnormal_stool',
              labels : [
                {
                  id : 'abnormal_stool_red',
                  answerName : "大便带血/色鲜红", 
                  answerType : "", 
                  answerKey : 'abnormal_stool_red'
                },
                {
                  id : 'abnormal_stool_black',
                  answerName : "黑便", 
                  answerType : "", 
                  answerKey : 'abnormal_stool_black'
                },
                {
                  id : 'abnormal_stool_d3',
                  answerName : "腹泻，＞3次/日", 
                  answerType : "", 
                  answerKey : 'abnormal_stool_d3'
                },
                {
                  id : 'abnormal_stool_d2',
                  answerName : "便秘，≤2次/周", 
                  answerType : "", 
                  answerKey : 'abnormal_stool_d2'
                }
              ]
            },
            {
              id : 'edema',
              answerName : "浮肿", 
              answerType : "", 
              answerKey : 'edema',
              labels : [
                {
                  id : 'edema_ble',
                  answerName : "双下肢(脚踝、小腿)", 
                  answerType : "", 
                  answerKey : 'edema_ble'
                },
                {
                  id : 'edema_eyelid',
                  answerName : "眼睑颜面", 
                  answerType : "", 
                  answerKey : 'edema_eyelid'
                },
                {
                  id : 'edema_body',
                  answerName : "周身", 
                  answerType : "", 
                  answerKey : 'edema_body'
                }
              ]
            },
            {
              id : 'joint_pain',
              answerName : "关节疼痛，活动僵硬受限", 
              answerType : "", 
              answerKey : 'joint_pain',
              labels : [
                {
                  id : 'joint_pain_finger',
                  answerName : "手指", 
                  answerType : "", 
                  answerKey : 'joint_pain_finger'
                },
                {
                  id : 'joint_pain_lknee',
                  answerName : "左膝关节", 
                  answerType : "", 
                  answerKey : 'joint_pain_lknee'
                },
                {
                  id : 'joint_pain_rknee',
                  answerName : "右膝关节", 
                  answerType : "", 
                  answerKey : 'joint_pain_rknee'
                },
                {
                  id : 'joint_pain_lelbow',
                  answerName : "左肘关节", 
                  answerType : "", 
                  answerKey : 'joint_pain_lelbow'
                },
                {
                  id : 'joint_pain_relbow',
                  answerName : "右肘关节", 
                  answerType : "", 
                  answerKey : 'joint_pain_relbow'
                },
                {
                  id : 'joint_pain_hip',
                  answerName : "髋关节", 
                  answerType : "", 
                  answerKey : 'joint_pain_hip'
                }
              ]
            },
            {
              id : 'joint_pain_other',
              answerName : "其他特殊不适", 
              answerType : "", 
              answerKey : 'joint_pain_other',
              labels : ''
            },
          ]
        },
        {
          num : 'Q67',
          title : '一般检查（1尺=33.3厘米）',
          classType : '',
          answer : [
            { 
              answerName : "身高", 
              answerType : "", 
              answerKey : "body_height",
              company : 'cm', 
              id : "Q67A", 
              count:"Q67A"
            },
            { 
              answerName : "臀围", 
              answerType : "", 
              answerKey : "hip_circum",
              id : "Q67B", 
              count:"Q67B",
              company : 'cm' 
            },
            { 
              answerName : "体重", 
              answerType : "", 
              answerKey : "body_weight",
              id : "Q67C", 
              count:"Q67C",
              company : 'kg' 
            },
            {  
              answerName : "腰围", 
              answerType : "", 
              answerKey : "waist_line",
              id : "Q67D", 
              count:"Q67D",
              company : 'cm' 
            },
            { 
              answerName : "收缩压", 
              answerType : "", 
              answerKey : "sbp",
              id : "Q67E", 
              count:"Q67E",
              company : 'mmHg' 
            },
            
            { 
              answerName : "舒张压", 
              answerType : "", 
              answerKey : "dbp",
              id : "Q67F", 
              count:"Q67F",
              company : 'mmHg' 
            },
          ]
        },
        {
          num : 'Q68',
          title : '心电图检查（每项单选）',
          classType : '',
          labels : [
            {
              num : "Q68-1",
              title : "早搏",
              classType : '',
              answer : [
                { id : 'Q68-1A', count: 'Q68A', answerName : "有", answerType : 1, answerKey : "premature_pulse" },
                { id : 'Q68-1B', count: 'Q68A', answerName : "无", answerType : 2, answerKey : "premature_pulse" },
                { id : 'Q68-1C', count: 'Q68A', answerName : "不清楚", answerType : 3, answerKey : "premature_pulse" }
              ]
            },
            {
              num : "Q68-2",
              title : "ST-T改变",
              classType : '',
              answer : [
                { id : 'Q68-2A', count: 'Q68B', answerName : "有", answerType : 1, answerKey : "st_t" },
                { id : 'Q68-2B', count: 'Q68B', answerName : "无", answerType : 2, answerKey : "st_t" },
                { id : 'Q68-2C', count: 'Q68B', answerName : "不清楚", answerType : 3, answerKey : "st_t" }
              ]
            },
            {
              num : "Q68-3",
              title : "房颤",
              classType : '',
              answer : [
                { id : 'Q68-3A', count: 'Q68C', answerName : "有", answerType : 1, answerKey : "atrial_fibrillation" },
                { id : 'Q68-3B', count: 'Q68C', answerName : "无", answerType : 2, answerKey : "atrial_fibrillation" },
                { id : 'Q68-3C', count: 'Q68C', answerName : "不清楚", answerType : 3, answerKey : "atrial_fibrillation" }
              ]
            },
            {
              num : "Q68-4",
              title : "左心室肥大",
              classType : '',
              answer : [
                { id : 'Q68-4A', count: 'Q68D', answerName : "有", answerType : 1, answerKey : "left_ventricle" },
                { id : 'Q68-4B', count: 'Q68D', answerName : "无", answerType : 2, answerKey : "left_ventricle" },
                { id : 'Q68-4C', count: 'Q68D', answerName : "不清楚", answerType : 3, answerKey : "left_ventricle" }
              ]
            }
          ]
        },
        {
          num : 'Q69',
          title : 'X线和B超检查（每项单选）',
          classType : '',
          labels : [
            {
              num : "Q69-1",
              title : "肺部阴影",
              classType : '',
              answer : [
                { id : 'Q69-2A', count: 'Q69A', answerName : "有", answerType : 1, answerKey : "premature_pulse" },
                { id : 'Q69-2B', count: 'Q69A', answerName : "无", answerType : 2, answerKey : "premature_pulse" },
                { id : 'Q69-2C', count: 'Q69A', answerName : "不清楚", answerType : 3, answerKey : "premature_pulse" }
              ]
            },
            {
              num : "Q69-2",
              title : "心界扩大",
              classType : '',
              answer : [
                { id : 'Q69-2A', count: 'Q69B', answerName : "有", answerType : 1, answerKey : "st_t" },
                { id : 'Q69-2B', count: 'Q69B', answerName : "无", answerType : 2, answerKey : "st_t" },
                { id : 'Q69-2C', count: 'Q69B', answerName : "不清楚", answerType : 3, answerKey : "st_t" }
              ]
            },
            {
              num : "Q69-3",
              title : "肝脏肿大",
              classType : '',
              answer : [
                { id : 'Q69-3A', count: 'Q69C', answerName : "有", answerType : 1, answerKey : "atrial_fibrillation" },
                { id : 'Q69-3B', count: 'Q69C', answerName : "无", answerType : 2, answerKey : "atrial_fibrillation" },
                { id : 'Q69-3C', count: 'Q69C', answerName : "不清楚", answerType : 3, answerKey : "atrial_fibrillation" }
              ]
            },
            {
              num : "Q69-4",
              title : "肝脏肿块",
              classType : '',
              answer : [
                { id : 'Q69-4A', count: 'Q69D', answerName : "有", answerType : 1, answerKey : "left_ventricle" },
                { id : 'Q69-4B', count: 'Q69D', answerName : "无", answerType : 2, answerKey : "left_ventricle" },
                { id : 'Q69-4C', count: 'Q69D', answerName : "不清楚", answerType : 3, answerKey : "left_ventricle" }
              ]
            },
            {
              num : "Q69-1",
              title : "脂肪肝",
              classType : '',
              answer : [
                { id : 'Q69-5A', count: 'Q69E', answerName : "有", answerType : 1, answerKey : "fatty_liver" },
                { id : 'Q69-5B', count: 'Q69E', answerName : "无", answerType : 2, answerKey : "fatty_liver" },
                { id : 'Q69-5C', count: 'Q69E', answerName : "不清楚", answerType : 3, answerKey : "fatty_liver" }
              ]
            },
            {
              num : "Q69-2",
              title : "胆结石",
              classType : '',
              answer : [
                { id : 'Q69-6A', count: 'Q69F', answerName : "有", answerType : 1, answerKey : "gallstone" },
                { id : 'Q69-6B', count: 'Q69F', answerName : "无", answerType : 2, answerKey : "gallstone" },
                { id : 'Q69-6C', count: 'Q69F', answerName : "不清楚", answerType : 3, answerKey : "gallstone" }
              ]
            },
            {
              num : "Q69-3",
              title : "肾结石",
              classType : '',
              answer : [
                { id : 'Q69-7A', count: 'Q69G', answerName : "有", answerType : 1, answerKey : "renal_calculus" },
                { id : 'Q69-7B', count: 'Q69G', answerName : "无", answerType : 2, answerKey : "renal_calculus" },
                { id : 'Q69-7C', count: 'Q69G', answerName : "不清楚", answerType : 3, answerKey : "renal_calculus" }
              ]
            },
            {
              num : "Q69-4",
              title : "乳房良性结节或肿块",
              classType : '',
              answer : [
                { id : 'Q69-8A', count: 'Q69H', answerName : "有", answerType : 1, answerKey : "breast_tubercle" },
                { id : 'Q69-8B', count: 'Q69H', answerName : "无", answerType : 2, answerKey : "breast_tubercle" },
                { id : 'Q69-8C', count: 'Q69H', answerName : "不清楚", answerType : 3, answerKey : "breast_tubercle" }
              ]
            }
          ]
        },
        {
          num : 'Q70',
          title : '实验室检查（前五项必填）',
          classType : '',
          answer : [
            { id : 'Q701',count: 'Q701',answerName : "总胆固醇（TC）", answerType : "", answerKey : "cholesterol", required : true,company: "mmol/L" },
            { id : 'Q702',count: 'Q702', answerName : "高密度脂蛋白胆固醇", answerType : "", answerKey : "hdlc", required : true,company: "mmol/L" },
            { id : 'Q703',count: 'Q703', answerName : "甘油三酯（TG）", answerType : "", answerKey : "triglycerin", required : true,company: "mmol/L" },
            { id : 'Q704',count: 'Q704', answerName : "低密度脂蛋白胆固醇", answerType : "", answerKey : "ldlc", required : true,company: "mmol/L" },
            { id : 'Q705',count: 'Q705', answerName : "空腹血糖(Glu)", answerType : "", answerKey : "fasting_bg", required : true,company: "mmol/L" },
            { id : 'Q706',count: 'Q706', answerName : "餐后2小时血糖", answerType : "", answerKey : "ogtt",company: "mmol/L" },
            { id : 'Q707',count: 'Q707', answerName : "血红蛋白（HGB）", answerType : "", answerKey : "hb",company: "g/L" },
            { id : 'Q708',count: 'Q708', answerName : "血尿酸（UA）", answerType : "", answerKey : "ua",company: "μmol/L" },
            { id : 'Q709',count: 'Q709', answerName : "谷丙转氨酶（ALT）", answerType : "", answerKey : "gbzam_alt",company: "IU/L" },
            { id : 'Q7010',count: 'Q7010', answerName : "乙肝表面抗原（HBsAg）", answerType : "", answerKey : "ygbmky_hbsag" },
            { id : 'Q7011',count: 'Q7011', answerName : "谷草转氨酶（AST）", answerType : "", answerKey : "gczam",company: "IU/L" },
            { id : 'Q7012',count: 'Q7012', answerName : "丙型肝炎抗体（HCV）", answerType : "", answerKey : "bxgykt_hcv" },
            { id : 'Q7013',count: 'Q7013', answerName : "尿蛋白（PRO）", answerType : "", answerKey : "ndb_pro" },
            { id : 'Q7014',count: 'Q7014', answerName : "大便隐血（OB）", answerType : "", answerKey : "fobt_ob" },
            { id : 'Q7015',count: 'Q7015', answerName : "甲胎蛋白（AFP）", answerType : "", answerKey : "afp_q",company: "μg/L" },
            { id : 'Q7016',count: 'Q7016', answerName : "癌胚抗原（CEA）", answerType : "", answerKey : "cea_q",company: "μg/L" },
            { id : 'Q7017',count: 'Q7017', answerName : "C反应蛋白（CRP）", answerType : "", answerKey : "crp",company: "mg/L" },
            { id : 'Q7018',count: 'Q7018', answerName : "前列腺特异抗原（PSA）", answerType : "", answerKey : "f_psa",company: "μg/L" },
            { id : 'Q7019',count: 'Q7019', answerName : "血肌酐（Cr）", answerType : "", answerKey : "scr",company: "μmol/L" },
            { id : 'Q7020',count: 'Q7020', answerName : "骨密度检查指标-T值", answerType : "", answerKey : "t_score" }
          ]
        },
        {
          num : "Q71",
          title : "您的EB病毒抗体检查结果是？",
          classType : '',
          answer : [
            { 
              id : 'Q71A',
              count: 'Q71',
              answerName : "阳性",
              answerType : 1,
              answerKey : "eb"
            },
            { 
              id : 'Q71B',
              count: 'Q71',
              answerName : "阴性",
              answerType : 2,
              answerKey : "eb"
            },
            { 
              id : 'Q71C',
              count: 'Q71',
              answerName : "未检查",
              answerType : 3,
              answerKey : "eb"
            },
            { 
              id : 'Q71D',
              count: 'Q71',
              answerName : "不清楚",
              answerType : 4,
              answerKey : "eb"
            }
          ]
        },
        {
          num : "Q72",
          title : "您的人乳头状瘤病毒（HPV）病毒检查结果是？",
          classType : 2, //代表女性才能做
          answer : [
            { 
              id : 'Q72A',
              count: 'Q72',
              answerName : "阳性",
              answerType : 1,
              answerKey : "hpv"
            },
            { 
              id : 'Q72B',
              count: 'Q72',
              answerName : "阴性",
              answerType : 2,
              answerKey : "hpv"
            },
            { 
              id : 'Q72C',
              count: 'Q72',
              answerName : "未检查",
              answerType : 3,
              answerKey : "hpv"
            },
            { 
              id : 'Q72D',
              count: 'Q72',
              answerName : "不清楚",
              answerType : 4,
              answerKey : "hpv"
            }
          ]
        },
        {
          num : "Q73",
          title : "您上次接受乳腺钼靶X光检查的时间是？",
          classType : 2, //代表女性才能做
          answer : [
            { 
              id : 'Q73A',
              count: 'Q73',
              answerName : "一年内",
              answerType : 1,
              answerKey : "mammography_xray"
            },
            { 
              id : 'Q73B',
              count: 'Q73',
              answerName : "1-2年前",
              answerType : 2,
              answerKey : "mammography_xray"
            },
            { 
              id : 'Q73C',
              count: 'Q73',
              answerName : "2-3年前",
              answerType : 3,
              answerKey : "mammography_xray"
            },
            { 
              id : 'Q73D',
              count: 'Q73',
              answerName : "3-4年前",
              answerType : 4,
              answerKey : "mammography_xray"
            },
            { 
              id : 'Q73E',
              count: 'Q73',
              answerName : "5-6年前",
              answerType : 5,
              answerKey : "mammography_xray"
            },
            { 
              id : 'Q73F',
              count: 'Q73',
              answerName : "7年前或更早",
              answerType : 6,
              answerKey : "mammography_xray"
            },
            { 
              id : 'Q73G',
              count: 'Q73',
              answerName : "从来没有",
              answerType : 7,
              answerKey : "mammography_xray"
            },
            { 
              id : 'Q73H',
              count: 'Q73',
              answerName : "不清楚",
              answerType : 8,
              answerKey : "mammography_xray"
            }
          ]
        },
        {
          num : "Q74",
          title : "您经常自己检查您乳房是否有肿块吗？",
          classType : 2, //代表女性才能做
          answer : [
            { 
              id : 'Q74A',
              count: 'Q74',
              answerName : "每月",
              answerType : 1,
              answerKey : "breast_lumps"
            },
            { 
              id : 'Q74B',
              count: 'Q74',
              answerName : "几个月一次",
              answerType : 2,
              answerKey : "breast_lumps"
            },
            { 
              id : 'Q74C',
              count: 'Q74',
              answerName : "很少或从不",
              answerType : 3,
              answerKey : "breast_lumps"
            }
          ]
        },
        {
          num : "Q75",
          title : "您第一次来月经的年龄是？",
          classType : 2, //代表女性才能做
          id : 'first_menstrual_age',
          answerName : "first_menstrual_age",
          answerType : 'first_menstrual_age',
          answerKey : "first_menstrual_age",
          id : 'Q75',
          count: 'Q75',
        },
        {
          num : "Q76",
          title : "您是否有过性生活？",
          classType : 2, //代表女性才能做
          answer : [
            { 
              id : 'Q76A',
              count: 'Q76',
              answerName : "是",
              answerType : 1,
              answerKey : "female_sex_life"
            },
            { 
              id : 'Q76B',
              count: 'Q76',
              answerName : "否",
              answerType : 2,
              answerKey : "female_sex_life"
            }
          ]
        },
        {
          num : "Q77",
          title : "您是否生育过孩子？",
          classType : 2, //代表女性才能做
          answer : [
            { 
              id : 'Q77A',
              count: 'Q77',
              answerName : "是",
              answerType : 1,
              answerKey : "is_birth"
            },
            { 
              id : 'Q77B',
              count: 'Q77',
              answerName : "否",
              answerType : 2,
              answerKey : "is_birth"
            }
          ]
        },
        {
          num : "Q78",
          title : "您生育第1个孩子（或第一胎）的年龄是",
          classType : 2, //代表女性才能做
          id : 'first_birth_age',
          answerName : "",
          answerType : "",
          answerKey : "first_birth_age",
          id : 'Q78',
          count: 'Q78',
        },
        {
          num : "Q79",
          title : "您总共生育了",
          classType : 2, //代表女性才能做
          id : 'number_of_births',
          answerName : "",
          answerType : '',
          answerKey : "number_of_births",
          id : 'Q79',
          count: 'Q79',
        },
        {
          num : "Q80",
          title : "怀孕期间您是否患有以下疾病？",
          classType : 2, //代表女性才能做
          answer : [
            { 
              id : 'gestational_diab',
              answerName : "妊娠糖尿病",
              answerType : '',
              answerKey : "gestational_diab",
              count: 'gestational_diab' 
            },
            { 
              id : 'gestational_hbp',
              answerName : "妊娠高血压",
              answerType : '',
              answerKey : "gestational_hbp",
              count: 'gestational_hbp' 
            }
          ]
        },
        {
          num : "Q81",
          title : "您累积哺乳喂养孩子的时间是",
          classType : 2, //代表女性才能做
          id : 'times_of_breast_feeding',
          answerName : "",
          answerType : '',
          answerKey : "times_of_breast_feeding",
          id : 'Q81',
          count: 'Q81',
        },
        {
          num : "Q82",
          title : "您是否服用过避孕药？",
          classType : 2, //代表女性才能做
          answer : [
            { 
              id : 'Q82A',
              count: 'Q82',
              answerName : "正在使用",
              answerType : 1,
              answerKey : "birth_control_pills"
            },
            { 
              id : 'Q82B',
              count: 'Q82',
              answerName : "曾使用",
              answerType : 2,
              answerKey : "birth_control_pills"
            },
            { 
              id : 'Q82C',
              count: 'Q82',
              answerName : "从未使用",
              answerType : 3,
              answerKey : "birth_control_pills"
            }
          ]
        },
        {
          num : "Q83",
          title : "您是否已经绝经？",
          classType : 2, //代表女性才能做
          answer : [
            { 
              id : 'Q83A',
              count: 'Q83',
              answerName : "是",
              answerType : 1,
              answerKey : "is_menopause"
            },
            { 
              id : 'Q83B',
              count: 'Q83',
              answerName : "否",
              answerType : 2,
              answerKey : "is_menopause"
            }
          ]
        },
        {
          num : "Q84",
          title : "您绝经时的年龄是",
          classType : 2, //代表女性才能做
          answerName : "",
          answerType : '',
          answerKey : "menopause_age",
          id : 'Q84',
          count: 'Q84',
        },
        {
          num : "Q85",
          title : "您绝经后是否使用雌激素？",
          classType : 2, //代表女性才能做
          answer : [
            { 
              id : 'Q85A',
              answerName : "是",
              answerType : 1,
              answerKey : "estrogen_use",
              count: 'Q85',
            },
            { 
              id : 'Q85B',
              answerName : "否",
              answerType : 2,
              answerKey : "estrogen_use",
              count: 'Q85',
            }
          ]
        },
        {
          num : "Q86",
          title : "如果您使用了雌激素，使用了",
          classType : 2, //代表女性才能做
          id : 'Q86',
          count: 'Q86',
          answerName : "",
          answerType : '',
          answerKey : "times_of_estrogen_use"
        },
      ]
    }
  },
  components: {
      Heads,
      popup
  },
  mounted () {
    this.checkArrPush = this.checkArr;
    let userInfo =  JSON.parse(this.$cookie.get('userInfo'));
    let gender =  JSON.parse(this.$cookie.get('gender'));
    this.token = userInfo.token;
    this.userId = userInfo.userId;
    this.gender = gender;
    this.clientQuery();
  },
  methods : {
    // 填空题处理
    handlePicker0Confirm20 (v) {
      this.datas['smoke_start_age'] = v[0].value;
      this.Q20 = v[0].value;
    },
    handlePickerCompany36 (v) {
      this.datas['drink_how_old'] = v[0].value;
      this.Q36 = v[0].value;
    },
    handlePicker0Confirm21 (v) {
      this.datas['smoke_end_age'] = v[0].value;
      this.Q21 = v[0].value;
    },
    handlePicker0Confirm22 (v) {
      this.datas['smoke_end_age_suc'] = v[0].value;
      this.Q22 = v[0].value;
    },
    handlePicker0Confirm431 (v) {
      this.datas['h_activity_freq'] = v[0].value;
      this.Q431 = v[0].value;
    },
    handlePicker0Confirm432 (v) {
      this.datas['h_act_tim_length'] = v[0].value;
      this.Q432 = v[0].value;
    },
    handlePicker0Confirm433 (v) {
      this.datas['m_activity_freq'] = v[0].value;
      this.Q433 = v[0].value;
    },
    handlePicker0Confirm434 (v) {
      this.datas['m_act_tim_length'] = v[0].value;
      this.Q434 = v[0].value;
    },
    handlePicker0Confirm435 (v) {
      this.datas['walking_day'] = v[0].value;
      this.Q435 = v[0].value;
    },
    handlePicker0Confirm436 (v) {
      this.datas['walking_minutes'] = v[0].value;
      this.Q436 = v[0].value;
    },
    handlePicker0Confirm437 (v) {
      this.datas['sedentary_hours'] = v[0].value;
      this.Q437 = v[0].value;
    },
    handlePicker0Confirm438 (v) {
      this.datas['sedentary_minutes'] = v[0].value;
      this.Q438 = v[0].value;
    },
    handlePicker0Confirm45 (v) {
      this.datas['sleep_time'] = v[0].value;
      this.Q45 = v[0].value;
    },
    handlePicker0Confirm7010 (v) {
      this.datas['ygbmky_hbsag'] = v[0].index;
      this.Q7010 = v[0].value;
    },
    handlePicker0Confirm7012 (v) {
      this.datas['bxgykt_hcv'] = v[0].index;
      this.Q7012 = v[0].value;
    },
    handlePicker0Confirm7013 (v) {
      this.datas['ndb_pro'] = v[0].index;
      this.Q7013 = v[0].value;
    },
    handlePicker0Confirm7014 (v) {
      this.datas['fobt_ob'] = v[0].index;
      this.Q7014 = v[0].value;
    },
    handlePickerCompany70 (v) {
      let int = v[0].index+1;
      if (this.Q701 != '') {
        if(v[0].value == 'mmol/L'){ 
          this.datas['cholesterol'] = this.Q701;
          this.datas['cholesterol_unit'] = int;
        }else {
          this.datas['cholesterol'] = this.Q701;
          this.datas['cholesterol_unit'] = int;
        }
      }
      this.company70 = v[0].value;
    },
    handlePickerCompany71 (v) {
      let int = v[0].index+1;
      if (this.Q702 != '') {
        if(v[0].value == 'mmol/L'){ 
          this.datas['hdlc'] = this.Q702;
          this.datas['hdlc_unit'] = int;
        }else {
          this.datas['hdlc'] = this.Q702;
          this.datas['hdlc_unit'] = int;
        }
      }
      this.company71 = v[0].value;
    },
    handlePickerCompany72 (v) {
      let int = v[0].index+1;
      if (this.Q703 != '') {
        if(v[0].value == 'mmol/L'){ 
          this.datas['triglycerin'] = this.Q703;
          this.datas['triglycerin_unit'] = int;
        }else {
          this.datas['triglycerin'] = this.Q703
          this.datas['triglycerin_unit'] = int;
        }
      }
      this.company72 = v[0].value;
    },
    handlePickerCompany73 (v) {
      let int = v[0].index+1;
      if (this.Q704 != '') {
        if(v[0].value == 'mmol/L'){ 
          this.datas['ldlc'] = this.Q704;
          this.datas['ldlc_unit'] = int;
        }else {
          this.datas['ldlc'] = this.Q704
          this.datas['ldlc_unit'] = int;
        }
      }
      this.company73 = v[0].value;
    },
    handlePickerCompany74 (v) {
      let int = v[0].index+1;
      if (this.Q705 != '') {
        if(v[0].value == 'mmol/L'){ 
          this.datas['fasting_bg'] = this.Q705;
          this.datas['fasting_bg_unit'] = int;
        }else {
          this.datas['fasting_bg'] = this.Q705
          this.datas['fasting_bg_unit'] = int;
        }
      }
      this.company74 = v[0].value;
    },
    handlePickerCompany75 (v) {
      let int = v[0].index+1;
      if (this.Q706 != '') {
        if(v[0].value == 'mmol/L'){ 
          this.datas['ogtt'] = this.Q706;
          this.datas['ogtt_unit'] = int;
        }else {
          this.datas['ogtt'] = this.Q706
          this.datas['ogtt_unit'] = int;
        }
      }
      this.company75 = v[0].value;
    },


    handlePickerCompany75t (v) {
      this.datas['first_menstrual_age'] = v[0].value;
      this.Q75 = v[0].value;
    },
    handlePickerCompany78t (v) {
      this.datas['first_birth_age'] = v[0].value;
      this.Q78 = v[0].value;
    },
    handlePickerCompany79t (v) {
      this.datas['number_of_births'] = v[0].value;
      this.Q79 = v[0].value;
    },
    handlePickerCompany81t (v) {
      let val = v[0].value+'.'+v[1].value;
      this.datas['times_of_breast_feeding'] = val;
      this.Q81 = val;
    },
    handlePickerCompany84t (v) {
      this.datas['menopause_age'] = v[0].value;
      this.Q84 = v[0].value;
    },
    handlePickerCompany86t (v) {
      this.datas['times_of_estrogen_use'] = v[0].value;
      this.Q86 = v[0].value;
    },
    // 获取暂存数据
    clientQuery () {
      let token = this.token;
      var param = JSON.stringify({
        'userId':this.userId,
        'type':'clientQuery'
      });
      this.$http.post('/webserviceProxy/webservice/wtWebApiH/GetServerData',{
        token:token, 
        infoType:300014, 
        jsonValue:param
      },{emulateJSON:true})
      .then(response =>{
          this.isvisibel(response.body);
      })
    },

    //渲染答题卡
    isvisibel (data) {
      let allInputs = document.getElementsByTagName('input');
      this.datas['maritalCode'] =  data.maritalCode;
      this.datas['edBackgroundCode'] =  data.edBackgroundCode;
      this.datas['occupationCode'] =  data.occupationCode;
      this.Q1 = data.maritalCode;
      this.Q2 = data.edBackgroundCode;
      this.Q3 = data.occupationCode;
      // 单选题
      let _this = this;
      for(let i = 0;i < data.infoList.length;i ++){
        //接口key值
        let _key = data.infoList[i].id.dicFieldName;
        //接口value值
        let _value = data.infoList[i].id.valueNumber;
        let _node = document.getElementsByName(_key);
        if(_node.length > 0){
          for(let j = 0;j < _node.length;j ++){
            let defaultValue = Number(_node[j].defaultValue);
            if(defaultValue == _value){
              let _num = _node[j].getAttribute("count");
              _this[_num] = _value;

            }
          }
        }
      }
      // 70题单选题单位选择
      for(let i = 0;i < data.infoList.length;i ++){
        //接口key值
        let _key = data.infoList[i].id.dicFieldName;
        if( _key == 'cholesterol_unit' ){
          this.company70 = data.infoList[i].id.valueNumber;
        }else if ( _key == 'hdlc_unit' ){
          this.company71 = data.infoList[i].id.valueNumber;
        }else if ( _key == 'triglycerin_unit' ){
          this.company72 = data.infoList[i].id.valueNumber;
        }else if ( _key == 'ldlc_unit' ){
          this.company73 = data.infoList[i].id.valueNumber;
        }else if ( _key == 'fasting_bg_unit' ){
          this.company74 = data.infoList[i].id.valueNumber;
        }else if ( _key == 'ogtt_unit' ){
          this.company75 = data.infoList[i].id.valueNumber;
        }
      }

      // 多选题
      for(let i = 0;i < data.infoList.length;i ++){
        //接口key值
        let _key = data.infoList[i].id.dicFieldName;
        //接口value值
        let _value = data.infoList[i].id.dicFieldName;
        let _node = document.getElementsByName(_key);
        if(_node.length > 0){
          for(let j = 0;j < _node.length;j ++){
            let defaultValue = _node[j].defaultValue;
            if(defaultValue == _value){
              _this['checkArr'].push(_value);
              if(_value != 'diab_1' && _value != 'diab_2'){
                _this['checkTitleArr'].push(_value+"s");
              }     
            }
          }
        }
      }

      // 37题处理
      for(let i = 0;i < data.infoList.length;i ++){
        //接口key值
        let _key = data.infoList[i].id.dicFieldName;
        //接口value值
        let _value = data.infoList[i].id.dicFieldName;
        let _node = document.getElementsByName(_key);
        if(_node.length > 0){
          for(let j = 0;j < _node.length;j ++){
            let defaultValue = _node[j].defaultValue;
            if(defaultValue == _value){
              let _num = _node[j].getAttribute("title");
              _this[_num] = _value;
            }
          }
        }
      }

      // 填空题
      for(let i = 0;i < data.infoList.length;i ++){
        //接口key值
        let _key = data.infoList[i].id.dicFieldName; 
        //接口value值
        let _value = data.infoList[i].id.dicFieldName;
        let _node = document.getElementsByName(_key);
        if(_node.length > 0){
          for(let j = 0;j < _node.length;j ++){
            let name = _node[j].getAttribute('data');    
            if(name == _value){
              let _num = _node[j].getAttribute("count");
              if(_num == 'Q7010'){
                if(data.infoList[i].id.valueNumber == 0){
                  _this[_num] = '阳性';
                }else {
                  _this[_num] = "阴性";
                } 
              }else if(_num == 'Q7012'){
                if(data.infoList[i].id.valueNumber == 0){
                  _this[_num] = '阳性';
                }else {
                  _this[_num] = "阴性";
                } 
              }else if(_num == 'Q7013'){
                if(data.infoList[i].id.valueNumber == 0){
                  _this[_num] = '阳性';
                }else {
                  _this[_num] = "阴性";
                } 
              }else if(_num == 'Q7014'){
                if(data.infoList[i].id.valueNumber == 0){
                  _this[_num] = '阳性';
                }else {
                  _this[_num] = "阴性";
                } 
              }else {
                 _this[_num] = data.infoList[i].id.valueNumber;
              }
              
            }
          }
        }
      }

      // 储存暂存数据用来提交
      for (let i = 0; i < data.infoList.length; i++) {
          this.datas[data.infoList[i].id.dicFieldName] = data.infoList[i].id.valueNumber;      
      }

    },

    backBtn: function(){
      this.$router.go(-1);
    },
    // 提交问卷
    clientSubmit () {
        /*let controls = document.getElementsByTagName('input');
        for(let i=0; i< controls.length; i++){
          if(controls[i].type == 'radio'){
            let defaultValue = controls[i].defaultValue;
            if(defaultValue != ''){
              let count = controls[i].getAttribute("count");
              let height = this.$refs.Q45.offsetTop;
              document.documentElement.scrollTop = height-42;
              document.body.scrollTop = height-42;
            }
          }
        }*/
        /* 判断9 10题 */
        for(let i = 0; i < this.checkArr.length; i++){
            if('chd_f' === this.checkArr[i]){
                if( this.Q9 == '' ){
                  let height = this.$refs.Q9.offsetTop;
                  document.documentElement.scrollTop = height-42;
                  document.body.scrollTop = height-42;
                  return;
                }
            }
            if('chd_m' === this.checkArr[i]){
                if( this.Q10 == '' ){
                  let height = this.$refs.Q10.offsetTop;
                  document.documentElement.scrollTop = height-42;
                  document.body.scrollTop = height-42;
                  return;
                }
            }
        }
        if( this.Q1 == '' ){
          let height = this.$refs.Q1.offsetTop;
          document.documentElement.scrollTop = height-42;
          document.body.scrollTop = height-42;
          return;
        }
        if( this.Q2 == '' ){
          let height = this.$refs.Q2.offsetTop;
          document.documentElement.scrollTop = height-42;
          document.body.scrollTop = height-42;
          return;
        }
        if( this.Q3 == '' ){
          let height = this.$refs.Q3.offsetTop;
          document.documentElement.scrollTop = height-42;
          document.body.scrollTop = height-42;
          return;
        }
        if( this.Q5 == '' ){
          let height = this.$refs.Q5.offsetTop;
          document.documentElement.scrollTop = height-42;
          document.body.scrollTop = height-42;
          return;
        }
        if( this.Q6 == '' ){
          let height = this.$refs.Q6.offsetTop;
          document.documentElement.scrollTop = height-42;
          document.body.scrollTop = height-42;
          return;
        }
        if( this.Q11 == '' ){
          let height = this.$refs.Q11.offsetTop;
          document.documentElement.scrollTop = height-42;
          document.body.scrollTop = height-42;
          return;
        }
        if( this.Q11 == 1 ){
          if( this.Q12 == '' ){
            let height = this.$refs.Q12.offsetTop;
            document.documentElement.scrollTop = height-42;
            document.body.scrollTop = height-42;
            return;
          }
          if( this.Q13 == '' ){
            let height = this.$refs.Q13.offsetTop;
            document.documentElement.scrollTop = height-42;
            document.body.scrollTop = height-42;
            return;
          }
          if( this.Q14 == '' ){
            let height = this.$refs.Q14.offsetTop;
            document.documentElement.scrollTop = height-42;
            document.body.scrollTop = height-42;
            return;
          }
          if( this.Q15 == '' ){
            let height = this.$refs.Q15.offsetTop;
            document.documentElement.scrollTop = height-42;
            document.body.scrollTop = height-42;
            return;
          }
          if( this.Q16 == '' ){
            let height = this.$refs.Q16.offsetTop;
            document.documentElement.scrollTop = height-42;
            document.body.scrollTop = height-42;
            return;
          }
          if( this.Q17 == '' ){
            let height = this.$refs.Q17.offsetTop;
            document.documentElement.scrollTop = height-42;
            document.body.scrollTop = height-42;
            return;
          }
          if( this.Q18 == '' ){
            let height = this.$refs.Q18.offsetTop;
            document.documentElement.scrollTop = height-42;
            document.body.scrollTop = height-42;
            return;
          }
          if( this.Q19 == '' ){
            let height = this.$refs.Q19.offsetTop;
            document.documentElement.scrollTop = height-42;
            document.body.scrollTop = height-42;
            return;
          }
          if( this.Q20 == '' ){
            let height = this.$refs.Q20.offsetTop;
            document.documentElement.scrollTop = height-42;
            document.body.scrollTop = height-42;
            return;
          }
        }
        if( this.Q11 == 2 ){
          if( this.Q21 == '' ){
            let height = this.$refs.Q21.offsetTop;
            document.documentElement.scrollTop = height-42;
            document.body.scrollTop = height-42;
            return;
          }
          if( this.Q22 == '' ){
            let height = this.$refs.Q22.offsetTop;
            document.documentElement.scrollTop = height-42;
            document.body.scrollTop = height-42;
            return;
          }
          if( this.Q23 == '' ){
            let height = this.$refs.Q23.offsetTop;
            document.documentElement.scrollTop = height-42;
            document.body.scrollTop = height-42;
            return;
          }
        }
        if( this.Q11 == 3 ){
          if( this.Q24 == '' ){
            let height = this.$refs.Q24.offsetTop;
            document.documentElement.scrollTop = height-42;
            document.body.scrollTop = height-42;
            return;
          }
        }
        if( this.Q24 == 1 ){
          if( this.Q25 == '' ){
            let height = this.$refs.Q25.offsetTop;
            document.documentElement.scrollTop = height-42;
            document.body.scrollTop = height-42;
            return;
          }
        }
        if( this.Q26 == '' ){
          let height = this.$refs.Q26.offsetTop;
          document.documentElement.scrollTop = height-42;
          document.body.scrollTop = height-42;
          return;
        }
        if( this.Q27A == '' ){
          let height = this.$refs.Q27A.offsetTop;
          document.documentElement.scrollTop = height-42;
          document.body.scrollTop = height-42;
          return;
        }
        if( this.Q27B == '' ){
          let height = this.$refs.Q27B.offsetTop;
          document.documentElement.scrollTop = height-42;
          document.body.scrollTop = height-42;
          return;
        }
        if( this.Q27C == '' ){
          let height = this.$refs.Q27C.offsetTop;
          document.documentElement.scrollTop = height-42;
          document.body.scrollTop = height-42;
          return;
        }
        if( this.Q27D == '' ){
          let height = this.$refs.Q27D.offsetTop;
          document.documentElement.scrollTop = height-42;
          document.body.scrollTop = height-42;
          return;
        }
        if( this.Q27E == '' ){
          let height = this.$refs.Q27E.offsetTop;
          document.documentElement.scrollTop = height-42;
          document.body.scrollTop = height-42;
          return;
        }
        if( this.Q27F == '' ){
          let height = this.$refs.Q27F.offsetTop;
          document.documentElement.scrollTop = height-42;
          document.body.scrollTop = height-42;
          return;
        }
        if( this.Q27G == '' ){
          let height = this.$refs.Q27G.offsetTop;
          document.documentElement.scrollTop = height-42;
          document.body.scrollTop = height-42;
          return;
        }
        if( this.Q27H == '' ){
          let height = this.$refs.Q27H.offsetTop;
          document.documentElement.scrollTop = height-42;
          document.body.scrollTop = height-42;
          return;
        }
        if( this.Q27I == '' ){
          let height = this.$refs.Q27I.offsetTop;
          document.documentElement.scrollTop = height-42;
          document.body.scrollTop = height-42;
          return;
        }
        if( this.Q27J == '' ){
          let height = this.$refs.Q27J.offsetTop;
          document.documentElement.scrollTop = height-42;
          document.body.scrollTop = height-42;
          return;
        }
        if( this.Q27K == '' ){
          let height = this.$refs.Q27K.offsetTop;
          document.documentElement.scrollTop = height-42;
          document.body.scrollTop = height-42;
          return;
        }
        if( this.Q28 == '' ){
          let height = this.$refs.Q28.offsetTop;
          document.documentElement.scrollTop = height-42;
          document.body.scrollTop = height-42;
          return;
        }
        if( this.Q30 == '' ){
          let height = this.$refs.Q30.offsetTop;
          document.documentElement.scrollTop = height-42;
          document.body.scrollTop = height-42;
          return;
        }
        if( this.Q31 == '' ){
          let height = this.$refs.Q31.offsetTop;
          document.documentElement.scrollTop = height-42;
          document.body.scrollTop = height-42;
          return;
        }
        if( this.Q32 == '' ){
          let height = this.$refs.Q32.offsetTop;
          document.documentElement.scrollTop = height-42;
          document.body.scrollTop = height-42;
          return;
        }
        if( this.Q33 == '' ){
          let height = this.$refs.Q33.offsetTop;
          document.documentElement.scrollTop = height-42;
          document.body.scrollTop = height-42;
          return;
        }
        if( this.Q33 == 2 ){
          if( this.Q34 == '' ){
            let height = this.$refs.Q34.offsetTop;
            document.documentElement.scrollTop = height-42;
            document.body.scrollTop = height-42;
            return;
          }
          if( this.Q35 == '' ){
            let height = this.$refs.Q35.offsetTop;
            document.documentElement.scrollTop = height-42;
            document.body.scrollTop = height-42;
            return;
          }
          if( this.Q36 == '' ){
            let height = this.$refs.Q36.offsetTop;
            document.documentElement.scrollTop = height-42;
            document.body.scrollTop = height-42;
            return;
          }
          if( this.Q371A == '' && this.Q371B == '' && this.Q371C == '' && this.Q371D == '' && this.Q371E == ''){
            let height = this.$refs.Q371.offsetTop;
            document.documentElement.scrollTop = height-42;
            document.body.scrollTop = height-42;
            return;
          }
          if( this.Q372A == '' && this.Q372B == '' && this.Q372C == '' && this.Q372D == '' && this.Q372E == '' ){
            let height = this.$refs.Q372.offsetTop;
            document.documentElement.scrollTop = height-42;
            document.body.scrollTop = height-42;
            return;
          }
          if( this.Q373A == '' && this.Q373B == '' && this.Q373C == '' && this.Q373D == '' && this.Q373E == '' ){
            let height = this.$refs.Q373.offsetTop;
            document.documentElement.scrollTop = height-42;
            document.body.scrollTop = height-42;
            return;
          }
          if( this.Q38 == '' ){
            let height = this.$refs.Q38.offsetTop;
            document.documentElement.scrollTop = height-42;
            document.body.scrollTop = height-42;
            return;
          }
          if( this.Q39 == '' ){
            let height = this.$refs.Q39.offsetTop;
            document.documentElement.scrollTop = height-42;
            document.body.scrollTop = height-42;
            return;
          }
        }
        if( this.Q431 == '' || this.Q432 == ''){
          let height = this.$refs.Q43.offsetTop;
          document.documentElement.scrollTop = height-42;
          document.body.scrollTop = height-42;
          return;
        }
        if( this.Q433 == '' || this.Q434 == ''){
          let height = this.$refs.Q432.offsetTop;
          document.documentElement.scrollTop = height-42;
          document.body.scrollTop = height-42;
          return;
        }
        if( this.Q435 == '' || this.Q436 == ''){
          let height = this.$refs.Q433.offsetTop;
          document.documentElement.scrollTop = height-42;
          document.body.scrollTop = height-42;
          return;
        }
        if( this.Q437 == '' || this.Q438 == ''){
          let height = this.$refs.Q434.offsetTop;
          document.documentElement.scrollTop = height-42;
          document.body.scrollTop = height-42;
          return;
        }
        if( this.Q44 == '' ){
          let height = this.$refs.Q44.offsetTop;
          document.documentElement.scrollTop = height-42;
          document.body.scrollTop = height-42;
          return;
        }
        if( this.Q45 == '' ){
          let height = this.$refs.Q45.offsetTop;
          document.documentElement.scrollTop = height-42;
          document.body.scrollTop = height-42;
          return;
        }
        if( this.Q46 == '' ){
          let height = this.$refs.Q46.offsetTop;
          document.documentElement.scrollTop = height-42;
          document.body.scrollTop = height-42;
          return;
        }
        if( this.Q47 == '' ){
          let height = this.$refs.Q47.offsetTop;
          document.documentElement.scrollTop = height-42;
          document.body.scrollTop = height-42;
          return;
        }
        /* - - - -- - - - - */
        if( this.Q48 == '' ){
          let height = this.$refs.Q48.offsetTop;
          document.documentElement.scrollTop = height-42;
          document.body.scrollTop = height-42;
          return;
        }
        if( this.Q49 == '' ){
          let height = this.$refs.Q49.offsetTop;
          document.documentElement.scrollTop = height-42;
          document.body.scrollTop = height-42;
          return;
        }
        if( this.Q50 == '' ){
          let height = this.$refs.Q50.offsetTop;
          document.documentElement.scrollTop = height-42;
          document.body.scrollTop = height-42;
          return;
        }
        if( this.Q51 == '' ){
          let height = this.$refs.Q51.offsetTop;
          document.documentElement.scrollTop = height-42;
          document.body.scrollTop = height-42;
          return;
        }
        if( this.Q52 == '' ){
          let height = this.$refs.Q52.offsetTop;
          document.documentElement.scrollTop = height-42;
          document.body.scrollTop = height-42;
          return;
        }
        if( this.Q53 == '' ){
          let height = this.$refs.Q53.offsetTop;
          document.documentElement.scrollTop = height-42;
          document.body.scrollTop = height-42;
          return;
        }
        if( this.Q54 == '' ){
          let height = this.$refs.Q54.offsetTop;
          document.documentElement.scrollTop = height-42;
          document.body.scrollTop = height-42;
          return;
        }
        if( this.Q55 == '' ){
          let height = this.$refs.Q55.offsetTop;
          document.documentElement.scrollTop = height-42;
          document.body.scrollTop = height-42;
          return;
        }
        if( this.Q56 == '' ){
          let height = this.$refs.Q56.offsetTop;
          document.documentElement.scrollTop = height-42;
          document.body.scrollTop = height-42;
          return;
        }
        if( this.Q57 == '' ){
          let height = this.$refs.Q57.offsetTop;
          document.documentElement.scrollTop = height-42;
          document.body.scrollTop = height-42;
          return;
        }
        if( this.Q58 == '' ){
          let height = this.$refs.Q58.offsetTop;
          document.documentElement.scrollTop = height-42;
          document.body.scrollTop = height-42;
          return;
        }
        if( this.Q59 == '' ){
          let height = this.$refs.Q59.offsetTop;
          document.documentElement.scrollTop = height-42;
          document.body.scrollTop = height-42;
          return;
        }
        if( this.Q60 == '' ){
          let height = this.$refs.Q60.offsetTop;
          document.documentElement.scrollTop = height-42;
          document.body.scrollTop = height-42;
          return;
        }
        if( this.Q61 == '' ){
          let height = this.$refs.Q61.offsetTop;
          document.documentElement.scrollTop = height-42;
          document.body.scrollTop = height-42;
          return;
        }
        if( this.Q62 == '' ){
          let height = this.$refs.Q62.offsetTop;
          document.documentElement.scrollTop = height-42;
          document.body.scrollTop = height-42;
          return;
        }
        if( this.Q63 == '' ){
          let height = this.$refs.Q63.offsetTop;
          document.documentElement.scrollTop = height-42;
          document.body.scrollTop = height-42;
          return;
        }
        if( this.Q64 == '' ){
          let height = this.$refs.Q64.offsetTop;
          document.documentElement.scrollTop = height-42;
          document.body.scrollTop = height-42;
          return;
        }
        if( this.Q65 == '' ){
          let height = this.$refs.Q65.offsetTop;
          document.documentElement.scrollTop = height-42;
          document.body.scrollTop = height-42;
         return;
        }
        if( this.Q67A == '' || this.Q67B == '' || this.Q67C == '' || this.Q67D == '' || this.Q67E == '' || this.Q67F == '' ){
          let height = this.$refs.Q67.offsetTop;
          document.documentElement.scrollTop = height-42;
          document.body.scrollTop = height-42;
          return;
        }
        if( this.Q68A == '' ){
          let height = this.$refs.Q68.offsetTop;
          document.documentElement.scrollTop = height-42;
          document.body.scrollTop = height-42;
          return;
        }
        if( this.Q68B == '' ){
          let height = this.$refs.Q68B.offsetTop;
          document.documentElement.scrollTop = height-42;
          document.body.scrollTop = height-42;
          return;
        }
        if( this.Q68C == '' ){
          let height = this.$refs.Q68C.offsetTop;
          document.documentElement.scrollTop = height-42;
          document.body.scrollTop = height-42;
          return;
        }
        if( this.Q68D == '' ){
          let height = this.$refs.Q68D.offsetTop;
          document.documentElement.scrollTop = height-42;
          document.body.scrollTop = height-42;
          return;
        }
        if( this.Q69E == '' ){
          let height = this.$refs.Q69E.offsetTop;
          document.documentElement.scrollTop = height-42;
          document.body.scrollTop = height-42;
          return;
        }
        if( this.Q69F == '' ){
          let height = this.$refs.Q69F.offsetTop;
          document.documentElement.scrollTop = height-42;
          document.body.scrollTop = height-42;
          return;
        }
        if( this.Q69G == '' ){
          let height = this.$refs.Q69G.offsetTop;
          document.documentElement.scrollTop = height-42;
          document.body.scrollTop = height-42;
          return;
        }
        if( this.Q69H == '' ){
          let height = this.$refs.Q69H.offsetTop;
          document.documentElement.scrollTop = height-42;
          document.body.scrollTop = height-42;
          return;
        }
        if( this.Q701 == '' &&  this.Q702 == '' &&  this.Q703 == '' &&  this.Q704 == '' &&  this.Q705 == '' && this.Q7020== ''){
          let height = this.$refs.Q70.offsetTop;
          document.documentElement.scrollTop = height-42;
          document.body.scrollTop = height-42;
          return;
        }
        if( this.Q71 == '' ){
          let height = this.$refs.Q71.offsetTop;
          document.documentElement.scrollTop = height-42;
          document.body.scrollTop = height-42;
          return;
        }
        if( this.Q72 == '' ){
          let height = this.$refs.Q72.offsetTop;
          document.documentElement.scrollTop = height-42;
          document.body.scrollTop = height-42;
          return;
        }
        if(this.gender == 2 ){
          if( this.Q73 == '' ){
            let height = this.$refs.Q73.offsetTop;
            document.documentElement.scrollTop = height-42;
            document.body.scrollTop = height-42;
            return;
          }
          if( this.Q74 == '' ){
            let height = this.$refs.Q74.offsetTop;
            document.documentElement.scrollTop = height-42;
            document.body.scrollTop = height-42;
            return;
          }
          if( this.Q75 == '' ){
            let height = this.$refs.Q75.offsetTop;
            document.documentElement.scrollTop = height-42;
            document.body.scrollTop = height-42;
            return;
          }
          if( this.Q76 == '' ){
            let height = this.$refs.Q76.offsetTop;
            document.documentElement.scrollTop = height-42;
            document.body.scrollTop = height-42;
            return;
          }
          if( this.Q77 == '' ){
            let height = this.$refs.Q77.offsetTop;
            document.documentElement.scrollTop = height-42;
            document.body.scrollTop = height-42;
            return;
          }
          if( this.Q77 == 1 ){
            if( this.Q78 == '' ){
              let height = this.$refs.Q78.offsetTop;
              document.documentElement.scrollTop = height-42;
              document.body.scrollTop = height-42;
              return;
            }
            if( this.Q79 == '' ){
              let height = this.$refs.Q79.offsetTop;
              document.documentElement.scrollTop = height-42;
              document.body.scrollTop = height-42;
              return;
            }
            if( this.Q81 == '' ){
              let height = this.$refs.Q81.offsetTop;
              document.documentElement.scrollTop = height-42;
              document.body.scrollTop = height-42;
              return;
            }
          }   
          if( this.Q82 == '' ){
            let height = this.$refs.Q82.offsetTop;
            document.documentElement.scrollTop = height-42;
            document.body.scrollTop = height-42;
            return;
          }
          if( this.Q83 == '' ){
            let height = this.$refs.Q83.offsetTop;
            document.documentElement.scrollTop = height-42;
            document.body.scrollTop = height-42;
            return;
          }
          if( this.Q83 == 1 ){
            if( this.Q84 == '' ){
              let height = this.$refs.Q84.offsetTop;
              document.documentElement.scrollTop = height-42;
              document.body.scrollTop = height-42;
              return;
            }
            if( this.Q85 == '' ){
              let height = this.$refs.Q85.offsetTop;
              document.documentElement.scrollTop = height-42;
              document.body.scrollTop = height-42;
              return;
            }
            if( this.Q85 == 1 ){
              if( this.Q86 == '' ){
                let height = this.$refs.Q86.offsetTop;
                document.documentElement.scrollTop = height-42;
                document.body.scrollTop = height-42;
                return;
              }
            }    
          }
        }

        let token = this.token;
        let parameter = {
          'type':"clientSubmit",
          'userId':this.userId
        }
        if ( this.Q371A != '' ) {
          this.datas['drink_beer_normal'] = this.Q371A;
          this.datas['drink_rice_normal'] = '-1029';
          this.datas['drink_grape_normal'] = '-1029';
          this.datas['drink_wbig_normal'] = '-1029';
          this.datas['drink_wsmall_normal'] = '-1029';
        }else if( this.Q371B != '' ){
          this.datas['drink_rice_normal'] = this.Q371B;
          this.datas['drink_beer_normal'] = '-1029';
          this.datas['drink_grape_normal'] = '-1029';
          this.datas['drink_wbig_normal'] = '-1029';
          this.datas['drink_wsmall_normal'] = '-1029';
        }else if( this.Q371C != '' ){
          this.datas['drink_grape_normal'] = this.Q371C;
          this.datas['drink_beer_normal'] = '-1029';
          this.datas['drink_rice_normal'] = '-1029';
          this.datas['drink_wbig_normal'] = '-1029';
          this.datas['drink_wsmall_normal'] = '';
        }else if( this.Q371D != '' ){
          this.datas['drink_wbig_normal'] = this.Q371D;
          this.datas['drink_beer_normal'] = '-1029';
          this.datas['drink_rice_normal'] = '-1029';
          this.datas['drink_grape_normal'] = '-1029';
          this.datas['drink_wsmall_normal'] = '-1029';
        }else if( this.Q371E != '' ){
          this.datas['drink_wsmall_normal'] = this.Q371E;
          this.datas['drink_beer_normal'] = '-1029';
          this.datas['drink_rice_normal'] = '-1029';
          this.datas['drink_grape_normal'] = '-1029';
          this.datas['drink_wbig_normal'] = '-1029';
        }
        let data = Object.assign(parameter,this.datas);
        let test = JSON.stringify(data);
        this.$http.post('/webserviceProxy/webservice/wtWebApiH/GetServerData',{
          token:token, 
          infoType:300012, 
          jsonValue:test
        },{emulateJSON:true})
        .then(response =>{
          if(response.body.state == 'suc'){
            this.isSuccess = true;
            this.isSuccess = true;
            setTimeout(() => {
              this.isSuccess = false;
              this.$router.go(-1);
            },2000);
          }else {
            this.isSuccess = false;
            this.isSuccess = true;
            setTimeout(() => {
              this.isSuccess = false;
            },2000)
          }
          
        })
    },
    // 暂存问卷
    clientUpdate () {
        let token = this.token;
        let parameter = {
          'type':"clientUpdate",
          'userId':this.userId
        }
        // 处理37-1题，单选填空题
        if ( this.Q371A != '' ) {
          this.datas['drink_beer_normal'] = this.Q371A;
          this.datas['drink_rice_normal'] = '-1029';
          this.datas['drink_grape_normal'] = '-1029';
          this.datas['drink_wbig_normal'] = '-1029';
          this.datas['drink_wsmall_normal'] = '-1029';
        }else if( this.Q371B != '' ){
          this.datas['drink_rice_normal'] = this.Q371B;
          this.datas['drink_beer_normal'] = '-1029';
          this.datas['drink_grape_normal'] = '-1029';
          this.datas['drink_wbig_normal'] = '-1029';
          this.datas['drink_wsmall_normal'] = '-1029';
        }else if( this.Q371C != '' ){
          this.datas['drink_grape_normal'] = this.Q371C;
          this.datas['drink_beer_normal'] = '-1029';
          this.datas['drink_rice_normal'] = '-1029';
          this.datas['drink_wbig_normal'] = '-1029';
          this.datas['drink_wsmall_normal'] = '';
        }else if( this.Q371D != '' ){
          this.datas['drink_wbig_normal'] = this.Q371D;
          this.datas['drink_beer_normal'] = '-1029';
          this.datas['drink_rice_normal'] = '-1029';
          this.datas['drink_grape_normal'] = '-1029';
          this.datas['drink_wsmall_normal'] = '-1029';
        }else if( this.Q371E != '' ){
          this.datas['drink_wsmall_normal'] = this.Q371E;
          this.datas['drink_beer_normal'] = '-1029';
          this.datas['drink_rice_normal'] = '-1029';
          this.datas['drink_grape_normal'] = '-1029';
          this.datas['drink_wbig_normal'] = '-1029';
        }
        let data = Object.assign(parameter,this.datas);
        let test = JSON.stringify(data);
        this.$http.post('/webserviceProxy/webservice/wtWebApiH/GetServerData',{
          token:token, 
          infoType:300012, 
          jsonValue:test
        },{emulateJSON:true})
        .then(response =>{
          if(response.body.state == 'suc'){
            this.isSuccess = true;
            this.isShow = true;
            setTimeout(() => {
              this.isShow = false;
              this.$router.go(-1);
            },2000);
          }else {
            this.isSuccess = false;
            this.isShow = true;
            setTimeout(() => {
              this.isShow = false;
            },2000)
          }
        })  
    },
    isInArray(arr,value){
        for(let i = 0; i < arr.length; i++){
            if(value === arr[i]){
                return true;
            }
        }
        return false;
    },
    isInArrayTitle(arr,value){
        for(let i = 0; i < arr.length; i++){
            
            if(value === arr[i].split('_')[0]+'s'){
                return true;
            }
        }
        return false;
    },
    pickeCompany70 (){
      this.$refs.pickeCompanys70.show();
    },
    pickeCompany71 (){
      this.$refs.pickeCompanys71.show();
    },
    pickeCompany72 (){
      this.$refs.pickeCompanys72.show();
    },
    pickeCompany73 (){
      this.$refs.pickeCompanys73.show();
    },
    pickeCompany74 (){
      this.$refs.pickeCompanys74.show();
    },
    pickeCompany75 (){
      this.$refs.pickeCompanys75.show();
    },
    getDataQ1 (answerType,answerKey) {
      this.datas[answerKey] = answerType;
      var height = this.$refs.Q2.offsetTop;
      document.documentElement.scrollTop = height-42;
      document.body.scrollTop = height-42;
    },
    getDataQ2 (answerType,answerKey) {
      this.datas[answerKey] = answerType;
      var height = this.$refs.Q3.offsetTop;
      document.documentElement.scrollTop = height-42;
      document.body.scrollTop = height-42;
    },
    getDataQ3 (answerType,answerKey) {
      this.datas[answerKey] = answerType;
      var height = this.$refs.Q4.offsetTop;
      document.documentElement.scrollTop = height-42;
      document.body.scrollTop = height-42;
    },
    getDataQ4 (answerType,answerKey) { 
      console.log(answerKey)
      if( this.checkArr.indexOf(answerKey) == -1 ){
        this.datas[answerKey] = 1;
      }else {
        if(this.checkArrPush.indexOf(answerKey) != -1){
          this.datas[answerKey] = '-1029';
        }
      }
    },
    getDataQ5 (answerType,answerKey) {
      this.datas[answerKey] = answerType;
      var height = this.$refs.Q6.offsetTop;
     document.documentElement.scrollTop = height-42;
      document.body.scrollTop = height-42;
    },
    getDataQ6 (answerType,answerKey) {
      this.datas[answerKey] = answerType;
      var height = this.$refs.Q7.offsetTop;
      document.documentElement.scrollTop = height-42;
      document.body.scrollTop = height-42;
    },
    getDataQ7 (answerType,answerKey) {
      if( this.checkArr.indexOf(answerKey) == -1 ){
        this.datas[answerKey] = 1;
      }else {
        if(this.checkArrPush.indexOf(answerKey) != -1){
          this.datas[answerKey] = '-1029';
        }
      }
    },
    getDataQ8 (answerType,answerKey) {
      if( this.checkArr.indexOf(answerKey) == -1 ){
        this.datas[answerKey] = 1;
      }else {
        if(this.checkArrPush.indexOf(answerKey) != -1){
          this.datas[answerKey] = '-1029';
        }
      }
    },
    getDataQ9 (answerType,answerKey) {
      if(this.isInArray(this.checkArr,'chd_m')){
        this.datas[answerKey] = answerType;
        var height = this.$refs.Q10.offsetTop;
        document.documentElement.scrollTop = height-42;
        document.body.scrollTop = height-42;
      }else {
        this.datas[answerKey] = answerType;
        var height = this.$refs.Q11.offsetTop;
        document.documentElement.scrollTop = height-42;
        document.body.scrollTop = height-42;
      }
      
    },
    getDataQ10 (answerType,answerKey) {
      this.datas[answerKey] = answerType;
      var height = this.$refs.Q11.offsetTop;
      document.documentElement.scrollTop = height-42;
      document.body.scrollTop = height-42;
    },
    getDataQ11 (answerType,answerKey) {
      this.datas[answerKey] = answerType;
      /*var height = this.$refs.Q12.offsetTop;
      document.documentElement.scrollTop = height;
      document.body.scrollTop = height;*/
    },
    getDataQ12 (value,answerKey) {
      this.datas[answerKey] = value;
    },
    getDataQ13 (answerType,answerKey) {
      this.datas[answerKey] = answerType;
      var height = this.$refs.Q14.offsetTop;
      document.documentElement.scrollTop = height-42;
      document.body.scrollTop = height-42;
    },
    getDataQ14 (answerType,answerKey) {
      this.datas[answerKey] = answerType;
      var height = this.$refs.Q15.offsetTop;
      document.documentElement.scrollTop = height-42;
      document.body.scrollTop = height-42;
    },
    getDataQ15 (answerType,answerKey) {
      this.datas[answerKey] = answerType;
      var height = this.$refs.Q16.offsetTop;
      document.documentElement.scrollTop = height-42;
      document.body.scrollTop = height-42;
    },
    getDataQ16 (answerType,answerKey) {
      this.datas[answerKey] = answerType;
      var height = this.$refs.Q17.offsetTop;
      document.documentElement.scrollTop = height-42;
      document.body.scrollTop = height-42;
    },
    getDataQ17 (answerType,answerKey) {
      this.datas[answerKey] = answerType;
      var height = this.$refs.Q18.offsetTop;
      document.documentElement.scrollTop = height-42;
      document.body.scrollTop = height-42;
    },
    getDataQ18 (answerType,answerKey) {
      this.datas[answerKey] = answerType;
      var height = this.$refs.Q19.offsetTop;
      document.documentElement.scrollTop = height-42;
      document.body.scrollTop = height-42;
    },
    getDataQ19 (answerType,answerKey) {
      this.datas[answerKey] = answerType;
      var height = this.$refs.Q20.offsetTop;
      document.documentElement.scrollTop = height-42;
      document.body.scrollTop = height-42;
    },
    getDataQ20 (value,answerKey) {
      this.$refs.picker20.show();
    },
    getDataQ21 (value,answerKey) {
      this.$refs.picker21.show();
    },
    getDataQ22 (value,answerKey) {
      this.$refs.picker22.show();
    },
    getDataQ23 (answerType,answerKey) {
      this.datas[answerKey] = answerType;
      var height = this.$refs.Q24.offsetTop;
      document.documentElement.scrollTop = height-42;
      document.body.scrollTop = height-42;
    },
    getDataQ24 (answerType,answerKey) {
      if(answerType == 1){
        this.datas[answerKey] = answerType;
      }else {
        this.datas[answerKey] = answerType;
      }
      
    },
    getDataQ25 (answerType,answerKey) {
      this.datas[answerKey] = answerType;
      var height = this.$refs.Q26.offsetTop;
      document.documentElement.scrollTop = height-42;
      document.body.scrollTop = height-42;
    },
    getDataQ26 (answerType,answerKey) {
      this.datas[answerKey] = answerType;
      var height = this.$refs.Q27.offsetTop;
      document.documentElement.scrollTop = height-42;
      document.body.scrollTop = height-42;
    },
    getDataQ27A (answerType,answerKey) {
      this.datas[answerKey] = answerType;
    },
    getDataQ27As (answerType,answerKey) {
      this.datas[answerKey] = answerType;
      var height = this.$refs.Q27B.offsetTop;
      document.documentElement.scrollTop = height-42;
      document.body.scrollTop = height-42;
    },
    getDataQ27B (answerType,answerKey) {
      this.datas[answerKey] = answerType;
    },
    getDataQ27Bs (answerType,answerKey) {
      this.datas[answerKey] = answerType;
      var height = this.$refs.Q27C.offsetTop;
      document.documentElement.scrollTop = height-42;
      document.body.scrollTop = height-42;
    },
    getDataQ27C (answerType,answerKey) {
      this.datas[answerKey] = answerType;
    },
    getDataQ27Cs (answerType,answerKey) {
      this.datas[answerKey] = answerType;
      var height = this.$refs.Q27D.offsetTop;
      document.documentElement.scrollTop = height-42;
      document.body.scrollTop = height-42;
    },
    getDataQ27D (answerType,answerKey) {
      this.datas[answerKey] = answerType;
    },
    getDataQ27Ds (answerType,answerKey) {
      this.Q27Dhigt = answerKey;
      this.datas[answerKey] = answerType;
      var height = this.$refs.Q27E.offsetTop;
      document.documentElement.scrollTop = height-42;
      document.body.scrollTop = height-42;
    },
    getDataQ27E (answerType,answerKey) {
      this.datas[answerKey] = answerType;
    },
    getDataQ27Es (answerType,answerKey) {
      this.datas[answerKey] = answerType;
      var height = this.$refs.Q27F.offsetTop;
      document.documentElement.scrollTop = height-42;
      document.body.scrollTop = height-42;
    },
    getDataQ27F (answerType,answerKey) {
      this.datas[answerKey] = answerType;
    },
    getDataQ27Fs (answerType,answerKey) {
      this.Q27Fhigt = answerKey;
      this.datas[answerKey] = answerType;
      var height = this.$refs.Q27G.offsetTop;
      document.documentElement.scrollTop = height-42;
      document.body.scrollTop = height-42;
    },
    getDataQ27G (answerType,answerKey) {
      this.datas[answerKey] = answerType;
    },
    getDataQ27Gs (answerType,answerKey) {
      this.Q27Ghigt = answerKey;
      this.datas[answerKey] = answerType;
      var height = this.$refs.Q27H.offsetTop;
      document.documentElement.scrollTop = height-42;
      document.body.scrollTop = height-42;
    },
    getDataQ27H (answerType,answerKey) {
      this.datas[answerKey] = answerType;
    },
    getDataQ27Hs (answerType,answerKey) {
      this.Q27Hhigt = answerKey;
      this.datas[answerKey] = answerType;
      var height = this.$refs.Q27I.offsetTop;
      document.documentElement.scrollTop = height-42;
      document.body.scrollTop = height-42;
    },
    getDataQ27I (answerType,answerKey) {
      this.Q27Ihigt = answerKey;
      this.datas[answerKey] = answerType;
      var height = this.$refs.Q27J.offsetTop;
      document.documentElement.scrollTop = height-42;
      document.body.scrollTop = height-42;
    },
    getDataQ27J (answerType,answerKey) {
      this.Q27Jhigt = answerKey;
      this.datas[answerKey] = answerType;
      var height = this.$refs.Q27K.offsetTop;
      document.documentElement.scrollTop = height-42;
      document.body.scrollTop = height-42;
    },
    getDataQ27K (answerType,answerKey) {
      this.Q27Khigt = answerKey;
      this.datas[answerKey] = answerType;
      var height = this.$refs.Q28.offsetTop;
      document.documentElement.scrollTop = height-42;
      document.body.scrollTop = height-42;
    },
    getDataQ28 (answerType,answerKey) {
      this.datas[answerKey] = answerType;
      var height = this.$refs.Q29.offsetTop;
      document.documentElement.scrollTop = height-42;
      document.body.scrollTop = height-42;
    },
    getDataQ29 (answerType,answerKey) {
      if( this.checkArr.indexOf(answerKey) == -1 ){
        this.datas[answerKey] = 1;
      }else {
        if(this.checkArrPush.indexOf(answerKey) != -1){
          this.datas[answerKey] = '-1029';
        }
      }
    },
    getDataQ30 (answerType,answerKey) {
      this.datas[answerKey] = answerType;
      var height = this.$refs.Q31.offsetTop;
      document.documentElement.scrollTop = height-42;
      document.body.scrollTop = height-42;
    },
    getDataQ31 (answerType,answerKey) {
      this.datas[answerKey] = answerType;
      var height = this.$refs.Q32.offsetTop;
      document.documentElement.scrollTop = height-42;
      document.body.scrollTop = height-42;
    },
    getDataQ32 (answerType,answerKey) {
      this.datas[answerKey] = answerType;
      var height = this.$refs.Q33.offsetTop;
      document.documentElement.scrollTop = height-42;
      document.body.scrollTop = height-42;
    },
    getDataQ33 (answerType,answerKey) {
      this.datas[answerKey] = answerType;  
    },
    getDataQ34 (answerType,answerKey) {
      this.datas[answerKey] = answerType;
      var height = this.$refs.Q35.offsetTop;
      document.documentElement.scrollTop = height-42;
      document.body.scrollTop = height-42;
    },
    getDataQ35 (answerType,answerKey) {
      this.datas[answerKey] = answerType;
      var height = this.$refs.Q36.offsetTop;
      document.documentElement.scrollTop = height-42;
      document.body.scrollTop = height-42;
    },
    /*getDataQ36 (answerType,answerKey) {
      this.datas[answerKey] = answerType;
      var height = this.$refs.Q37.offsetTop;
      document.documentElement.scrollTop = height-42;
      document.body.scrollTop = height-42;
    },*/
    getDataQ36 (value,answerKey) {
      this.$refs.picker36.show();
    },
    getDataQ38 (answerType,answerKey) {
      this.datas[answerKey] = answerType;
      var height = this.$refs.Q39.offsetTop;
      document.documentElement.scrollTop = height-42;
      document.body.scrollTop = height-42;
    },
    getDataQ371A (value,answerKey,key) {
      if(this.Q371A != ''){
        this.Q371B = '';
        this.Q371C = '';
        this.Q371D = '';
        this.Q371E = '';
      }
    },
    getDataQ371B (value,answerKey,key) {

      if(this.Q371B != ''){
        this.Q371A = '';
        this.Q371C = '';
        this.Q371D = '';
        this.Q371E = '';
        this.datas[answerKey] = value;
      }
      
    },
    getDataQ371C (value,answerKey,key) {

      if(this.Q371C != ''){
        this.Q371A = '';
        this.Q371B = '';
        this.Q371D = '';
        this.Q371E = '';
      }

    },
    getDataQ371D (value,answerKey,key) {
      
      if(this.Q371D != ''){
        this.Q371A = '';
        this.Q371B = '';
        this.Q371C = '';
        this.Q371E = '';
      }

    },
    getDataQ371E (value,answerKey,key) {
      if(this.Q371E != ''){
        this.Q371A = '';
        this.Q371B = '';
        this.Q371C = '';
        this.Q371D = '';
      }
    },
    getDataQ372A (value,answerKey) {
      if(value != ''){
        this.datas[answerKey] = value;
      }else {
        this.datas[answerKey] = '-1029';
      } 
    },
    getDataQ372B (value,answerKey) {
      if(value != ''){
        this.datas[answerKey] = value;
      }else {
        this.datas[answerKey] = '-1029';
      }
    },
    getDataQ372C (value,answerKey) {
      if(value != ''){
        this.datas[answerKey] = value;
      }else {
        this.datas[answerKey] = '-1029';
      }
    },
    getDataQ372D (value,answerKey) {
      if(value != ''){
        this.datas[answerKey] = value;
      }else {
        this.datas[answerKey] = '-1029';
      }
    },
    getDataQ372E (value,answerKey) {
      if(value != ''){
        this.datas[answerKey] = value;
      }else {
        this.datas[answerKey] = '-1029';
      }
    },
    getDataQ373A (value,answerKey) {
      if(value != ''){
        this.datas[answerKey] = value;
      }else {
        this.datas[answerKey] = '-1029';
      }
    },
    getDataQ373B (value,answerKey) {
      if(value != ''){
        this.datas[answerKey] = value;
      }else {
        this.datas[answerKey] = '-1029';
      }
    },
    getDataQ373C (value,answerKey) {
      if(value != ''){
        this.datas[answerKey] = value;
      }else {
        this.datas[answerKey] = '-1029';
      }
    },
    getDataQ373D (value,answerKey) {
      if(value != ''){
        this.datas[answerKey] = value;
      }else {
        this.datas[answerKey] = '-1029';
      }
    },
    getDataQ373E (value,answerKey) {
      if(value != ''){
        this.datas[answerKey] = value;
      }else {
        this.datas[answerKey] = '-1029';
      }
    },
    getDataQ39 (answerType,answerKey) {
      this.datas[answerKey] = answerType;
      var height = this.$refs.Q43.offsetTop;
      document.documentElement.scrollTop = height-42;
      document.body.scrollTop = height-42;
    },
    getDataQ40A (answerType,answerKey) {
      this.datas[answerKey] = answerType;
      var height = this.$refs.Q40B.offsetTop;
      document.documentElement.scrollTop = height-42;
      document.body.scrollTop = height-42;
    },
    getDataQ40B (answerType,answerKey) {
      this.datas[answerKey] = answerType;
      var height = this.$refs.Q40C.offsetTop;
      document.documentElement.scrollTop = height-42;
      document.body.scrollTop = height-42;
    },
    getDataQ40C (answerType,answerKey) {
      this.datas[answerKey] = answerType;
      var height = this.$refs.Q40D.offsetTop;
      document.documentElement.scrollTop = height-42;
      document.body.scrollTop = height-42;
    },
    getDataQ40D (answerType,answerKey) {
      this.datas[answerKey] = answerType;
      var height = this.$refs.Q41.offsetTop;
      document.documentElement.scrollTop = height-42;
      document.body.scrollTop = height-42;
    },
    getDataQ41 (answerType,answerKey) {
      this.datas[answerKey] = answerType;
      var height = this.$refs.Q42.offsetTop;
      document.documentElement.scrollTop = height-42;
      document.body.scrollTop = height-42;
    },
    getDataQ42 (answerType,answerKey) {
      this.datas[answerKey] = answerType;
      var height = this.$refs.Q431.offsetTop;
      document.documentElement.scrollTop = height-42;
      document.body.scrollTop = height-42;
    },
    getDataQ431 (value,answerKey) {
      this.$refs.picker431.show();
    },
    getDataQ432 (value,answerKey) {
      if( value>1440 ){
        this.popup = true;
        this.message = "值不能大于1440";
        this.Q432 = '';
        setTimeout(() => {
          this.popup = false;
        },2000);
      }else {
        this.datas['h_act_tim_length'] = value;
      }
      
    },
    getDataQ433 (value,answerKey) {
      this.$refs.picker433.show();
    },
    getDataQ434 (value,answerKey) {
      if( value>1440 ){
        this.popup = true;
        this.message = "值不能大于1440";
        this.Q434 = '';
        setTimeout(() => {
          this.popup = false;
        },2000);
      }else {
        this.datas['m_act_tim_length'] = value;
      }    
    },
    getDataQ435 (value,answerKey) {
      this.$refs.picker435.show();
    },
    getDataQ436 (value,answerKey) {
      if( value>1440 ){
        this.popup = true;
        this.message = "值不能大于1440";
        this.Q436 = '';
        setTimeout(() => {
          this.popup = false;
        },2000);
      }else {
        this.datas['walking_minutes'] = value;
      }   
    },
    getDataQ437 (value,answerKey) {
      this.$refs.picker437.show();
    },
    getDataQ438 (value,answerKey) {
      this.$refs.picker438.show();
    },
    getDataQ44 (answerType,answerKey) {
      this.datas[answerKey] = answerType;
      var height = this.$refs.Q45.offsetTop;
      document.documentElement.scrollTop = height-42;
      document.body.scrollTop = height-42;
    },
    getDataQ45 (value,answerKey) {
      this.$refs.picker45.show();
    },
    getDataQ46 (answerType,answerKey) {
      this.datas[answerKey] = answerType;
      var height = this.$refs.Q47.offsetTop;
      document.documentElement.scrollTop = height-42;
      document.body.scrollTop = height-42;
    },
    getDataQ47 (answerType,answerKey) {
      this.datas[answerKey] = answerType;
      var height = this.$refs.Q48.offsetTop;
      document.documentElement.scrollTop = height-42;
      document.body.scrollTop = height-42;
    },
    getDataQ48 (answerType,answerKey) {
      this.datas[answerKey] = answerType;
      var height = this.$refs.Q49.offsetTop;
      document.documentElement.scrollTop = height-42;
      document.body.scrollTop = height-42;
    },
    getDataQ49 (answerType,answerKey) {
      this.datas[answerKey] = answerType;
      var height = this.$refs.Q50.offsetTop;
      document.documentElement.scrollTop = height-42;
      document.body.scrollTop = height-42;
    },
    getDataQ50 (answerType,answerKey) {
      this.datas[answerKey] = answerType;
      var height = this.$refs.Q51.offsetTop;
      document.documentElement.scrollTop = height-42;
      document.body.scrollTop = height-42;
    },
    getDataQ51 (answerType,answerKey) {
      this.datas[answerKey] = answerType;
      var height = this.$refs.Q52.offsetTop;
      document.documentElement.scrollTop = height-42;
      document.body.scrollTop = height-42;
    },
    getDataQ52 (answerType,answerKey) {
      this.datas[answerKey] = answerType;
      var height = this.$refs.Q53.offsetTop;
      document.documentElement.scrollTop = height-42;
      document.body.scrollTop = height-42;
    },
    getDataQ53 (answerType,answerKey) {
      this.datas[answerKey] = answerType;
      var height = this.$refs.Q54.offsetTop;
      document.documentElement.scrollTop = height-42;
      document.body.scrollTop = height-42;
    },
    getDataQ54 (answerType,answerKey) {
      this.datas[answerKey] = answerType;
      var height = this.$refs.Q55.offsetTop;
      document.documentElement.scrollTop = height-42;
      document.body.scrollTop = height-42;
    },
    getDataQ55 (answerType,answerKey) {
      this.datas[answerKey] = answerType;
      var height = this.$refs.Q56.offsetTop;
      document.documentElement.scrollTop = height-42;
      document.body.scrollTop = height-42;
    },
    getDataQ56 (answerType,answerKey) {
      this.datas[answerKey] = answerType;
      var height = this.$refs.Q57.offsetTop;
      document.documentElement.scrollTop = height-42;
      document.body.scrollTop = height-42;
    },
    getDataQ57 (answerType,answerKey) {
      this.datas[answerKey] = answerType;
      var height = this.$refs.Q58.offsetTop;
      document.documentElement.scrollTop = height-42;
      document.body.scrollTop = height-42;
    },
    getDataQ58 (answerType,answerKey) {
      this.datas[answerKey] = answerType;
      var height = this.$refs.Q59.offsetTop;
      document.documentElement.scrollTop = height-42;
      document.body.scrollTop = height-42;
    },
    getDataQ59 (answerType,answerKey) {
      this.datas[answerKey] = answerType;
      var height = this.$refs.Q60.offsetTop;
      document.documentElement.scrollTop = height-42;
      document.body.scrollTop = height-42;
    },
    getDataQ60 (answerType,answerKey) {
      this.datas[answerKey] = answerType;
      var height = this.$refs.Q61.offsetTop;
      document.documentElement.scrollTop = height-42;
      document.body.scrollTop = height-42;
    },
    getDataQ61 (answerType,answerKey) {
      this.datas[answerKey] = answerType;
      var height = this.$refs.Q62.offsetTop;
      document.documentElement.scrollTop = height-42;
      document.body.scrollTop = height-42;
    },
    getDataQ62 (answerType,answerKey) {
      this.datas[answerKey] = answerType;
      var height = this.$refs.Q63.offsetTop;
      document.documentElement.scrollTop = height-42;
      document.body.scrollTop = height-42;
    },
    getDataQ63 (answerType,answerKey) {
      this.datas[answerKey] = answerType;
      var height = this.$refs.Q64.offsetTop;
      document.documentElement.scrollTop = height-42;
      document.body.scrollTop = height-42;
    },
    getDataQ64 (answerType,answerKey) {
      this.datas[answerKey] = answerType;
      var height = this.$refs.Q65.offsetTop;
      document.documentElement.scrollTop = height-42;
      document.body.scrollTop = height-42;
    },
    getDataQ65 (answerType,answerKey) {
      this.datas[answerKey] = answerType;
      var height = this.$refs.Q66.offsetTop;
      document.documentElement.scrollTop = height-42;
      document.body.scrollTop = height-42;
    },
    getDataQ66 (answerType,answerKey) {
      if( this.checkArr.indexOf(answerKey) == -1 ){
        this.datas[answerKey] = 1;
      }else {
        if(this.checkArrPush.indexOf(answerKey) != -1){
          this.datas[answerKey] = '-1029';
        }
      }
    },
    getDataQ66s (answerType,answerKey) {
      if( this.checkArr.indexOf(answerKey) == -1 ){
        this.datas[answerKey] = 1;
      }else {
        if(this.checkArrPush.indexOf(answerKey) != -1){
          this.datas[answerKey] = '-1029';
        }
      }
    },
    getDataQ67A (value,answerKey) {
      this.datas[answerKey] = value;
    },
    getDataQ67B (value,answerKey) {
      this.datas[answerKey] = value;
    },
    getDataQ67C (value,answerKey) {
      this.datas[answerKey] = value;
    },
    getDataQ67D (value,answerKey) {
      this.datas[answerKey] = value;
    },
    getDataQ67E (value,answerKey) {
      this.datas[answerKey] = value;
    },
    getDataQ67F (value,answerKey) {
      this.datas[answerKey] = value;
    },
    getDataQ68A (answerType,answerKey) {
      this.datas[answerKey] = answerType;
      var height = this.$refs.Q68B.offsetTop;
      document.documentElement.scrollTop = height-42;
      document.body.scrollTop = height-42;
    },
    getDataQ68B (answerType,answerKey) {
      this.datas[answerKey] = answerType;
      var height = this.$refs.Q68C.offsetTop;
      document.documentElement.scrollTop = height-42;
      document.body.scrollTop = height-42;
    },
    getDataQ68C (answerType,answerKey) {
      this.datas[answerKey] = answerType;
      var height = this.$refs.Q68D.offsetTop;
      document.documentElement.scrollTop = height-42;
      document.body.scrollTop = height-42;
    },
    getDataQ68D (answerType,answerKey) {
      this.datas[answerKey] = answerType;
      var height = this.$refs.Q69.offsetTop;
      document.documentElement.scrollTop = height-42;
      document.body.scrollTop = height-42;
    },
    getDataQ69A (answerType,answerKey) {
      this.datas[answerKey] = answerType;
      var height = this.$refs.Q69B.offsetTop;
      document.documentElement.scrollTop = height-42;
      document.body.scrollTop = height-42;
    },
    getDataQ69B (answerType,answerKey) {
      this.datas[answerKey] = answerType;
      var height = this.$refs.Q69C.offsetTop;
      document.documentElement.scrollTop = height-42;
      document.body.scrollTop = height-42;
    },
    getDataQ69C (answerType,answerKey) {
      this.datas[answerKey] = answerType;
      var height = this.$refs.Q69D.offsetTop;
      document.documentElement.scrollTop = height-42;
      document.body.scrollTop = height-42;
    },
    getDataQ69D (answerType,answerKey) {
      this.datas[answerKey] = answerType;
      var height = this.$refs.Q69E.offsetTop;
      document.documentElement.scrollTop = height-42;
      document.body.scrollTop = height-42;
    },
    getDataQ69E (answerType,answerKey) {
      this.datas[answerKey] = answerType;
      var height = this.$refs.Q69F.offsetTop;
      document.documentElement.scrollTop = height-42;
      document.body.scrollTop = height-42;
    },
    getDataQ69F (answerType,answerKey) {
      this.datas[answerKey] = answerType;
      var height = this.$refs.Q69G.offsetTop;
      document.documentElement.scrollTop = height-42;
      document.body.scrollTop = height-42;
    },
    getDataQ69G (answerType,answerKey) {
      this.datas[answerKey] = answerType;
      var height = this.$refs.Q69H.offsetTop;
      document.documentElement.scrollTop = height-42;
      document.body.scrollTop = height-42;
    },
    getDataQ69H (answerType,answerKey) {
      this.datas[answerKey] = answerType;
      var height = this.$refs.Q70.offsetTop;
      document.documentElement.scrollTop = height-42;
      document.body.scrollTop = height-42;
    },
    getDataQ701 (value,answerKey) {
      if(this.company70 == 1 ){
        this.datas['cholesterol'] = value;
        this.datas['cholesterol_unit'] = 1;
      }else {
        this.datas['cholesterol'] = value;
        this.datas['cholesterol_unit'] = 2; 
      }
    },
    getDataQ702 (value,answerKey) {
      if(this.company71 ==  1 ){
        this.datas['hdlc'] = value;
        this.datas['hdlc_unit'] = 1;
      }else {
        this.datas['hdlc'] = value;
        this.datas['hdlc_unit'] = 2;
      }
    },
    getDataQ703 (value,answerKey) {
      if(this.company72 == 1 ){
        this.datas['triglycerin'] = value;
        this.datas['triglycerin_unit'] = 1;
      }else {
        this.datas['triglycerin'] = value;
        this.datas['triglycerin_unit'] = 2;
      }
    },
    getDataQ704 (value,answerKey) {
      if(this.company73 == 1 ){
        this.datas['ldlc'] = value;
        this.datas['ldlc_unit'] = 1;
      }else {
        this.datas['ldlc'] = value;
        this.datas['ldlc_unit'] = 2;
      }
    },
    getDataQ705 (value,answerKey) {
      if(this.company74 == 1 ){
        this.datas['fasting_bg'] = value;
        this.datas['fasting_bg_unit'] = 1;
      }else {
        this.datas['fasting_bg'] = value;
        this.datas['fasting_bg_unit'] = 2;
      }
    },
    getDataQ706 (value,answerKey) {
      if(this.company75 == 1 ){
        this.datas['ogtt'] = value;
        this.datas['ogtt_unit'] = 1;
      }else {
        this.datas['ogtt'] = value;
        this.datas['ogtt_unit'] = 2;
      }
    },
    getDataQ707 (value,answerKey) {
      this.datas[answerKey] = value;
    },
    getDataQ708 (value,answerKey) {
      this.datas[answerKey] = value;
    },
    getDataQ709 (value,answerKey) {
      this.datas[answerKey] = value;
    },
    getDataQ7010 (value,answerKey) {
      this.$refs.picker7010.show();
    },
    getDataQ7011 (value,answerKey) {
      this.datas[answerKey] = value;
    },
    getDataQ7012 (value,answerKey) {
      this.$refs.picker7012.show();
    },
    getDataQ7013 (value,answerKey) {
      this.$refs.picker7013.show();
    },
    getDataQ7014 (value,answerKey) {
      this.$refs.picker7014.show();
    },
    getDataQ7015 (value,answerKey) {
      this.datas[answerKey] = value;
    },
    getDataQ7016 (value,answerKey) {
      this.datas[answerKey] = value;
    },
    getDataQ7017 (value,answerKey) {
      this.datas[answerKey] = value;
    },
    getDataQ7018 (value,answerKey) {
      this.datas[answerKey] = value;
    },
    getDataQ7019 (value,answerKey) {
      this.datas[answerKey] = value;
    },
    getDataQ7020 (value,answerKey) {
      this.datas[answerKey] = value;
    },
    getDataQ71 (answerType,answerKey) {
      this.datas[answerKey] = answerType;
      var height = this.$refs.Q72.offsetTop;
      document.documentElement.scrollTop = height-42;
      document.body.scrollTop = height-42;
    },
    getDataQ72 (answerType,answerKey) {
      this.datas[answerKey] = answerType;
      var height = this.$refs.Q73.offsetTop;
      document.documentElement.scrollTop = height-42;
      document.body.scrollTop = height-42;
    },
    getDataQ73 (answerType,answerKey) {
      this.datas[answerKey] = answerType;
      var height = this.$refs.Q74.offsetTop;
      document.documentElement.scrollTop = height-42;
      document.body.scrollTop = height-42;
    },
    getDataQ74 (answerType,answerKey) {
      this.datas[answerKey] = answerType;
      var height = this.$refs.Q75.offsetTop;
      document.documentElement.scrollTop = height-42;
      document.body.scrollTop = height-42;
    },
    getDataQ75 (value,answerKey) {
      this.$refs.picker75.show();
    },
    getDataQ76 (answerType,answerKey) {
      this.datas[answerKey] = answerType;
      var height = this.$refs.Q77.offsetTop;
      document.documentElement.scrollTop = height-42;
      document.body.scrollTop = height-42;
    },
    getDataQ77 (answerType,answerKey) {
      this.datas[answerKey] = answerType;
    },
    getDataQ78 (value,answerKey) {
      this.$refs.picker78.show();
    },
    getDataQ79 (value,answerKey) {
      this.$refs.picker79.show();
    },
    getDataQ80 (answerType,answerKey) {
      console.log(answerKey)
      if( this.checkArr.indexOf(answerKey) == -1 ){
        this.datas[answerKey] = 1;
      }else {
        if(this.checkArrPush.indexOf(answerKey) != -1){
          this.datas[answerKey] = '-1029';
        }
      }
    },
    getDataQ81 (value,answerKey) {
      this.$refs.picker81.show();
    },
    getDataQ82 (answerType,answerKey) {
      this.datas[answerKey] = answerType;
      var height = this.$refs.Q83.offsetTop;
      document.documentElement.scrollTop = height-42;
      document.body.scrollTop = height-42;
    },
    getDataQ83 (answerType,answerKey) {
      this.datas[answerKey] = answerType;
    },
    getDataQ84 (value,answerKey) {
      this.$refs.picker84.show();
    },
    getDataQ85 (answerType,answerKey) {
      this.datas[answerKey] = answerType;
    },
    getDataQ86 (value,answerKey) {
      this.$refs.picker86.show();
    }
  },
  updated () {
    // 跳题
    if( this.Q11 == 1 ){
      this.judge_11 = true;
      this.judge_11s = false;
      this.judge_11as = false;
      this.judge_24 = false;
    }else if( this.Q11 == 2 ){ 
      this.judge_11s = true;
      this.judge_11 = false; 
      this.judge_11as = false;
      this.judge_24 = false;
    }else if( this.Q11 == 3 ){
      this.judge_11 = false;
      this.judge_11s = false;
      this.judge_11as = true;
    }
    if( this.judge_11as ){
      if( this.Q24 == 1 ){
        this.judge_24 = true; 
      }else if( this.Q24 == 2 ){
        this.judge_24 = false; 
      }
    }

    if( this.Q33 == 1 ){
      this.judge_33 = false;
    }else if ( this.Q33 == 2 ) {
      this.judge_33 = true;
    }

    if( this.Q77 == 1 ){
      this.judge_77 = true;
    }else if( this.Q77 == 2 ){
      this.judge_77 = false;
    }

    if( this.Q83 == 1 ){
      this.judge_83 = true;
      if( this.Q85 == 2 ){
        this.judge_85 = false;
      }else if( this.Q85 == 1 ){
        this.judge_85 = true;
      }
    }else if( this.Q83 == 2 ){
      this.judge_83 = false;
      this.judge_85 = false;
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  input[type="text"] {
    -webkit-appearance: none;
    border-radius: 0;
  }
  .question_Q27 {
    font-size: 0.28rem;
    padding-top: 0.5rem;
  }

  .container_content {
    padding: 0 0.32rem;
    margin-top: .84rem;
  }

  .container_list_subject {
    font-size: 0.32rem;
    color: #000;
    padding: 0.5rem 0;
  }

  .container_list_answer_check,
  .container_list_answer_radio {  
    font-size: 0.28rem;
    color: #343434;
    overflow: hidden;
    border: 1px solid #ccc;
    border-radius: 5px;
  }
  
  .container_list_answer_check ul li label,
  .container_list_answer_radio ul li label {
    position: relative;
    display: block;
  }
  .label_radio span,.label_check span,
  .container_list_answer_check ul li label span,
  .container_list_answer_radio ul li label span {
    position: relative;
  }
  .label_radio span:after {
    display: block;
    content: "";
    width: 0.18rem;
    height: 0.18rem;
    background: #e6e6e6;
    position: absolute;
    top: 0.34rem;
    left: .24rem;
    border-radius: .18rem;
  }
  .active .label_radio span:after {
    display: block;
    content: "";
    width: 0.18rem;
    height: 0.18rem;
    background: #fff;
    position: absolute;
    top: 0.34rem;
    left: .24rem;
    border-radius: .18rem;
  }
  .label_check span:after {
    display: block;
    content: "";
    width: 0.18rem;
    height: 0.18rem;
    background: #e6e6e6;
    position: absolute;
    top: 0.34rem;
    left: .24rem;
  }
  .active .label_check span:after {
    display: block;
    content: "";
    width: 0.18rem;
    height: 0.18rem;
    background: #fff;
    position: absolute;
    top: 0.34rem;
    left: .24rem;
  }
  .container_list_answer_radio ul li label span:after {
    display: block;
    content: "";
    width: 0.18rem;
    height: 0.18rem;
    background: #e6e6e6;
    position: absolute;
    top: 0.09rem;
    left: 0;
    border-radius: .18rem;
  }
  
  .container_list_answer_check ul li label span:after {
    display: block;
    content: "";
    width: 0.18rem;
    height: 0.18rem;
    background: #e6e6e6;
    position: absolute;
    top: 0.09rem;
    left: 0;
  }
  .container_list_answer_check ul li label.active span:after {
    display: block;
    content: "";
    width: 0.18rem;
    height: 0.18rem;
    background: #fff;
    position: absolute;
    top: 0.09rem;
    left: 0;
  }
  

  .question_Q27_ipt {
    float: left;
  }
  .container_list_answer_radio ul li label span.question_Q27_ipt:after {
    display: block;
    content: "";
    width: 0.18rem;
    height: 0.18rem;
    background: #e6e6e6;
    position: absolute;
    top: 0.34rem;
    left: 0;
    border-radius: .18rem;
  }

  .container_list_answer_check ul li input,
  .container_list_answer_radio ul li input {
    opacity: 0;
  }

  .container_list_answer_radio b {
    font-weight: inherit;
  }
  .container_list_answer_radio b.container_l {
    width: .6rem;
    text-align: right;
    display: block;
    float: left;
  }
  

  /* 一列第一种情况 */
  #container_list_answer_a_2 ul li {
    float: left;
    width: 49.87%;
    line-height: 0.9rem;
    text-align: center;
    border-right: 0.001rem solid #ccc;
  }

  #container_list_answer_a_2 ul li:last-child {
    border-right: none;
  }

  #container_list_answer_a_4 ul li {
    float: left;
    width: 24.87%;
    line-height: 0.9rem;
    text-align: center;
    border-right: 0.001rem solid #ccc;
  }

  #container_list_answer_a_4 ul li:last-child {
    border-right: none;
  }

  #container_list_answer_a_5 ul li {
    float: left;
    width: 19.87%;
    line-height: 0.9rem;
    text-align: center;
    border-right: 0.001rem solid #ccc;
  }

  #container_list_answer_a_5 ul li:last-child {
    border-right: none;
  }

  /* 两列第二种情况 */
  #container_list_answer_b ul li {
    float: left;
    width: 49.87%;
    line-height: 0.9rem;
    border-right: 0.01rem solid #ccc;
    border-bottom: 0.01rem solid #ccc;
  }

  #container_list_answer_b ul li label {
    margin-left: 0.24rem;
  }
  
  #container_list_answer_b ul li:nth-child(2n) {
    border-right: none;
  }

  .second_level {
    width: 100%;
    line-height: 0.9rem;
    border-top: 0.01rem solid #ccc;
    padding-left: 0.35rem;
  }
  .second_level_q8 {
    float: left;
    width: 24.87%;
    line-height: 0.9rem;
    text-align: center;
    border-right: 0.001rem solid #ccc;
    border-top: 0.001rem solid #ccc;
    text-align: center;
  }
  .second_level_q8:last-child {
    border-right:none;
  }
  .second_level_q8 label {
    margin-left: 0 !important;
  }

  /* 竖列第三种情况 */
  #container_list_answer_c ul li {
    float: left;
    width: 100%;
    line-height: 0.9rem;
    border-bottom: 0.01rem solid #ccc;
  }

  #container_list_answer_c ul li label {
    padding-left: 0.24rem;
    float: left;
    width: 100%;
  }

  #container_list_answer_c ul li:last-child {
    border-bottom: none;
  }

  #item_2 {
    width: 49.87%;

  }

  /* 第四种情况 三列情况*/
  #container_list_answer_Columns ul li {
    float: left;
    width: 39.9%;
    line-height: 0.9rem;
    border-bottom: 0.01rem solid #ccc;
    border-right: 0.01rem solid #ccc;
  }
  
  #container_list_answer_Columns ul li:nth-child(2n) {
    border-right: none;
  }

  #container_list_answer_Columns ul li label {
    margin-left: 0.24rem;
  }

  .container_list_answer_Columns_title {
    width: 19.8%;
    float: left;
    text-align: center;
    border-right: 0.01rem solid #ccc;
  }

  .container_list_answer_Columns_week {
    overflow: hidden;
    border-bottom: 0.01rem solid #ccc;
  }

  .container_list_answer_Columns_week:last-child {
    border-bottom: none;
  }

  .container_list_answer_Columns_title p {
    width: 100%;
    height: 1.8rem;
    line-height: 1.8rem;
  }

  /* 填空题 */
  .container_list_subject_completion {
    font-size: 0.32rem;
    padding-top: .5rem;
  }
  .container_list_subject_completion input {
    width: 1rem;
    border-bottom: 0.01rem solid #ccc;
    outline:none;
    color: #009983;
    text-align: center;
    -webkit-appearance: none;
    outline: none;
  }
  .container_list_subject_completion_2 {
    font-size: 0.28rem;
    color: #343434;
    overflow: hidden;
    border: 1px solid #ccc;
    border-radius: 5px;
  }
  .container_list_subject_completion_2 .  oul {
    text-align: center;
  }
  .container_list_subject_completion_2 input.container {
    width: 1.5rem;
    border-bottom: 0.01rem solid #ccc;
    padding: 0 0.1rem;
    outline:none;
    color: #009983;
    opacity: 1;
    text-align: center;
     -webkit-appearance: none;
  }
  .container_list_subject_completion_2 input.container_37 {
    width: 1.5rem;
    border-bottom: 0.01rem solid #ccc;
    padding: 0 0.1rem;
    outline:none;
    color: #333;
    opacity: 1;
    float: left;
    margin-top: .3rem;
    text-align: center;
  }
  .container_list_subject_completion_2 .container_answerName {
    display: block;
    width: 3rem;
    float: left;
  }
  .container_l {
    margin-left: 0.2rem;
    text-align: right;
  }

  .container_list_content {
    font-size: 0.28rem;
    color: #343434;
    overflow: hidden;
    border: 1px solid #ccc;
    border-radius: 5px;
  }
  .container_list_content ul {
    overflow: hidden;
    border-bottom: 1px solid #ccc;
  }
  .container_list_content ul:last-child {
    border-bottom: none;
  }
  .container_list_content ul li {
    width: 50%;
    float: left;
    line-height: 0.9rem;
    padding-left: .3rem;
  }
  .container_list_content_title {
    width: 45%;
    height: .9rem;
    border-right: 0.01rem solid #ccc;
    background: #f4faf0;
  }
  .container_list_content input {
    width: 1.5rem;
    border-bottom: 0.01rem solid #ccc;
    padding: 0 0.1rem;
    outline:none;
    color: #009983;
    text-align: center;
  }
  .container_list_answer_a_2_bottom {
    width: 100% !important;
  }
  .container_list_answer_a_2_bottom b {
    font-weight: normal;
    padding: 0 0.38rem;
    color: #ccc;
  }


  /* 高亮 */
  .active {
    background: #009983;
    color: #fff;
  }
  .container_list_answer_radio ul li.active label span:after {
    display: block;
    content: "";
    width: 0.18rem;
    height: 0.18rem;
    background: #fff;
    position: absolute;
    left: 0;
  }
  .container_list_answer_check ul li.active label span:after {
    display: block;
    content: "";
    width: 0.18rem;
    height: 0.18rem;
    background: #fff;
    position: absolute;
    top: 0.09rem;
    left: 0;
  }
  /* 按钮 */
  .question_sublimt a {
    display: block;
    width: 100%;
    height: 1.0rem;
    background:#009983;
    color: #fff;
    text-align: center;
    line-height: 1.0rem;
    font-size: 0.32rem;
    margin-top: 0.5rem; 
  }
  
  .center ul li {
    text-align: center;
  }

  .container_title {
    display: block;
    width: 100%;
    height: 1.0rem;
    background:#72c85d;
    color: #fff;
    text-align: center;
    line-height: 1.0rem;
    font-size: 0.32rem;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 99;
  }
  .info_tips{
    position: fixed;
    width: 1.8rem;
    height: 0.48rem;
    background-color: rgba(0,0,0,0.85);
    color: #fff;
    left: 50%;
    margin-left: -0.9rem;
    bottom: 12%;
    border-radius: 5px;
    line-height: 0.48rem;
    text-align: center;
    font-size: 0.22rem;
  }
  .info_Required{
    position: fixed;
    width: 2.8rem;
    height: 0.48rem;
    background-color: rgba(0,0,0,0.85);
    color: #fff;
    left: 50%;
    margin-left: -1.4rem;
    bottom: 12%;
    border-radius: 5px;
    line-height: 0.48rem;
    text-align: center;
    font-size: 0.22rem;
  }

  .picker-backdrop {
    position: fixed !important;
  }
  .picker-backdrop .picker-wrapper {
    width: 50%;
  }
  .container-header {
    width: 100%;
    height: 42px;
    background: #009983;
    color: #fff;
    position: fixed;
    top: 0;
    z-index: 999;
  }
  .container-header b {
    text-align: center;
    width: 0.8rem;
    height: 100%;
    position: absolute;
    left: 0px;
    top: 0;
  }
  .container-header img {
    width: 60%;
    margin-top: 24%;
  }
  .container-header h2 {
    float: left;
    text-align: center;
    width: 100%;
    margin: 0 auto;
    line-height: 42px;
    font-size: 18px;
    color: #fff;
  }
  .container-header .home_mian_1 {
    background: url(../../assets/image/C_S.png) no-repeat;
    width: 0.5rem;
    height: 100%;
    background-size: contain;
    position: relative;
    left: 90.5%;
    background-position-y: center;
  }

  .container_box {
    position: absolute;
    margin-left: .55rem;
  }
  .container_list_373 .container_list_answer_check ul li.active label span:after {
    display: block;
    content: "";
    width: 0.18rem;
    height: 0.18rem;
    background: #fff;
    position: absolute;
    top: 0.35rem;
    left: 0;
  }
  .container_list_373 .container_list_answer_check ul li div span:after
  .container_list_373 .container_list_answer_check ul li label span:after {
    display: block;
    content: "";
    width: 0.18rem;
    height: 0.18rem;
    background: #e6e6e6;
    position: absolute;
    top: 0.35rem;
    left: 0;
  }
  .active .container_box input {
    color: #fff;
  }
</style>
