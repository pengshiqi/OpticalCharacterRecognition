# OpticalCharacterRecognition

本项目基于BP神经网络实现一个手写字符识别系统，系统会在服务器启动时自动读入训练好的神经网络文件，如果文件不存在，则会读入数据集开始训练，用户可以通过在html页面上手写数字发送给服务器来得到识别结果。

### System composition

* 客户端(*ocr.js*)

* 服务器(*server.py*)

* 用户接口(*ocr.html*)

* 神经网络(*ocr.py*)

* 神经网络设计脚本(*neural_network_design.py*)

用户接口(ocr.html)是一个html页面，用户在canvas上写数字，之后点击选择训练或是预测。客户端(ocr.js)将收集到的手写数字组合成一个数组发送给服务器端(server.py)处理，服务器调用神经网络模块(ocr.py)，它会在初始化时通过已有的数据集训练一个神经网络，神经网络的信息会被保存在文件中，等之后再一次启动时使用。最后，神经网络设计脚本(neural_network_design.py)是用来测试不同隐藏节点数下的性能，决定隐藏节点数用的。

下载数据集
```
wget http://labfile.oss.aliyuncs.com/courses/593/data.csv
wget http://labfile.oss.aliyuncs.com/courses/593/dataLabels.csv
```

### Operation method

First open the server:
```
python -m SimpleHTTPServer 3000
```

Then run the python server file in another terminal window:
```
python server.py
```

Finally, you can visit the website at http://localhost:3000.

## Reference

* [实验楼](https://www.shiyanlou.com/courses/593/labs/1966/document)

* [500 lines or less](https://github.com/aosabook/500lines/tree/master/ocr)
