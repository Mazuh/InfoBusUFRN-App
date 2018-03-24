# InfoBus UFRN

Quick reading of my university's bus departure times.

> Available on Google Play: https://play.google.com/store/apps/details?id=io.github.mazuh.infobusufrn

> Open data source: https://gist.github.com/Mazuh/e10c07f1abb580c143557d8ed8427bbd

## Setting up

Clone this repository and change directory to it.
Make sure you have an updated `yarn` and using Node 6 (or above, I guess).
Then run:

```sh
yarn install
```

This project was bootstrapped with
[Create React Native App](https://github.com/react-community/create-react-native-app),
so it came with a few nice scripts.

### `yarn start`

Runs the app in development mode. Use the [Expo app](https://expo.io) on your phone to view it.

You'll probably get an error message suggesting you to run the following snippet:

```sh
sudo sysctl -w fs.inotify.max_user_instances=1024 && \
sudo sysctl -w fs.inotify.max_user_watches=12288
```

And sometimes you may need to reset or clear the React Native packager's cache.
To do so, you can pass the `--reset-cache` flag to the start script:

```sh
yarn start -- --reset-cache
```

#### `yarn test`

Runs the [jest](https://github.com/facebook/jest) test runner.

## License

    InfoBus UFRN
    Copyright (C) 2018 Marcell "Mazuh" Guilherme Costa da Silva

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.
