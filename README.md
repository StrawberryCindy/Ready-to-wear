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
  - 用 '''this.setData({})''' 而非 '''this.data''' 赋值

2. 关于微信登录接口
  - 2021.04 微信小程序开发更新了大量接口，连接时要注意文档新旧