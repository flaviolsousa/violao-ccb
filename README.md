# violao-ccb

## Tasks

### Home Screen

- ☒ Filter hymns by title

### Hymn Detail Screen

- ☒ Display Hymn Detail screen
- ☒ Implement zoom control via gestures
- ☒ Implement zoom control via buttons
- ☒ Ensure chords and lyrics break lines together
- ☒ Implement header auto-hide on vertical scroll
- ☒ Implement header auto-hide in horizontal mode
- ☒ Add controls to navigate between neighboring hymns
- ☐ Option to display rhythm
- ☒ Implement auto-scroll feature
- ☐ Integrate MIDI player functionality
- ☒ Option to show/hide draw of chords
- ☒ Option to display capo positioning
- ☒ Implement tone selection feature
- ☐ Display rhythm instructions clearly: (\_ <sup>↑ ↓ ↟ ↥ ⇑ ⇞ ⇡ ↡ ↧ ⇓ ⇟ ⇣ x2</sup> )
- ☐ Provide option to select difficulty level
- ☒ When changing the tone key, retain the original chord positions
- ☐ In the Tone Key selection popup, highlight the easiest key when using a capo on lower frets
- ☐ In the Tone Key selection popup, show capo and new chords

## Start

### Browser

1. On your application

```sh
npx expo start
```

2. Press `w` on keyboard

### Android

1. Activate DevMode on yor Android

2. Install `Expo Go` on your Android

3. Plug your android by USB on PC

4. On your application

```sh
npx expo start --tunnel
```

5. Press `a` on keyboard

## Reference to new project configuration

```sh
npm install -g expo-cli
npx create-expo-app violao-ccb --template expo-template-blank-typescript
cd violao-ccb
npx expo install react-dom react-native-web @expo/metro-runtime

npm install @reduxjs/toolkit react-redux

npm install @react-navigation/native
npx expo install react-native-screens react-native-safe-area-context
npm install @react-navigation/native-stack

npm install @react-navigation/drawer
npm install react-native-paper
npm install --save-dev eslint
npx expo install expo-font
expo install expo-app-loading

npx expo install react-native-gesture-handler

npm i @react-native-community/slider --save

```

## References

- https://docs.expo.dev/workflow/expo-cli/
- https://callstack.github.io/react-native-paper/getting-started.html
- https://github.com/Trancever/twitterClone
- https://medium.com/react-native-training/best-practices-for-creating-react-native-apps-part-1-66311c746df3
- https://stackoverflow.com/questions/69854731/drawer-navigation-react-native-paper
- https://github.com/eneiasramos/ccb-hinario-5-do
- https://medium.com/async/react-navigation-stacks-tabs-and-drawers-oh-my-92edd606e4db
- https://cifrasccb.com.br
- https://github.com/tombatossals/chords-db/tree/master
- https://github.com/artutra/OpenChord?tab=readme-ov-file
- https://www.npmjs.com/package/@tonaljs/progression
- https://pictogrammers.com/library/mdi/
