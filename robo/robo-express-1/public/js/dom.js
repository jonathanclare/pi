const on = (element, types, listener, useCapture) =>
{
    useCapture = useCapture === undefined ? true : false;
    for (var type of types.split(' ')) element.addEventListener(type, listener);
};

export {on};