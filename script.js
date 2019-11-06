var req = new XMLHttpRequest(); //XMLHttpRequest 객체 생성
req.open("GET", "./json/image_list.json"); // "GET" HTTP request method를 사용해 새로운 req open(). 이미지 파일을 읽어옴
req.onreadystatechange = function() { //req의 onreadystatechange에 콜백 함수 설정
    if (this.readyState == 4) { //this.readyStater가 4(COMPLETED) 일 경우 동작. 모든 데이터가 정상으로 수신되었을 때
    // console.log(this.response);

    var data = JSON.parse(this.response); //this.response 문자열을 객체를 만들어 data에 저장. 데이터 파싱
        console.log(data);
        for (var i=0; i<data.length; i++) {
            var div = document.createElement("div");
            div.setAttribute("class", "image");
            div.onclick = function() { //클릭시 실행되는 이벤트
                //div태그의 class 속성에 "image"만 있으면(처음 클릭 시) "image image-selected"로 설정하고
                //class 속성에 "image-selected"가 있으면(두번째 클릭 시) "image"로 설정
                // if (this.getAttribute("class").indexOf("image-selected") == -1) {
                //     this.setAttribute("class", "image image-selected");
                // }
                // else {
                //     this.setAttribute("class", "image");
                // }

                //classList와 toggle을 사용하면 다음과 같이 한줄로 사용 가능
                this.classList.toggle("image-selected");
            };

            //마우스가 이미지 위로 올라갔을 때 실행되는 이벤트. 자세히 보기 기능
            div.onmouseover = function() {
                var element = this; //element에 div 저장
                this.timerId = setTimeout(function() { //this.timerId에 setTimeout의 리턴값 저장.
                    element.classList.add("image-magnified");
                }, 1000);
            }

            //마우스가 이미지 위에서 사라졌을때 실행되는 이벤트.
            div.onmouseout = function() {
                clearTimeout(this.timerId); //this.timerId에 해당하는 타이머 제거
                this.classList.remove("image-magnified");
            }

            var img = document.createElement("img");
            img.src = data[i]; //위에서 만든 img 태그의 src 속성을 설정
            div.appendChild(img); //img 태그 div에 추가
            document.body.appendChild(div); // div 태그 body에 추가
        }
    } 
}
req.send(); //요청을 전송

//전체 선택 기능
function selectAll(btn) {
    var images = document.getElementsByClassName("image"); //"image"라는 class를 갖는 태그들을 모두 받아옴
    for (var i=0; i<images.length; i++) {
        if (btn.value = "Unselect All") {
            btn.value = "Select All"; 
            images[i].classList.remove("image-selected");
        }
        else {
            btn.value = "Unselect All";
            images[i].classList.add("image-selected");
        }
    }
}