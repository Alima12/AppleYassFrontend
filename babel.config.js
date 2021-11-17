module.exports = {
 presets: [
    [
      "@vue/app",
      { useBuiltIns: "entry" }
    ]
  ],
  configureWebpack: {
    plugins: [new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)]
  },
}

