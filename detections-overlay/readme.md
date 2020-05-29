## Overview

This enables a security team to create att&ck navigator 3.0 layers both for external parties, such as csuite, and for internal use.

## Features

### Score (and colour) auto determined by:

Internal
* Number of detections
* Number of misses
* Detection method confidence

External
* Detection method confidence

### Seperate layers per detection source

### Combined layer for all detection souces

### Meta data for:
* Detection name
* Number of alerts
* Number of detections
* Number of missed detections
* Number of open tickets to improve detections
* Number of closed tickets on previous work to improve detections


## Usage

Two different versions for external facing and internal

### Inputs

* misses.json
* mappings.json
* detections.json
* detection-techniques.json
* tickets.json

--- creates ---

attack-detections-complete.json

--- converts into ---

all-detection-types-layer.json
[detectiontype]-layer.json