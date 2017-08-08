# InfoBus UFRN
Quick reading of university bus departure times.

## Setting up development environment

What I did to prepare my machine for Android development:

- 0: Activated debugger and development mode for my Android device
- 1: Followed these installation steps: https://facebook.github.io/react-native/docs/getting-started.html
    - 1.1 Building Projects with Native Code
    - 1.2 Linux
    - 1.3 Android
- 2: Did this workaround for Linux 64-bits: https://stackoverflow.com/questions/41181412/unable-to-build-react-native-2-project-to-phone

And what I did to run my application on my device (didn't use a virtual device):

- Followed this guide: https://facebook.github.io/react-native/docs/running-on-device.html

> Everytime I'll run my aplication, I execute ```adb reverse tcp:8081 tcp:8081 && react-native run-android```
> at my repository root after plugging my device on USB port and allowing it to let my PC debug.
> In another bash instance, I also run ```react-native log-android```.

For reference, here's my personal development tools:

- Lenovo Vibe B
    - Android 6: SDK tools 23.01
- Linux Xubuntu 17.04 64x
    - react-native-cli: 2.0.1
    - node: 6.11.2

## License

    InfoBus UFRN
    Copyright (C) 2017 Marcell "Mazuh" Guilherme Costa da Silva

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, version 3.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.
