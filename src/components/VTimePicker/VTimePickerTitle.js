import '../../stylus/components/_time-picker-title.styl'

// Mixins
import PickerButton from '../../mixins/picker-button'

// Utils
import { pad } from '../VDatePicker/util'

export default {
  name: 'v-time-picker-title',

  mixins: [PickerButton],

  props: {
    ampm: Boolean,
    hour: Number,
    minute: Number,
    selectingHour: Boolean
  },

  computed: {
    period () {
      return this.hour < 12 ? 'am' : 'pm'
    }
  },

  methods: {
    genTime () {
      let hour = this.hour
      if (this.ampm) {
        hour = hour ? ((hour - 1) % 12 + 1) : 12
      }

      const displayedHour = this.hour == null ? '--' : this.ampm ? hour : pad(hour)
      const displayedMinute = this.minute == null ? '--' : pad(this.minute)

      return this.$createElement('div', {
        'class': 'time-picker-title__time'
      }, [
        this.genPickerButton('selectingHour', true, displayedHour),
        this.$createElement('span', ':'),
        this.genPickerButton('selectingHour', false, displayedMinute)
      ])
    },
    genAmPm () {
      return this.$createElement('div', {
        staticClass: 'time-picker-title__ampm'
      }, [
        this.genPickerButton('period', 'am', 'am'),
        this.genPickerButton('period', 'pm', 'pm')
      ])
    }
  },

  render (h) {
    return h('div', {
      staticClass: 'time-picker-title'
    }, [
      this.genTime(),
      this.ampm ? this.genAmPm() : null
    ])
  }
}
