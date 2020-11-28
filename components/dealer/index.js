import io from 'socket.io-client'

export default class Dealer {
  constructor(worldId, role, token) {
    this._worldId = worldId
    this._role = role
    this._token = token
    this._socket = null
    this.connect()
  }

  connect() {
    const url = process.env.API_URL
    this._socket = io.connect(url)
  }

  feedbackPositionListener(callback) {
    this._socket.on('feedback_position', (payload) => {
      callback(payload)
    })
  }

  getWordsAndBaseWordListener(callback) {
    this._socket.on('get_words_and_baseword', (payload) => {
      callback(payload)
    })
  }

  getWordsListener(callback) {
    this._socket.on('get_words', (payload) => {
      callback(payload)
    })
  }

  updateBaseWordListener(callback) {
    this._socket.on('update_baseword', (payload) => {
      callback(payload)
    })
  }

  getTurnListener(callback) {
    this._socket.on('get_turn', (payload) => {
      callback(payload)
    })
  }

  getCountdownListener(callback) {
    this._socket.on('get_countdown', (payload) => {
      callback(payload)
    })
  }

  declareAttackListener(callback) {
    this._socket.on('declare_attack', (payload) => {
      callback()
    })
  }

  declareWaitListener(callback) {
    this._socket.on('declare_wait', (payload) => {
      callback()
    })
  }

  noticeTurnTimeoutListener(callback) {
    this._socket.on('notice_turn_timeout', (payload) => {
      callback(payload)
    })
  }

  judgeListener(callback) {
    this._socket.on('judge', (payload) => {
      this.disconnect()
      callback(payload)
    })
  }

  invalidPlayerListener(callback) {
    this._socket.on('invalid_player', (payload) => {
      callback()
    })
  }

  noticeDisconnectListener(callback) {
    this._socket.on('notice_disconnect', (payload) => {
      this.disconnect()
      callback()
    })
  }

  joinWorldEmitter() {
    this._socket.emit('join_world', {
      worldId: this._worldId,
      token: this._token,
      role: this._role,
    })
  }

  attackEmitter(word) {
    this._socket.emit('attack', {
      worldId: this._worldId,
      token: this._token,
      role: this._role,
      baseWord: word,
    })
  }

  disconnect() {
    this._socket.disconnect()
  }
}
