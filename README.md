# Ready-to-wear 
    
### A mini-program processed on the platform of WeChat.

### Functions: 
  - Helping people choose what to wear, based on the cloth user has and the wearther on that day. 
  - Providing the detailed infomation of the weather everyday.
  - Creating an online wardrobe for users.

### Developers: Cindy & her three roommates


----


## 前端接口信息
1. 








------


## 微信小程序开发中的一些踩坑
1. 关于页面数据更新不渲染的问题：
  - 用 ```this.setData({})``` 而非单纯的 ```this.data = ``` 赋值

2. 关于微信登录接口
  - 2021.04 微信小程序开发更新了大量接口，连接时要注意文档新旧

3. setData 传参
    1. 直接修改data中某个变量或整个对象
    ```javascript
      this.setData{(
          content: content
      )}
    ```
    2. 修改data中对象中的某个值 
    ```javascript
      this.setData{(
          'content.id': 1
      )}
    ```
    3. 修改指定位数组元素的值
    ```javascript
    var data_str =  'allay['+i+'].id'
      this.setData({
        [data_str] : id
      })
    ```

    4. 判断某对象为空的方法：
      将其转成json字符串，再进行判断
      ```javascript
        var object = {};
        console.log(JSON.stringify(object) == '{}'); //输出true
      ```

    5. 页面传值对象参数过长的处理方法
        小程序url传参如果是对象的话需要先用JSON.stringify()转换一下，接受页面在用JSON.parse()再转换回来。
    但这样传参有一个问题，当对象数据长度过大时会报错，因为url传参时程序把过长的那段数据给截取掉了，导致数据转换回来时格式不对而报错。
      这时可以再添加另一个API：
      encodeURIComponent(obj) 和 decodeURIComponent(options.obj)，在encodeURIComponent之前要用JSON.stringify()先转换数据decodeURIComponent之后再用JSON.parse()转换回来。

      ```javascript  
      encodeURIComponent(JSON.stringify(obj)) // 跳转url时的转换方法
      ```
      
      ```javascript  
      JSON.parse(decodeURIComponent(options.obj)) // 接收参数页面的转换方法
      ```