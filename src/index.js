export const by_name = (criteria, textnodes = false) => e => {
  if (!e.componentOptions && !e.tag)
    return textnodes && !!e.text.trim().length

  const name = e.componentOptions ? e.componentOptions.Ctor.extendOptions.name || e.tag : e.tag

  if (criteria instanceof RegExp)
    return criteria.test(name)
  else
    return name.indexOf(criteria) !== -1
}

export default op => {
  const ops = Array.isArray(op) ? op : [op]

  return {
    beforeCreate() {
      const _render = this._render;

      this._render = function() {
        ops.forEach(({ slot = 'default', filter = null, limit = 0, each = null, wrap = null }) => {
          if (!this.$slots[slot] || !this.$slots[slot].length)
            return false

          // filter
          if (filter instanceof Function)
            this.$slots[slot] = this.$slots[slot].filter((e, i, a) => filter(e, i, a.length))

          // limit
          if (limit > 0)
            this.$slots[slot] = this.$slots[slot].slice(0, limit)

          // each
          if (each instanceof Function)
            this.$slots[slot].forEach((e, i, a) => each(e, i, a.length))

          // wrap
          if (wrap)
            this.$slots[slot] = this.$slots[slot].map(child => this.$createElement(wrap, null, [child]))
        })

        // finally, be transparent
        return _render.apply(this, arguments);
      }
    }
  }
};

