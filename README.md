# vue-slot-ops
## what
a handy Vue.js mixin to do various operations in slots

<br />

## TL;DR
1. `npm i -s vue-slot-ops`
2. `import ops from 'vue-slot-ops'`
3.
    ```
    mixins: [ ops({
      filter: e => e.tag === 'img',
      limit: 2,
      wrap: 'li',
    }) ]
    ```

<br />

## why
I've been doing the same tools with a component (`vue-b-slot`), which i believe was the right choice... if we have native fragments. The implementation I've been rolling with vue-fragment is good for some use-cases, but probably not for an other npm component. This attempt is mixin based, so it wires on your actual component instead, and hack into the render function to work on slots. It's quite easy code to understand, so I hope you'll find it handy.
