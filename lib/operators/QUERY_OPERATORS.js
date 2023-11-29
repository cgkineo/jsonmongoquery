import $all from './query/$all.js'
import $and from './query/$and.js'
import $elemMatch from './query/$elemMatch.js'
import $eq from './query/$eq.js'
import $exists from './query/$exists.js'
import $gt from './query/$gt.js'
import $gte from './query/$gte.js'
import $in from './query/$in.js'
import $lt from './query/$lt.js'
import $lte from './query/$lte.js'
import $mod from './query/$mod.js'
import $ne from './query/$ne.js'
import $nin from './query/$nin.js'
import $nor from './query/$nor.js'
import $not from './query/$not.js'
import $or from './query/$or.js'
import $regex from './query/$regex.js'
import $size from './query/$size.js'
import $type from './query/$type.js'
import $where from './query/$where.js'

export default {
  $all,
  $and,
  $elemMatch,
  $eq,
  $exists,
  $gt,
  $gte,
  $in,
  $lt,
  $lte,
  $mod,
  $ne,
  $nin,
  $nor,
  $not,
  $or,
  $regex,
  $options: true, // modifier for $regex
  $size,
  $type,
  $where
}
