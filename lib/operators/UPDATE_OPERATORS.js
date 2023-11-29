import $addToSet from './update/$addToSet.js'
import $currentDate from './update/$currentDate.js'
import $inc from './update/$inc.js'
import $max from './update/$max.js'
import $min from './update/$min.js'
import $mul from './update/$mul.js'
import $pop from './update/$pop.js'
import $pull from './update/$pull.js'
import $pullAll from './update/$pullAll.js'
import $push from './update/$push.js'
import $rename from './update/$rename.js'
import $set from './update/$set.js'
import $unset from './update/$unset.js'

export default {
  $addToSet,
  $push,
  $each: true, // modifiers for $addToSet and $push
  $slice: true,
  $sort: true,
  $position: true,
  $currentDate,
  $inc,
  $max,
  $min,
  $mul,
  $pop,
  $pull,
  $pullAll,
  $rename,
  $set,
  $unset
}
