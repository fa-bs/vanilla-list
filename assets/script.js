const main = document.querySelector(".main");
const input = document.querySelector(".input");
const switcher = document.querySelector(".switch>input")
const congrats = document.querySelector(".congrats")
// console.log("autoSave:", switcher.checked);

switcher.checked = JSON.parse(localStorage.getItem('autoSave'))

//check localStorage
if (localStorage.getItem('myList')) {
    main.innerHTML = JSON.parse(localStorage.getItem('myList'))
    if (main.childNodes.length > 0) {
        congrats.classList.replace("fade-in", "fade-out")
    }
}

//check real height from screen
function realHeight() {
    document.documentElement.style.setProperty('--real-height', `${window.innerHeight}px`);
}
window.addEventListener('load', realHeight);
window.addEventListener('resize', realHeight);

function addTask() {
    if (input.value) {
        const date = new Date()
        const dateId = date.getTime()
        // console.log(dateId);
        const newItem = document.createElement("li")
        newItem.setAttribute("id", dateId)
        newItem.innerHTML = `<div id="item-${dateId}" class="item fade-in">
        <div class="item-text">${input.value}</div>
        <div class="item-icon" onclick="checkTask(${dateId})"><i id="icon-${dateId}" class="bi bi-circle"></i></div>
        <div class="btn-delete" onclick="deleteTask(${dateId})"><i class="bi bi-circle-fill"></i></div>
        </div>
        <div class="dates"><small style="--delay: .2s" class="date fade-in"> Created: ${date.toDateString()} • ${date.toLocaleTimeString()}
        </small></div>
    `
        main.prepend(newItem)
        // main.append(newItem)
        input.value = ""
        congrats.classList.replace("fade-in", "fade-out")
        input.focus()
    } else {
        input.focus()
        input.classList.add("input-attn")
        setTimeout(() => {
            input.classList.remove("input-attn")
        }, 1000);
    }
    if (switcher.checked) localStorage.setItem('myList', JSON.stringify(main.innerHTML))
}

input.addEventListener("keydown", (event) => {
    if (event.keyCode === 13) {
        event.preventDefault()
        addTask()
    }
});

function checkTask(id) {
    const li = document.getElementById(id);
    const item = document.getElementById("item-" + id)
    const icon = document.getElementById("icon-" + id)
    const divDates = li.lastElementChild
    const date = new Date()

    item.classList.toggle("item-done")

    if (!icon.classList.contains("bi-check-circle-fill")) {
        li.parentNode.appendChild(li)

        const itemFinished = document.createElement("small")
        itemFinished.innerHTML = ` <small style="--delay: .5s" class="date fade-in finished"> Finished: ${date.toDateString()} •
        ${date.toLocaleTimeString()} </small>`
        divDates.appendChild(itemFinished)

    }
    else {
        li.parentNode.prepend(li)
        divDates.removeChild(divDates.lastElementChild)
    }

    icon.classList.toggle("bi-circle")
    icon.classList.toggle("bi-check-circle-fill")

    if (switcher.checked) localStorage.setItem('myList', JSON.stringify(main.innerHTML))
}

function deleteTask(id) {
    const task = document.getElementById(id)
    task.classList.add("fade-out")
    setTimeout(() => {
        task.remove()
        main.classList.add("refresh-itens")
        if (switcher.checked) localStorage.setItem('myList', JSON.stringify(main.innerHTML))
        setTimeout(() => {
            main.classList.remove("refresh-itens")
        }, 700);
        if (main.childNodes.length == 0) {
            congrats.classList.replace("fade-out", "fade-in")
            input.focus()
        }
    }, 900)

    screen.width > 375 && input.focus()
}

switcher.addEventListener('change', () => {
    localStorage.setItem('autoSave', JSON.stringify(switcher.checked))
})

//save in localStorage
/* const saveList = () => {
    localStorage.setItem('myList', JSON.stringify(main.innerHTML))
    btnSave.innerHTML = `<i class="bi bi-save2-fill" ></i>`
    setTimeout(() => {
        btnSave.innerHTML = `save <i class="bi bi-save2-fill" ></i>`
    }, 1000);
} */

