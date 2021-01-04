const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  entry: {
    app: "./src/app.js",
  },

  devServer: {
    port: 4000,
    open: true,
  },

  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "js/bundle.js",
  },

  module: {
    rules: [
      {
        test: /\.(c|sa|sc)ss$/i,
        //Reemplazamos el style-loader por ---> Configuracion de extraccion del css a parte
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
      },

      {
        //para que webpack pueda reconocer html con extencion .handlebars
        test: /\.handlebars$/,
        loader: "handlebars-loader",
      },

      {
        //Realizamos esta configuracion para que nos permita cargar imagenes con webpack
        test: /\.(jpg|png|gif|jpeg)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[ext]", //Nos permite tener el nombre y la extension de la imagen
              outputPath: "static/img", //La salida donde se va alojar la o las imagenes
              useRelativePath: true, //
            },
          },
        ],
      },

      {
    //Configuracion para bajar el peso de las imagenes en nuestra web
        loader: "image-webpack-loader",
        options: {
          mozjpeg: {
            progressive: true,
          },
    
          optipng: {
            enabled: true,
          },
          pngquant: {
            quality: [0.65, 0.9],
            speed: 4,
          },
          gifsicle: {
            interlaced: false,
          },
          // the webp option will enable WEBP
          webp: {
            quality: 75,
          },
        },
      },
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.handlebars",
      minify: false,
      //  //propiedad para comprimir el codigo de html
      //  //Nota: NO colocarlo cuando utilizamos handlebars ya que nos da un error ya que por defecto
      //  //viene en modo production
      //  manify: {
      //   collapseWhitespace: true,
      //   removeComments: true,
      //   removeRedundantAttributes: true,
      //   removeScriptTypeAttributes: true,
      //   removeStyleLinkTypeAttributes: true,
      //   useShortDoctype: true,
      // },
    }),
    new MiniCssExtractPlugin({
      //Archivo de Salida del css
      filename: "css/bundle.css",
    }),
  ],
};
