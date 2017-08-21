# InfoBus UFRN
Quick reading of my university (UFRN) bus departure times.

Available on Google Play: https://play.google.com/store/apps/details?id=io.github.mazuh.infobusufrn

> Open data source: https://gist.github.com/Mazuh/e10c07f1abb580c143557d8ed8427bbd (contribute!)

## Understanding the code

There isn't much to see right now. Just read [index.android.js](./index.android.js) file. Soon there will be a better
documentation on Wiki page!

## Setting up my development environment

What I did to prepare my machine for Android development:

- 0: Activated debugger and development mode for my Android device
- 1: Followed these installation steps: https://facebook.github.io/react-native/docs/getting-started.html
    - 1.1 Building Projects with Native Code
    - 1.2 Linux
    - 1.3 Android
- 2: Did this workaround for Linux 64-bits: https://stackoverflow.com/questions/41181412/unable-to-build-react-native-2-project-to-phone

And what I did to run my application on my device (didn't use a virtual device):

- Followed this guide: https://facebook.github.io/react-native/docs/running-on-device.html

What I imagine that should be done after you clone the repository (didn't test it yet):
- Execute ```npm install``` on repository directory.

> Everytime I wanna run my aplication, I execute ```adb reverse tcp:8081 tcp:8081 && react-native run-android```
> at my repository root after plugging my device on USB port and allowing it to let my PC debug.
> In another bash instance, I also run ```react-native log-android```.

For reference, here's my personal development tools:

- Lenovo Vibe B
    - Android 6: SDK tools 23.01
- Linux Xubuntu 17.04 64x
    - react-native-cli: 2.0.1
    - node: 6.11.2

## Some contributors
A few people contributed somehow to this project:

- Yuri H. Sales ([@yuriscosta](https://github.com/yuriscosta)) for helping to assemble data and suggesting the 'InfoBus' name
- Davi Carvalho ([@davicfg](https://github.com/davicfg)) for giving me the data source
- Robson Costa (from e-mail) for giving me another data source
- Secretaria Municipal de Mobilidade Urbana ([STTU](http://www.natal.rn.gov.br/sttu/)) for always providing a good data source and also making sure those schedules are being followed

Other people gave me ideas and feedback for upgrades since Terminal 588:

- Amanda Cilene ([@amandaacilene](https://github.com/amandaacilene)) about statistic use of available data
- Breno Pascoal (from Google Play) about statistic use of available data
- Edivânia Pontes (from Google Play) about notifications and user preferences
- Rayne Araújo (from Google Play) about listing the full schedule instead of just nearby times

And a lot more who asked me (from Facebook, e-mail and Google Play) to recreate this app and praised the previous one.

## License

    InfoBus UFRN
    Copyright (C) 2017 Marcell "Mazuh" Guilherme Costa da Silva

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, version 3.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.
