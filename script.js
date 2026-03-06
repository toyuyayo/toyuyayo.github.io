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

document.querySelectorAll(".antenna").forEach(el=>{
    el.addEventListener("click",function(e){

        const id = this.dataset.id;

        const result = prompt("選択してください\n1: あり\n2: なし");

        if(result === "1"){

            excluded = excluded.filter(x => x !== id);

            if(!selected.includes(id)){
                selected.push(id);
            }

            this.classList.remove("absent");
            this.classList.add("active");

        }else if(result === "2"){

            selected = selected.filter(x => x !== id);

            if(!excluded.includes(id)){
                excluded.push(id);
            }

            this.classList.remove("active");
            this.classList.add("absent");

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
