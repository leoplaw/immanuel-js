import Options from './options';
import Elements from './elements';
import Chart from './chart';

module.exports = class Immanuel {

    constructor(selector, options = {}) {
        this.elements = Elements.create(selector);
        this.options = Options.create(options);
    }

    setOptions(options) {
        this.options = {
            ...this.options,
            ...options,
        };
    }

    displayChart(chartData) {
        Chart.create(this.elements, this.options, chartData).display();
    }

}
