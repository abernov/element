<template>
  <div class="el-time-spinner" :class="{ 'has-seconds': showSeconds, 'has-milli': showMillisecs }">
    <template v-if="!arrowControl">
      <el-scrollbar
        @mouseenter.native="emitSelectRange('hours')"
        @mousemove.native="adjustCurrentSpinner('hours')"
        class="el-time-spinner__wrapper"
        wrap-style="max-height: inherit;"
        view-class="el-time-spinner__list"
        noresize
        tag="ul"
        ref="hours">
        <li
          @click="handleClick('hours', { value: hour, disabled: disabled })"
          v-for="(disabled, hour) in hoursList"
          class="el-time-spinner__item"
          :class="{ 'active': hour === hours, 'disabled': disabled }">{{ ('0' + (amPmMode ? (hour % 12 || 12) : hour )).slice(-2) }}{{ amPm(hour) }}</li>
      </el-scrollbar>
      <el-scrollbar
        @mouseenter.native="emitSelectRange('minutes')"
        @mousemove.native="adjustCurrentSpinner('minutes')"
        class="el-time-spinner__wrapper"
        wrap-style="max-height: inherit;"
        view-class="el-time-spinner__list"
        noresize
        tag="ul"
        ref="minutes">
        <li
          @click="handleClick('minutes', { value: key, disabled: false })"
          v-for="(enabled, key) in minutesList"
          class="el-time-spinner__item"
          :class="{ 'active': key === minutes, disabled: !enabled }">{{ ('0' + key).slice(-2) }}</li>
      </el-scrollbar>
      <el-scrollbar
        v-show="showSeconds"
        @mouseenter.native="emitSelectRange('seconds')"
        @mousemove.native="adjustCurrentSpinner('seconds')"
        class="el-time-spinner__wrapper"
        wrap-style="max-height: inherit;"
        view-class="el-time-spinner__list"
        noresize
        tag="ul"
        ref="seconds">
        <li
          @click="handleClick('seconds', { value: key, disabled: false })"
          v-for="(second, key) in 60"
          class="el-time-spinner__item"
          :class="{ 'active': key === seconds }"
          :key="key">{{ ('0' + key).slice(-2) }}</li>
      </el-scrollbar>
      <el-scrollbar
        v-show="showMillisecs"
        @mouseenter.native="emitSelectRange('millisecs')"
        @mousemove.native="adjustCurrentSpinner('millisecs')"
        class="el-time-spinner__wrapper"
        wrap-style="max-height: inherit;"
        view-class="el-time-spinner__list"
        noresize
        tag="ul"
        ref="millisecs">
        <li
          @click="handleClick('millisecs', { value: key, disabled: false })"
          v-for="(millisec, key) in maxMillisecs"
          class="el-time-spinner__item"
          :class="{ 'active': key === millisecs }"
          :key="key">{{ ('0'.repeat(showMillisecs ? showMillisecs-1 : 0) + key).slice(-showMillisecs) }}</li>
      </el-scrollbar>
    </template>
    <template v-if="arrowControl">
      <div
        @mouseenter="emitSelectRange('hours')"
        class="el-time-spinner__wrapper is-arrow">
        <i v-repeat-click="decrease" class="el-time-spinner__arrow el-icon-arrow-up"></i>
        <i v-repeat-click="increase" class="el-time-spinner__arrow el-icon-arrow-down"></i>
        <ul class="el-time-spinner__list" ref="hours">
          <li
            class="el-time-spinner__item"
            :class="{ 'active': hour === hours, 'disabled': hoursList[hour] }"
            v-for="(hour, key) in arrowHourList"
            :key="key">{{ hour === undefined ? '' : ('0' + (amPmMode ? (hour % 12 || 12) : hour )).slice(-2) + amPm(hour) }}</li>
        </ul>
      </div>
      <div
        @mouseenter="emitSelectRange('minutes')"
        class="el-time-spinner__wrapper is-arrow">
        <i v-repeat-click="decrease" class="el-time-spinner__arrow el-icon-arrow-up"></i>
        <i v-repeat-click="increase" class="el-time-spinner__arrow el-icon-arrow-down"></i>
        <ul class="el-time-spinner__list" ref="minutes">
          <li
            class="el-time-spinner__item"
            :class="{ 'active': minute === minutes }"
            v-for="(minute, key) in arrowMinuteList"
            :key="key">
            {{ minute === undefined ? '' : ('0' + minute).slice(-2) }}
          </li>
        </ul>
      </div>
      <div
        @mouseenter="emitSelectRange('seconds')"
        class="el-time-spinner__wrapper is-arrow"
        v-if="showSeconds">
        <i v-repeat-click="decrease" class="el-time-spinner__arrow el-icon-arrow-up"></i>
        <i v-repeat-click="increase" class="el-time-spinner__arrow el-icon-arrow-down"></i>
        <ul class="el-time-spinner__list" ref="seconds">
          <li
            v-for="(second, key) in arrowSecondList"
            class="el-time-spinner__item"
            :class="{ 'active': second === seconds }"
            :key="key">
            {{ second === undefined ? '' : ('0' + second).slice(-2) }}
          </li>
        </ul>
      </div>
      <div
        @mouseenter="emitSelectRange('millisecs')"
        class="el-time-spinner__wrapper is-arrow"
        v-if="showMillisecs">
        <i v-repeat-click="decrease" class="el-time-spinner__arrow el-icon-arrow-up"></i>
        <i v-repeat-click="increase" class="el-time-spinner__arrow el-icon-arrow-down"></i>
        <ul class="el-time-spinner__list" ref="millisecs">
          <li
            v-for="(millisec, key) in arrowMillisecList"
            class="el-time-spinner__item"
            :class="{ 'active': millisec === millisecs }"
            :key="key">
            {{ millisec === undefined ? '' : ('0'.repeat(showMillisecs ? showMillisecs - 1 : 0) + millisec).slice(-showMillisecs) }}
          </li>
        </ul>
      </div>
    </template>
  </div>
