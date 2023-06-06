const user = document.querySelector(".user")
const menuuser = document.querySelector(".menuuser")
const lightdark = menuuser.querySelector("#lightdark")
const root = document.documentElement;
user.onclick = ()=>{
    menuuser.classList.toggle("active")
}

body.onclick = ()=>{
    menuuser.classList.remove("active")
}

var dark = {
    "--text":"#ffffff",
    "--bg":"rgb(28, 28, 28)",
    "--headbargb":"#272727",
    "--btbhover":"#00000060",
    "--hover":"#00000050",
    "--boxchld":"#2f2f2f",
    "--searchbar":"#1d1d1d",
    "--border":"#525252",
}

var light = {
    "--text":"#1e1e1e",
    "--bg":"rgb(247, 247, 247)",
    "--headbargb":"#ffffff",
    "--btbhover":"#00000029",
    "--hover":"#00000021",
    "--boxchld":"#ececec",
    "--searchbar":"#f0f0f0",
    "--border":"#dcdcdc",
}

if (JSON.parse(localStorage.getItem("kontube")).themedark) {
        lightdark.classList.add("switch-on")
        root.style.setProperty("--text",dark["--text"])
        root.style.setProperty("--bg",dark["--bg"])
        root.style.setProperty("--headbargb",dark["--headbargb"])
        root.style.setProperty("--btbhover",dark["--btbhover"])
        root.style.setProperty("--hover",dark["--hover"])
        root.style.setProperty("--boxchld",dark["--boxchld"])
        root.style.setProperty("--searchbar",dark["--searchbar"])
        root.style.setProperty("--border",dark["--border"])
}

lightdark.onclick = ()=>{
    var data = JSON.parse(localStorage.getItem("kontube"))
    if (data.themedark==false) {
        root.style.setProperty("--text",dark["--text"])
        root.style.setProperty("--bg",dark["--bg"])
        root.style.setProperty("--headbargb",dark["--headbargb"])
        root.style.setProperty("--btbhover",dark["--btbhover"])
        root.style.setProperty("--hover",dark["--hover"])
        root.style.setProperty("--boxchld",dark["--boxchld"])
        root.style.setProperty("--searchbar",dark["--searchbar"])
        root.style.setProperty("--border",dark["--border"])
        localStorage.setItem("kontube",JSON.stringify({
            "themedark":true
        }))
        lightdark.classList.add("switch-on")

    }else{
        root.style.setProperty("--text",light["--text"])
        root.style.setProperty("--bg",light["--bg"])
        root.style.setProperty("--headbargb",light["--headbargb"])
        root.style.setProperty("--btbhover",light["--btbhover"])
        root.style.setProperty("--hover",light["--hover"])
        root.style.setProperty("--boxchld",light["--boxchld"])
        root.style.setProperty("--searchbar",light["--searchbar"])
        root.style.setProperty("--border",light["--border"])
        localStorage.setItem("kontube",JSON.stringify({
            "themedark":false
        }))
        lightdark.classList.remove("switch-on")

    }
}