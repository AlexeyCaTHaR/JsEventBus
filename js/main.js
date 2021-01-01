document.addEventListener('DOMContentLoaded', (evt) => {
    console.info('Dom was loaded');

    const btn1 = document.getElementById('evt1')
    const btn2 = document.getElementById('evt2')
    const btn3 = document.getElementById('evt3')

    const evtListener1 = new DOMEventListener(btn1)
    const evtListener2 = new DOMEventListener(btn2)
    const evtListener3 = new DOMEventListener(btn3)

    evtListener1.listenEvent('click', () => {
        console.log('1')
    })

    evtListener2.listenEvent('click', () => {
        console.log('2')
    })

    evtListener3.listenEvent('click', () => {
        console.log('3')
    })
})

class DOMEventListener {
    constructor(domElement) {
        this.domElement = domElement
        console.info('EventListener was created', domElement);
    }
    listenEvent(evtType, cb) {
        this.domElement.addEventListener(evtType, cb)
        console.info('EventListener add evt', evtType);
    }
}

/**
 * TODO
 * class EventBus {}
 * class EventListener {}
 * class EventDispatcher {}
 */

