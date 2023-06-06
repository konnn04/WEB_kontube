var jsonVideo
fetch("./src/data/datavideo.json")
            .then(data => data.json())
            .then(out => {
                jsonVideo=out                
            }).catch(err =>{
        console.log("Lỗi tải thông tin")})