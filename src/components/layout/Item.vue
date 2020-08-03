<script>
export default {
  name: 'MenuItem',
  functional: true,
  props: {
    icon: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    }
  },
  render(h, context) {
    const { icon, title } = context.props
    const vnodes = []
    if (icon.includes('svg')) {
      vnodes.push(<icon-svg icon-class={icon} />)
    } else {
      vnodes.push(<i class={icon}></i>)
    }
    if (title) {
      vnodes.push(<span slot='title' style="margin-left: 10px">{(title)}</span>)
    }
    return vnodes
  }
}
</script>
<style lang="stylus" scoped>
  i {
    margin-right: 0px !important;
    width: 14px !important;
    font-size: 14px !important;
    display: inline-block
  }
</style>
