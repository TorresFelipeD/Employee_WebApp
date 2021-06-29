const routes=[
    {path:'/employee',component:employee},
    {path:'/deparment',component:deparment}
]

const router = new VueRouter({
    routes
  })

const app = new Vue({
    router
}).$mount('#app')