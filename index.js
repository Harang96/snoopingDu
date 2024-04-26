let page = 0; // 페이지 - 1 (인덱스를 편하게 다루기 위함)
let pointE = 0; // E 점수
let pointI = 0; // I 점수
let pointJ = 0; // J 점수
let pointP = 0; // P 점수

let selectArr = [0, 0, 0, 0, 0, 0]; // 페이지의 선택지를 선택하면 숫자 입력

let questionArr = new Array(); // 질문을 담을 배열

// 질문들 배열에 넣기
function Question(question, answer1, answer1Para, select1, answer2, answer2Para, select2) {
  this.question = question;
  this.answer1 = answer1;
  this.answer1Para = answer1Para;
  this.select1 = select1; // 1번 선택시
  this.answer2 = answer2;
  this.answer2Para = answer2Para;
  this.select2 = select2; // 2번 선택시
}

questionArr.push(new Question("Q1. 편안한 휴식 시간, 내가 휴식을 보내는 방법은?",
                              "친구들 만나는 게 최고!",
                              "밖으로 나가 좋아하는 장소에서 사람들과 교류한다.",
                              "E",
                              "집이 최고야...",
                              "따뜻한 침대 안에서 좋아하는 영화를 보며 쉰다.",
                              "I"));

questionArr.push(new Question("Q2. 옆집 이웃을 엘리베이터에서 마주쳤다. 나의 반응은?",
                              "요즘 어떻게 지내세요?",
                              "오랜만에 만난 이웃이 반가워 먼저 인사를 건네고 근황 얘기를 한다.",
                              "E",
                              "가벼운 인사만 건넨다.",
                              "어색한 마음이 들어서 가벼운 인사만 건네고 만다.",
                              "I"));

questionArr.push(new Question("Q3. 동네 친구에게 갑자기 약속을 못 갈 것 같다는 연락이 왔다!",
                              "지금 시간되는 친구 없나?",
                              "바로 다른 친구와의 약속을 잡기위해 연락을 돌린다.",
                              "E",
                              "아쉽지만... 조금 좋을지도?",
                              "그대로 침대 속으로 들어간다.",
                              "I"));

questionArr.push(new Question("Q4. 친구와 동네 카페에서 만나기로 했는데 늦을 것 같을 때, 나는?",
                              "처리해야 할 일이 갑자기 생겨서...",
                              "친구가 납득할 수 있게 늦은 이유에 대해 먼저 설명한다.",
                              "J",
                              "나 때문에 오래 기다리겠다... 진짜  진짜 미안해ㅠㅠ...",
                              "친구의 마음을 달래줄 수 있는 공감의 말을 먼저 건넨다.",
                              "P"));

questionArr.push(new Question("Q5. 친구와 약속이 생겼을 때, 나의 행동은?",
                              "뭐할까? 계획을 세운다.",
                              "약속 전에 뭘 먹을지, 어디갈지 인터넷에서 찾아보고 계획을 세운다.",
                              "J",
                              "만나서 정해~",
                              "만나서 유연하게 어디서 뭘 할지 즉흥적으로 정한다.",
                              "P"));

questionArr.push(new Question("Q6. 이사 온 기념 집들이로 이웃을 초대했다. 요리할 때 나는?",
                              "요리는 정확성! 레시피를 따른다.",
                              "1g까지 정확한 레시피를 따라서 요리를 만든다.",
                              "J",
                              "감으로 해! 적당히 넣어~",
                              "이 정도면 되겠지? 적당히 감으로 계량해서 넣는다.",
                              "P"));


// 온로드
$(function() {
  inputQuestion();
  floatModal();
});

// 선택지를 선택했을 때 함수
function selectAnswer(obj) {
    let selected = $(obj).attr("id"); // 선택된 태그의 아이디
    if (selectArr[page] == 0) {
      // 아무 것도 선택된 것이 없을 때
      if (selected == "firstSelect") { // 1번 선택지
        selectArr[page] = 1;
        makeSelectedStyle(1);
        activateBtn();
        plusPoint(questionArr[page].select1);
      } else {
        selectArr[page] = 2;
        makeSelectedStyle(2);
        activateBtn();
        plusPoint(questionArr[page].select2);
      }
    } else {
      // 하나라도 선택된 것이 있을 때
      if (selectArr[page] == 1) { // 1번이 선택되어 있을 때
        if (selected == "firstSelect") { // 1번 선택
          selectArr[page] = 0;
          makeSelectedStyle(0);
          activateBtn();
          minusPoint(questionArr[page].select1);
        } else { // 2번 선택
          selectArr[page] = 2;
          makeSelectedStyle(2);
          activateBtn();
          minusPoint(questionArr[page].select1);
          plusPoint(questionArr[page].select2);
        }
      } else { // 2번이 선택되어 있을 때
        if (selected == "firstSelect") { // 1번 선택
          selectArr[page] = 1;
          makeSelectedStyle(1);
          activateBtn();
          plusPoint(questionArr[page].select1);
          minusPoint(questionArr[page].select2);
        } else { // 2번 선택
          selectArr[page] = 0;
          makeSelectedStyle(0);
          activateBtn();
          minusPoint(questionArr[page].select2);
        }
      }
    }
}

