function getvideo(){

    let link = document.getElementById('link').value;
    let MainFrom = document.querySelector('.form');
    let imgDiv = document.querySelector('.img');
    let btnDiv = document.querySelector('.btns');
    if(link === '' || link === null ){
        // delete th privous erroe msg
        if(MainFrom.children.length >= 4){   
            MainFrom.removeChild('p');
        }
        let emptyErr = document.createElement('p');
                emptyErr.appendChild(document.createTextNode('ERROR: There is no Link, Make Sure You Pasted'));
                emptyErr.className = "alert alert-danger";
                emptyErr.setAttribute("role", "alert");
                MainFrom.appendChild(emptyErr);
    }else{
        const data = null;
        const xhr = new XMLHttpRequest();
        xhr.withCredentials = true;
        xhr.addEventListener('readystatechange', function () {
            if (this.readyState === this.DONE && this.status === 200) {
                console.log(this.responseText);
                let content = JSON.parse(this.responseText);
                console.log(content);
                document.getElementById('link').value = '';
                if(content.error == false){

                    // delete th privous erroe msg
                    if(MainFrom.children.length >= 4){   
                            MainFrom.removeChild(MainFrom.lastChild);
                    }
                    

                    while(imgDiv.children.length > 0 || btnDiv.children.length > 0){
                        if(imgDiv.children.length > 0)
                        imgDiv.removeChild(imgDiv.lastChild);
                        if(btnDiv.children.length > 0)
                        btnDiv.removeChild(btnDiv.lastChild);
                    }
                    
                    // creat a picture element
                        
                    let pic = document.createElement('img');
                    pic.src = content.picture;
                    imgDiv.appendChild(pic);

                    // check if it is youtube creat a discription element 
                    
                    if(content.src_url.indexOf('youtube') !== -1){
                        let discriptionOfVid = document.createElement('p');
                        discriptionOfVid.appendChild(document.createTextNode(content.description));
                        imgDiv.appendChild(discriptionOfVid);
                    }


                    // creat downlode btn 
                    for (let index = 0; index < content.links.length; index++) {
                        let bttn = document.createElement('button');
                        bttn.className = "bttn btn btn-outline-warning";
                        let urlLink =  content.links[index].link;
                        console.log(urlLink);
                        bttn.setAttribute('onclick', 'window.location.replace(\'' + urlLink + '\')');
                        let text = document.createTextNode(content.links[index].quality);
                        bttn.appendChild(text);
                        btnDiv.appendChild(bttn);
                    }
                        
                }else{
                    

                    if(MainFrom.children.length >= 4){
                        
                        MainFrom.removeChild('p');
                    }

                    let errMsg = content.error_message;
                    let ParagraphErr = document.createElement('p');
                    ParagraphErr.appendChild(document.createTextNode('ERROR:' + errMsg));
                    ParagraphErr.className = "alert alert-danger";
                    ParagraphErr.setAttribute("role", "alert");
                    MainFrom.appendChild(ParagraphErr);
                }
            }
        });

        xhr.open('GET', 'https://social-media-video-downloader.p.rapidapi.com/api/getSocialVideo?url=' + link);
        xhr.setRequestHeader('X-RapidAPI-Key', '87517ad67cmshe8525f79c7d5001p1682d8jsn35cde71c2a38');
        xhr.setRequestHeader('X-RapidAPI-Host', 'social-media-video-downloader.p.rapidapi.com');

        xhr.send(data);
    }
}