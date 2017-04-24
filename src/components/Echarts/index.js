import React, { Component } from 'react';
import { WebView, View, StyleSheet } from 'react-native';
import renderChart from './renderChart';
import echarts from './echarts.min';
import WebViewBridge from 'react-native-webview-bridge';

export default class App extends Component {
  componentWillReceiveProps(nextProps) {
    if(nextProps.option !== this.props.option) {
      //this.refs.chart.reload();
      this.refs.chart.sendToBridge({
        type: 'setOption',
        data: JSON.stringify(nextProps.option);
      });
    }
  }

  render() {
    return (
      <View style={{flex: 1, height: this.props.height || 400,}}>
        <WebViewBridge
          ref="chart"
          scrollEnabled = {false}
          injectedJavaScript = {renderChart(this.props)}
          style={{
            height: this.props.height || 400,
          }}
          source={require('./tpl.html')}
        />
      </View>
    );
  }
}
