export default class Elements {

    static instance = null;

    static create(selector) {
        return this.instance || (this.instance = new this(selector));
    }

    constructor(selector) {
        // Main chart container
        this.chart = document.querySelector(selector);

        if (!this.chart) {
            return false;
        }

        // Main chart graphics
        this.chartSvgContainer = this.chart.querySelector('[data-immanuel-lines]');
        this.chartBackground = this.chart.querySelector('[data-immanuel-background]');
        this.signTrack = this.chart.querySelector('[data-immanuel-track="signs"]');

        // Universal elements for all chart types
        this.signs = this.chart.querySelectorAll('[data-immanuel-sign]');
        this.placeholders = this.chart.querySelectorAll('[data-immanuel-placeholder]');
        this.aspectEndBoundary = this.chart.querySelector('[data-immanuel-boundary="aspect-end"]');

        // Per-chart-type elements
        this.angleTracks = {
            primary: this.chart.querySelector('[data-immanuel-track="angles"]'),
            secondary: this.chart.querySelector('[data-immanuel-track="secondary-angles"]'),
            transits: this.chart.querySelector('[data-immanuel-track="transit-angles"]'),
        }

        this.angleTextTracks = {
            primary: this.chart.querySelector('[data-immanuel-track="angle-text"]'),
            secondary: this.chart.querySelector('[data-immanuel-track="secondary-angle-text"]'),
            transits: this.chart.querySelector('[data-immanuel-track="transit-angle-text"]'),
        }

        this.planetTracks = {
            primary: this.chart.querySelector('[data-immanuel-track="planets"]'),
            secondary: this.chart.querySelector('[data-immanuel-track="secondary-planets"]'),
            transits: this.chart.querySelector('[data-immanuel-track="transit-planets"]'),
        }

        this.houseNumberTracks = {
            primary: this.chart.querySelector('[data-immanuel-track="house-numbers"]'),
            secondary: this.chart.querySelector('[data-immanuel-track="secondary-house-numbers"]'),
            transits: this.chart.querySelector('[data-immanuel-track="transit-house-numbers"]'),
        }

        this.houseStartBoundaries = {
            primary: this.chart.querySelector('[data-immanuel-boundary="house-start"]'),
            secondary: this.chart.querySelector('[data-immanuel-boundary="secondary-house-start"]'),
            transits: this.chart.querySelector('[data-immanuel-boundary="transit-house-start"]'),
        }

        this.houseEndBoundaries = {
            primary: this.chart.querySelector('[data-immanuel-boundary="house-end"]'),
            secondary: this.chart.querySelector('[data-immanuel-boundary="secondary-house-end"]'),
            transits: this.chart.querySelector('[data-immanuel-boundary="transit-house-end"]'),
        }

        this.angleMarkersStartBoundaries = {
            primary: this.chart.querySelector('[data-immanuel-boundary="angle-markers-start"]'),
            secondary: this.chart.querySelector('[data-immanuel-boundary="secondary-angle-markers-start"]'),
            transits: this.chart.querySelector('[data-immanuel-boundary="transit-angle-markers-start"]'),
        }

        this.angleMarkersEndBoundaries = {
            primary: this.chart.querySelector('[data-immanuel-boundary="angle-markers-end"]'),
            secondary: this.chart.querySelector('[data-immanuel-boundary="secondary-angle-markers-end"]'),
            transits: this.chart.querySelector('[data-immanuel-boundary="transit-angle-markers-end"]'),
        }

        // Chart elements provided by users
        this.angles = {
            primary: this.angleTracks.primary.querySelectorAll('[data-immanuel-angle]'),
            secondary: this.angleTracks.secondary ? this.angleTracks.secondary.querySelectorAll('[data-immanuel-angle]') : null,
            transits: this.angleTracks.transits ? this.angleTracks.transits.querySelectorAll('[data-immanuel-angle]') : null,
        }

        this.planets = {
            primary: this.planetTracks.primary.querySelectorAll('[data-immanuel-planet]'),
            secondary: this.planetTracks.secondary ? this.planetTracks.secondary.querySelectorAll('[data-immanuel-planet]') : null,
            transits: this.planetTracks.transits ? this.planetTracks.transits.querySelectorAll('[data-immanuel-planet]') : null,
        }

        // Create extra elements the chart will need
        this.chartLines = [];
        this.houseNumbers = {};
        this.angleText = {};

        this.createHouseNumberElements();
        this.createAngleTextElements();
        this.createSvgElement();
    }

    // SVG element for drawing lines
    createSvgElement() {
        this.chartSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        this.chartSvg.setAttributeNS(null, 'width', '100%');
        this.chartSvg.setAttributeNS(null, 'height', '100%');

        Object.assign(this.chartSvg.style, {
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
        });

        if (this.chartSvgContainer) {
            this.chartSvgContainer.appendChild(this.chartSvg);
        }
        else {
            this.chart.appendChild(this.chartSvg);
        }
    }

    // Set up house numbers
    createHouseNumberElements() {
        for (const [chartType, houseNumberTrack] of Object.entries(this.houseNumberTracks)) {
            if (houseNumberTrack) {
                this.houseNumbers[chartType] = [];

                for (let i = 1; i <= 12; ++i) {
                    const houseNumberElement = document.createElement('span');
                    houseNumberElement.textContent = i;
                    houseNumberElement.style.position = 'absolute';
                    houseNumberElement.classList.add(`immanuel__${chartType}-house-number`, `house-number--${i}`);
                    this.houseNumbers[chartType][i] = houseNumberElement;
                    this.houseNumberTracks[chartType].appendChild(houseNumberElement);
                }
            }
        }
    }

    // Create elements to display each planet's angle
    createAngleTextElements() {
        for (const [chartType, angleTextTrack] of Object.entries(this.angleTextTracks)) {
            if (angleTextTrack) {
                this.angleText[chartType] = {};

                this.planets[chartType].forEach(planetElement => {
                    const planetName = planetElement.getAttribute('data-immanuel-planet');
                    const planetClassName = planetName.replace(' ', '-');
                    const angleTextElement = document.createElement('div');
                    angleTextElement.classList.add(`immanuel__${chartType}-angle-text`, `angle-text--${planetClassName}`);
                    angleTextElement.style.position = 'absolute';
                    this.angleText[chartType][planetName] = angleTextElement;
                    angleTextTrack.appendChild(angleTextElement);
                });
            }
        }
    }

}