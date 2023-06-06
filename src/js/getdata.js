var jsonVideo
fetch(domain+"/src/data/datavideo.json")
            .then(data => data.json())
            .then(out => {
                jsonVideo=out                
            }).catch(err =>{
        console.log("Lỗi tải thông tin")})

if (!(localStorage.getItem("kontube"))){
    localStorage.setItem("kontube",JSON.stringify({
        "themedark":false
    }))
}