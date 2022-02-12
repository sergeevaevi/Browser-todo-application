function hideCountElements() {
    let gauge = document.getElementsByClassName('gauge')[0];
    let tasks_num = document.getElementsByClassName('container__tasks_number')[0];
    gauge.style.display = 'none';
    tasks_num.style.display = 'none';
}

function showCountElements() {
    let gauge = document.getElementsByClassName('gauge')[0];
    let begin_svg = document.getElementsByClassName('container__begin_svg')[0];
    let congrats_svg = document.getElementsByClassName('container__congrats_svg')[0];
    let tasks_num = document.getElementsByClassName('container__tasks_number')[0];
    gauge.style.display = 'block';
    tasks_num.style.display = 'block';
    if (begin_svg) {
        begin_svg.style.display = 'none';
    }
    if (congrats_svg) {
        congrats_svg.style.display = 'none';
    }
}

function getTasksCount() {
    let temp = document.getElementById('mCSB_1_container');
    let children = temp.childNodes;
    return countElements(children);
}

function setTaskCount(num) {
    let taskCounter = document.querySelector('.container__tasks_number');
    taskCounter.textContent = num + " tasks to do";
}

function checkTasksCount() {
    let numOfTasks = getTasksCount();
    let listCheckItems = $(".container__checkbox :checkbox");
    let checkedItems = listCheckItems.filter(":checked").length;
    let numOfTasksToDo = numOfTasks - checkedItems;
    setTaskCount(numOfTasksToDo);
    const $gauge = document.querySelector('.gauge');
    let progress = Math.round(checkedItems * 100 / numOfTasks);
    if (numOfTasks === 0 && checkedItems === 0) {
        setBeginningSVG()
    } else {
        if (numOfTasksToDo === 0) {
            setCongratsSVG()
            removeAllLabels();
        }
    }
    setGaugePercent($gauge, progress);
    saveState(numOfTasks)
}

function tasksCheck() {
    checkTasksCount();
}

function deleteLabelTask(thisLabel) {
    let parent = thisLabel.parentNode;
    if (!parent) {
        return;
    }
    let num = getElementIndex(parent.children, thisLabel);
    removeTask(thisLabel.getElementsByTagName('span')[0].textContent);
    thisLabel.remove();
}

function createLabelTask(task) {
    let label = document.createElement('label');
    label.className = "container__checkbox";
    label.innerHTML =
        "<input type=\"checkbox\" class=\"checkbox\" name=\"container__task_input\" \n>\n<b ></b>\n<span>" +
        task + "</span>\n<b class=\"container__del_icon\">\n<svg width=\"12\" height=\"12\" viewBox=\"0 0 12 12\" fill=\"none\"\n" +
        "xmlns=\"http://www.w3.org/2000/svg\">\n<path fill-rule=\"evenodd\" clip-rule=\"evenodd\"\n" +
        "d=\"M7.41401 6L11.707 1.707C12.098 1.316 12.098 0.683998 11.707 0.292998C11.316 -0.0980018 10.684 -0.0980018 10.293 0.292998L6.00001 4.586L1.70701 0.292998C1.31601 -0.0980018 0.684006 -0.0980018 0.293006 0.292998C-0.0979941 0.683998 -0.0979941 1.316 0.293006 1.707L4.58601 6L0.293006 10.293C-0.0979941 10.684 -0.0979941 11.316 0.293006 11.707C0.488006 11.902 0.744006 12 1.00001 12C1.25601 12 1.51201 11.902 1.70701 11.707L6.00001 7.414L10.293 11.707C10.488 11.902 10.744 12 11 12C11.256 12 11.512 11.902 11.707 11.707C12.098 11.316 12.098 10.684 11.707 10.293L7.41401 6Z\"\n" +
        "fill=\"#A5A5A5\"/>\n</svg>\n</b>\n<b class=\"container__del_icon_hovered\">\n\n<svg width=\"12\" height=\"12\" viewBox=\"0 0 12 12\" fill=\"none\"\n" +
        "xmlns=\"http://www.w3.org/2000/svg\">\n<path fill-rule=\"evenodd\" clip-rule=\"evenodd\"\n" +
        "d=\"M7.41401 6L11.707 1.707C12.098 1.316 12.098 0.684 11.707 0.293C11.316 -0.0979999 10.684 -0.0979999 10.293 0.293L6.00001 4.586L1.70701 0.293C1.31601 -0.0979999 0.684006 -0.0979999 0.293006 0.293C-0.0979941 0.684 -0.0979941 1.316 0.293006 1.707L4.58601 6L0.293006 10.293C-0.0979941 10.684 -0.0979941 11.316 0.293006 11.707C0.488006 11.902 0.744006 12 1.00001 12C1.25601 12 1.51201 11.902 1.70701 11.707L6.00001 7.414L10.293 11.707C10.488 11.902 10.744 12 11 12C11.256 12 11.512 11.902 11.707 11.707C12.098 11.316 12.098 10.684 11.707 10.293L7.41401 6Z\"\n" +
        "fill=\"#252526\"/>\n</svg>\n</b>"
    return label;
}

function addNewTask() {
    if (saveTask(input_text)) {
        showCountElements();
        let label = createLabelTask(input_text);
        let newTask = document.querySelector('#mCSB_1_container');
        newTask.append(label);
        input.value = "What’s next?";
        input_text = input.value;
        checkTasksCount();
    }
}

function deleteIconClick() {
    let lbl = document.querySelector('.container__checkbox:hover')
    deleteLabelTask(lbl);
    tasksCheck();
}


function checkStateChanged(it) {
    let state = it.previousElementSibling.checked;
    let task = it.nextElementSibling.textContent;
    saveCheckState(state, task);
    showStorageData()

}

function removeAllLabels() {
    clearStorage();
    let temp = document.getElementById('mCSB_1_container');
    temp.innerHTML = '';
}

