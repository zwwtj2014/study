function isValueNumber(value) {
    return (/(^-?[0-9]+\.{1}\d+$)|(^-?[1-9][0-9]*$)|(^-?0{1}$)/).test(value);
}

Vue.component('input-number', {
    props: {
        value: {
            type: Number,
            default: 0
        },
        max: {
            type: Number,
            default: Infinity
        },
        min: {
            type: Number,
            default: -Infinity
        },
        step: {
            type: Number,
            default: 1
        }
    },
    template: `
        <div class="input-number">
            <input type="text" :value="currentValue" @keyup.up="handleUp" @keyup.down="handleDown" @change="handleChange" >
            <input type="text" :value="currentStep" @change="handleChangeStep">
            <button @click="handleDown" :disabled="currentValue <= min">-</button>
            <button @click="handleUp" :disabled="currentValue >= max">+</button>
        </div>
    `,
    data: function () {
        return {
            currentValue: this.value, // pros中的值是不允许改变的, 所以使用一个属性值来关联那个值
            currentStep: this.step
        }
    },
    watch: {
        currentValue: function (val) {
            this.$emit('input', val);
            this.$emit('on-change', val);
        },
        value: function (val) {
            this.updateValue(val);
        }
    },
    methods: {
        updateValue(val) {
            if (val > this.max) {
                val = this.max;
            }
            if (val < this.min) {
                val = this.min;
            }
            this.currentValue = val;
        },
        handleChange(e) {
            var val = e.target.value.trim();
            var max = this.max;
            var min = this.min;

            if (isValueNumber(val)) {
                val = Number(val);
                this.currentValue = val;

                if (val > max) {
                    this.currentValue = max;
                } else if (val < min) {
                    this.currentValue = min;
                }
            } else {
                e.target.value = this.currentValue;
            }
        },
        handleDown() {
            if (this.currentValue - this.currentStep < this.min) {
                return;
            }
            this.currentValue -= this.currentStep;
        },
        handleUp() {
            if (this.currentValue + this.currentStep > this.max) {
                return;
            }
            this.currentValue += this.currentStep;
        },
        handleChangeStep(e) {
            var val = e.target.value.trim();

            if (isValueNumber(val)) {
                val = Number(val);
                this.currentStep = val;
            } else {
                e.target.value = this.currentStep;
            }
        }
    },
    mounted: function () {
        this.updateValue(this.value);
    }
});