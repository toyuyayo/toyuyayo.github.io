let selected = [];
let excluded = [];
let autoOpened = false;

// 🔥 座標取得用
document.getElementById("map").addEventListener("click", function(e){
    const rect = this.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    console.log("top:" + y + "px; left:" + x + "px;");
});

// 🔥 アンテナ3状態切替
document.querySelectorAll(".antenna").forEach(el=>{
    el.addEventListener("click",function(e){
        e.stopPropagation();
        const id = this.dataset.id;

        if(selected.includes(id)){
            selected = selected.filter(s => s !== id);
            excluded.push(id);
            this.classList.remove("active");
            this.classList.add("absent");

        }else if(excluded.includes(id)){
            excluded = excluded.filter(s => s !== id);
            this.classList.remove("absent");

        }else{
            selected.push(id);
            this.classList.add("active");
        }

        updateResult();
    });
});

function updateResult(){
    const filtered = patterns.filter(p =>
        selected.every(s => p.antennas.includes(s)) &&
        excluded.every(x => !p.antennas.includes(x))
    );

    document.getElementById("count").innerText =
        "残り" + filtered.length + "通り";

    const resultDiv = document.getElementById("result");
    resultDiv.innerHTML = "";

    filtered.forEach(p=>{
        const img = document.createElement("img");
        img.src = p.name;

        img.addEventListener("click", function(){
            modal.style.display = "flex";
            modalImg.src = this.src;
        });

        resultDiv.appendChild(img);
    });

    if(filtered.length === 1 && !autoOpened){
        modal.style.display = "flex";
        modalImg.src = filtered[0].name;
        autoOpened = true;
    }

    if(filtered.length !== 1){
        autoOpened = false;
    }
}

const modal = document.getElementById("modal");
const modalImg = document.getElementById("modalImg");
const closeBtn = document.getElementById("closeBtn");

closeBtn.addEventListener("click", function(){
    modal.style.display = "none";
});

modal.addEventListener("click", function(e){
    if(e.target === modal){
        modal.style.display = "none";
    }
});

document.getElementById("resetBtn").addEventListener("click", function(){
    selected = [];
    excluded = [];

    document.querySelectorAll(".antenna").forEach(el=>{
        el.classList.remove("active");
        el.classList.remove("absent");
    });

    updateResult();
});

updateResult();
