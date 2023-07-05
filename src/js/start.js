const body = document.getElementById("body")
const base = document.getElementById("base")
var videoDisplay
var videos
var jsonVideo
var nPlaying
const searchInp0 = document.querySelector(".search-input")
const searchBtn0 = document.querySelector(".search-btn")

async function initResultSearch(text){
    const newURL0 = window.location.pathname + window.location.hash;
    history.replaceState(null, '', newURL0);
    const currentURL = window.location.href;
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set("search",text);
    const newURL = `${currentURL.split('?')[0]}?${urlParams.toString()}`;
    history.pushState(null, '', newURL);

    document.title = "Kết quả tìm kiếm: "+text 
    const searchList = body.querySelector(".search-list")
    var searchIndex = []
    for (let i=0;i<jsonVideo.length;i++) {
        if ((jsonVideo[i]["title"]).toUpperCase().includes(text.toUpperCase()) ||jsonVideo[i]["owner"].toUpperCase().includes(text.toUpperCase())) {
            searchList.innerHTML += `
            <div class="othervideo-items">
                <div class="thumb-othervideo-border">
                    <img class="thumb-othervideo" src="${jsonVideo[i]["thumb"]}" alt="">
                </div>                
                <div class="info-othervideo">
                <p>${jsonVideo[i]["title"]}</p> 
                <p>${jsonVideo[i]["owner"]}</p>
                <p>${shortNum(jsonVideo[i]["view"])} lượt xem</p>
                </div>
            `
            searchIndex.push(i)
        }
    }
    if (searchIndex.length<1) {    
    searchList.innerHTML+=`<p>Không thấy kết quả nào!</p>`
    }
    const othervideoItemSearch = searchList.querySelectorAll(".othervideo-items")
    for (let j=0;j<othervideoItemSearch.length;j++) {
        othervideoItemSearch[j].onclick = async()=>{
            nPlaying=searchIndex[j]
            await fetch(domain+"/src/html/playvideo.html")
            .then(data => data.text())
            .then(DOM => {
                body.style.opacity = 0; 
                setTimeout(()=>{
                    body.innerHTML = DOM 
                    initDatavideo(searchIndex[j])
                    initOthervideo(searchIndex[j]) 
                },500)
                setTimeout(()=>{
                    body.style.opacity = 1;            
                },800)               
            }).catch(err =>{
        console.log("Lỗi tải trang con")
    })
        }
    }

}

searchBtn0.onclick = async()=>{    
    await fetch(domain+"/src/html/search.html")
    .then(data => data.text())
    .then(DOM => {        
        body.style.opacity = 0; 
            setTimeout(()=>{
                body.innerHTML = DOM
                initResultSearch(searchInp0.value.trim())
            },500)
            setTimeout(()=>{
                body.style.opacity = 1;            
            },800)       
    }).catch(err =>{
        console.log("Lỗi tải trang con")
    })
}
searchInp0.addEventListener('keydown',(e)=>{
    if (e.key=="Enter") {
        searchBtn0.onclick()
    }
})
const logo = document.getElementsByClassName("logo")

function shortNum(n){
    v=['','N',' Tr','T','NT','TrT','TT']
    level=0;
    while (n>999) {
        n=n/1000;
        level++;
    }
    n=((n - Math.floor(n))<0.1)?n.toFixed(0):n.toFixed(1);
    return n + v[level];
}

