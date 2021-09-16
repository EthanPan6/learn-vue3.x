



# 2021年最新完整Vite+Vue3+TypeScript项目实战

## 1、学习背景

随着前端web应用的需求不断发展和变化，vue生态圈也紧跟开发者步伐，不断演化。尽管vue2.0已经很完善了，很多人掌握的vue2.0，感觉实在学不动了，意料之外的是尤先生继续更新vue到3.0版本，以补充vue2.0的不足之处。随着vue3.0问世，vite2.5.1也油然而生，vue始终没有放弃对项目响应速度和编译速度的追求，vite的到来，对于前端开发者而言，简直不要太幸福了。vue3.0不仅全面支持TypeScript语法，还对生命周期钩子进行了优化和剔除，加上工具setup的语法糖，vue单页面多个根元素的扩展，代码精简不说，还很有条理，vue3.0的出现再次提升了开发者的编码体验和幸福感。另外vue3整合typescript语言是前端未来发展的必然趋势，而生为vue家族的新成员vite也是前端技术爱好者的学习目标，赢在起点，从学习新技术开始。活到老，学到老，是一个合格前端开发者的毕生信仰。

## 2、vite简介

vite诞生是为了提升web项目运行性能，以更快的速度将应用页面展示给用户。Vite 以 [原生 ESM](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules) 方式提供源码。这实际上是让浏览器接管了打包程序的部分工作：Vite 只需要在浏览器请求源码时进行转换并按需提供源码。根据情景动态导入代码，即只在当前屏幕上实际使用时才会被处理。

提供的驱动力：

2.1、优化缓慢的服务器启动（冷启动开发服务器和正式环境响应速度）；

2.2、优化缓慢的更新；

![](E:\vue_project\javascript-demo\前端知识点\vite+vue3最新技术栈\vue3.1.png)

![](E:\vue_project\javascript-demo\前端知识点\vite+vue3最新技术栈\vue3.2.png)



## 3、vite创建项目

兼容性注意:

