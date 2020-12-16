export default class Options {

    static defaults = {
        rotateChart: 'horizon',
        rotateSigns: true,
        rotateHouseNumbers: false,
        rotateAngleText: false,
        angleFormat: '%D&deg;%M\'',
        lineOrder: [
            'houses',
            'angleMarkers',
            'anglePointers',
            'aspects',
        ],
        aspectOrder: [
            'trine',
            'sextile',
            'semisextile',
            'square',
            'semisquare',
            'sesquisquare',
            'opposite',
            'quintile',
            'semiquintile',
            'sesquiquintile',
            'biquintile',
            'quincunx'
        ],
    };

    static create(options) {
        return {
            ...this.defaults,
            ...options,
        };
    }

}