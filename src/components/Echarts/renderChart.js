import echarts from './echarts.min';
import toString from '../../util/toString';

export default function renderChart(props) {
  const height = props.height || 400;
  return `
    document.getElementById('main').style.height = "${height}px";
    var myChart = echarts.init(document.getElementById('main'));
    myChart.setOption(${toString(props.option)});

    function () {
      if (WebViewBridge) {
        WebViewBridge.onMessage = function (message) {
          if (message && message.type == 'setOption') {
            myChart.setOption(JSON.parse(message.data));
          }
        };
      }
    }()
  `
}