**Vite 需要 [Node.js](https://nodejs.org/en/) 版本 >= 12.0.0。**

```js
// 安装vite
1、npm init vite@latest

// 安装vite同时创建vite项目
2、npm init vite@latest my-vue-app --template vue
```

```json
{
  "scripts": {
    "dev": "vite", // 启动开发服务器
    "build": "vite build", // 为生产环境构建产物
    "serve": "vite preview" // 本地预览生产构建产物
  }
}
```



## 4、版本依赖兼容

package.json版本依赖说明, 这里是整个项目依赖版本配置，相关安装指令后面视频中会逐个教大家如何安装。

```json
{
    "name": "vite-ts-vue3-plus-demo",
    "version": "0.0.0",
    "scripts": {
        "dev": "vite",
        "build": "vue-tsc --noEmit && vite build",
        "serve": "vite preview"
    },
    "dependencies": {
        "@element-plus/icons": "0.0.11",
        "dotenv": "^10.0.0",
        "element-plus": "^1.1.0-beta.7",
        "vue": "^3.0.5",
        "vue-router": "^4.0.11",
        "vuex": "^4.0.2"
    },
    "devDependencies": {
        "@types/node": "^16.7.1",
        "@vitejs/plugin-vue": "^1.3.0",
        "@vue/compiler-sfc": "^3.0.5",
        "node-sass": "^6.0.1",
        "sass": "^1.38.1",
        "sass-loader": "^12.1.0",
        "typescript": "^4.3.2",
        "vite": "^2.4.4",
        "vue-tsc": "^0.2.2"
    }
}
```



## 5、引入vuex配置和使用

创建项目时我们已经引入了vuex4.0版本，接下来我们就开始配置vuex4.0并测试。

```typescript
// 注意必须安装vuex4.0版本及以上
npm install vuex@next --save
#or
yarn add vuex@next --save
```

**5.1 在src目录下创建store文件夹，新建文件index.ts, index.ts内容如下所示：**

```typescript
import { InjectionKey } from 'vue'
/**
 * 引入 InjectionKey 并将其传入 useStore 使用过的任何地方，
 * 很快就会成为一项重复性的工作。为了简化问题，可以定义自己
 * 的组合式函数来检索类型化的 store 
 */
// 未简化useStore版
// import { createStore, Store } from 'vuex'
// 简化useStore版
import { useStore as baseUseStore, createStore, Store} from 'vuex'

// 为 store state 声明类型
export interface State {
    username: string,
    count: number
}

// 定义 injection key
export const key: InjectionKey<Store<State>> = Symbol()

// 导出store模块
export const store = createStore<State>({
    state: {
        username: "测试store",
        count: 0
    },
    getters:{
        getName: state =>{
            return state.username
        }
    },
    mutations: {
        // 重置名称
        SET_NAME(state, params:string) {
            state.username = params
        }
    },
    actions:{}
})

// 定义自己的 `useStore` 组合式函数
export function useStore () {
    return baseUseStore(key)
}
```



**5.2 在根目录下新建vuex-d.ts文件，内容如下所示：**

```typescript
// 一个声明文件来声明 Vue 的自定义类型 ComponentCustomProperties
import { ComponentCustomProperties } from 'vue';
import { Store } from 'vuex';

declare module '@vue/runtime-core' {
    // 声明自己的 store state
    interface State {
        count: number,
        username: string
    }
    // 为 `this.$store` 提供类型声明
    interface ComponentCustomProperties {
        $store: Store<State>
    }
}
```

**5.3  在main.ts中注入store模块**

```typescript
import { createApp } from 'vue';
import App from './App.vue';
// 导入store模块, 传入 injection key
import { store, key } from '@/store';
const app = createApp(App)
app.use(store, key)
app.mount('#app')
```

**5.4 引用测试vuex配置是否正确**

```vue
<el-button @click="changeName" size="small">点击修改名称</el-button>
<script setup lang="ts">
// vue 组件
import { useStore } from '@/store';
const store = useStore()
// 测试store重置名称
// store.commit('increment', 10)
function changeName():void{
    store.commit('SET_NAME', 10)
    console.log('修改后的名称：'+store.getters.getName);
}
console.log(store.state.count,store.getters.getName)
</script>
```



## 6、引入router配置和使用

创建项目时我们已经引入了router4.0版本，接下来我们就开始配置router4.0并测试。

```typescript
// 注意：安装router必须是4.0及以上
npm install vue-router@4
```

**6.1 在src目录下创建router文件夹，然后创建index.ts文件，内容如下所示：**

```typescript
import { createRouter, createWebHashHistory } from 'vue-router';
import LayOut from '@/components/layout/index.vue';
const routes = [
    {
        path: "/",
        component: LayOut,
        redirect: "/home",
        children:[
            {
                path: "/home",
                name: "home",
                meta:{
                    title: '首页',
                    index: 1
                },
                component:()=> import("@/pages/home/index.vue")
            },
            {
                path: "/about",
                name: "about",
                meta:{
                    title: '关于',
                    index: 1
                },
                component:()=> import("@/pages/about/index.vue")
            }
        ]
    }
]
const router = createRouter({
    // 指定路由模式
    history: createWebHashHistory(),
    // 路由地址
    routes
})
export default router;
```



**6.2 在main.ts中注入router模块, 重新启动项目，访问路由，看是否正确**

```typescript
import { createApp } from 'vue';
import App from './App.vue';
// 导入路由模块
import router from '@/router';
const app = createApp(App)
app.use(router)
app.mount('#app')
```



## 7、引入element-plus以及注意事项

**7.1 安装**

```js
npm install element-plus --save
# or
yarn add element-plus

# 安装icon图标依赖库
npm install @element-plus/icons
# or
yarn add @element-plus/icons
```



**7.2 在main.ts 文件中引入配置**

```typescript
import { createApp } from 'vue';
import App from './App.vue';

// 导入路由模块
import router from '@/router';
// 导入store模块, 传入 injection key
import { store, key } from '@/store';

// 引入组件库
import ElementPlus from 'element-plus';
// import 'element-plus/lib/theme-chalk/index.css';
import 'element-plus/theme-chalk/index.css';// 新版本plus引入样式方式

const app = createApp(App)
app.use(ElementPlus)
app.use(router)
app.use(store, key)
app.mount('#app')
```



**7.3 在vue文件中引用ui组件**

```vue
<template>
	<el-input v-model="inputValue" clearable @input="handleInputValue" placeholder="请输入内容"></el-input>
</template>
```



## 8、配置vite.config.ts

这里主要配置vite服务器的打包保存地址，打包分解，端口号，是否自动打开浏览器，服务区代理目标，目录别名，全局样式配置等。

```typescript
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { loadEnv } from 'vite';
// nodejs写法，获取项目目录
import path from 'path';

// https://vitejs.dev/config/
export default({ command, mode }) => {
    return defineConfig({
        plugins: [vue()],
        server:{
            host: '127.0.0.1',
            port: Number(loadEnv(mode, process.cwd()).VITE_APP_PORT),
            strictPort: true, // 端口被占用直接退出
            https: false,
            open: true,// 在开发服务器启动时自动在浏览器中打开应用程序
            proxy: {
                // 字符串简写写法
                // '/foo': '',
                // 选项写法
                '/api': {
                    target: loadEnv(mode, process.cwd()).VITE_APP_BASE_URL,
                    changeOrigin: true,
                    rewrite: (path) => path.replace(/^\/api/, '')
                },
                // 正则表达式写法
                // '^/fallback/.*': {
                //   target: 'http://jsonplaceholder.typicode.com',
                //   changeOrigin: true,
                //   rewrite: (path) => path.replace(/^\/fallback/, '')
                // },
            },
            hmr:{
                overlay: true // 屏蔽服务器报错
            }
        },
        resolve:{
            alias:{
                '@': path.resolve(__dirname,'./src')
            }
        },
        css:{
            // css预处理器
            preprocessorOptions: {
                // 引入 var.scss 这样就可以在全局中使用 var.scss中预定义的变量了
                // 给导入的路径最后加上 ;
                scss: {
                    additionalData: '@import "@/assets/styles/global.scss";'
                },
                sass: {
                    additionalData: '@import "@/assets/styles/global.scss";'
                }
            }
        },
        build:{
            chunkSizeWarningLimit: 1500, // 分块打包，分解块，将大块分解成更小的块
            rollupOptions: {
                output:{
                    manualChunks(id) {
                        if (id.includes('node_modules')) {
                            return id.toString().split('node_modules/')[1].split('/')[0].toString();
                        }
                    }
                }
            }
        }
    })   
}
```



## 9、tsconfig.json 配置

这是typescript的识别配置文件，也是ts向js转化的中间站，这里配置了许多关于ts的文件类型和策略方法。

```typescript
{
    "compilerOptions": {
    "target": "esnext",
    "module": "esnext",
    "moduleResolution": "node",
    "strict": true,
    "jsx": "preserve",
    "sourceMap": true,
    "resolveJsonModule": true,
    "esModuleInterop": true,
    "lib": ["esnext", "dom"],
    "baseUrl": ".",
    "paths": {
        "@/*":["src/*"]
    }
  },
  	"include": ["src/**/*.ts", "src/**/*.d.ts", "src/**/*.tsx", "src/**/*.vue"]
}
```



## 10、shims-vue.d.ts配置, 声明vue文件全局模块

这里是配置声明，比如css，vue等文件，ts不能识别，需要配置声明模块类型。

```typescript
declare module '*.vue' {
  import { DefineComponent } from 'vue'
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  const component: DefineComponent<{}, {}, any>
  export default component
}
```



## 11、配置全局scss文件，设置变量

```typescript
// 注意要使用scss，必须安装依赖，否则报错
npm install node-sass sass-loader --save-dev
```

**11.1  需要在src目录的assets静态目录新增一个全局global.scss文件，其他样式文件导入到该文件即可全局使用和修改。**



![](D:\demo\javascript-demo\前端知识点\vite+vue3最新技术栈\csss.png)



**11.2  在vite.config.ts 文件中配置global.scss**

```typescript
 css:{
     // css预处理器
     preprocessorOptions: {
         // 引入 var.scss 这样就可以在全局中使用 var.scss中预定义的变量了
         // 给导入的路径最后加上 ;
         scss: {
             additionalData: '@import "@/assets/styles/global.scss";'
         }
     }
 }
```



## 12、setup语法糖使用

<script setup lang='ts'> 是在单文件组件 (SFC) 中使用组合式 API 的编译时语法糖。相比于普通的 <script> 语法，
它具有更多优势：更少的样板内容，更简洁的代码。能够使用纯 Typescript 声明 props 和发出事件。更好的运行时性能 
(其模板会被编译成与其同一作用域的渲染函数，没有任何的中间代理)。更好的 IDE 类型推断性能 (减少语言服务器从代码中抽离类型的工作)

## 13、defineProps 和 defineEmits

为了声明 `props` 和 `emits` 选项且具备完整的类型推断，可以使用 `defineProps` 和 `defineEmits` API，它们在 `<script setup>` 中都是自动可用的：

- `defineProps` 和 `defineEmits` 都是只在 `<script setup>` 中才能使用的**编译器宏**。他们不需要导入，且会在处理 `<script setup>` 的时候被编译处理掉。

- `defineProps` 接收与 `props` 选项相同的值，`defineEmits` 也接收 `emits` 选项相同的值。

- `defineProps` 和 `defineEmits` 在选项传入后，会提供恰当的类型推断。

- 传入到 `defineProps` 和 `defineEmits` 的选项会从 setup 中提升到模块的范围。因此，传入的选项不能引用在 setup 范围中声明的局部变量。这样做会引起编译错误。但是，它*可以*引用导入的绑定，因为它们也在模块范围内。

  如果使用了 Typescript，[使用纯类型声明来声明 prop 和 emits](https://v3.cn.vuejs.org/api/sfc-script-setup.html#仅限-typescript-的功能) 也是可以的。

**1、子组件vue**

```vue
<template>
<!-- 组件传值方式 -->
<p>{{props.msg}}</p>
<el-input v-model="inputValue" clearable @input="handleInputValue" placeholder="请输入内容"></el-input>
</template>
<script setup lang="ts">
import { ref } from 'vue';
let inputValue = ref('')
// 接收传参
const props = defineProps({
    msg:String
})
// 事件调用
const emit = defineEmits(['on-change-input', 'update'])

// 处理input
function handleInputValue(params:any) {
    // console.log(params);
    emit('on-change-input', params)
}
</script>
```

**2、父组件vue**

```vue
<template>
    <TestModel :msg="'来自父组件名称'" @on-change-input="onChangeInput"></TestModel>
</template>
<script setup lang="ts">
import { ref, watch} from 'vue';
import TestModel from "@/components/test-modal/index.vue";
// 子组件调用方法
function onChangeInput(value:string) {
    console.log(typeof value, value);
}
</script>
```

## 14、component新特性

```vue
<template>
   <HelloWorld msg="Hello Vue 3 + TypeScript + Vite" />
</template>
<script setup lang="ts">
import HelloWorld from '@/components/HelloWorld.vue'
</script>
```



## 15、funtion函数定义和使用

```typescript
<el-button @click="changeName" size="small">点击修改名称</el-button>
function changeName():void{
    console.log('修改后的名称：'+store.getters.getName);
}
```



## 16、命名空间组件

可以使用带点的组件标记，例如 `<Foo.Bar>` 来引用嵌套在对象属性中的组件。这在需要从单个文件中导入多个组件的时候非常有用：

```vue
<script setup lang="ts">
import * as Form from './form-components'
</script>
<template>
  <Form.Input>
    <Form.Label>label</Form.Label>
  </Form.Input>
</template>
```



## 17、响应式API

响应式状态需要明确使用[响应式 APIs](https://v3.cn.vuejs.org/api/basic-reactivity.html) 来创建。和从 `setup()` 函数中返回值一样，ref 值在模板中使用的时候会自动解包：

```vue
<script setup lang='ts'>
import { ref } from 'vue'

const count = ref(0)
</script>

<template>
  <button @click="count++">{{ count }}</button>
</template>
```



## 18、component动态组件

由于组件被引用为变量而不是作为字符串键来注册的，在 `<script setup>` 中要使用动态组件的时候，就应该使用动态的 `:is` 来绑定：

```vue
<script setup lang='ts'>
import Foo from './Foo.vue'
import Bar from './Bar.vue'
</script>

<template>
  <component :is="Foo" />
  <component :is="someCondition ? Foo : Bar" />
</template>
```



## 19、setup中使用vue3生命周期钩子

```typescript
<script setup lang="ts">
import { onMounted, onActivated, onUnmounted, onUpdated, onDeactivated } from 'vue';
// 读取环境变量
const mode = import.meta.env;
//   import HeadMenu from '@/components/head-menu/index.vue';
 onMounted(() => {
 console.log("组件挂载")
 })

 onUnmounted(() => {
 console.log("组件卸载")
 })

 onUpdated(() => {
 console.log("组件更新")
 })
 onActivated(() => {
 console.log("keepAlive 组件 激活")
 })

 onDeactivated(() => {
 console.log("keepAlive 组件 非激活")
 })
</script>
```



## 20、vue3监听数据

```vue
<template>
    <p>{{address}}</p>
    <el-button type="primary" @click="resetAddr">重置地址</el-button>
</template>
  
<script setup lang="ts">
import { ref, watch} from 'vue';
let address = ref('默认名字')
function resetAddr():void {
    address.value = '贵阳市观山湖区'
}
watch(address, (n, prevN) => {
    console.log(n, prevN);
})
</script>

<style>

</style>
  
```

## 21、defineExpose属性

使用 `<script setup>` 的组件是**默认关闭**的，也即通过模板 ref 或者 `$parent` 链获取到的组件的公开实例，不会暴露任何在 `<script setup>` 中声明的绑定。

为了在 `<script setup>` 组件中明确要暴露出去的属性，使用 `defineExpose` 编译器宏：

**1、子组件暴露属性和方法，给父组件引用**

```vue
<script setup lang="ts">
function testChild():void{
    console.log('子组件方法testChild被调用了');
}
const b = ref(2)
// 统一暴露属性
defineExpose({
    obj:{name: '张三', age: 2300},
    b,
    testChild
})
</script>
```

**2、父组件调用子组件方法和属性**

```vue
<template>
    <TestModel ref="testModelRef" :msg="'来自父组件名称'" @on-change-input="onChangeInput"></TestModel>
</template>
<script setup lang="ts">
import { ref, watch, onMounted} from 'vue';
import TestModel from "@/components/test-modal/index.vue";
// 注意：testModelRef 和子组件绑定的ref要一致，否则调用失败
const testModelRef = ref()
// 子组件调用方法
function onChangeInput(value:string) {
    console.log(typeof value, value);
}
// 通过ref获取子组件方法
onMounted(()=>{
    console.log(testModelRef.value.testChild(),55555);
})
</script>
```



## 22、.env.环境变量配置和读取

环境变量建议放到项目根目录下, 方便vite.config.ts文件读取和使用

```elixir
.env.production // 生产环境配置文件
.env.development // 开发环境配置文件
```

#### 2.1.1 生产和开发环境配置文件内容如下：

```js
# 开发环境
VITE_APP_TITLE = "前端技术栈"
VITE_APP_PORT = 3001

# 请求接口
VITE_APP_BASE_URL = "http://39.12.29.92:8080"
```

#### 2.1.2 vite.config.ts 读取配置文件

```typescript
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { loadEnv } from 'vite';
// nodejs写法，获取项目目录
import path from 'path';

// https://vitejs.dev/config/
export default({ command, mode }) => {
    // console.log(command, mode, 5555);
    return defineConfig({
        plugins: [vue()],
        server:{
            host: '127.0.0.1',
            port: Number(loadEnv(mode, process.cwd()).VITE_APP_PORT),
            strictPort: true, // 端口被占用直接退出
            https: false,
            open: true,// 在开发服务器启动时自动在浏览器中打开应用程序
            proxy: {
                // 字符串简写写法
                // '/foo': '',
                // 选项写法
                '/api': {
                    target: loadEnv(mode, process.cwd()).VITE_APP_BASE_URL,
                    changeOrigin: true,
                    rewrite: (path) => path.replace(/^\/api/, '')
                },
                // 正则表达式写法
                // '^/fallback/.*': {
                //   target: 'http://jsonplaceholder.typicode.com',
                //   changeOrigin: true,
                //   rewrite: (path) => path.replace(/^\/fallback/, '')
                // },
                // 使用 proxy 实例
                // '/api': {
                //   target: 'http://jsonplaceholder.typicode.com',
                //   changeOrigin: true,
                //   configure: (proxy, options) => {
                //     // proxy 是 'http-proxy' 的实例
                //   },
                // }
            },
            hmr:{
                overlay: true // 屏蔽服务器报错
            }
        },
        resolve:{
            alias:{
                '@': path.resolve(__dirname,'./src')
            }
        },
        css:{
            // css预处理器
            preprocessorOptions: {
                // 引入 var.scss 这样就可以在全局中使用 var.scss中预定义的变量了
                // 给导入的路径最后加上 ;
                scss: {
                    additionalData: '@import "@/assets/styles/global.scss";'
                },
                sass: {
                    additionalData: '@import "@/assets/styles/global.scss";'
                }
            }
        },
        build:{
            chunkSizeWarningLimit: 1500, // 分块打包，分解块，将大块分解成更小的块
            rollupOptions: {
                output:{
                    manualChunks(id) {
                        if (id.includes('node_modules')) {
                            return id.toString().split('node_modules/')[1].split('/')[0].toString();
                        }
                    }
                }
            }
        }
    })   
}
```

#### 2.1.3 其他文件读取环境变量

```vue
<template>
    首页内容展示
</template>
<script setup lang="ts">
import { onMounted } from 'vue';
// 读取环境变量
const mode = import.meta.env;
onMounted(()=>{
    console.log(mode,555);
})
</script>
```

