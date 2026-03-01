// Stack with private storage using WeakMap
const _items = new WeakMap();

class Stack {
  constructor() {
    _items.set(this, []);
  }

  push(element) {
    const items = _items.get(this);
    items.push(element);
  }

  pop() {
    const items = _items.get(this);
    return items.pop();
  }

  peek() {
    const items = _items.get(this);
    return items[items.length - 1];
  }

  isEmpty() {
    return _items.get(this).length === 0;
  }

  size() {
    return _items.get(this).length;
  }

  clear() {
    _items.set(this, []);
  }
}
