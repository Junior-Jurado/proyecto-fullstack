const path = require('path');
const HttpWepackPlugin = require('html-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const  devMode = process.env.NODE_ENV !== 'production';

module.exports = {
    mode: 'development',
    entry: './frontend/app.js',
    output: {
        path: path.join(__dirname, 'backend/public'),
        filename: 'js/bundle.js'
    },

    module: {
        rules: [
            {
                test: /\.css/,
                use: [
                    devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
                    'css-loader'
                ]
            }
        ]

    },

    plugins: [
        new HtmlWebpackPlugin({
            template: './frontend/index.html',
            minify: {
                collapseWhitespace: true,
                removeComments: true,
                removeRedudantAttributes: true,
                removeScriptTypeAtributtes: true,
                removeStyleLinkAttributes: true,
                useShortDoctype: true
            }
            
        }),
        new HtmlWebpackPlugin({
            template: './frontend/register.html', 
            filename: 'register.html', 
            minify: {
                collapseWhitespace: true,
                removeComments: true,
                removeRedundantAttributes: true,
                removeScriptTypeAtributtes: true,
                removeStyleLinkAttributes: true,
                useShortDoctype: true
            }
        }),
        new HtmlWebpackPlugin({
            template: './frontend/HomeScreen.html', 
            filename: 'HomeScreen.html', 
            minify: {
                collapseWhitespace: true,
                removeComments: true,
                removeRedundantAttributes: true,
                removeScriptTypeAtributtes: true,
                removeStyleLinkAttributes: true,
                useShortDoctype: true
            }
        }),
        new HtmlWebpackPlugin({
            template: './frontend/AdministradorScreen.html', 
            filename: 'AdministradorScreen.html', 
            minify: {
                collapseWhitespace: true,
                removeComments: true,
                removeRedundantAttributes: true,
                removeScriptTypeAtributtes: true,
                removeStyleLinkAttributes: true,
                useShortDoctype: true
            }
        }),
        new HtmlWebpackPlugin({
            template: './frontend/loginAdmin.html', 
            filename: 'loginAdmin.html', 
            template: './frontend/reservasCustomer.html', 
            filename: 'reservasCustomer.html', 
            minify: {
                collapseWhitespace: true,
                removeComments: true,
                removeRedundantAttributes: true,
                removeScriptTypeAtributtes: true,
                removeStyleLinkAttributes: true,
                useShortDoctype: true
            }
        }),
        new HtmlWebpackPlugin({
            template: './frontend/loginAdmin.html', 
            filename: 'loginAdmin.html', 
            minify: {
                collapseWhitespace: true,
                removeComments: true,
                removeRedundantAttributes: true,
                removeScriptTypeAtributtes: true,
                removeStyleLinkAttributes: true,
                useShortDoctype: true
            }
        }),
        new HtmlWebpackPlugin({
            template: './frontend/CarInfo.html', 
            filename: 'CarInfo.html', 
            minify: {
                collapseWhitespace: true,
                removeComments: true,
                removeRedundantAttributes: true,
                removeScriptTypeAtributtes: true,
                removeStyleLinkAttributes: true,
                useShortDoctype: true
            }
        }),

        new HtmlWebpackPlugin({
            template: './frontend/calificarServicio.html', 
            filename: 'calificarServicio.html', 
            minify: {
                collapseWhitespace: true,
                removeComments: true,
                removeRedundantAttributes: true,
                removeScriptTypeAtributtes: true,
                removeStyleLinkAttributes: true,
                useShortDoctype: true
            }
        }),

        new MiniCssExtractPlugin({
            filename: 'css/bundle.css',
        })
    ],


    devtool: 'source-map',

}