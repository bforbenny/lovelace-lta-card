# LTA Card

![Stability:Beta](https://img.shields.io/badge/stability-beta-orange)
[![GitHub tag (latest SemVer)](https://img.shields.io/github/v/release/bforbenny/lovelace-lta-card)](https://github.com/bforbenny/lovelace-lta-card/releases/latest)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](/LICENSE.md)
[![GitHub issues](https://img.shields.io/github/issues/bforbenny/lovelace-lta-card)](https://GitHub.com/bforbenny/lovelace-lta-card/issues/)

A [HomeAssistant](https://www.home-assistant.io/) Lovelace custom card which displays public transport using the [HA-LTA](https://github.com/Codestian/ha-lta) sensors.
This improves on a generic entity display making it easier to digest data.

![Screenshot](/docs/Screenshot.jpg?raw=true "Example Card")

## Requirement

Make sure you have an [HA-LTA](https://github.com/Codestian/ha-lta) entities configured and running

## Installation

1. Download and copy [`lta-card.js`](/lta-card.js) into your `/config/www/` directory.
2. Add a reference to `lta-card.js` inside your `Manage resources` when editing dashboard

## Using the card

Add a manual card with the sample configuration

### Sample configuration

```yaml
cards:
  - type: "custom:lta-card"
    header: "Burgundy Hill"
    threshold: 4
    group:
      - name: "77"
        entities:
          - entity: sensor.lta_42319_77_1
          - entity: sensor.lta_42319_77_2
          - entity: sensor.lta_42319_77_3
      - name: "106"
        entities:
          - entity: sensor.lta_42319_106_1
          - entity: sensor.lta_42319_106_2
          - entity: sensor.lta_42319_106_3
```

### Options

| Name       | Type     | Requirement  | Description                                          | Default      |
| ---------- | -------- | ------------ | ---------------------------------------------------- | ------------ |
| type       | string   | **Required** | `custom:lta-card`                                    |              |
| header     | string   | Optional     | Card Title                                           | `Next Buses` |
| threshold  | integer  | Optional     | Orange text color to if `state` < `threshold` minute | `0`          |
| group      | object[] | **Required** | New row of same bus service                          |              |
| - name     | string   | Optional     | Bus service number to show on first column           | `none`       |
| - entities | string[] | Optional     | List of lta-bus entities                             | `none`       |
