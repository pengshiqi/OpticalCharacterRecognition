# -*- coding: utf-8 -*-

import BaseHTTPServer
import json
import numpy as np
import random

from ocr import OCRNeuralNetwork

# server config
HOST_NAME = '127.0.0.1'
PORT_NUMBER = 9000

HIDDEN_NODE_COUNT = 15

# upload data set
data_matrix = np.loadtxt(open('data.csv', 'rb'), delimiter=',')
data_labels = np.loadtxt(open('dataLabels.csv', 'rb'))

# convert to list type
data_matrix = data_matrix.tolist()
data_labels = data_labels.tolist()

# 数据集一共5000个数据，train_indice存储用来训练的数据序号
train_indice = range(5000)
# 打乱训练顺序
random.shuffle(train_indice)

nn = OCRNeuralNetwork(HIDDEN_NODE_COUNT, data_matrix, data_labels, train_indice)

class JSONHandler(BaseHTTPServer.BaseHTTPRequestHandler):
    """ 处理接收到的post请求 """
    def do_POST(self):
        response_code = 200
        response = ''
        var_len = int(self.headers.get('Content-length'))
        content = self.rfile.read(var_len)
        payload = json.loads(content)


        # 如果是训练请求，训练然后保存训练完的神经网络
        if payload.get('train'):
            print(payload)
            nn.train(payload['trainArray'])
            nn.save()
            response = {'type': 'train'}
        # 如果是预测请求，返回预测值
        elif payload.get('predict'):
            try:
                print nn.predict(data_matrix[0])
                response = {'type': 'test', 'result': str(nn.predict(payload['image']))}
            except:
                response_code = 500
        else:
            response_code = 400

        self.send_response(response_code)
        self.send_header('Content-type', 'application/json')
        self.send_header('Access-Control-Allow-Origin', '*')
        self.end_headers()
        if response:
            self.wfile.write(json.dumps(response))
        return


if __name__ == '__main__':
    server_class = BaseHTTPServer.HTTPServer
    httpd = server_class((HOST_NAME, PORT_NUMBER), JSONHandler)

    try:
        # 启动服务器
        print 'ready to serve'
        httpd.serve_forever()
        print 'serve successfully'
    except KeyboardInterrupt:
        pass
    else:
        print 'Unexpected server exception ocurred.'
    finally:
        httpd.server_close()