function initDatavideo(i) {
    const newURL0 = window.location.pathname + window.location.hash;
    history.replaceState(null, '', newURL0);
    const currentURL = window.location.href;
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set("video", i);
    const newURL = `${currentURL.split('?')[0]}?${urlParams.toString()}`;
    history.pushState(null, '', newURL);

    const urlVid = body.querySelector("#video")
    urlVid.src = jsonVideo[i]["video"]
    const title = body.querySelector("#title-play")
    title.innerText = jsonVideo[i]["title"]
    document.title = jsonVideo[i]["title"]
    const avt = body.querySelector("#avt-channel")
    avt.src = jsonVideo[i]["avt"]
    const info = body.querySelector(".info-channel-play")
    info.innerHTML=`<p>${jsonVideo[i]["owner"]}</p><p>${shortNum(jsonVideo[i]["sub"])} người đăng ký</p>`
    const nlike = body.querySelector("#like")
    nlike.innerText = shortNum(jsonVideo[i]["like"][0]) + " | "
    const viewdate = body.querySelector("#viewdate")
    viewdate.innerText = shortNum(jsonVideo[i]["view"])+" lượt xem"
    const mota = body.querySelector("#des")
    mota.innerText = jsonVideo[i]["des"]
    const videoPlaying = body.querySelector("#video")
    videoPlaying.volume=0.1;
    var Interval = setInterval(async () => {
        if (videoPlaying.duration == videoPlaying.currentTime && (nPlaying+1 < jsonVideo.length)){
            clearInterval(Interval)
            nPlaying++
            await fetch(domain+"/src/html/playvideo.html")
            .then(data => data.text())
            .then(DOM => {
                body.innerHTML = DOM 
                initDatavideo(nPlaying)
                initOthervideo(nPlaying)               
            }).catch(err =>{
        console.log("Lỗi tải trang con")})
        }
    }, 500);
}

function initOthervideo(i) {
    const othervideos = document.querySelector(".othervideos")
    othervideos.innerHTML=""
    for (let j=0;j<jsonVideo.length;j++){
        if (j!=i) {
            othervideos.innerHTML+=`
            <div class="othervideo-items">
                <div class="thumb-othervideo-border">
                    <img class="thumb-othervideo" src="${jsonVideo[j]["thumb"]}" alt="">
                </div>                
                <div class="info-othervideo">
                <p>${jsonVideo[j]["title"]}</p> 
                <p>${jsonVideo[j]["owner"]}</p>
                <p>${shortNum(jsonVideo[j]["view"])} lượt xem</p>
                </div>
            `
        }
    }
    const othervideoItems = othervideos.querySelectorAll(".othervideo-items")
    for (let j=0;j<othervideoItems.length;j++){
        othervideoItems[j].onclick = async()=>{
            var k = (j>=i)?j+1:j;
            nPlaying=k
            await fetch(domain+"/src/html/playvideo.html")
            .then(data => data.text())
            .then(DOM => {
                body.innerHTML = DOM 
                initDatavideo(k)
                initOthervideo(k)               
            }).catch(err =>{
        console.log("Lỗi tải trang con")})
        }
    }
}

function initVid() {
    document.title = "Kontube - Trang chủ"
    videoDisplay = document.getElementById("videos")
    videoDisplay.innerHTML=""
    for (let i=0;i<jsonVideo.length;i++){
        videoDisplay.innerHTML+=`
            <div class="vid-item-box">
            <div class="thumbvid">
                <img src="${jsonVideo[i]["thumb"]}" alt="">
            </div>
            <div class="info">
                <div class="avt-info circle">
                    <img src="${jsonVideo[i]["avt"]}" alt="">
                </div>
                <div class="title-info">
                    <p>${jsonVideo[i]["title"]}</p> 
                    <p>${jsonVideo[i]["owner"]}</p>
                    <p>${shortNum(jsonVideo[i]["view"])} lượt xem</p>
                </div>
            </div>
        </div>
            `
    }
    videos = document.getElementsByClassName("vid-item-box")
    for (let i=0;i<videos.length;i++) {
    videos[i].onclick = async()=>{
        nPlaying=i
        await fetch(domain+"/src/html/playvideo.html")
            .then(data => data.text())
            .then(DOM => {
                body.style.opacity = 0; 
                setTimeout(()=>{
                    body.innerHTML = DOM 
                    initDatavideo(i)
                    initOthervideo(i) 
                },500)
                setTimeout(()=>{
                    body.style.opacity = 1;            
                },800)               
            }).catch(err =>{
        console.log("Lỗi tải trang con")
    })
    }
   }    
}

logo[0].onclick = async()=>{
    const currentURL = window.location.href
    const newURL = currentURL.split('?')[0]
    window.location.href = newURL
    await fetch(domain+"/src/html/home.html")
    .then(data => data.text())
    .then(DOM => {
        body.style.opacity = 0; 
        setTimeout(()=>{
            body.innerHTML = DOM 
            initVid()                    
        },500)
        setTimeout(()=>{
            body.style.opacity = 1;            
        },800) 
        body.innerHTML = DOM
    }).catch(err =>{
        console.log("Lỗi tải trang con")
    })
}

