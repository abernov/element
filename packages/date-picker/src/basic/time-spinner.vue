<template>
  <div class="el-time-spinner" :class="columns">
    <template v-if="!arrowControl">
      <el-scrollbar
        v-for="(type, k) in mapping.order"
        :key="k"
        @mouseenter.native="emitSelectRange(type)"
        @mousemove.native="adjustSpinner(type)"
        class="el-time-spinner__wrapper"
        wrap-style="max-height: inherit;"
        view-class="el-time-spinner__list"
        noresize
        tag="ul"
        ref="scroll">
        <li
          v-for="(disabled, val) in disabledList[type]"
          :key="val"
          @click="handleClick(type, { value: val, disabled: disabled })"
          class="el-time-spinner__item"
          :class="{ 'active': val === currVal(type), 'disabled': disabled }">
            {{ valToStr(type, val) }}
        </li>
      </el-scrollbar>
    </template>
    <template v-if="arrowControl">
      <div
        v-for="(type, k) in mapping.order"
        @mouseenter="emitSelectRange(type)"
        class="el-time-spinner__wrapper is-arrow"
        :key="k">
        <i v-repeat-click="decrease" class="el-time-spinner__arrow el-icon-arrow-up"></i>
        <i v-repeat-click="increase" class="el-time-spinner__arrow el-icon-arrow-down"></i>
        <ul class="el-time-spinner__list" ref=type>
          <li
            class="el-time-spinner__item"
            v-for="(val, key) in arrowList[type]"
            :class="{ 'active': val === currVal(type), 'disabled': disabled(type, val) }"
            :key="key">
            {{ valToStr(type, val) }}
          </li>
        </ul>
      </div>
    </template>
  </div>
</template>

