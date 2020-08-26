export default class Judge {
  /**
   * うさぎさんの勝利判定
   */
  isGoal(y) {
    // フィールドの幅 - ソーシャルディスタンスゾーンの直径
    if (y >= 1000 - 120) return true
    return false
  }

  /**
   * 当たり判定(ばいきんくんの勝利判定)
   *
   * @param {*} coordinateA
   * @param {*} coordinateB
   */
  isHit(coordinateA, coordinateB) {
    // 二点間の距離
    const distance = Math.sqrt(
      (coordinateB.x - coordinateA.x) ** 2 +
        (coordinateB.y - coordinateA.y) ** 2
    )
    const radius = 60
    // 二点間の距離が各Playerの和以下なら衝突している
    if (distance <= radius * 2) return true
    return false
  }
}
