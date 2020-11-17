# Immanuel JS

This package provides a fully-customisable, responsive-ready, pure JavaScript astrology chart. The main chart graphic elements are provided and styled by the developer, while elements such as aspects lines and house cusps are drawn via SVG, and are also fully customisable via CSS. See the `/demo` directory for an example.

## Installation

```bash
npm install immanuel-js
```

## Usage

Elements are set up in the HTML using `data` attributes, and consist mostly of *tracks* and *boundaries*.

*Tracks* are elements that define the diameter of the circle that certain child elements will follow - for example, the `[data-immanuel-track="planets"]` element will be an invisible div positioned and sized by your CSS to define the diameter of the circle whose circumference the planets will be placed along.

Some of these may be omitted - for example, if your chart background graphic already includes the signs, then you can safely omit the `[data-immanuel-track="signs"]` element, and immanuel-js will not look for the sign glyphs.

*Boundaries* define where things begin and end - for example `data-immanuel-boundary="house-start"` and `data-immanuel-boundary="house-end"` define where the house cusp lines should be drawn from and to.

Take a look at `/demo/index.html` to see the elements that can go into a chart, and `/demo/immanuel.css` for a basic example of how to style everything to be (relatively) responsive. The demo uses a font to display astrological glyphs, but in practice anything can be used, including images.

Besides tracks and boundaries, a `[data-immanuel-background]` element is expected, which should contain the graphic of the basic chart itself.

The `[data-immanuel-lines]` element is optional, and simply defines the element that immanuel-js should append the SVG canvas element to. If this is omitted, it will be appended to the main element that was passed to the constructor (ie. all lines drawn on it will appear on top of all other elements).

The `[data-immanuel-angle]` elements represent the Asc, Desc, MC and IC (the Desc element is missing in the demo, simply because the font it uses lacks a glyph for it).

Angle markers are the small marks around the edge of the chart to show the exact placement of a planet. Angle pointers are lines drawn from the markers toward the planet, to clarify in cases when planets do not line up exactly with their markers (for example with a stellium or conjunction where planets must be separated visually).

In the demo page, `<div id="chart">` is the main element that contains the chart elements. This is what is passed to `Immanuel`'s constructor.

An `options` object may also be passd as a second argument to the constructor, with the following:

Option|Type|Default|Purpose
------|----|-------|-------
`rotateToHorizon`|Boolean|true|Whether or not to rotate the chart graphic so that the asc/desc line is horizontal.
`rotateSigns`|Boolean|true|If you have provided glyphs/graphics for the signs, this option will rotate them to always face outward around the zodiac wheel (eg. the sign at the top will be upright, the sign at the bottom will be upside-down, etc.) Setting to false will simply render them all upright.
`rotateHouseNumbers`|Boolean|false|Does the same with the house numbers.
`rotateAngleText`|Boolean|false|Does the same for the text next to each planet showing its angle.
`angleFormat`|String|%D\&deg;%M\'|Formats the angle text next to each planet. Placeholders are: %D = degreee, %M = minute, and %S = second.
`lineOrder`|Array|['houses', 'angleMarkers', 'anglePointers', 'aspects']|Dictates the order in which the drawn lines will appear. The lines at the top of this list are drawn last - ie. in the default array, house lines will be drawn on top of aspect lines.
`aspectOrder`|Array|['trine', 'sextile', 'semisextile', 'square', 'semisquare', 'sesquisquare', 'opposite', 'quintile', 'semiquintile', 'sesquiquintile', 'biquintile', 'quincunx']|Similar to above, only dictating the order in which the aspect lines will be drawn. By default, for example, trines and sextiles will be drawn over squares and oppositions.

Pretty much everything else can be controlled by the developer via HTML and CSS, such as line colour and thickness, which elements should be displayed / generated, whether or not the chart will be responsive, etc.

All `[data-immanuel-hide]` attributes are removed once the chart is drawn, so this can be applied to your chart's container element and set to `visibility: hidden` in your CSS to avoid the dreaded FOUC.

## Info

**Unsupported:** currently, displaying two sets of planets is not supported, eg. transits or synastry charts.

This package is part of the [Immanuel astrology API](https://github.com/sunlight/immanuel-api) project, and is designed to be used with the JSON data it provides (hopefully some decent documentation for all this will appear soon).