async function fetchData(x,json){
    if (x==1) {
        await fetch(`https://647ca80fc0bae2880ad10a44.mockapi.io/video`, {
        method: 'GET',
        headers: {'content-type':'application/json'},
      })
        .then(data => data.json())
        .then(out => {
    jsonVideo=out                
    }).catch(err =>{
        console.log("Lỗi tương tác API"+err)
    })
    }
    if (x==2) {
        await fetch(`https://647ca80fc0bae2880ad10a44.mockapi.io/video`,{
            method: 'POST',
            headers: {'content-type':'application/json'},
            body: JSON.stringify(json)
    })
}}


window.addEventListener('load',async ()=>{
    let urlParams = new URLSearchParams(window.location.search)
    videoOnSearch = 
    await fetchData(1)
    if (urlParams.get('search')!=null) {
        await fetch(domain+"/src/html/search.html")
    .then(data => data.text())
    .then(DOM => {        
        body.style.opacity = 0; 
            setTimeout(()=>{
                body.innerHTML = DOM
                initResultSearch(urlParams.get('search'))
            },500)
            setTimeout(()=>{
                body.style.opacity = 1;            
            },800)       
    }).catch(err =>{
        console.log("Lỗi tải trang con")
    })
    return
    }
    if (urlParams.get('video')!=null && parseInt(urlParams.get('video')) >= 0 && parseInt(urlParams.get('video')) < jsonVideo.length) {
        await fetch(domain+"/src/html/playvideo.html")
            .then(data => data.text())
            .then(DOM => {
                body.style.opacity = 0; 
                setTimeout(()=>{
                    body.innerHTML = DOM 
                    initDatavideo(parseInt(urlParams.get('video')))
                    initOthervideo(parseInt(urlParams.get('video'))) 
                },500)
                setTimeout(()=>{
                    body.style.opacity = 1;            
                },800)               
            }).catch(err =>{
        console.log("Lỗi tải trang con")
        })
        return
    }else{
        console.log("404 tài nguyên")
    }
    await fetch(domain+"/src/html/home.html")
    .then(data => data.text())
    .then(DOM => {
        body.innerHTML = DOM
        initVid()
    }).catch(err =>{
        console.log("Lỗi tải trang con")
    })
})

//UPLOAD
const uploadBtn = document.querySelector(".upload")

