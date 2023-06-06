const body = document.getElementById("body")
const base = document.getElementById("base")
var videoDisplay
var videos

const logo = document.getElementsByClassName("logo")

function shortNum(n){
    v=[' N',' Tr',' T']
    level=-1;
    while (n>999) {
        n=n/1000;
        level++;
    }
    n=((n - Math.floor(n))<0.1)?n.toFixed(0):n.toFixed(1);
    return n + v[level];
}

function initDatavideo(i) {
    const urlVid = body.querySelector("#vid")
    urlVid.src = jsonVideo[i]["video"]
    const title = body.querySelector("#title-play")
    title.innerText = jsonVideo[i]["title"]
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
            await fetch("./src/html/playvideo.html")
            .then(data => data.text())
            .then(DOM => {
                body.innerHTML = DOM 
                var k = (j>=i)?j+1:j;
                initDatavideo(k)
                initOthervideo(k)               
            }).catch(err =>{
        console.log("Lỗi tải trang con")})
        }
    }
}

function initVid() {
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
        await fetch("./src/html/playvideo.html")
            .then(data => data.text())
            .then(DOM => {
                body.innerHTML = DOM 
                initDatavideo(i)
                initOthervideo(i)               
            }).catch(err =>{
        console.log("Lỗi tải trang con")
    })
    }
   }    
}

logo[0].onclick = async()=>{
    await fetch("./src/html/home.html")
    .then(data => data.text())
    .then(DOM => {
        body.innerHTML = DOM
        initVid()
    }).catch(err =>{
        console.log("Lỗi tải trang con")
    })
}



window.addEventListener('load',async ()=>{
    //await fetch("/src/html/home.html")
    await fetch("./src/html/home.html")
    .then(data => data.text())
    .then(DOM => {
        body.innerHTML = DOM
        initVid()
    }).catch(err =>{
        console.log("Lỗi tải trang con")
    })
})