<script type="text/babel">
  import { modifyTime } from '../util';
  import ElScrollbar from 'element-ui/packages/scrollbar';
  import RepeatClick from 'element-ui/src/directives/repeat-click';

  export default {
    components: { ElScrollbar },

    directives: {
      repeatClick: RepeatClick
    },

    props: {
      mapping: {
        type: Object,
        required: true
      },
      date: {},
      defaultValue: {}, // reserved for future use
      millisecStep: {
        type: Number,
        default: 1
      },
      arrowControl: Boolean
    },

    computed: {
      hour() {
        return this.date.getHours();
      },
      minute() {
        return this.date.getMinutes();
      },
      second() {
        return this.date.getSeconds();
      },
      millisecond() {
      // console.log('getMillisec = %o round=%o maxMillisecs=%o', this.date.getMilliseconds(), Math.round(this.date.getMilliseconds() / 1000 * this.maxMillisecs), this.maxMillisecs);
        return this.getConvertedMs(this.date.getMilliseconds(), this.maxMillisecs);
      },
      maxMillisecs() {
        let len = this.mapping.millisecond;
        if (!len) return 1000;
        return Math.round(Math.pow(10, len[1] - len[0]));
      },
      arrowList() {
        var result = {};
        this.mapping.order.forEach((type) => {
          var val = this[type];
          result[type] = [
            val > 0 ? val - 1 : undefined,
            val,
            val < this.maxOfType(type) - 1 ? val + 1 : undefined
          ];
        });
        console.log('arrowList=%o', result);
        return result;
      },
      disabledList() {
        return {
          hour: this.getTypesList('hour', this.selectableRange),
          minute: this.getTypesList('minute', this.selectableRange),
          second: this.getTypesList('second', this.selectableRange),
          millisecond: this.getTypesList('millisecond', this.selectableRange)
        };
      },
      el() {
        console.log('MAPPING.ORDER=%o', this.mapping.order);
        var result = {};
        this.mapping.order.forEach((type, idx) =>{
          result[type] = this.$refs.scroll[idx];
        });
        return result;
      },
      columns() {
        let val = {};
        val['columns' + this.mapping.order.length] = true;
        return val;
      }
    },

    data() {
      return {
        selectableRange: [],
        currentScrollbar: null
      };
    },

    mounted() {
      this.$nextTick(() => {
        !this.arrowControl && this.bindScrollEvent();
      });
    },

    methods: {
      disabled(type, val) {
        var list = this.disabledList[type];
        return list ? list[val] : false;
      },

      currVal(type) {
        return this[type];
      },
      maxOfType(type) {
        return type === 'hour' ? 24 : type === 'millisecond' ? this.maxMillisecs : 60;
      },

      valToStr(type, value) {
        if (value === undefined) return '';
        var result = (type === 'hour' && this.mapping.isPm) ? (value = value % 12 || 12) + '' : value + '';
        var len = this.mapping[type][1] - this.mapping[type][0];
        while (result.length < len) result = '0' + result;
        if (type === 'hour') result += this.amPm(value);
        return result;
      },
      increase() {
        this.scrollDown(1);
      },

      decrease() {
        this.scrollDown(-1);
      },

      modifyDateField(type, value) {
        const modTime = (hours, mins, secs, millis) => {
          let date = new Date(this.date.getTime());
          date.setMilliseconds(Math.round(millis * 1000 / this.maxMillisecs));
          this.$emit('change', modifyTime(date, hours, mins, secs));
        };
        console.log('value1=%o type=%o ms=%o max=%o step=%o', value, type, this.date.getMilliseconds(), this.maxMillisecs, this.millisecStep);
        switch (type) {
          case 'hour': modTime(value, this.minute, this.second, this.millisecond); break;
          case 'minute': modTime(this.hour, value, this.second, this.millisecond); break;
          case 'second': modTime(this.hour, this.minute, value, this.millisecond); break;
          case 'millisecond': modTime(this.hour, this.minute, this.second, value); break;
        }
        console.log('value2=%o ms=%o max=%o step=%o', value, this.date.getMilliseconds(), this.maxMillisecs, this.millisecStep);
      },
      getConvertedMs(millisecond, max) {
        return Math.round(millisecond / 1000 * (max || this.maxMillisecs));
      },
      getTypesList(type, ranges) {

        const getVal = (rDate, idx) => {
          var r_h = rDate.getHours();
          var r_m = rDate.getMinutes();
          var r_s = rDate.getSeconds();
          switch (type) {
            case 'hour':
              return r_h;
            case 'minute':
              return r_h === this.hour ? r_m : idx ? 59 : 0;
            case 'second':
              return (r_h === this.hour && r_m === this.minute) ? r_s : idx ? 59 : 0;
            case 'millisecond':
              let r_ms = this.getConvertedMs(rDate.getMilliseconds());
              let val = (r_h === this.hour && r_m === this.minute && r_s === this.second) ? r_ms : idx ? this.getConvertedMs(999) : 0;
              return val;
          };
        };

        const newArray = function(start, end) {
          let result = [];
          for (let i = start; i <= end; i++) {
            result.push(i);
          }
          return result;
        };

        const list = [];
        let enabled = [];

        (ranges || []).forEach(range => {
          const value = range.map(getVal);
          // console.log('>>> type=%o enabled=%o value=%o', type, enabled, value);

          enabled = enabled.concat(newArray(value[0], value[1]));
        });
        if (enabled.length) {
          for (let i = 0; i < this.maxOfType(type); i++) {
            list[i] = enabled.indexOf(i) === -1;
          }
          // console.log('>>> type=%o list=%o', type, list);
          return list;
        } else {
          if (this.arrowControl) return null;
          for (let i = 0; i < this.maxOfType(type); i++) {
            list.push(false);
          }
          return list;
        }
      },

      handleClick(type, {value, disabled}) {
        if (!disabled) {
          console.log('modifyDateField1');
          this.modifyDateField(type, value);
          this.emitSelectRange(type);
          this.adjustSpinner(type, value);
        }
      },

      emitSelectRange(type) {
        var map = this.mapping[type];
        if (map) {
          this.$emit('select-range', map[0], map[1]);
          this.currentScrollbar = type;
        }
      },

      bindScrollEvent() {
        this.mapping.order.forEach((type, idx) =>{
          this.el[type].wrap.onscroll = (e) => {
            // TODO: scroll is emitted when set scrollTop programatically
            // should find better solutions in the future!
            this.handleScroll(type, e);
          };
        });
      },

      handleScroll(type) {
        const value = Math.min(Math.floor((this.el[type].wrap.scrollTop - (this.scrollBarHeight(type) * 0.5 - 10) / this.typeItemHeight(type) + 3) / this.typeItemHeight(type)), this.maxOfType(type) - 1);
        this.modifyDateField(type, value);
      },

      // NOTE: used by datetime / date-range panel
      //       renamed from adjustScrollTop
      //       should try to refactory it
      adjustSpinners() {
        this.mapping.order.forEach((type) => {
          this.adjustSpinner(type, this[type]);
        });
      },

      adjustSpinner(type, value) {
        if (!value) value = this[type];
        if (this.arrowControl) return;
        console.log('adjustSpinner1 type=%o', type);
        const el = this.el[type].wrap;
        if (el) {
          el.scrollTop = Math.max(0, value * this.typeItemHeight(type));
        }
      },

      scrollDown(step) {
        if (!this.currentScrollbar) {
          this.emitSelectRange('hour');
        }
        let type = this.currentScrollbar;
        let now = this[type];
        console.log('--> now1=%o type=%o', now, type);
        let list = this.disabledList[type];
        let max = this.maxOfType(type);
        let len = max;
        let total = Math.abs(step);
        step = step > 0 ? 1 : -1;
        while (len-- && total) {
          now = (now + step + max) % max;
          if (!list || !list[now]) {
            total--;
          }
        }
        if (list && list[now]) return;

        console.log('--> now2=%o type=%o', now, type);
        this.modifyDateField(type, now);
        this.adjustSpinner(type, now);
      },

      amPm(hour) {
        var isPm = this.mapping.isPm;
        if (!isPm) return '';
        let content = (hour < 12) ? ' am' : ' pm';
        if (isPm[2] === 'A') content = content.toUpperCase();
        return content;
      },

      typeItemHeight(type) {
        return this.el[type].$el.querySelector('li').offsetHeight;
      },
      scrollBarHeight(type) {
        return this.el[type].$el.offsetHeight;
      }
    }
  };
</script>
