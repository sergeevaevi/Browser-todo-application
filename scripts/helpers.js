const GAUGE_MAX = 329

function setGaugePercent($node, percent) {
    const $gaugeCircle = $node.querySelector('.gauge__cirlce-arc')
    const $gaugePercent = $node.querySelector('.gauge__percent')

    const value = GAUGE_MAX * (percent / 100)

    $gaugeCircle.setAttribute('stroke-dasharray', `${value} ${GAUGE_MAX}`)
    $gaugePercent.innerText = percent
}

function getKeyByValue(value) {
    for (let i = 0, length = localStorage.length; i < length; i++) {
        const key = localStorage.key(i);
        const key_value = JSON.parse(localStorage[key]);
        if (JSON.stringify(key_value) === JSON.stringify(value)) {
            return key;
        }
    }
    return -1;
}

function removeTask(task) {
    showStorageData()
    let key = getKeyByValue(task);
    localStorage.removeItem(task);
    localStorage.removeItem(key);
    let id_list = getStoredTasksID(1);
    for (let i = 0; i < id_list.length; i++) {
        if (id_list[i] == key) {
            id_list.splice(i, 1);
        }
    }
    localStorage.setItem('task_list', JSON.stringify(id_list));
    showStorageData()

}

function countElements(children) {
    let count = 0;
    for (let i = 0, m = children.length; i < m; i++) {
        if (children[i].nodeType === document.ELEMENT_NODE) {
            count++;
        }
    }
    return count;
}

function getElementIndex(children, child) {
    let count = 0;
    for (let i = 0, m = children.length; i < m; i++) {
        if (children[i].nodeType === document.ELEMENT_NODE) {
            if (children[i] === child) {
                return i;
            }
        }
        count++;
    }
    return count;
}

function getRandomInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
