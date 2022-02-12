function getStoredStateOrDefault(defaultState) {
    const stateAsStr = localStorage.getItem('todayAppState');
    if (stateAsStr) {
        return JSON.parse(stateAsStr);
    } else {
        return defaultState;
    }
}

function getStoredTasksID(state) {
    let task_list = localStorage.getItem("task_list");
    if (task_list) {
        return JSON.parse(task_list);
    } else {
        console.log("task_list empty")
        const task_list_ = new Array(0);
        localStorage.setItem("task_list", JSON.stringify(task_list_));
        return -1;
    }
}

function setStoredTasks(tasks_id) {
    for (let i = 0, length = tasks_id.length; i < length; i++) {
        let one_task_id = tasks_id[i]
        let task = JSON.parse(localStorage.getItem((one_task_id).toString()));
        let task_state = JSON.parse(localStorage.getItem((task).toString()));
        let label = createLabelTask(task, task_state);
        let newTask = document.querySelector('#mCSB_1_container');
        newTask.append(label);
        if (task_state) {
            let input = document.querySelector('.container__checkbox:last-child .checkbox');
            input.checked = true;
        }
    }
}

function clearStorage() {
    localStorage.clear();
    const task_list_ = new Array(0);
    localStorage.setItem("task_list", JSON.stringify(task_list_));

}

function saveState(state) {
    localStorage.setItem('todayAppState', JSON.stringify(state));
}

function saveCheckState(state, task) {
    if (getKeyByValue(task) !== -1) {
        localStorage.setItem(task, JSON.stringify(state ? 1 : 0));
    }
}

function saveTask(task) {
    let key = getKeyByValue(task);
    let existed = localStorage.getItem(task);
    if (existed) {
        return false;
    }
    let id_list = [];
    let task_list = getStoredTasksID(1);
    if (task_list) {
        let max_id = 0;
        for (let i = 0; i < task_list.length; i++) {
            let id = task_list[i];
            id_list.push(id);
            if (max_id < id) {
                max_id = id;
            }
        }
        localStorage.setItem((max_id + 1).toString(), JSON.stringify(task));
        id_list.push(max_id + 1)
    } else {
        let num = getTasksCount();
        localStorage.setItem((num).toString(), JSON.stringify(task));
        id_list.push(num)
    }
    localStorage.setItem((task).toString(), JSON.stringify(0));
    localStorage.setItem("task_list", JSON.stringify(id_list));
    return true;
}

function showStorageData() {
    for (let i = 0, length = localStorage.length; i < length; i++) {
        // ключ
        const key = localStorage.key(i);
        // значение
        const key_value = localStorage[key];
        console.log(`${key}: ${key_value}`);
    }
}