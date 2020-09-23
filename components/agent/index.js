import io from 'socket.io-client'

export default class Agent {
  constructor() {
    this._worldId = sessionStorage.worldId
    this._token = sessionStorage.token
    this._role = sessionStorage.role
    this._url = process.env.MITSU_URL
    this._socket = null
  }

  connect() {
    this._socket = io.connect(this._url)
    this._declareAttackListener()
    this._declareWaitListener()
    this._feedbackListener()
    this._invalidPlayerListener()
    this._disconnectListener()
  }

  joinWorldEmitter() {
    this._socket.emit('join_world', {
      worldId: this._worldId,
      token: this._token,
      role: this._role,
    })
  }

  attackEmitter(word) {
    this._socket.emit('attack', { word })
  }

  _declareAttackListener() {
    this._socket.on('declare_attack', (payload) => {
      console.log('declare_attack', payload)
    })
  }

  _declareWaitListener() {
    this._socket.on('declare_wait', (payload) => {
      console.log('declare_wait', payload)
    })
  }

  _feedbackListener() {
    this._socket.on('feedback', (payload) => {
      console.log('feedback', payload)
    })
  }

  _invalidPlayerListener() {
    this._socket.on('invalid_player', (payload) => {
      console.log('invalid_player', payload)
    })
  }

  _disconnectListener() {
    this._socket.on('disconnect', (payload) => {
      console.log(payload)
    })
  }
}
