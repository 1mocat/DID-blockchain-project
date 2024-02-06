const path = require("path");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
  mode: 'development',
  entry: "./src/index.js",
  output: {
    filename: "index.js",
    path: path.resolve(__dirname, "dist"),
  },
  plugins: [
    // 复制 HTML 文件
    new CopyWebpackPlugin([
      { from: "./src/UserAgreement.html", to: "UserAgreement.html" },
      { from: "./src/myaccount.html", to: "myaccount.html" },
      { from: "./src/carry_inher.html", to: "carry_inher.html" },
      { from: "./src/my_inher.html", to: "my_inher.html" },
      { from: "./src/account.html", to: "account.html" },
      { from: "./src/index.html", to: "index.html" },
      { from: "./src/NFTList.html", to: "NFTList.html" },
      { from: "./src/AuctionList.html", to: "AuctionList.html" },
    ]),

    // 复制 Bootstrap 和其他资源
    new CopyWebpackPlugin([
      { from: "./src/bootstrap-3.3.5-dist", to: "bootstrap-3.3.5-dist" },
      { from: "./src/css", to: "css" },
      { from: "./src/jtable.2.4.0", to: "jtable.2.4.0" },
      { from: "./src/script", to: "script" },
      { from: "./src/ui-layout-0.0.0", to: "ui-layout-0.0.0" },
      { from: "./src/index.js", to: "index.js" },
      { from: "./src/img", to: "img" }
    ]),

    // 复制 assets_index 文件夹及其内容
    new CopyWebpackPlugin([{ from: "./src/assets_index", to: "assets_index" }]),

    // 复制 assets_account 文件夹及其内容
    new CopyWebpackPlugin([{ from: "./src/assets_account", to: "assets_account" }]),

    // 复制 images 文件夹中的子文件夹及其内容
  ],
  devServer: { contentBase: path.join(__dirname, "dist"), compress: true },
};

