/* jshint esversion:8 */
const localhost = false;
const proxyAddress = localhost
  ? "http://localhost:81"
  : "http://116.62.48.175:81";
module.exports = {
  publicPath: process.env.NODE_ENV === "production" ? "./" : "/",
  assetsDir: "",
  devServer: {
    //为所服务的一切启用gzip压缩
    compress: true,
    //向所有响应添加标头：
    headers: {
      "X-Custom-Foo": "bar"
    },
    //指定要使用的主机。默认情况下这是localhost。如果您希望外部可以访问您的服务器，请像下面这样指定：
    host: "0.0.0.0",
    //指定用于侦听请求的端口号：
    port: 3000,
    //默认情况下，dev-server将通过HTTP提供。它可以选择通过HTTPS在HTTP / 2上提供：
    //https: true,
    //告诉dev-server在服务器启动后打开浏览器。将其设置true为打开默认浏览器。
    open: "Google Chrome",
    //当存在编译器错误或警告时，在浏览器中显示全屏覆盖。默认情况下禁用。如果只想显示编译器错误：
    overlay: false,
    //当您拥有单独的API后端开发服务器并且希望在同一域上发送API请求时，代理某些URL会很有用
    proxy: {
      "/Get": {
        target: process.env.NODE_ENV === "production" ? "" : proxyAddress
        //secure: false, // 如果是https接口，需要配置这个参数
        //changeOrigin: true // 如果接口跨域，需要进行这个参数配置
      },
      /* "/sockjs-node": {
        target:
          process.env.NODE_ENV === "production" ? "" : "http://localhost:81"
      },*/
      "/socket.io": {
        target: process.env.NODE_ENV === "production" ? "" : proxyAddress
      }
    },
    //输出运行进度到控制台。
    progress: true
  }
};