async function initUploadPage(){
    document.title = "Tải video lên Kontube"
    const inputdataupdate = body.querySelectorAll(".inputdataupdate")
    const title = body.querySelector(".title-update")
    const thumb = body.querySelector("#thumb-update")
    const vid = body.querySelector("#video-update")
    var check=[false,false,false,false,false,false,false,false]
    //TITLE
    inputdataupdate[0].oninput = ()=>{
        if (inputdataupdate[0].value.trim()!=""){
            title.innerText = inputdataupdate[0].value.trim()
            check[0]=true
        }else{
            title.innerText = "Hãy đặt tiêu đề!"
            check[0]=false
        }
    }
    //THUMB    
    inputdataupdate[1].oninput = ()=>{
        thumb.src = inputdataupdate[1].value.trim()  
        check[1]=false
        thumb.addEventListener("load",()=>{
            check[1]=true
        })          
    }
    //Video
    inputdataupdate[2].oninput = ()=>{
        vid.src = inputdataupdate[2].value.trim()  
        check[2]=false
        vid.addEventListener("loadeddata",()=>{
            check[2]=true
        })          
    }
    //DETAIL
    const channel = body.querySelector(".info-channel-update")
    const channelDetails = channel.querySelectorAll("p")
    inputdataupdate[3].oninput = ()=>{
        if (inputdataupdate[3].value.trim()!=""){
            channelDetails[0].innerText = inputdataupdate[3].value.trim()
            check[3]=true
        }else{
            channelDetails[0].innerText = "Hãy đặt tên kênh!"
            check[3]=false
        }
    }
    inputdataupdate[4].oninput = ()=>{
        if (inputdataupdate[4].value.trim()!="" && (parseInt(inputdataupdate[4].value) <100000000000000) &&(parseInt(inputdataupdate[4].value)>0) ){
            channelDetails[1].innerText = shortNum(parseInt(inputdataupdate[4].value))+" Người đăng ký"
            check[4]=true
        }else{
            channelDetails[1].innerText = "? Người đăng ký"
            check[4]=false
        }
    }
    inputdataupdate[5].oninput = ()=>{
        if (inputdataupdate[5].value.trim()!="" && (parseInt(inputdataupdate[5].value) <100000000000000) &&(parseInt(inputdataupdate[5].value)>0) ){
            check[5]=true
        }else{
            check[5]=false
        }
    }
    //Like
    const likeupdate = body.querySelector("#likeupdate")
    inputdataupdate[6].oninput = ()=>{
        if (inputdataupdate[6].value.trim()!="" && (parseInt(inputdataupdate[6].value) <100000000000000) &&(parseInt(inputdataupdate[6].value)>0) ){
            likeupdate.innerText = shortNum(parseInt(inputdataupdate[6].value))+" | "
            check[6]=true
        }else{
            likeupdate.innerText = " --- | "
            check[6]=false
        }
    }
    //AVT
    const avtupdate = body.querySelector("#avt-update")
    inputdataupdate[7].oninput = ()=>{
        avtupdate.src = inputdataupdate[7].value.trim()  
        check[7]=false
        avtupdate.addEventListener("load",()=>{
            check[7]=true
        })          
    }
    const noice = body.querySelector("#noice-update") 
    const cancelBtn = body.querySelector("#cancel-update") 
    const saveBtn = body.querySelector("#save-update") 
    saveBtn.onclick = async()=>{
        noice.style.color="red"
        if (!check[0]) {
            noice.innerText = "Bạn chưa nhập tên video"
        }else if (!check[1]) {
            noice.innerText = "Link Thumbnail có vấn đề, hãy thử lại!"
        }else if (!check[2]) {
            noice.innerText = "Link video có vấn đề, hãy thử lại!"
        }else if (!check[3]) {
            noice.innerText = "Bạn chưa nhập tên kênh!"
        }else if (!check[4]) {
            noice.innerText = "Lượt đăng ký có vấn đề, hãy thử lại!"
        }else if (!check[5]) {
            noice.innerText = "Lượt xem có vấn đề, hãy thử lại!"
        }else if (!check[6]) {
            noice.innerText = "Lượt thích có vấn đề, hãy thử lại!"
        }else if (!check[7]) {
            noice.innerText = "Link avatar có vấn đề, hãy thử lại!"
        }else {
            console.log("OKKKK")
            noice.style.color="green"
            noice.innerText = "Thành công, đang lưu video lại!"
            const jsonUp={
                "title":inputdataupdate[0].value.trim(),
                "owner":inputdataupdate[3].value.trim(),
                "view":parseInt(inputdataupdate[5].value),
                "sub":parseInt(inputdataupdate[4].value),
                "avt":inputdataupdate[7].value.trim(),
                "thumb":inputdataupdate[1].value.trim(),
                "video":inputdataupdate[2].value.trim(),
                "des":inputdataupdate[8].value.trim(),
                "like":[parseInt(inputdataupdate[6].value),0]
            }
            await fetchData(2,jsonUp)
            noice.innerText = "Tải lên thành công, đang về trang chủ!"
            setTimeout(()=>{
                location.reload()
            },1000)
            
        }
    }
    cancelBtn.onclick = ()=>{
        location.reload()
    }
    

}


uploadBtn.onclick = async () =>{
    await fetch(domain+"/src/html/upload.html")
    .then(data => data.text())
    .then(DOM => {
        body.style.opacity = 0;
        setTimeout(async()=>{
            body.innerHTML = DOM
            await initUploadPage()
        },500)
        setTimeout(()=>{
            body.style.opacity = 1;            
        },800)
        
    }).catch(err =>{
        console.log("Lỗi tải trang con")
    })
    
}