</template>

<script type="text/babel">
  import { getRangeHours, getRangeMinutes, modifyTime } from '../util';
  import ElScrollbar from 'element-ui/packages/scrollbar';
  import RepeatClick from 'element-ui/src/directives/repeat-click';

  export default {
    components: { ElScrollbar },

    directives: {
      repeatClick: RepeatClick
    },

    props: {
      date: {},
      defaultValue: {}, // reserved for future use
      showSeconds: {
        type: Boolean,
        default: true
      },
      showMillisecs: {
        type: Number,
        default: 0
      },
      fps: {
        type: Number,
        default: 0
      },
      arrowControl: Boolean,
      amPmMode: {
        type: String,
        default: '' // 'a': am/pm; 'A': AM/PM
      }
    },

    computed: {
      hours() {
        return this.date.getHours();
      },
      minutes() {
        return this.date.getMinutes();
      },
      seconds() {
        return this.date.getSeconds();
      },
      millisecs() {
        console.log('Showms %o', this.date.getMilliseconds());
        return this.date.getMilliseconds() / 1000 * this.maxMillisecs ^ 0;
      },
      maxMillisecs() {
        console.log('fps=%o showMS=%o', this.fps, this.showMillisecs);
        let max = Math.pow(10, this.showMillisecs) ^ 0;
        return this.fps ? this.fps : max;
      },
      hoursList() {
        return getRangeHours(this.selectableRange);
      },
      minutesList() {
        return getRangeMinutes(this.selectableRange, this.hours);
      },
      arrowHourList() {
        const hours = this.hours;
        return [
          hours > 0 ? hours - 1 : undefined,
          hours,
          hours < 23 ? hours + 1 : undefined
        ];
      },
      arrowMinuteList() {
        const minutes = this.minutes;
        return [
          minutes > 0 ? minutes - 1 : undefined,
          minutes,
          minutes < 59 ? minutes + 1 : undefined
        ];
      },
      arrowSecondList() {
        const seconds = this.seconds;
        return [
          seconds > 0 ? seconds - 1 : undefined,
          seconds,
          seconds < 59 ? seconds + 1 : undefined
        ];
      },
      arrowMillisecList() {
        const millisecs = this.millisecs;
        return [
          millisecs > 0 ? millisecs - 1 : undefined,
          millisecs,
          millisecs < this.maxMillisecs - 1 ? millisecs + 1 : undefined
        ];
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
      increase() {
        this.scrollDown(1);
      },

      decrease() {
        this.scrollDown(-1);
      },

      modifyDateField(type, value) {
        this.date.setMilliseconds((type === 'millisecs' ? value : this.millisecs) * 1000 / this.maxMillisecs ^ 0);
        console.log('value=%o ms=%o', value, this.date.getMilliseconds());
        switch (type) {
          case 'hours': this.$emit('change', modifyTime(this.date, value, this.minutes, this.seconds)); break;
          case 'minutes': this.$emit('change', modifyTime(this.date, this.hours, value, this.seconds)); break;
          case 'seconds': this.$emit('change', modifyTime(this.date, this.hours, this.minutes, value)); break;
          case 'millisecs': this.$emit('change', modifyTime(this.date, this.hours, this.minutes, this.seconds)); break;
        }
      },

      handleClick(type, {value, disabled}) {
        if (!disabled) {
          this.modifyDateField(type, value);
          this.emitSelectRange(type);
          this.adjustSpinner(type, value);
        }
      },

      emitSelectRange(type) {
        if (type === 'hours') {
          this.$emit('select-range', 0, 2);
        } else if (type === 'minutes') {
          this.$emit('select-range', 3, 5);
        } else if (type === 'seconds') {
          this.$emit('select-range', 6, 8);
        } else if (type === 'millisecs') {
          this.$emit('select-range', 9, 10 + this.showMillisecs);
        }
        this.currentScrollbar = type;
      },

      bindScrollEvent() {
        const bindFuntion = (type) => {
          this.$refs[type].wrap.onscroll = (e) => {
            // TODO: scroll is emitted when set scrollTop programatically
            // should find better solutions in the future!
            this.handleScroll(type, e);
          };
        };
        bindFuntion('hours');
        bindFuntion('minutes');
        bindFuntion('seconds');
        bindFuntion('millisecs');
      },

      handleScroll(type) {
        const value = Math.min(Math.floor((this.$refs[type].wrap.scrollTop - (this.scrollBarHeight(type) * 0.5 - 10) / this.typeItemHeight(type) + 3) / this.typeItemHeight(type)), (type === 'hours' ? 23 : type !== 'millisecs' ? 59 : this.maxMillisecs - 1));
        this.modifyDateField(type, value);
      },

      // NOTE: used by datetime / date-range panel
      //       renamed from adjustScrollTop
      //       should try to refactory it
      adjustSpinners() {
        this.adjustSpinner('hours', this.hours);
        this.adjustSpinner('minutes', this.minutes);
        this.adjustSpinner('seconds', this.seconds);
        this.adjustSpinner('millisecs', this.millisecs);
      },

      adjustCurrentSpinner(type) {
        this.adjustSpinner(type, this[type]);
      },

      adjustSpinner(type, value) {
        if (this.arrowControl) return;
        const el = this.$refs[type].wrap;
        if (el) {
          el.scrollTop = Math.max(0, value * this.typeItemHeight(type));
        }
      },

      scrollDown(step) {
        if (!this.currentScrollbar) {
          this.emitSelectRange('hours');
        }

        const label = this.currentScrollbar;
        const hoursList = this.hoursList;
        let now = this[label];

        if (this.currentScrollbar === 'hours') {
          let total = Math.abs(step);
          step = step > 0 ? 1 : -1;
          let length = hoursList.length;
          while (length-- && total) {
            now = (now + step + hoursList.length) % hoursList.length;
            if (hoursList[now]) {
              continue;
            }
            total--;
          }
          if (hoursList[now]) return;
        } else if (this.currentScrollbar !== 'millisecs') {
          now = (now + step + 60) % 60;
        } else {
          now = (now + step + this.maxMillisecs) % this.maxMillisecs;
        }

        this.modifyDateField(label, now);
        this.adjustSpinner(label, now);
      },
      amPm(hour) {
        let shouldShowAmPm = this.amPmMode.toLowerCase() === 'a';
        if (!shouldShowAmPm) return '';
        let isCapital = this.amPmMode === 'A';
        let content = (hour < 12) ? ' am' : ' pm';
        if (isCapital) content = content.toUpperCase();
        return content;
      },
      typeItemHeight(type) {
        return this.$refs[type].$el.querySelector('li').offsetHeight;
      },
      scrollBarHeight(type) {
        return this.$refs[type].$el.offsetHeight;
      }
    }
  };
</script>