// 페이지에 정보를 입력하는 함수
function inputQuestion() {
  $("#question").html(questionArr[page].question); // 질문
  $("#firstTitle").html(questionArr[page].answer1); // 1번 선택지
  $("#firstPara").html(questionArr[page].answer1Para); // 1번 설명
  $("#secondTitle").html(questionArr[page].answer2); // 2번 선택지
  $("#secondPara").html(questionArr[page].answer2Para); // 2번 설명
  $("#pageOutput").html(page + 1); // 페이지 번호

  $('#nextBtn').prop('disabled', true);
  $('#prevBtn').prop('disabled', true);

  activateBtn();
}

// 선택에 따른 박스 스타일 변경
function makeSelectedStyle(selectedNum) {
  switch (selectedNum) {
    case 0: // 모두 비선택
      $("#firstSelect").css("background-color", "white").css("color", "black");
      $("#secondSelect").css("background-color", "white").css("color", "black");
      break;
    case 1: // 1번 선택
      $("#firstSelect").css("background-color", "#FC5D2B").css("color", "white");
      $("#secondSelect").css("background-color", "white").css("color", "#7D7E81");
      break;
    case 2: // 2번 선택
      $("#firstSelect").css("background-color", "white").css("color", "#7D7E81");
      $("#secondSelect").css("background-color", "#FC5D2B").css("color", "white");
      break;
  }
}

// 선택한 선택지에 따른 값 증가
function plusPoint(type) {
  if (type == "E") {
    pointE++;
  } else if (type == "I") {
    pointI++;
  } else if (type == "J") {
    pointJ++;
  } else {
    pointP++;
  }
}

// 감소
function minusPoint(type) {
  if (type == "E") {
    pointE--;
  } else if (type == "I") {
    pointI--;
  } else if (type == "J") {
    pointJ--;
  } else {
    pointP--;
  }
}

// 버튼 활성화, 비활성화
function activateBtn() {
  if (selectArr[page] != 0) { // 선택된 선택지가 있을 때
    $('#nextBtn').prop('disabled', false);
    if (page != 0) { // 페이지가 0이 아닐 때
      $('#prevBtn').prop('disabled', false);
    } else { // 페이지가 0이면 이전 버튼 비활성화
      $('#prevBtn').prop('disabled', true);
    }
  } else { // 선택된 선택지가 없을 때
    $('#nextBtn').prop('disabled', true);
    $('#prevBtn').prop('disabled', true);
  }
}

// 이전 버튼, 다음 버튼
function changePage(obj) {
  let btn = $(obj).attr("id"); // 선택된 태그의 아이디

  if (btn == "prevBtn") { // 이전 버튼
    page--;
    inputQuestion();
    makeSelectedStyle(selectArr[page]);
  } else { // 다음 버튼
    if (page < 5) { 
      page++;
      inputQuestion();
      makeSelectedStyle(selectArr[page]);
    } else if (page == 5) { // 마지막 페이지 -> 결과
      floatModal();
    }
  }

  if (page == 5) {
    $("#nextBtn").html("결과");
  } else {
    $("#nextBtn").html("다음");
  }
}

// 시작, 결과 모달창 띄우기
function floatModal() {
  $('#mainBox').css("display", "none");
  $('#modal').css("display", "inline-block");

  if (page == 5) { // 마지막 페이지에서 -> 결과
    $('#refreshBtn').attr("disabled", false);
    if (pointE > pointI) {
      if (pointJ > pointP) { //EJ 골목대장
        // $("#modal").children().eq(0).attr("src", "image/result_EJ.png");
        $("#modal").children().eq(0).attr("src", "http://goott351.cafe24.com/ljy/dudu/image/result_EJ.png");
      } else { // EP 수다쟁이
        // $("#modal").children().eq(0).attr("src", "image/result_EP.png");
        $("#modal").children().eq(0).attr("src", "http://goott351.cafe24.com/ljy/dudu/image/result_EP.png");
      }
    } else {
      if (pointJ > pointP) { //IJ 논리주의
        // $("#modal").children().eq(0).attr("src", "image/result_IJ.png");
        $("#modal").children().eq(0).attr("src", "http://goott351.cafe24.com/ljy/dudu/image/result_IJ.png");
      } else { // IP 유유자적
        // $("#modal").children().eq(0).attr("src", "image/result_IP.png");
        $("#modal").children().eq(0).attr("src", "http://goott351.cafe24.com/ljy/dudu/image/result_IP.png");
      }
    }
  } else {

  }
}

// 검사 시작
function startTest() {
  $('#mainBox').css("display", "block");
  $('#modal').css("display", "none");
  $('#startBtn').attr("disabled", true);
}