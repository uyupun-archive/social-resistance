import io from 'socket.io-client'

export default class Agent {
  constructor(worldId, token, role, url) {
    this._worldId = worldId
    this._token = token
    this._role = role
    this._url = url
    this._socket = null
  }

  connect() {
    this._socket = io.connect(this._url)
    this._declareAttack()
    this._declareWait()
    this._feedback()
    this._invalidPlayer()
    this._disconnect()
  }

  joinWorld() {
    this._socket.emit('join_world', {
      worldId: this._worldId,
      token: this._token,
      role: this._role,
    })
  }

  attack(word) {
    this._socket.emit('attack', { word })
  }

  _declareAttack() {
    this._socket.on('declare_attack', (payload) => {
      console.log('declare_attack', payload)
    })
  }

  _declareWait() {
    this._socket.on('declare_wait', (payload) => {
      console.log('declare_wait', payload)
    })
  }

  _feedback() {
    this._socket.on('feedback', (payload) => {
      console.log('feedback', payload)
    })
  }

  _invalidPlayer() {
    this._socket.on('invalid_player', (payload) => {
      console.log('invalid_player', payload)
    })
  }

  _disconnect() {
    this._socket.on('disconnect', (payload) => {
      console.log(payload)
    })
  }
}
