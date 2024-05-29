const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    port: 9091,
    proxy: {
      '/api1': {
        target: 'http://localhost:9090/',
        changeOrigin: true,
      },
      '/api2': {
        target: 'http://localhost:9092/',
        changeOrigin: true,
      }
    }
  }
})

