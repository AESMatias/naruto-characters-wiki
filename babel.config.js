// export default function (api) {
//   api.cache(true);
//   return {
//     presets: ['babel-preset-expo'],
//     plugins: [
//       'react-native-reanimated/plugin',
//       // 'react-native-web' //
//     ],
//   };
// };
// The same code but in commonJS
module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      'react-native-reanimated/plugin',
      // 'react-native-web' //
    ],
  };
};
