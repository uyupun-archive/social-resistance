import {
  PLAYER_MOVABLE_FIELD_WIDTH,
  SOCIAL_DISTANCE_ZONE_RADIUS,
} from '~/components/constants/index.js'

export default class Judge {
  /**
   * うさぎさんの勝利判定
   */
  isGoal(x) {
    if (x + SOCIAL_DISTANCE_ZONE_RADIUS >= PLAYER_MOVABLE_FIELD_WIDTH)
      return true
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
    // 二点間の距離が各Playerの和以下なら衝突している
    if (distance <= SOCIAL_DISTANCE_ZONE_RADIUS * 2) return true
    return false
  }
}
