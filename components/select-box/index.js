import { customAlphabet } from 'nanoid'

export default {
  props: {
    options: {
      type: Array,
      validator(options) {
        return options.every((object) => 'text' in object && 'value' in object)
      },
      default: [],
    },
    selected: {
      type: String,
      default: '',
    },
    name: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      selectedValue: this.selected,
      selectedData: null,
      showList: false,
      isCloseList: false,
      selectId: this.generateSelectId(),
    }
  },
  mounted() {
    document.addEventListener('click', this.clickOutSide, false)
    this.onSelect()
  },
  destroyed() {
    document.removeEventListener('click', this.clickOutSide, false)
  },
  methods: {
    getSelected() {
      return this.selectedValue
    },
    onSelect(value = this.selectedValue) {
      this.selectedData = this.options.filter(
        (option) => option.value === value
      )[0]
      this.selectedValue = this.selectedData.value
    },
    onClickSelectBox() {
      if (this.showList) {
        this.closeList()
      } else {
        this.showList = true
      }
    },
    onCheckSelected(value) {
      return this.selectedValue === value
    },
    onSelectItem(value) {
      if (this.selectedValue !== value) {
        this.onSelect(value)
        this.closeList()
      }
    },
    closeList() {
      this.isCloseList = true
      setTimeout(() => {
        this.showList = false
        this.isCloseList = false
      }, 300)
    },
    clickOutSide(element) {
      if (!this.showList) return

      const selectComponentElement = document.getElementById(this.selectId)
      const divElement = selectComponentElement.lastElementChild
      if (divElement.children.length <= 1) return

      const selectBoxElement = divElement.firstElementChild
      const selectBoxIconElement = selectBoxElement.firstElementChild
      if (
        selectBoxElement === element.target ||
        selectBoxIconElement === element.target
      ) {
        return
      }

      const listElement = divElement.lastElementChild
      if (listElement === element.target) return

      const itemElements = listElement.children
      const foundIndex = Array.from(itemElements).indexOf(element.target)
      if (foundIndex === -1) {
        this.closeList()
      }
    },
    generateSelectId() {
      const alphabet =
        'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890'
      const nanoid = customAlphabet(alphabet, 6)
      const selectId = nanoid()
      return selectId
    },
  },
}
