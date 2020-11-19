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

        // Container, boundaries & tracks provided by the user
        this.chartSvgContainer = this.chart.querySelector('[data-immanuel-lines]');
        this.chartBackground = this.chart.querySelector('[data-immanuel-background]');
        this.angleTrack = this.chart.querySelector('[data-immanuel-track="angles"]');
        this.signTrack = this.chart.querySelector('[data-immanuel-track="signs"]');
        this.planetTrack = this.chart.querySelector('[data-immanuel-track="planets"]');
        this.angleTextTrack = this.chart.querySelector('[data-immanuel-track="angle-text"]');
        this.houseNumberTrack = this.chart.querySelector('[data-immanuel-track="house-numbers"]');
        this.houseStartBoundary = this.chart.querySelector('[data-immanuel-boundary="house-start"]');
        this.houseEndBoundary = this.chart.querySelector('[data-immanuel-boundary="house-end"]');
        this.angleMarkersStartBoundary = this.chart.querySelector('[data-immanuel-boundary="angle-markers-start"]');
        this.angleMarkersEndBoundary = this.chart.querySelector('[data-immanuel-boundary="angle-markers-end"]');
        this.aspectEndBoundary = this.chart.querySelector('[data-immanuel-boundary="aspect-end"]');

        // Chart elements provided by users
        this.angles = this.chart.querySelectorAll('[data-immanuel-angle]');
        this.signs = this.chart.querySelectorAll('[data-immanuel-sign]');
        this.planets = this.chart.querySelectorAll('[data-immanuel-planet]');
        this.placeholders = this.chart.querySelectorAll('[data-immanuel-placeholder]');

        // Create extra elements the chart will need
        this.chartLines = [];
        this.houseNumbers = [];
        this.angleText = {};

        if (this.houseNumberTrack) {
            this.createHouseNumberElements();
        }

        if (this.angleTextTrack) {
            this.createAngleTextElements();
        }

        if (this.markerTrack) {
            this.createInnerMarkerTrackElement();
        }

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
        for (let i = 1; i <= 12; ++i) {
            const houseNumberElement = document.createElement('span');
            houseNumberElement.textContent = i;
            houseNumberElement.style.position = 'absolute';
            houseNumberElement.classList.add('immanuel__house-number', `house-number--${i}`);
            this.houseNumbers[i] = houseNumberElement;
            this.houseNumberTrack.appendChild(houseNumberElement);
        }
    }

    // Create elements to display each planet's angle
    createAngleTextElements() {
        this.planets.forEach(planetElement => {
            const planetName = planetElement.getAttribute('data-immanuel-planet');
            const planetClassName = planetName.replace(' ', '-');
            const angleTextElement = document.createElement('div');
            angleTextElement.classList.add('immanuel__angle-text', `angle-text--${planetClassName}`);
            angleTextElement.style.position = 'absolute';
            this.angleText[planetName] = angleTextElement;
            this.angleTextTrack.appendChild(angleTextElement);
        });
    }

}