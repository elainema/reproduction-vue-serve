import Vue from 'vue'
import VueRouter from 'vue-router'
import { expect } from 'chai'

describe('[Vue Instance].$route bindings', () => {
    it('updates $route on all instances', () => {

        const router = new VueRouter({
            routes: [
                { path: '/', component: { name: 'foo' } },
                { path: '/bar', component: { name: 'bar' } }
            ]
        })
        const app2 = new Vue({ router })
        console.log(app2)
        expect(app2.$route.path).toBe('/')
        router.push('/bar')
        console.log(app2.$route.path)
            //expect(app.$route.path).toBe('/')
            //router.push('/bar')
    })
})
