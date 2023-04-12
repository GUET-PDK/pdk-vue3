# Vue 后台——跑得快

### 项目介绍

- 校园跑腿系统 Web 管理后台——GUET 软工大三课设

- 基于 Vite3 + Vue3.2 + Vuex + VueRouter + WindiCSS + Less + Element-Plus 构建

### 食用教程

1. 下载安装 git

2. 克隆项目到本地：git clone + http 链接 / ssh 链接

3. 项目导入微信开发者工具，等待加载项目

4. 初始化

   ```shell
   npm install
   ```

5. 运行

   ```shell
   npm run dev
   ```

6. 构建打包

   ```shell
   npm run build
   ```

### git 基本使用

1. git pul 从远程仓库更新代码到本地
2. git status 获取当前工作树的状态
3. git add <file> file 代表选择提交的文件，慎用 git add . 因为不同电脑项目的依赖构建不是同一路径，项目配置文件可能有变更！！！
4. git reset head 撤销 add 操作
5. git commit -m "备注提交信息" commit 代码到本地仓库
6. git push 推送本地仓库的代码到远程仓库

### git 配置参考

1. git bash here 打开到本地项目
2. git config --local user.name "蛋白质" 配置当前 git 仓库的昵称/用户名
3. git config --local user.email "[xxxx@qq.com](mailto:xxxx@qq.com)" 配置当前 git 仓库的用户邮箱
4. git config --list 查看配置信息

### 小组成员

梁通达 蔡小斌 江依超 廖思贤 黄潇茹

### 小组分工

| _学号_     | _姓名_ | _主要分工_                                                                                                                                                                                                                                                                                                       | _负责阶段_ |
| ---------- | :----- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------- |
| 2000301417 | 梁通达 | ① 负责构建小程序端和 Web 后台的整体架构并建立 Gitee 仓库；<br />② 组织小组成员推进项目需求分析，包括系统功能性分析、系统可行性分析等，确定系统结构图、用例图，明确开发采用的数据库以及开发环境；<br />③ 负责小程序端订单模块、支付模块、以及登录注册模块的开发，包括学生下订单、骑手接订单、评价订单等主要功能。 | 需求分析   |
| 2000301303 | 黄潇茹 | ① 设计小程序和 Web 管理后台的页面结构以及逻辑操作，将复杂系统进行模块化；<br />② 负责 Web 后台的用户管理模块和骑手管理模块，以及小程序的首页设计。                                                                                                                                                               | 概要设计   |
| 2000301715 | 江依超 | ① 为各功能模块扩展具体、结构化的过程描述，设计各模块的流程图、顺序图等；<br />② 负责绘制 E-R 图，设计数据库；<br />③ 负责管理员的后端接口开发。                                                                                                                                                                  | 详细设计   |
| 2000301709 | 蔡小斌 | ① 负责搭建项目后端的整体架构，创建 Git 仓库。<br />② 组织小组成员按照分工进行代码编写开发；<br />③ 设计接口文档，主要负责骑手方的接口开发。                                                                                                                                                                      | 代码实现   |
| 2000301617 | 廖思贤 | ① 各版本的软件测试，收集整理 bug、提出迭代的建议与意见，推进项目迭代；<br />② 负责学生方的接口开发。                                                                                                                                                                                                             | 软件测试   |
