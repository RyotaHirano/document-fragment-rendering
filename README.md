# document fragment rendering

```text
$ yarn
$ yarn start
```

#### mode: 0
*create 2000 row Table Ave Time: **180-240ms*** (first loading)
- use `document.createDocumentFragment()`
- use `document.cloneNode()`
- **not use `document.querySelectorAll()`**

#### mode: 1 (slowly)
*create 2000 row Table Ave Time: **1700-2000ms*** (first loading)
- not use `document.createDocumentFragment()`
- not use `document.cloneNode()`
- **use `document.querySelectorAll()`**