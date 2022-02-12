document.addEventListener('DOMContentLoaded', function () {
    const state = getStoredStateOrDefault({
        counter: 30
    })
    showStorageData()
    const $gauge = document.querySelector('.gauge')
    setGaugePercent($gauge, state);
    const tasks = getStoredTasksID(state)
    if (tasks !== -1) {
        setStoredTasks(tasks);
    }
    checkTasksCount();
})

let $checkboxState = document.getElementsByClassName('container__checkbox')[0];
const $markToAdd = document.querySelector('.container__add_icon_hovered');
const input = document.querySelector('.container__new_task input');
let $markToDelSvg = document.querySelector('.container__del_icon_hovered')
let input_text = input.value;
const $tasks = document.querySelector('.container__task');
let $label = document.querySelector('.container__checkbox');

$(document).ready(function () {
    $('.container__new_task input').keydown(function (e) {
        if (e.keyCode === 13) {
            addNewTask();
        }
    });
});


$("body").on('click', '.container__checkbox', function () {
    checkStateChanged(this.childNodes[2]);
});

$("body").on('click', '.container__del_icon_hovered', function () {
    deleteIconClick();
});

$("body").on('click', '.container__del_icon', function () {
    deleteIconClick();
});

if ($label) {
    $label.addEventListener('click', function () {
    })
}

$tasks.addEventListener('click', function () {
    $checkboxState = document.getElementsByClassName('container__checkbox')[0].childNodes[2];
    $label = document.querySelector('.container__checkbox');
    tasksCheck();
})

$markToAdd.addEventListener('click', function () {
    addNewTask();
})

input.addEventListener('input', function (e) {
    input_text = e.target.value;
})

$("body").on('click', '.container__new_task_input', function () {
    $(this).select();
});

if ($markToDelSvg) {
    $markToDelSvg.addEventListener('click', function () {
        deleteLabelTask($(this)[0].parentNode);
        tasksCheck();
    })
}


if ($checkboxState) {
    $checkboxState.addEventListener('click', function () {
        checkStateChanged(this);
    })
}
