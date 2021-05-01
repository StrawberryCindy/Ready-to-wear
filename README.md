## Ready-to-wear 
    
### A mini-program processed on the platform of WeChat.

### Functions: 
  - Helping people choose what to wear, based on the cloth user has and the wearther on that day. 
  - Providing the detailed infomation of the weather everyday.
  - Creating an online wardrobe for users.

### Developers: Cindy & her three roommates


----

### 微信小程序开发中的一些踩坑
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