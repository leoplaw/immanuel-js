export default class Utils {

    // Calculate x & y coords along circumference of passed element.
    static findRelativePoint(boundingElement, degrees, offset = 0) {
        const diameter = boundingElement.offsetWidth + offset;
        const radius = diameter / 2;
        const radians = degrees * (Math.PI/180) * -1;
        const x = radius + radius * Math.cos(radians);
        const y = radius + radius * Math.sin(radians);
        return [x, y];
    }

    // Calculate x & y coords relative to containing chart.
    static findGlobalPoint(chartElement, boundingElement, degrees, offset = 0) {
        const [relativeX, relativeY] = this.findRelativePoint(boundingElement, degrees, offset);
        const diameter = boundingElement.offsetWidth + offset;
        const x = relativeX + (chartElement.offsetWidth - diameter) / 2;
        const y = relativeY + (chartElement.offsetHeight - diameter) / 2;
        return [x, y];
    }

    // Format an angle object into a string based on our class's option.
    static formatAngleString(formattedAngleObject, angleFormat) {
        const angleTextPlaceholders = {
            '%D': formattedAngleObject.degrees,
            '%M': formattedAngleObject.minutes,
            '%S': formattedAngleObject.seconds,
        };

        return angleFormat.replace(/%D|%M|%S/g, match => angleTextPlaceholders[match]);
    }

}