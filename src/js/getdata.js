// var jsonVideo

// await fetch(`https://647ca80fc0bae2880ad10a44.mockapi.io/video`, {
//         method: 'GET',
//         headers: {'content-type':'application/json'},
//       })
//         .then(data => data.json())
//         .then(out => {
//     jsonVideo=out                
// })
// } catch(err) {
//     console.log("Lỗi tải thông tin")}



if (!(localStorage.getItem("kontube"))){
    localStorage.setItem("kontube",JSON.stringify({
        "themedark":false
    }))
}