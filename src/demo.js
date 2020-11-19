import Immanuel from '../dist/immanuel.min';
import chartData from './chartData';

const immanuel = new Immanuel('#chart', {
    rotateSigns: false,
    rotateAngleText: true,
});

immanuel.displayChart(chartData);