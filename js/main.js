document.addEventListener('DOMContentLoaded', (evt) => {
    const btn1 = document.getElementById('evt1')
    const btn2 = document.getElementById('evt2')
    const btn3 = document.getElementById('evt3')

    const evtListener1 = new DOMEventListener(btn1)
    const evtListener2 = new DOMEventListener(btn2)
    const evtListener3 = new DOMEventListener(btn3)

    evtListener1.listenEvent('click', () => $bus.fireEvent('getBeer'))
    evtListener2.listenEvent('click', () => $bus.fireEvent('getKalik'))
    evtListener3.listenEvent('click', () => $bus.fireEvent('goCS'))

    const $bus = new EventBus()

    const $cathar = new EventListener('getBeer', () => logMessage('hold on my beer'))
    $cathar.addEvent('goCS', () => logMessage('GIVE ME BOMB'))

    const $Paaashka = new EventListener('getBeer', () => logMessage('Just wisebeer'))
    $Paaashka.addEvent('getKalik', () => logMessage('PISH PISH'))
    $Paaashka.addEvent('goCS', () => logMessage('AWP MID'))

    const $TKO = new EventListener('getBeer', () => logMessage('Razlivayka top!'))
    $TKO.addEvent('getKalik', () => logMessage('CHETKO'))
    $TKO.addEvent('goCS', () => logMessage('AWP BANAN'))

    const $Telemaster = new EventListener('goCS', () => logMessage('sorian patsany'))

    $bus.addListener($cathar)
    $bus.addListener($Paaashka)
    $bus.addListener($TKO)
    $bus.addListener($Telemaster)

    function logMessage(msg) {
        const log = document.getElementById('evtLog')
        const p = document.createElement('p')
        p.append(msg)
        log.append(p)
    }
})

class DOMEventListener {
    constructor(domElement) {
        this.domElement = domElement
    }
    listenEvent(evtType, cb) {
        this.domElement.addEventListener(evtType, cb)
    }
}

class EventBus {
    listeners = []
    log = []

    constructor() {
        console.log('EvtBus created')
    }

    /**
     * @param listener
     * @param evtType
     */
    addListener(listener, evtType) {
        this.listeners.push(listener)
    }

    /**
     * @param evtType
     * @returns {*[]}
     */
    getListeners(evtType) {
        return this.listeners.filter(listener => listener.events.filter(evt => evt.evtType === evtType).length > 0)
    }

    /**
     * @param evtType
     */
    fireEvent(evtType, payload = null) {
        console.log('Event fired: ', evtType)
        const listeners = this.getListeners(evtType)
        listeners.forEach(listener => {
            const fireEvents = listener.events.filter(evt => evt.evtType === evtType)
            fireEvents.forEach(handler => handler.cb(payload))
        })
    }
}

class EventListener {
    events = []

    /**
     * @param evtType
     * @param cb
     */
    constructor(evtType, cb = () => {}) {
        this.addEvent(evtType, cb)
    }

    /**
     * @param evtType
     * @param cb
     */
    addEvent(evtType, cb = () => {}) {
        this.events.push({
            evtType: evtType,
            cb: cb
        });
    }
}
