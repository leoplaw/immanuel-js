export default class Options {

    static defaults = {
        maxOrb: {
            sun: 15,
            moon: 12,
            mercury: 7,
            venus: 7,
            mars: 8,
            jupiter: 9,
            saturn: 9,
            uranus: 5,
            neptune: 5,
            pluto: 5,
            chiron: 5,
        },
        rotateChart: 'horizon',
        rotateSigns: true,
        rotateHouseNumbers: false,
        rotateAngleText: false,
        angleFormat: '%D&deg;%M\'',
        planetAngleAttribute: null,
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