// const path = require('path');
// const createExpoWebpackConfigAsync = require('@expo/webpack-config');

// module.exports = async function (env, argv) {
//     const config = await createExpoWebpackConfigAsync(env, argv);


//     config.resolve = {
//         extensions: ['.js', '.jsx'], // Add the extensions that should be used to resolve modules
//         modules: [path.resolve(__dirname, 'src'), 'node_modules'], // Add the route to the src folder
//     };

//     config.module.rules.push({
//         test: /\.js$/,
//         loader: 'babel-loader',
//         include: [path.join(__dirname, 'node_modules/react-router-native')
//         ]
//     })
//     return config;
// }
