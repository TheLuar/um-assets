function getLS (key, data)
{
    const json = localStorage.getItem(key);

    if (json) return JSON.parse(json);

    return setLS(key, data);
}

function setLS (key, data)
{
    localStorage.setItem(key, JSON.stringify(data));

    return data;
}

function dom (tag, data, children)
{
    const element = document.createElement(tag);

    if (data) Object.assign(element, data);

    if (children) for (const child of children) element.appendChild(child);

    return element;
}
