const { defineConfig } = require('@vue/cli-service');

module.exports = defineConfig({
  transpileDependencies: true,
  chainWebpack: config => {
    config.plugin('define').tap(definitions => {
      definitions[0]['__VUE_OPTIONS_API__'] = true;           // Bật Options API
      definitions[0]['__VUE_PROD_DEVTOOLS__'] = false;        // Tắt devtools trong production
      definitions[0]['__VUE_PROD_HYDRATION_MISMATCH_DETAILS__'] = false; // Tắt chi tiết lỗi hydration
      return definitions;
    });
  },
});