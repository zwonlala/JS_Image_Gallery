var req = new XMLHttpRequest();
    req.open("GET", "./json/image_list.json");
    req.onreadystatechange = function() {
        if (this.readyState == 4) {
        // console.log(this.response);

        var data = JSON.parse(this.response);
            for (var i=0; i<data.length; i++) {
                var div = document.createElement("div");
                div.setAttribute("class", "image");
                div.onclick = function() {
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

                div.onmouseover = function() {
                    var element = this;
                    this.timerId = setTimeout(function() {
                        element.classList.add("image-magnified");
                    }, 1000);
                }

                div.onmouseout = function() {
                    clearTimeout(this.timerId);
                    this.classList.remove("image-magnified");
                }

                var img = document.createElement("img");
                img.src = data[i];
                div.appendChild(img);
                document.body.appendChild(div);
            }
        } 
    }
req.send();

function selectAll(btn) {
    var images = document.getElementsByClassName("image");
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