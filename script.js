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
                var img = document.createElement("img");
                img.src = data[i];
                div.appendChild(img);
                document.body.appendChild(div);
            }
        } 
    }
req.send();