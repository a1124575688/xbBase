## 分页器
[Paging](index.vue)

#### 使用
已经全局注册，不需要额外引入
```
<Paging :count="count" :pageSize="pageSize" :offset="offset" @handler="handler"></Paging>
```

#### 4个参数
- count：列表长度，必填
- offset：当前选中页，必填
- pageSize：分页长度，必填
- pageLen：页码长度，选填，默认10

#### 1个方法
- handler：分页回调，必填