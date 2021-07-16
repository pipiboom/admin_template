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
    if (icon.includes('el')) {
      vnodes.push(<i class={icon}></i>)
    } else {
      vnodes.push(<icon-svg icon-class={icon} />)
    }
    if (title) {
      vnodes.push(<span slot='title' style="margin-left: 10px">{(title)}</span>)
    }
    return vnodes
  }
}
</script>
<style lang="less" scoped>
  i {
    margin-right: 0px;
    width: 14px;
    font-size: 14px;
    display: inline-block
  }
</style>
