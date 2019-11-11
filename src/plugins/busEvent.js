const eventBus = {}

// en el curso profesionala de vue se explica, bscar por la $bus
// creamos una instancia para ser usadoen varios lugares
eventBus.install = function (Vue) {
    Vue.prototype.$bus = new Vue() 
}

export default eventBus